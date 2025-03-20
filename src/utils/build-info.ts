import { buildConfig } from '../config/build.config';
import fs from 'fs/promises';
import path from 'path';

interface BuildInfo extends Record<string, unknown> {
  buildId: string;
  version: string;
  timestamp: string;
  environment: string;
  nodeVersion: string;
  dependencies: Record<string, string>;
}

/**
 * Generates build information to embed in the final artifact
 * This helps with tracking exactly how a build was created
 */
export const generateBuildInfo = async (): Promise<BuildInfo> => {
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    
    // Check if file exists before trying to read it
    try {
      await fs.access(packageJsonPath);
    } catch (error) {
      // Create fallback data if package.json doesn't exist
      console.error(`Error accessing package.json: ${error}`);
      return {
        buildId: buildConfig.buildId,
        version: buildConfig.version,
        timestamp: buildConfig.timestamp,
        environment: buildConfig.environment,
        nodeVersion: process.version,
        dependencies: {}
      };
    }
    
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
    const { dependencies = {} } = JSON.parse(packageJsonContent);
    
    const buildInfo: BuildInfo = {
      buildId: buildConfig.buildId,
      version: buildConfig.version,
      timestamp: buildConfig.timestamp,
      environment: buildConfig.environment,
      nodeVersion: process.version,
      dependencies: { ...dependencies },
    };
    
    return buildInfo;
  } catch (error) {
    const typedError = error as Error;
    console.error(`Error generating build info: ${typedError.message}`);
    throw new Error(`Failed to generate build info: ${typedError.message}`);
  }
};

/**
 * Writes build info to a JSON file in the output directory
 */
export const writeBuildInfo = async (outputDir: string): Promise<void> => {
  try {
    const buildInfo = await generateBuildInfo();
    const outputPath = path.resolve(process.cwd(), outputDir, 'build-info.json');
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(buildInfo, null, 2), 'utf-8');
    
    console.log(`Build info written to ${outputPath}`);
  } catch (error) {
    const typedError = error as Error;
    console.error(`Failed to write build info: ${typedError.message}`);
    throw new Error(`Failed to write build info: ${typedError.message}`);
  }
}; 