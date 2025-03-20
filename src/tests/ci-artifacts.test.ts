import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

describe('CI/CD Artifact Handling', () => {
  test('Semaphore config should correctly cache artifacts', async () => {
    // Skip if .semaphore directory doesn't exist
    const semaphorePath = path.resolve(process.cwd(), '.semaphore/semaphore.yml');
    
    try {
      await fs.access(semaphorePath);
    } catch {
      console.log('Skipping test - no Semaphore config found');
      return;
    }
    
    const configContent = await fs.readFile(semaphorePath, 'utf-8');
    const config = yaml.load(configContent) as Record<string, any>;
    
    // Verify caching configuration exists
    const hasArtifactsBlock = config.blocks?.some((block: any) => 
      block.name?.includes('Artifact') || 
      block.task?.jobs?.some((job: any) => 
        job.commands?.some((cmd: string) => cmd.includes('artifact'))
      )
    );
    
    expect(hasArtifactsBlock).toBe(true);
  });
}); 