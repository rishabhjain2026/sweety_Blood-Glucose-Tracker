import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

function LoginStub() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-hero-glow px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/80 bg-white/90 p-8 text-center shadow-soft backdrop-blur-sm">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mint-100 text-mint-600">
          <Droplets className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-navy">Sign In</h1>
        <p className="mt-3 text-navy-muted">
          Authentication screens arrive in Milestone 2. For now, explore the
          Sweety landing experience.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button to="/" variant="primary" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
          <Link
            to="/register"
            className="text-sm font-medium text-mint-600 hover:text-mint-700"
          >
            Looking to create an account instead?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginStub;
