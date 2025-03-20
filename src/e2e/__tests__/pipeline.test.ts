import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('Complete Pipeline Integration', () => {
  test('full build pipeline produces expected artifacts', async () => {
    // Skip in CI to avoid recursive builds
    if (process.env.CI === 'true') {
      return;
    }
    
    // Clean start
    await execAsync('npm run clean');
    
    // Run build
    await execAsync('npm run build');
    
    // Verify expected artifacts exist
    const distPath = path.resolve(process.cwd(), 'dist');
    const buildInfoPath = path.resolve(distPath, 'build-info.json');
    
    // Check directory exists
    const distExists = await fs.access(distPath)
      .then(() => true)
      .catch(() => false);
    
    expect(distExists).toBe(true);
    
    // Check build info exists
    const buildInfoExists = await fs.access(buildInfoPath)
      .then(() => true)
      .catch(() => false);
    
    expect(buildInfoExists).toBe(true);
    
    // Verify build info content
    const buildInfo = JSON.parse(await fs.readFile(buildInfoPath, 'utf-8'));
    
    expect(buildInfo).toHaveProperty('version');
    expect(buildInfo).toHaveProperty('timestamp');
    expect(buildInfo).toHaveProperty('buildId');
    expect(buildInfo).toHaveProperty('environment');
  }, 30000);
}); 