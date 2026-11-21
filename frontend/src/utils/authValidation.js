const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  const value = email.trim();

  if (!value) {
    return 'Please enter your email address.';
  }

  if (!EMAIL_PATTERN.test(value)) {
    return 'Please enter a valid email address.';
  }

  return '';
}

export function validatePassword(password, { minLength = 8 } = {}) {
  if (!password) {
    return 'Please enter your password.';
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }

  return '';
}

export function validateName(name) {
  const value = name.trim();

  if (!value) {
    return 'Please enter your name.';
  }

  if (value.length < 2) {
    return 'Name must be at least 2 characters.';
  }

  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  return '';
}

export function validateLoginForm({ email, password }) {
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  return {
    errors,
    isValid: !errors.email && !errors.password,
  };
}

export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };

  return {
    errors,
    isValid:
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword,
  };
}
