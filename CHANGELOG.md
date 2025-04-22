# Changelog

All notable changes to the "simc-ast-builder" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2025-04-22

### Changed

- Refactored fieldMaps.ts for significantly improved maintainability
- Removed ACCESS_MAP complexity in favor of a simpler approach
- Improved helper functions for field and parameter definitions

## [0.2.0] - 2025-04-22

### Added

- Introduced NodeTypes namespace for better code organization and type safety
- Added comprehensive test cases for AST parsing and optimization
- Added specific test suites for error handling and parser integration
- Added ESLint and Prettier configurations for code quality

### Changed

- Enhanced README.md with more detailed documentation and examples
- Improved TypeScript files with detailed comments and better error handling
- Refactored common types for better maintainability

## [0.1.0] - 2025-04-21

### Added

- Initial release as a standalone package
- ANTLR4 grammar for SimulationCraft expressions
- Parser implementation with visitor pattern
- AST generation for SimC expressions
- Type definitions for all AST nodes
- Condition optimizer with configurable optimization rules
- Support for all basic SimC expression types
- Support for SimC API functions
- Jest test suite for parser and optimizer
- Documentation in README.md
