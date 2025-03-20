# Continuous Integration with Reproducible Builds

A modern TypeScript-based continuous integration configuration that enables reproducible builds, dependency tracking, and efficient CI/CD workflows.

## Overview

This project demonstrates best practices for setting up continuous integration pipelines with a focus on reproducible builds. It provides a reliable foundation for ensuring that your build artifacts are consistent, traceable, and secure.

## Features

- **Reproducible Builds**: Ensures that builds are deterministic and can be recreated exactly
- **Build Artifact Tracking**: Records metadata about each build for auditing and traceability
- **CI/CD Pipeline Integration**: Pre-configured with Semaphore CI
- **Docker Support**: Containerization ready with multi-stage build process
- **Dependency Locking**: Strict dependency management to prevent "works on my machine" issues
- **Comprehensive Testing**: Unit, integration, and end-to-end tests

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 7 or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sobebarali/reproducible-build.git
   cd reproducible-build
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

### Running the Build

To build the project:

```bash
npm run build
```

This will:

1. Clean the output directory
2. Compile TypeScript files
3. Generate build metadata in `dist/build-info.json`

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npx jest src/tests
npx jest src/e2e
```

## Project Structure

```
├── .semaphore/             # Semaphore CI configuration
├── dist/                   # Compiled output
├── src/
│   ├── config/             # Configuration settings
│   ├── e2e/                # End-to-end tests
│   ├── scripts/            # Build and utility scripts
│   ├── tests/              # Unit and integration tests
│   └── utils/              # Utility functions
├── Dockerfile              # Multi-stage Docker build
├── jest.config.js          # Jest test runner configuration
├── package.json            # Package dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Continuous Integration

This project uses Semaphore CI for continuous integration with the following pipeline:

1. **Setup**: Install dependencies
2. **Lint**: Check code quality
3. **Test**: Run automated tests
4. **Build**: Create build artifacts
5. **Cache Artifacts**: Store build outputs for later stages

You can see the complete pipeline configuration in `.semaphore/semaphore.yml`.

## Why Reproducible Builds?

Reproducible builds ensure that a given set of source files always generates bit-for-bit identical output, regardless of when or where the build occurs. This provides several benefits:

- **Security**: Helps detect tampering or supply chain attacks
- **Debugging**: Makes it easier to reproduce and fix issues
- **Compliance**: Supports audit requirements for regulated industries
- **Confidence**: Reduces "works on my machine" problems

## Alternatives and Complementary Solutions

While this project provides a solid foundation for continuous integration, you might also consider:

### Alternatives

- **Jenkins**: More feature-rich but requires more setup and maintenance
- **GitHub Actions**: Tighter GitHub integration but may be less flexible
- **CircleCI**: Good Docker support with easy parallelization
- **Travis CI**: Simple configuration for open-source projects

### Complementary Tools

- **Buildkite**: For more complex pipeline orchestration
- **Snyk**: For security scanning of dependencies
- **Renovate/Dependabot**: For automated dependency updates
- **Nexus/Artifactory**: For artifact management

## Best Practices

This project follows these best practices:

1. **Use exact versions** in package.json to ensure consistency
2. **Commit lockfiles** to version control
3. **Use multi-stage Docker builds** to keep images small
4. **Set up CI to fail fast** on linting/testing issues
5. **Centralize configuration** in dedicated files
6. **Generate build metadata** for traceability
7. **Test the build process itself** to ensure it remains reliable

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
