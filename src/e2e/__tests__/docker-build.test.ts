import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('Docker Build Reproducibility', () => {
  // Skip in CI environments that might not have Docker
  beforeAll(() => {
    if (process.env.CI === 'true') {
      console.log('Skipping Docker tests in CI environment');
      return;
    }
  });
  
  test('consecutive Docker builds should be reproducible', async () => {
    if (process.env.CI === 'true') {
      return;
    }
    
    // Build Docker image twice with the same tag
    const imageName = 'reproducible-test';
    await execAsync(`docker build -t ${imageName}:first .`);
    await execAsync(`docker build -t ${imageName}:second .`);
    
    // Get image metadata
    const firstImageInfo = await execAsync(`docker inspect ${imageName}:first`);
    const secondImageInfo = await execAsync(`docker inspect ${imageName}:second`);
    
    // Parse metadata
    const firstImage = JSON.parse(firstImageInfo.stdout)[0];
    const secondImage = JSON.parse(secondImageInfo.stdout)[0];
    
    // Compare relevant metadata (excluding timestamps and IDs)
    expect(firstImage.Config.Env).toEqual(secondImage.Config.Env);
    expect(firstImage.Config.Cmd).toEqual(secondImage.Config.Cmd);
    expect(firstImage.Config.WorkingDir).toEqual(secondImage.Config.WorkingDir);
    
    // Clean up
    await execAsync(`docker rmi ${imageName}:first ${imageName}:second`);
  }, 60000);
}); 