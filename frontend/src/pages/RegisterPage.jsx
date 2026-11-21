import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { validateRegisterForm } from '../utils/authValidation.js';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function RegisterPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedValid, setSubmittedValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSubmittedValid(false);

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const { errors: nextErrors } = validateRegisterForm(values);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors: nextErrors, isValid } = validateRegisterForm(values);
    setErrors(nextErrors);
    setSubmittedValid(isValid);

    // Backend registration wiring arrives in Milestone 6.
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register once to keep your glucose readings private and easy to review."
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-mint-600 transition-colors hover:text-mint-700"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input
          label="Full name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          required
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((open) => !open)}
              className="rounded-lg p-2 text-navy-soft transition-colors hover:bg-mint-50 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        <Input
          label="Confirm password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((open) => !open)}
              className="rounded-lg p-2 text-navy-soft transition-colors hover:bg-mint-50 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300"
              aria-label={
                showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        {submittedValid ? (
          <p
            role="status"
            className="rounded-xl border border-mint-200 bg-mint-50 px-4 py-3 text-sm leading-relaxed text-navy-muted"
          >
            Form looks good. Account creation will connect once the
            authentication API is ready.
          </p>
        ) : null}

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
