import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { validateLoginForm } from '../utils/authValidation.js';
import { useAuth } from '../context/AuthContext.jsx';

const initialValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setServerError('');

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const { errors: nextErrors } = validateLoginForm(values);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { errors: nextErrors, isValid } = validateLoginForm(values);
    setErrors(nextErrors);
    if (!isValid) return;
    setSubmitting(true); setServerError('');
    try { await signIn('/auth/login', values); navigate('/dashboard', { replace: true }); }
    catch (error) { setServerError(error.message); }
    finally { setSubmitting(false); }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue tracking your glucose readings with Sweety."
      footer={
        <>
          New to Sweety?{' '}
          <Link
            to="/register"
            className="font-semibold text-mint-600 transition-colors hover:text-mint-700"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
          placeholder="Enter your password"
          autoComplete="current-password"
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

        {serverError ? <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p> : null}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
