# Changelog

All notable changes to the "simc-ast-builder" package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.3] - 2025-05-01

### Fixed

- Fixed set_bonus handler

## [0.3.2] - 2025-05-01

### Added

- Export more utility functions to the consumer

## [0.3.1] - 2025-04-30

### Fixed

- Fixed expression context for logical operators (AND, OR, XOR) which incorrectly was set to numeric

## [0.3.0] - 2025-04-30

### Added

- Added support for `cycle_enemies` expression handler for targeting multiple enemies in rotation

## [0.2.9] - 2025-04-30

### Added

- Added support for several new expression handlers:
  - `fight_remains`: SimC API handler for remaining fight duration
  - `time`: SimC API handler for current simulation time
  - `lightning_rod`: Shaman-specific handler for lightning rod stacks
  - `remaining_winters_chill`: Mage-specific handler for Winter's Chill debuff stacks
  - `group_members`: Hekili API handler for number of players in group

## [0.2.8] - 2025-04-29

### Added

- Enhanced identifier handling by integrating access handler checks.

### Changed

- Disabled `negatedFieldOptimization` by default until it is stable.

## [0.2.7] - 2025-04-28

### Added

- Negated field optimization: `ConditionOptimizer` can now replace `!buff.up` with `buff.down` (or any field with a `negatedName`), controlled by a new `negatedFieldOptimization` option.
- New tests for negated field support and full AST transformation.

### Changed

- Refactored field definition helpers to use partial object construction and always include `negatedName`.
- Negated field logic is now isolated in its own optimizer function and is fully configurable.

## [0.2.6] - 2025-04-28

### Changed

- Add cost optimization to call cheap API first

## [0.2.5] - 2025-04-28

### Changed

- Add split() function to split logical conditions by AND

## [0.2.4] - 2025-04-28

### Changed

- Fix wrong expression type in prev_gcd

## [0.2.3] - 2025-04-28

### Changed

- Improved prev_gcd parsing

## [0.2.2] - 2025-04-28

### Changed

- Improved TypeScript typings throughout the codebase

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
