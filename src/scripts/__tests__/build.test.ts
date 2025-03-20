import { writeBuildInfo } from '../../utils/build-info';
import { runBuild } from '../build';

// Mock dependencies
jest.mock('../../utils/build-info', () => ({
  writeBuildInfo: jest.fn(),
}));

jest.mock('fs/promises');

describe('Build Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('build script should call writeBuildInfo with correct path', async () => {
    // Arrange
    (writeBuildInfo as jest.Mock).mockResolvedValue(undefined);
    
    // Act
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalProcessExit = process.exit;
    
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn() as never;
    
    try {
      // Call the function directly instead of importing the module
      await runBuild();
      
      // Assert
      expect(writeBuildInfo).toHaveBeenCalledWith('./dist');
    } finally {
      // Restore original functions
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      process.exit = originalProcessExit;
    }
  });
  
  test('build script should handle errors', async () => {
    // Arrange
    const testError = new Error('Test error');
    (writeBuildInfo as jest.Mock).mockRejectedValue(testError);
    
    // Act
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalProcessExit = process.exit;
    
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn() as never;
    
    try {
      // Call the function directly instead of importing the module
      await runBuild();
      
      // Assert
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Test error'));
      expect(process.exit).toHaveBeenCalledWith(1);
    } finally {
      // Restore original functions
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      process.exit = originalProcessExit;
    }
  });
}); 