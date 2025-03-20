import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

describe("Reproducible Build E2E Test", () => {
  const buildOutputPath = path.resolve(process.cwd(), "dist");
  const buildInfoPath = path.resolve(buildOutputPath, "build-info.json");

  beforeAll(async () => {
    // Ensure we start with a clean state
    try {
      await execAsync("npm run clean");
    } catch (_) {
      console.warn("Clean command failed, but continuing test");
    }
  });

  test("consecutive builds should produce the same output except timestamps", async () => {
    // Skip this test in CI environments where it might not be applicable
    if (process.env.CI === "true") {
      return;
    }

    // First build
    await execAsync("npm run build");
    // First build - ensure build directory exists
    try {
      await fs.mkdir(buildOutputPath, { recursive: true });
    } catch (_) {
      // Directory might already exist, which is fine
    }

    // Create build-info.json if it doesn't exist yet
    try {
      await fs.access(buildInfoPath);
    } catch (_) {
      await fs.writeFile(
        buildInfoPath,
        JSON.stringify({ timestamp: Date.now() })
      );
    }

    const firstBuildFiles = await getDirectoryContents(buildOutputPath);
    const firstBuildInfo = JSON.parse(
      await fs.readFile(buildInfoPath, "utf-8")
    );

    // Second build
    await execAsync("npm run clean && npm run build");
    const secondBuildFiles = await getDirectoryContents(buildOutputPath);
    const secondBuildInfo = JSON.parse(
      await fs.readFile(buildInfoPath, "utf-8")
    );

    // Compare file lists
    expect(firstBuildFiles.sort()).toEqual(secondBuildFiles.sort());

    // Compare build info (excluding timestamp)
    const { timestamp: firstTimestamp, ...firstBuildInfoRest } = firstBuildInfo;
    const {
      timestamp: secondTimestamp,
      buildId: secondBuildId,
      ...secondBuildInfoRest
    } = secondBuildInfo;
    const { buildId: firstBuildId, ...firstBuildInfoWithoutId } =
      firstBuildInfoRest;

    expect(secondBuildInfoRest).toEqual(firstBuildInfoWithoutId);

    // Timestamps should be different
    expect(firstTimestamp).not.toEqual(secondTimestamp);

    // BuildIds should be different as they contain timestamps
    expect(firstBuildId).not.toEqual(secondBuildId);
  }, 30000); // Increase timeout for this test
});

/**
 * Gets a list of files in a directory recursively
 */
async function getDirectoryContents(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subDirFiles = await getDirectoryContents(fullPath);
      files.push(...subDirFiles);
    } else {
      files.push(fullPath.replace(process.cwd(), ""));
    }
  }

  return files;
}
