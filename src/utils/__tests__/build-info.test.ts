import { generateBuildInfo } from '../build-info';
import fs from 'fs/promises';

// Mock fs module
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  mkdir: jest.fn(),
  writeFile: jest.fn(),
  access: jest.fn()
}));

// Mock package.json content
const mockPackageJson = {
  name: 'your-project',
  version: '1.0.0',
  dependencies: {
    'express': '^4.18.2',
    'typescript': '^5.0.4'
  },
  devDependencies: {
    'jest': '^29.5.0'
  }
};

describe('Build Info Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful file access by default
    (fs.access as jest.Mock).mockResolvedValue(undefined);
    // Mock readFile to return our mock package.json
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));
  });

  test('generateBuildInfo should create a valid build info object', async () => {
    // Arrange
    process.env.NODE_ENV = 'test';
    process.env.BUILD_ID = 'test-build-123';
    
    // Act
    const buildInfo = await generateBuildInfo();
    // Assert
    expect(buildInfo).toEqual(expect.objectContaining({
      buildId: expect.any(String),
      version: expect.any(String),
      timestamp: expect.any(String),
      environment: 'test',
      dependencies: expect.objectContaining({
        express: '^4.18.2',
        typescript: '^5.0.4'
      }),
      nodeVersion: expect.any(String),
    }));
    
    expect(fs.readFile).toHaveBeenCalledWith(
      expect.stringContaining('package.json'),
      'utf-8'
    );
  });

  test('should handle missing package.json', async () => {
    // Arrange - mock access to throw an error
    (fs.access as jest.Mock).mockRejectedValue(new Error('ENOENT: no such file or directory'));
    
    // Act
    const buildInfo = await generateBuildInfo();
    
    // Assert
    expect(buildInfo).toEqual({
      buildId: expect.any(String),
      version: expect.any(String),
      timestamp: expect.any(String),
      environment: expect.any(String),
      nodeVersion: expect.any(String),
      dependencies: {} // Empty dependencies
    });
  });
}); 