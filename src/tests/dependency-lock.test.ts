import fs from 'fs/promises';
import path from 'path';

describe('Dependency Locking', () => {
  test('package-lock.json should be present and valid', async () => {
    const lockPath = path.resolve(process.cwd(), 'package-lock.json');
    
    // Check lock file exists
    const lockFileExists = await fs.access(lockPath)
      .then(() => true)
      .catch(() => false);
    
    expect(lockFileExists).toBe(true);
    
    // Check lock file is valid JSON
    const lockFileContent = await fs.readFile(lockPath, 'utf-8');
    let lockData;
    
    expect(() => {
      lockData = JSON.parse(lockFileContent);
    }).not.toThrow();
    
    // Verify some expected properties
    expect(lockData).toHaveProperty('name');
    expect(lockData).toHaveProperty('lockfileVersion');
    expect(lockData).toHaveProperty('packages');
  });
}); 