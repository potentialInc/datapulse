import { cn } from '~/lib/utils';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'indigo' | 'purple' | 'amber' | 'emerald' | 'rose';
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const colorMap = {
  indigo: 'from-indigo-500 to-purple-600 shadow-indigo-500/20',
  purple: 'from-purple-500 to-pink-600 shadow-purple-500/20',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/20',
  emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20',
  rose: 'from-rose-500 to-pink-600 shadow-rose-500/20',
};

export function UserAvatar({ name, size = 'md', colorScheme = 'indigo' }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white shadow-lg',
        sizeMap[size],
        colorMap[colorScheme]
      )}
    >
      {initials}
    </div>
  );
}
