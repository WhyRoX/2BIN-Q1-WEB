import './PageTitle.css'

export interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="page-title">
        {title}
    </div>
  );
};