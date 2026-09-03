import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../context/AuthProvider';
import { AuthField } from './AuthField';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODE_COPY = {
  login: {
    heading: 'Welcome back',
    subtext: 'Log in to keep your streak going.',
    submitLabel: 'Log in',
    submitLoadingLabel: 'Logging in...',
    switchPrompt: "New here?",
    switchLinkLabel: 'Create an account',
    switchTo: '/signup',
  },
  signup: {
    heading: 'Create your account',
    subtext: 'Start your consistency journey today.',
    submitLabel: 'Create account',
    submitLoadingLabel: 'Creating account...',
    switchPrompt: 'Already have an account?',
    switchLinkLabel: 'Log in',
    switchTo: '/login',
  },
};

export const AuthForm = ({ mode }) => {
  const copy = MODE_COPY[mode];
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const { login, register } = useAuthContext();
  const submittingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (isSignup && !formData.name.trim()) {
      nextErrors.name = 'Enter your full name.';
    }
    if (!EMAIL_PATTERN.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setLoading(true);

    try {
      if (isSignup) {
        await register(formData);
      } else {
        await login({ email: formData.email, password: formData.password });
      }
      toast.success(`Welcome${formData.name ? `, ${formData.name}` : ''}!`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Authentication failed. Please try again.';
      toast.error(message);
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-sm"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-text-heading">{copy.heading}</h1>
      <p className="mt-2 text-sm text-text-muted">{copy.subtext}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        {isSignup && (
          <AuthField
            label="Full name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={formData.name}
            onChange={updateField('name')}
            error={errors.name}
          />
        )}

        <AuthField
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={updateField('email')}
          error={errors.email}
        />

        <AuthField
          label="Password"
          type="password"
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={updateField('password')}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-interactive-primary p-3 font-semibold text-white transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-ring outline-none"
        >
          {loading && <Spinner />}
          {loading ? copy.submitLoadingLabel : copy.submitLabel}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        {copy.switchPrompt}{' '}
        <Link to={copy.switchTo} className="font-medium text-interactive-primary hover:underline focus-ring rounded-sm outline-none">
          {copy.switchLinkLabel}
        </Link>
      </p>
    </motion.div>
  );
};

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);
