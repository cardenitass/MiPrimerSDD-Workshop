# Quickstart and Validation

## Run

From the repository root with Node.js 22+:

```sh
npm.cmd start
```

Open http://localhost:3000 in a modern browser with persistent storage enabled. On shells without the PowerShell npm script restriction, `npm start` is equivalent. No dependency installation is needed. Reopen at the same address/profile when checking retention.

## Automated checks

```sh
npm.cmd test
npm.cmd run lint
```

Expect all tests and JavaScript syntax checks to pass. Existing service tests cover basic CRUD, filters, title validation, reopening a storage adapter, and a failed addition. They do not establish full browser acceptance. New implementation work must first add a failing test for each behavior it introduces or corrects.

## Story acceptance

Use a clean test browser profile with disposable task data; do not clear real user tasks. Use the detailed Given/When/Then scenarios in spec.md as the acceptance checklist.

1. Story 1: verify header/window title and empty state; add with/without description; reject empty/whitespace titles; cancel creation; open details and return with Back. Expect status Pending and No description fallback.
2. Story 2: create two tasks, mark one Done, inspect indicators/strikethrough and exact toggle labels; check All/Pending/Done and an empty result; toggle back.
3. Story 3: edit a completed task and clear its description; expect completion preserved. Cancel an edit and a deletion; expect unchanged saved data. Confirm deletion of disposable test data and expect return to list. Repeat with duplicate titles and verify only the selected task changes.
4. Story 4: create, edit, toggle, and delete test tasks, close/reopen the browser at the same origin and profile, and verify latest saved state. With an isolated fake, fail each save operation and load separately; expect unchanged previous data and visible errors. Exercise malformed stored records only in the disposable profile.

See contracts/ui-and-storage.md for layer contracts and data-model.md for record invariants.

## Visual and usability validation

At viewport widths 320px and 1440px, exercise list, form, details, and confirmation. Use long unbroken titles/descriptions. Expect no horizontal page scrolling or inaccessible controls. Measure all click targets (>=44x44px), normal text contrast (>=4.5:1), large text (>=3:1), including muted and warning text. Verify light background, one sans-serif family, one accent, and title hierarchy.

For SC-001/002/004, recruit at least 10 first-time test users, time the specified journeys without help, and record success counts: >=9/10 within 2 minutes for add/open and edit/delete; >=9/10 within 1 minute for completion/filter. SC-003/005/006 require all specified scenarios to pass.

Record date, browser/version, viewport, scenario, outcome, and any failures. If browser tools or users are unavailable, record these checks as unverified rather than passed. Planning does not execute this guide or claim production readiness.

## Implementation evidence — 2026-10-26

Baseline: six tests and JavaScript syntax checks passed. The requirements checklist passed 16/16 without modification. Browser inventory returned no apps or browsers, so actual browser acceptance cannot run in this session. Git metadata access reports dubious ownership; no global Git settings were changed.

Architecture: two new tests failed on UI storage access and the old HTML entry, then passed after startup moved to src/main.js. UI now receives the task service; main.js owns composition; server.js serves the new entry. Unused selected state was removed during refactoring.

Persistence: eleven invalid-record cases failed before implementation. The adapter now rejects malformed records, duplicate identities and wrong field types without writing or clearing storage. Missing keys still load an empty list. All new cases pass. Additional tests for duplicate-title isolation, returned copies, Done-preserving edits and failed add/edit/toggle/delete passed against existing logic, so no unnecessary logic rewrite was made.

UI event-handler acceptance: tests/ui.test.js directly exercises real handlers using isolated control stubs. Creation/validation, open/back, toggle labels, all filters, completed-row markup, edit cancellation, editing while Done, confirmation cancellation/acceptance, add cancellation and failed add/load behavior pass. These tests do not parse HTML like a browser, measure layout, or prove real browser persistence. They preserve existing behavior without claiming retroactive TDD for the original app.

### Requirement evidence and remaining acceptance

| Requirements | Automated evidence | Remaining verification |
| --- | --- | --- |
| FR-001–005 | architecture/tasks/UI tests | Browser navigation and field behavior |
| FR-006–010 | tasks/UI handler tests | Browser rendering, confirmation and edit scenarios |
| FR-011 | storage round trips and service recreation | Real close/reopen at the same origin/profile |
| FR-012 | invalid loads, every failed service write, failed UI add/load | Browser errors for edit/toggle/delete failures |
| FR-013–016 | entry source and UI handler/markup assertions | Actual window title, controls, labels, visuals |
| FR-017–018 | Existing stylesheet retained | Measurements at 320px/1440px, text contrast and every 44px target |
| FR-019 | No dependencies or extra features introduced | Final review with remaining acceptance |
| SC-001/002/004 | No participant study performed | At least 10 users; >=90% of actual sample within specified times |
| SC-003 | Simulated persistence passes | Actual browser closure/reopening |
| SC-005 | No visual measurement performed | Full responsive/accessibility measurements |
| SC-006 | Unit/handler error cases pass | Remaining browser error scenarios |

Constitution review: simplicity, small-module design, storage boundaries and failing-test-before-correction evidence are satisfied for this change. Syntax lint covers all application and test JavaScript. Final acceptance and done status remain pending required browser and participant checks; unchecked tasks retain that work. No dependency or constitution exception was introduced.

Final automated run: 29/29 tests passed; syntax lint passed for all app and test JavaScript. HTTP smoke check: HTML, main/UI/logic/persistence modules and stylesheet all returned 200 using an isolated ephemeral port. Port 3000 was already occupied, so the existing process was left untouched; restart any previously running app server to pick up the new main.js route.
