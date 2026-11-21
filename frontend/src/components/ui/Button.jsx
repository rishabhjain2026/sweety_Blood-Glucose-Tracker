import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-mint-500 text-white shadow-soft hover:bg-mint-600 focus-visible:ring-mint-400',
  secondary:
    'bg-white text-navy border border-mint-200 shadow-card hover:border-mint-400 hover:bg-mint-50 focus-visible:ring-mint-300',
  ghost:
    'bg-transparent text-navy-muted hover:text-navy hover:bg-mint-100 focus-visible:ring-mint-300',
};

const sizes = {
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-7 py-3.5 text-base sm:text-lg',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-55',
    fullWidth ? 'w-full' : '',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;
