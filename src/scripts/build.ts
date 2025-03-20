import { writeBuildInfo } from '../utils/build-info';

/**
 * Main build script to be executed as part of the build process
 */
export const runBuild = async (): Promise<void> => {
  try {
    console.log('Starting build process...');
    
    // Output directory where compiled files will be placed
    const outputDir = './dist';
    
    // Generate and write build information
    await writeBuildInfo(outputDir);
    
    console.log('Build completed successfully');
  } catch (error) {
    const typedError = error as Error;
    console.error(`Build failed: ${typedError.message}`);
    process.exit(1);
  }
};

// Only execute the build when this file is run directly
// This allows tests to import the function without executing it
if (require.main === module) {
  runBuild();
} 
