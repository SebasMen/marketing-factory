/**
 * Checks if the current environment is local.
 * @returns True if the current environment is local, otherwise false.
 */
export const isLocalEnv = () => process.env.NODE_ENV === 'local';

/**
 * Checks if the current environment is QA.
 * @returns True if the current environment is QA, otherwise false.
 */
export const isQAEnv = () => process.env.NODE_ENV === 'qa';

/**
 * Checks if the current environment is PROD.
 * @returns True if the current environment is PROD, otherwise false.
 */
export const isProdEnv = () => process.env.NODE_ENV === 'production';

/**
 * Checks if the current environment is Test.
 * @returns True if the current environment is Test, otherwise false.
 */
export const isTestEnv = () => process.env.NODE_ENV === 'test';

/**
 * Gets the current environment as a string.
 * @returns The current environment as a string.
 */
export const getCurrentEnv = () => {
  if (isProdEnv()) return 'prod';
  if (isQAEnv()) return 'qa';
  if (isLocalEnv()) return 'local';
  if (isTestEnv()) return 'test';
  throw new Error('Unknown environment');
};
