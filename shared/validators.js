/**
 * Simple, environment-agnostic validation functions shared between client and server.
 */

const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateName = (name) => {
  return name && name.trim().length >= 2;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName
};
