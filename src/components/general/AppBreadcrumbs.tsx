import Link from "next/link";

interface Breadcrumb {
  id: number;
  seo_h1?: string;
  title: string;
  full_slug?: string;
}

interface AppBreadcrumbsProps {
  root: string;
  title?: string;
  breadcrumbs?: Breadcrumb[];
}

const AppBreadcrumbs = ({ root, title = '', breadcrumbs = [] }: AppBreadcrumbsProps) => {

  function crumbTitle(item: Breadcrumb): string {
    return item.seo_h1 ? item.seo_h1 : item.title;
  }

  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item" key="home">
        <Link href="/" className="breadcrumbs__link"><i className="icon icon--home"></i></Link>
      </li>
      {title && (
        <li className="breadcrumbs__item" key="set">
          <Link href={root} className="breadcrumbs__link">{title}</Link>
        </li>
      )}
      {breadcrumbs.map(item => (
        <li className="breadcrumbs__item" key={item.id}>
          <Link
            href={root + (item.full_slug ? item.full_slug + '/' : item.id)}
            className="breadcrumbs__link"
          >
            {crumbTitle(item)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AppBreadcrumbs;