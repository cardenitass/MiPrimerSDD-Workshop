# Tasks: Curso-PSWE-07 To-Do List

**Input**: Design artifacts in `specs/002-todo-list/`.
**Prerequisites**: spec.md, plan.md, research.md, data-model.md, contracts/ui-and-storage.md, quickstart.md.
**Tests**: Mandatory under Constitution IV. Existing code is a baseline, not proof of complete acceptance. For each changed behavior, write and observe a failing test before minimum production changes, then refactor. Already passing behavior needs verification, not artificial breakage. Keep tests independent with fresh fake storage or a disposable browser profile.
**Format**: `- [ ] Tnnn [P?] [USn?] Description with paths`. [P] identifies independent files within a phase once prerequisites are met. Paths are relative to repository root.

## Phase 1: Setup

**Purpose**: Confirm the existing buildless app and establish an honest validation baseline.

- [X] T001 Review FR-001–019 and the Constitution Check in specs/002-todo-list/plan.md against package.json and existing src/ modules; record current gaps in specs/002-todo-list/quickstart.md without marking unverified behavior passed.
- [X] T002 Run npm.cmd test and npm.cmd run lint from package.json; record baseline results and browser-tool availability in specs/002-todo-list/quickstart.md (FR-001–019 quality gate).

## Phase 2: Foundational boundaries

**Purpose**: Enforce UI -> logic -> persistence before story changes.

- [X] T003 Add a failing architecture/boot test in tests/architecture.test.js verifying UI initialization accepts an injected task service, imports no persistence and accesses no localStorage; check the module entry and required asset route (FR-001, FR-011; Constitution III).
- [X] T004 After T003 fails, move composition to src/main.js, expose injected initialization in src/ui.js, switch index.html entry, and serve /src/main.js in server.js; preserve startup/load-error behavior and remove unused selected state only while tests stay green (FR-001, FR-011–012).
- [X] T005 Extend the syntax-check script in package.json to include src/main.js and tests/architecture.test.js, then run all checks and record layer-boundary results in specs/002-todo-list/quickstart.md (FR-001, FR-011; Constitution VI).

**Checkpoint**: UI contains no storage access; app still boots. Story tasks start only after T003–T005 pass.

## Phase 3: User Story 1 - Organize and open tasks (P1, MVP)

**Goal**: Add, list, open, validate, and cancel task input.
**Independent test**: Starting empty, create tasks with/without descriptions, open each, return, reject blank titles, and cancel creation without saving.

### Tests first

- [X] T006 [P] [US1] Extend tests/tasks.test.js for task constraints: title is “Required; nonblank after trimming. Duplicate titles allowed.”; description is “Optional user input; normalized to an empty string when absent.”; id is “Generated once; unique stable identity, independent of title.”; done is “false = Pending; true = Done; initially false.” Verify returned copies cannot mutate saved state (FR-003–005).
- [ ] T007 [P] [US1] Add runnable browser acceptance steps and expected assertions for every US1 scenario in specs/002-todo-list/quickstart.md: header/window name, initial empty state, Add/Save, optional description, No description, title error, Cancel and Back. Execute against the baseline and record failures before corresponding UI changes (FR-001–005, FR-007, FR-012–014, FR-016).

### Implementation and acceptance

- [X] T008 [US1] Correct only failures exposed by T006 in src/logic.js: task identity, normalization, Pending default, required-title checks, and returned copies; run the unit tests (FR-003–005).
- [ ] T009 [US1] Correct failures exposed by T007 in src/ui.js and index.html: list/details navigation, title/window name, friendly empty state, Add/Edit shared form, required-title feedback, Save/Cancel and No description; run the acceptance steps again (FR-001–005, FR-007, FR-012–014, FR-016).
- [ ] T010 [US1] Record US1 acceptance outcomes and Red-Green-Refactor evidence in specs/002-todo-list/quickstart.md; keep unavailable browser checks unverified and do not declare the story accepted until they pass (FR-001–005, FR-007, FR-012–014, FR-016; SC-006).

## Phase 4: User Story 2 - Track completion (P1)

**Goal**: Toggle completion and filter tasks accurately.
**Independent test**: Seed two tasks, toggle one both ways, verify all three filters, labels, completed rows, and empty filtered state.

### Tests first

- [X] T011 [P] [US2] Extend tests/tasks.test.js to verify both status transitions preserve id/title/description and All/Pending/Done return exactly matching tasks including no matches (FR-006, FR-009).
- [ ] T012 [P] [US2] Add and execute all US2 browser acceptance scenarios in specs/002-todo-list/quickstart.md, asserting active-filter highlight, indicator, muted strikethrough, exact toggle labels, no-match message and continued access to Add/filter controls; record failures first (FR-006, FR-009, FR-012, FR-015).

### Implementation and acceptance

- [ ] T013 [US2] Fix only T011/T012 failures in src/logic.js, src/ui.js and styles.css; preserve one accent for primary actions/active filter and verify Done/Pending labels (FR-006, FR-009, FR-012, FR-015, FR-017).
- [ ] T014 [US2] Re-run unit and US2 browser acceptance tests, record results and test-first evidence in specs/002-todo-list/quickstart.md (FR-006, FR-009, FR-012, FR-015).

## Phase 5: User Story 4 - Retain tasks between sessions (P1)

**Goal**: Retain successful task changes and report load/save failures without data loss.
**Independent test**: Seed representative task states through the service, reopen it with the same store, then exercise real browser reopening and isolated failure cases. Seeded edits/deletions allow storage tests independent of US3 UI.

### Tests first

- [X] T015 [P] [US4] Add tests/persistence.test.js covering absent key, valid record round trip, malformed JSON and shapes, duplicate/invalid identity, invalid title/description/done types, and unavailable storage; assert load failure never writes or clears data (FR-003–005, FR-011–012; data-model.md constraints).
- [X] T016 [P] [US4] Extend tests/tasks.test.js for successful persisted additions/edits/toggles/deletions after service recreation and failures of each write operation; assert previous in-memory and saved data remain unchanged and no successful result is reported (FR-011–012; SC-003, SC-006).
- [ ] T017 [US4] Add and execute US4 browser acceptance cases in specs/002-todo-list/quickstart.md using a disposable profile: real close/reopen at the same origin, failed loading with no false empty state, and failed changes with visible error, no success navigation and retained form input; record failures first (FR-011–012; SC-003, SC-006).

### Implementation and acceptance

- [X] T018 [US4] After observing a failing test for each required correction in T015/T016, minimally validate stored task arrays in src/persistence.js and fix atomic write semantics in src/logic.js only as required; retain the existing storage key and do not add migrations/recovery features (FR-003–005, FR-011–012).
- [ ] T019 [US4] Correct startup/error presentation in src/main.js and src/ui.js only for T017 failures; never overwrite unreadable data or present failed saves as successful (FR-011–012).
- [ ] T020 [US4] Run all storage/service tests and US4 browser acceptance, record actual reopening results separately from simulated reloads in specs/002-todo-list/quickstart.md (FR-011–012; SC-003, SC-006).

## Phase 6: User Story 3 - Edit and delete tasks (P2)

**Goal**: Maintain details while protecting cancelled edits/deletions.
**Independent test**: Seed a Done task, edit and clear description, cancel another edit, cancel Delete, then confirm Delete; repeat with duplicate titles to verify isolation.

### Tests first

- [X] T021 [P] [US3] Extend tests/tasks.test.js for editing a Done task without changing identity/status, clearing description, rejecting blank edits, and editing/removing only the selected id among duplicate titles (FR-003–004, FR-008, FR-010).
- [ ] T022 [P] [US3] Add and execute every US3 browser scenario in specs/002-todo-list/quickstart.md: prefilled shared form, Save/Cancel, No description after clearing, cancelled confirmation invokes no deletion, confirmed deletion returns to list and Delete is warning-colored; record failures before production changes (FR-007–008, FR-010, FR-014, FR-016).

### Implementation and acceptance

- [ ] T023 [US3] Fix only exposed failures in src/logic.js and src/ui.js for edit/status preservation, cancellation and confirmation-before-remove; keep add/edit on the same form and duplicate-title tasks independent (FR-003–004, FR-007–008, FR-010, FR-014, FR-016).
- [ ] T024 [US3] Run unit and US3 browser acceptance checks and record test-first evidence and persistence regression outcomes in specs/002-todo-list/quickstart.md (FR-007–008, FR-010–011, FR-014, FR-016; SC-004).

## Phase 7: Polish and cross-cutting validation

- [ ] T025 Measure list, forms and details at 320px and 1440px with long unbroken titles/descriptions; record failing assertions first in specs/002-todo-list/quickstart.md for target sizes >=44x44px, normal/large text contrast >=4.5:1 / >=3:1, no horizontal scroll, and specified typography/light background/single accent (FR-017–018; SC-005).
- [ ] T026 Correct only measured T025 failures in styles.css and src/ui.js, then repeat the same checks and record outcomes in specs/002-todo-list/quickstart.md (FR-017–018; SC-005).
- [ ] T027 Validate SC-001/002/004 with at least 10 first-time users following specs/002-todo-list/quickstart.md; record >=90% of the actual sample (round required successes up) within each specified time or leave outcomes explicitly unverified if participants are unavailable; do not substitute developer timings.
- [ ] T028 Review package.json and src/ for FR-019 scope and dependency compliance, complete syntax-check coverage for any newly introduced JavaScript files in package.json, run all tests/lint and all story acceptance scenarios, and record final Constitution Check plus FR-001–019 / SC-001–006 evidence in specs/002-todo-list/quickstart.md; unresolved required checks prevent a done claim.
- [X] T029 Update README.md with current run/check commands and links to specs/002-todo-list/spec.md and quickstart.md, retaining same-origin/profile persistence and verification limitations (FR-011–012; delivery documentation).

## Dependencies and execution order

```text
Setup T001–T002
  -> Foundation T003 -> T004 -> T005
  -> US1 T006 + T007 -> T008 -> T009 -> T010
  -> US2 T011 + T012 -> T013 -> T014
  -> US4 T015 + T016 -> T017 -> T018 -> T019 -> T020
  -> US3 T021 + T022 -> T023 -> T024
  -> Polish T025 -> T026 -> T027 -> T028 -> T029
```

US1 provides a meaningful add/open MVP. US2, US4 and US3 can each be tested with seeded tasks after foundation, but the default implementation order above follows P1 before P2 and avoids concurrent edits to shared modules. Actual browser acceptance for later stories requires the working US1 navigation/form shell. Full acceptance of US4's edit/delete UI paths is repeated after US3 in T024/T028. Each test task must finish before its implementation task. Failed checks trigger minimal fixes under a failing test; no unrelated features are authorized.

## Parallel examples

- US1: T006 service tests in tests/tasks.test.js and T007 browser scenarios/evidence in quickstart.md can proceed together after foundation.
- US2: T011 service tests and T012 browser scenarios can proceed together after the preceding checkpoint.
- US4: T015 storage tests and T016 service tests use different files and independent fakes; run together before T018.
- US3: T021 service tests and T022 browser scenarios can proceed together after the preceding checkpoint.

Do not run tasks touching quickstart.md or shared src/ modules concurrently across stories. [P] means an opportunity for independent work, not a requirement to delegate.

## Implementation strategy

1. Preserve existing working behavior; baseline it instead of rewriting it.
2. Complete Setup/Foundation, then US1 and its acceptance checkpoint for the smallest useful demonstration. Persistence and other P1 stories remain required for final delivery.
3. Deliver US2, US4, then US3 in small Red-Green-Refactor increments, independently seeding task state for tests.
4. Finish visual, persistence, quality and usability checks. Do not mark tasks complete merely because their scenarios were documented; record executed results and clearly retain unverified work.
5. Run /speckit-analyze on these artifacts before /speckit-implement. No deployment or new dependencies are part of this task list.

