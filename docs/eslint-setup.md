# ESLint Configuration Guide

This project uses ESLint with the new flat config format to enforce code quality and consistent style in our TypeScript codebase.

## Overview

Our ESLint configuration is designed to:

- Enforce TypeScript best practices
- Promote functional programming patterns
- Ensure type safety
- Maintain consistent code style
- Support modern JavaScript syntax

## Key Rules

The configuration enforces the following principles:

### Code Structure
- Max line length: 100 characters
- Max file size: 300 lines (warning)
- Consistent naming conventions

### TypeScript Strictness
- Explicit return types for functions
- No use of `any` type (except in tests)
- No non-null assertions
- Strict type checking

### Functional Patterns
- No mutation of function parameters
- Preferring destructuring, rest parameters, and spread operators
- Consistent arrow function style

### Modern Syntax
- Use of `const` and `let` (no `var`)
- Template strings over concatenation
- Optional chaining

## Running ESLint

You can lint your code using the following npm scripts:

```bash
# Run ESLint
npm run lint

# Run ESLint and auto-fix issues where possible
npm run lint:fix
```

## Customization

If you need to modify the ESLint configuration:

1. Edit the `eslint.config.mjs` file in the project root
2. Run lint again to verify your changes

## IDE Integration

For a better development experience, install the ESLint extension for your IDE:

- VS Code: [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- WebStorm: Built-in support (enable in settings)

This will provide real-time feedback as you code. 