# Research: Curso-PSWE-07

Research method: inspect the current specification, constitution, package.json, src modules, and service tests. A separate read-only review confirmed the gaps below. These are project design decisions based on local evidence; no external service or package research is required. All technical choices are resolved.

## Buildless application

**Decision**: Retain HTML/CSS and JavaScript ES modules, served by the Node standard library.
**Rationale**: Existing code implements the requested two screens without third-party dependencies. No requirement needs server-side task processing.
**Alternatives considered**: A frontend framework adds installation and build complexity; a backend adds deployment and data-management concerns. Neither solves a current requirement.

## Persistence

**Decision**: Retain localStorage behind load/save with a complete JSON task array and save-before-publish semantics.
**Rationale**: Meets persistence in one browser environment and supports independent storage fakes. logic.js saves before assigning the next state. Existing tests prove basic reload behavior but not actual browser closure/reopening.
**Alternatives considered**: IndexedDB is unnecessary for this simple record set; remote storage implies unnecessary service operations and sync concerns. In-memory-only storage fails FR-011.
**Required gap closure**: Validate parsed stored records and surface failures without replacing saved data. Test failed edit/toggle/delete as well as add. This implements the specified load/save error behavior without adding recovery features.

## Layer composition

**Decision**: Add a small main.js composition entry point that constructs storage and task service, then initializes UI with that service.
**Rationale**: ui.js currently imports persistence and accesses window.localStorage during startup. Moving composition enforces Principle III while retaining the existing service interface.
**Alternatives considered**: Leaving startup in UI blurs the required boundary; introducing a dependency-injection framework is excessive. No extra domain abstraction is needed.

## Validation

**Decision**: Keep Node's built-in runner and syntax checker, add focused missing unit/acceptance coverage first, and perform the browser/visual/usability guide separately.
**Rationale**: Existing six tests cover task-service stories but do not exercise screen navigation, form cancellation, deletion confirmation, labels, contrast, or responsive layouts. Duplicate-title isolation and status-preserving edits need explicit cases. Tests must remain fast, independent, and necessary for required behavior.
**Alternatives considered**: Relying solely on service tests cannot establish UI acceptance. Adding a browser dependency before demonstrating its necessity conflicts with YAGNI; use available browser tooling and the manual guide initially.
**Verification limit**: Do not claim automated service tests establish actual retention after browser restart or user-completion percentages. Record results against each success criterion.

## Scope and delivery

**Decision**: Local-only delivery in this repository; preserve the single-user, no-sync scope and existing storage key.
**Rationale**: This is an IDE repository workflow, with no requested publishing target. Feature numbering selected 002 because specs/001-todo already existed; the active spec is specs/002-todo-list/spec.md.
**Alternatives considered**: Hosting, accounts, and data migration are outside the specification. No speculative storage versioning or concurrency mechanism is introduced.
