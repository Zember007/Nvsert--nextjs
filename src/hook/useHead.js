import { useEffect, useState } from 'react';
import { DOMParser } from 'xmldom';
import Head from 'next/head';

export default function useHeadLayout(configs, fileConfigs) {
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    keywords: '',
    link: [],
    script: [],
    noscript: [],
    style: [],
    ogImage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!configs) return;

      let parsedMeta = {
        title: configs.SITE_NAME || '',
        description: configs.SITE_DESCRIPTION || '',
        keywords: configs.SITE_KEYWORDS || '',
        link: [{ rel: 'canonical', href: `${process.env.NEXT_PUBLIC_BASE_URL}${configs.routePath}` }],
        script: [],
        noscript: [],
        style: [],
        ogImage: fileConfigs?.SITE_IMAGE ? `${process.env.NEXT_PUBLIC_BASE_URL}${fileConfigs.SITE_IMAGE}` : '',
      };

      if (configs.COUNTERS_HEAD) {
        let parser = new DOMParser();
        let headCounters = parser.parseFromString(configs.COUNTERS_HEAD, 'text/html');

        ['link', 'meta', 'script', 'noscript', 'style'].forEach((tag) => {
          Array.from(headCounters.getElementsByTagName(tag)).forEach((element) => {
            let attributes = {};
            Array.from(element.attributes).forEach(attr => attributes[attr.name] = attr.value);
            attributes.innerHTML = element.textContent.trim();

            if (!parsedMeta[tag]) {
              parsedMeta[tag] = [];
            }
            parsedMeta[tag].push(attributes);
          });
        });
      }

      setMetaData(parsedMeta);
    };

    fetchData();
  }, [configs, fileConfigs]);

  return (
    <Head>
      {metaData.title && <title>{metaData.title}</title>}
      {metaData.description && <meta name="description" content={metaData.description} />}
      {metaData.keywords && <meta name="keywords" content={metaData.keywords} />}
      {metaData.ogImage && <meta property="og:image" content={metaData.ogImage} />}
      {metaData.link.map((link, i) => <link key={i} {...link} />)}
      {metaData.script.map((script, i) => <script key={i} {...script}>{script.innerHTML}</script>)}
      {metaData.noscript.map((ns, i) => <noscript key={i}>{ns.innerHTML}</noscript>)}
      {metaData.style.map((style, i) => <style key={i}>{style.innerHTML}</style>)}
    </Head>
  );
}
