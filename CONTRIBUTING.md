# Contributing to Astrowellness

Thank you for your interest in contributing to the Astrowellness astrology platform! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Commit Message Conventions](#commit-message-conventions)
5. [Pull Request Process](#pull-request-process)
6. [Coding Standards](#coding-standards)
7. [Testing Requirements](#testing-requirements)
8. [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- Be respectful and considerate
- Welcome new contributors
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior:

- Use of sexualized language or imagery
- Trolling, insulting or derogatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Read the [Onboarding Guide](docs/ONBOARDING.md)
- Set up your development environment
- Familiarized yourself with the codebase
- Reviewed the [Coding Standards](docs/CODING_STANDARDS.md)

### Finding Issues to Work On

1. Check the [Issues](../../issues) page for open issues
2. Look for issues labeled `good first issue` for beginners
3. Comment on the issue you want to work on
4. Wait for assignment before starting work

### Reporting Bugs

When reporting bugs, please include:

- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node.js version)

### Suggesting Features

When suggesting features, please include:

- Clear description of the feature
- Use case or problem it solves
- Proposed implementation approach
- Alternatives considered

## Development Workflow

### Branch Naming

Use the following branch naming conventions:

```
feature/<feature-name>       # New features
bugfix/<bug-description>      # Bug fixes
hotfix/<hotfix-description>    # Critical production fixes
refactor/<refactor-name>      # Code refactoring
docs/<documentation-update>     # Documentation updates
test/<test-update>            # Test updates
```

### Creating a Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-new-feature
```

### Making Changes

1. Write code following [Coding Standards](docs/CODING_STANDARDS.md)
2. Add tests for your changes
3. Update documentation as needed
4. Run tests and linting:

```bash
pnpm test
pnpm lint
pnpm type-check
```

### Committing Changes

See [Commit Message Conventions](#commit-message-conventions) for guidelines.

## Commit Message Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```
feat(auth): add OAuth2 login support

Implement OAuth2 login with Google and GitHub providers.
Users can now authenticate using their existing accounts.

Closes #123
```

```
fix(api): resolve null reference error in user endpoint

The user endpoint was throwing a null reference error
when the user ID was not found in the database.

Fixes #456
```

```
docs(readme): update installation instructions

Clarified the prerequisites and added troubleshooting
section for common installation issues.
```

### Breaking Changes

If your commit introduces a breaking change, add `BREAKING CHANGE:` to the footer:

```
feat(api): remove deprecated user endpoint

The /api/users/legacy endpoint has been removed.
Use /api/users instead.

BREAKING CHANGE: The legacy user endpoint is no longer supported.
```

## Pull Request Process

### Before Submitting

1. Ensure your code passes all tests:
   ```bash
   pnpm test
   ```

2. Ensure code is properly formatted:
   ```bash
   pnpm format
   pnpm lint
   ```

3. Update documentation if needed
4. Add tests for new features
5. Update CHANGELOG.md if applicable

### Creating a Pull Request

1. Push your branch:
   ```bash
   git push origin feature/my-new-feature
   ```

2. Create a pull request on GitHub

3. Fill in the PR template:
   - Description of changes
   - Related issue number
   - Testing performed
   - Screenshots for UI changes
   - Breaking changes (if any)

### Pull Request Title

Use the same format as commit messages:

```
feat(auth): add OAuth2 login support
fix(api): resolve null reference error
docs(readme): update installation instructions
```

### Pull Request Review Process

1. Automated checks (CI/CD) must pass
2. Code review by maintainers
3. Address review feedback
4. Approval from at least one maintainer
5. Merge into main branch

### Review Guidelines

When reviewing pull requests:

- Be constructive and respectful
- Focus on code quality and correctness
- Suggest improvements, don't just point out problems
- Ask questions if something is unclear
- Approve only when you're confident in the changes

## Coding Standards

### General Guidelines

- Follow the [Coding Standards](docs/CODING_STANDARDS.md)
- Use TypeScript for all new code
- Write self-documenting code with clear variable/function names
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Avoid code duplication

### Code Style

- Use Prettier for formatting (automatic on save)
- Follow ESLint rules (automatic on save)
- Use meaningful variable and function names
- Prefer const over let
- Use arrow functions for callbacks
- Use template literals for string concatenation

### TypeScript Best Practices

- Avoid `any` type
- Use proper type definitions
- Use type guards for runtime type checking
- Prefer interfaces over types for object shapes
- Use enums for fixed sets of values

### React Best Practices

- Use functional components with hooks
- Avoid class components
- Use proper dependency arrays in useEffect
- Use useMemo/useCallback for expensive operations
- Avoid prop drilling, use context instead

### API Best Practices

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Validate input data
- Handle errors gracefully
- Add proper error messages

## Testing Requirements

### Test Coverage

- Aim for >80% code coverage
- All new features must have tests
- Bug fixes must include regression tests
- Critical paths must have integration tests

### Test Types

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API routes and database interactions
3. **E2E Tests**: Test complete user flows

### Writing Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/features/MyComponent';

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup before each test
  });

  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing functionality
- Fixing bugs that affect usage
- Updating API endpoints
- Changing configuration options

### Documentation Types

1. **Code Documentation**: JSDoc comments in source code
2. **API Documentation**: API endpoint documentation
3. **User Documentation**: End-user guides
4. **Developer Documentation**: Development guides

### Writing Documentation

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Update related documentation
- Remove outdated information

## Project Structure

Follow the established project structure:

```
app/                    # Next.js App Router pages
components/              # React components
  ├── features/          # Feature-specific components
  ├── layout/            # Layout components
  ├── providers/         # Context providers
  └── ui/               # Reusable UI components
hooks/                   # Custom React hooks
lib/                     # Utility libraries
  ├── constants/         # Application constants
  ├── errors/            # Error handling utilities
  └── utils/             # Utility functions
services/                 # Business logic layer
types/                    # TypeScript type definitions
tests/                    # Test files
  ├── unit/             # Unit tests
  ├── integration/       # Integration tests
  └── e2e/             # End-to-end tests
```

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible functionality additions
- **PATCH**: Backwards-compatible bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Code coverage meets requirements
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version is updated in package.json
- [ ] Release notes are prepared

### Creating a Release

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Create Git tag
5. Deploy to production

## Getting Help

If you need help:

1. Check existing documentation
2. Search for similar issues
3. Ask questions in GitHub Discussions
4. Contact maintainers directly

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project README

Thank you for contributing to Astrowellness! 🙏

## Additional Resources

- [Onboarding Guide](docs/ONBOARDING.md)
- [Coding Standards](docs/CODING_STANDARDS.md)
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- [Debugging Guide](docs/DEBUGGING.md)
- [Performance Guide](docs/PERFORMANCE.md)
