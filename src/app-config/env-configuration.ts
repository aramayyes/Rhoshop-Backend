export const envConfiguration = () => ({
  JWT_KEY:
    process.env.JWT_KEY ||
    'Default key if process.env.JWT_KEY is not provided.',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '100y',
});
