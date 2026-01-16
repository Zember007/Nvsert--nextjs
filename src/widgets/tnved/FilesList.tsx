import { AppCollapsibleList } from '../layout';
import WordImg from '@/assets/images/svg/Word.svg';
import PdfImg from '@/assets/images/svg/PDF.svg';
import Image from 'next/image';
import Link from 'next/link';
import textSize from '@/assets/styles/base/base.module.scss';
import { filterPrepositions } from '@/shared/lib/text/textFormat';

const FilesList = () => {
  return (
    <AppCollapsibleList
      title={'Документация'}
      items={[
        {
          id: 2,
          title: 'ТН ВЭД',
          icon: WordImg,
          link: '#',
        },
      ]}
      defaultOpen={true}
      listClassName="flex flex-col gap-[20px]"
      renderItem={(item, index) => (
        <Link key={index} href={item.link} target="_blank" className="flex items-center gap-[10px] group">
          <Image src={item.icon} alt={item.title} width={40} height={40} className="min-w-[40px]" />
          <span className={`${textSize.text3} group-active:scale-[0.95] transition-transform duration-100`}>
            {filterPrepositions(item.title)}
          </span>
        </Link>
      )}
    />
  );
};

export default FilesList;

