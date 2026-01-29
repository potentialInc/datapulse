interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shortcut?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...', shortcut = 'K' }: SearchInputProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <iconify-icon icon="solar:magnifer-linear" className="text-slate-500 group-focus-within:text-indigo-400 transition-colors"></iconify-icon>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800/50 border border-slate-700 text-sm rounded-lg block w-64 pl-10 p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-slate-600 text-xs border border-slate-700 rounded px-1.5 py-0.5">{shortcut}</span>
      </div>
    </div>
  );
}
