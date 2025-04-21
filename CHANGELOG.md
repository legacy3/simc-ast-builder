# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-04-21

### Added
- Initial release of simc-ast-builder as a standalone package
- ANTLR4 grammar for parsing SimulationCraft expressions
- Parser implementation for converting SimC code to AST
- AST generation with visitor pattern
- Condition optimizer with configurable optimization options
- TypeScript type definitions
- Basic test suite
- Example usage in examples/basic-usage.ts

### Changed
- Extracted from VSCode extension project
- Restructured to be usable as an npm package

### Fixed
- Import paths adjusted after project restructuring
