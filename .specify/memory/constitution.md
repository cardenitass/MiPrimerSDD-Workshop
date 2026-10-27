# Curso-PSWE-07 Constitution

## Core Principles

### I. Simplicity First (YAGNI)
Implementation MUST include only what the spec requires and MUST use the simplest working solution. Features, abstractions, configuration options, and dependencies MUST NOT be added "just in case"; added complexity MUST have a written justification in the plan.
Rationale: Keeping scope and complexity minimal makes delivery and maintenance easier.

### II. Simple, Clear Design
Code MUST use small, single-responsibility functions and modules with intention-revealing names. Abstractions MUST address real duplication and MUST NOT be introduced for a single use; optimization MUST NOT precede demonstrated need.
Rationale: Clear, focused code is easier to understand, test, and change.

### III. Structured Architecture
Code MUST separate UI (screens and components), application logic (task operations), and persistence (storage), with dependencies flowing UI -> logic -> persistence. UI MUST NOT access storage directly; persistence MUST be hidden behind a small interface that can be replaced or faked in tests.
Rationale: Layer boundaries isolate changes and make business logic independently testable.

### IV. Test-Driven Development (NON-NEGOTIABLE)
Development MUST follow Red-Green-Refactor: write and observe a failing test, pass it with minimum production code, then refactor. Production code MUST NOT exist without a test that required it. Business logic MUST have unit tests; each user story MUST have at least one acceptance test mirroring its acceptance scenarios. Tests MUST be fast and independent.
Rationale: Test-first development provides evidence that required behavior works and stays correct.

### V. Spec Is the Source of Truth
Every implementation task MUST trace to a requirement in the spec. Work outside the spec MUST NOT be implemented; ambiguous requirements MUST be clarified before implementation.
Rationale: Traceability keeps implementation aligned with agreed requirements.

### VI. Dependencies and Quality
Implementations MUST prefer standard-library and platform features. A third-party dependency MUST be added only when its written justification shows that it removes more complexity than it adds. Code MUST pass linting and all tests before being considered done.
Rationale: Deliberate dependencies and passing quality checks keep the project maintainable.

## Governance

This constitution MUST override other project practices. Amendments MUST include a written rationale and a version bump. Every plan MUST include a "Constitution Check" verifying compliance with all six principles before implementation begins.

**Version**: 1.0.0 | **Ratified**: 2026-10-26 | **Last Amended**: 2026-10-26
