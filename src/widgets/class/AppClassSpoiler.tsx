import axios from 'axios';
import { MouseEvent, useState } from 'react';

interface SpoilerNode {
  id?: number;
  code?: string;
  name: string;
  is_leaf_node?: boolean;
}

interface AppClassSpoilerProps {
  spoiler: SpoilerNode;
  slug: string;
}

const isLeaf = (node: SpoilerNode) => Boolean(node.is_leaf_node);

const AppClassSpoiler = ({ spoiler, slug }: AppClassSpoilerProps) => {
  const [childs, setChilds] = useState<SpoilerNode[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const spoilerName = spoiler.code ? `${spoiler.code}: ${spoiler.name}` : spoiler.name;

  async function getChilds(evt: MouseEvent<HTMLButtonElement>) {
    if (spoiler.id && !isLeaf(spoiler)) {
      if (slug !== 'okp/' && slug !== 'tnved/') return;

      setLoading(true);

      const url = slug === 'tnved/' ? 'tn' : 'okp';

      try {
        const response = await axios.get(`/api/${url}`, {
          params: {
            parent_id: spoiler.id,
          },
        });

        const content: SpoilerNode[] = response.data?.content ?? [];

        if (content.length > 0) {
          setChilds(content);
          setContentLoaded(true);
          setLoading(false);
          setTimeout(() => {
            toggleOpen(evt);
          }, 100);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      }
    }
  }

  function classBtnHandler(evt: MouseEvent<HTMLButtonElement>) {
    if (isLeaf(spoiler)) return;
    try {
      if (contentLoaded) {
        toggleOpen(evt);
      } else {
        void getChilds(evt);
      }
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  }

  function toggleOpen(evt: MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();

    const target = (evt.target as HTMLElement).closest<HTMLButtonElement>(
      '.js-spoiler-button',
    );

    if (!target) return;

    const spoilerElement = target.closest<HTMLElement>('.js-spoiler-item');
    const spoilerContent = spoilerElement?.querySelector<HTMLElement>('.js-spoiler-content');

    if (!spoilerElement || !spoilerContent) return;

    if (!spoilerElement.classList.contains('active')) {
      spoilerElement.classList.add('active');
      spoilerContent.style.height = 'auto';

      const height = `${spoilerContent.clientHeight}px`;
      spoilerContent.style.height = '0px';

      spoilerContent.addEventListener(
        'transitionend',
        () => {
          spoilerContent.style.height = 'auto';
        },
        {
          once: true,
        },
      );

      setTimeout(() => {
        spoilerContent.style.height = height;
      }, 0);
    } else {
      spoilerContent.style.height = `${spoilerContent.clientHeight}px`;

      spoilerContent.addEventListener(
        'transitionend',
        () => {
          spoilerElement.classList.remove('active');
        },
        {
          once: true,
        },
      );

      setTimeout(() => {
        spoilerContent.style.height = '0px';
      }, 0);
    }
  }

  return (
    <div
      className={`mtp__spoiler-item js-spoiler-item ${
        isLeaf(spoiler) ? 'empty' : ''
      } ${loading ? 'loading' : ''}`}
    >
      <div className="mtp__spoiler-item-header">
        <button
          type="button"
          className="mtp__spoiler-button js-spoiler-button"
          onClick={classBtnHandler}
        >
          {spoilerName}
        </button>
      </div>
      <div className="mtp__spoiler-item-content js-spoiler-content">
        {childs && childs.length > 0 && (
          <div className="mtp__spoiler-text">
            {childs.map((child, i) => (
              <AppClassSpoiler key={i} spoiler={child} slug={slug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppClassSpoiler;
