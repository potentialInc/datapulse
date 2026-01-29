import { Link } from 'react-router';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon>}
          {item.href ? (
            <Link to={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
