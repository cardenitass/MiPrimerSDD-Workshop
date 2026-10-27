# Curso-PSWE-07 implementation plan

## Specification
Implement requirements/spec-inicial.md FR-001–FR-012 with the user's visual requirements: app/window title Curso-PSWE-07; All/Pending/Done filters; responsive light UI, one accent, sans-serif text, 44px targets; reusable Add/Edit form with Save/Cancel and required-title validation; detail Back/Edit/toggle/Delete actions, confirmation before deletion, and “No description” fallback. No accounts, categories, dates, priorities, search, or sync.

## Constitution Check
- Simplicity: buildless HTML/CSS/JavaScript, no third-party dependencies or extra features.
- Design: small functions and modules; no speculative abstractions or optimizations.
- Architecture: UI -> task service -> storage adapter with load/save interface.
- TDD: run failing unit and story acceptance tests before production implementation, then pass and refactor. Tests use independent in-memory storage.
- Traceability: list/add/open (FR-001–005, 007), filter/status (FR-006, 009), edit/delete (FR-008, 010), persistence/errors (FR-011–012).
- Quality: run all tests and JavaScript syntax lint before completion; browser verification when available.

## Decisions
Browser localStorage retains tasks on the same browser and origin. A minimal Node static server provides a stable local origin without dependencies. Persistence failures must leave the previous task state intact and display an error. This interface is required for replaceable storage and independent tests, not added complexity.
