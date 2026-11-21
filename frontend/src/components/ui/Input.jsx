import { useId } from 'react';

function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error = '',
  placeholder = '',
  autoComplete,
  rightSlot,
  required = false,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const inputId = props.id || `${name || 'field'}-${generatedId}`;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      {label ? (
        <label htmlFor={inputId} className="text-sm font-semibold text-navy">
          {label}
          {required ? (
            <span className="ml-1 text-mint-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={[
            'w-full rounded-xl border bg-white px-4 py-3.5 text-base text-navy',
            'placeholder:text-navy-soft/70',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            rightSlot ? 'pr-12' : '',
            hasError
              ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
              : 'border-mint-200 focus:border-mint-400 focus:ring-mint-200',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {rightSlot ? (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {rightSlot}
          </div>
        ) : null}
      </div>

      {hasError ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
