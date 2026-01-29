interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; to?: string }>;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 z-10">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.to ? (
                  <a href={crumb.to} className="hover:text-white transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
        {(subtitle || description) && <p className="text-sm text-slate-400 mt-1">{subtitle || description}</p>}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
}
