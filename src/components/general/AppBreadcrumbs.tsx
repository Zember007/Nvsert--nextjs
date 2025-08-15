import Link from "next/link";

interface Breadcrumb {
  id: number;
  title: string;
  full_slug?: string;
}

interface AppBreadcrumbsProps {
  root: string;
  breadcrumbs?: Breadcrumb[];
}

const AppBreadcrumbs = ({ root,  breadcrumbs = [] }: AppBreadcrumbsProps) => {

 

  return (
    <>



      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <Link
            className='breadcrumbs__link'
            href={'/'}
          >Главная</Link>
        </li>

        {breadcrumbs.map(item => (
          <li className="breadcrumbs__item" key={item.id}>
            <Link
              href={item.full_slug || '/'}
              className="breadcrumbs__link"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AppBreadcrumbs;