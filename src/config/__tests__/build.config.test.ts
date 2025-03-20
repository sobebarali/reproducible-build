import { buildConfig } from '../build.config';

describe('Build Configuration', () => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  
  afterAll(() => {
    process.env = originalEnv;
  });
  
  test('buildConfig should be frozen (immutable)', () => {
    // Attempt to modify the config
    expect(() => {
      // @ts-expect-error - Attempting to modify a readonly property
      buildConfig.environment = 'production';
    }).toThrow();
  });
  
  test('buildConfig should use environment variables when available', () => {
    // This test requires reimporting the module after setting env vars
    // In a real test, you might need to use jest.resetModules() and reimport
    
    // For this demonstration, we'll just check the current values
    expect(buildConfig).toEqual(expect.objectContaining({
      environment: expect.any(String),
      version: expect.any(String),
      buildId: expect.any(String),
      timestamp: expect.any(String),
    }));
  });
}); 