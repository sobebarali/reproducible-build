/**
 * Build configuration utility
 * Centralizes build configuration and ensures consistency across environments
 */

interface BuildConfig {
  readonly environment: string;
  readonly version: string;
  readonly buildId: string;
  readonly timestamp: string;
}

/**
 * Creates an immutable build configuration object
 */
const createBuildConfig = (): BuildConfig => {
  const config = {
    environment: process.env.NODE_ENV ?? 'development',
    version: process.env.npm_package_version ?? '0.0.0',
    buildId: process.env.BUILD_ID ?? `local-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  
  return Object.freeze(config);
};

export const buildConfig = createBuildConfig(); 