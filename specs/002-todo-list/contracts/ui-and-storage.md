# UI, Task Service, and Storage Contracts

## Boundaries

Composition creates the storage adapter, injects it into the task service, and passes that service into UI initialization. UI does not import persistence or read/write localStorage. The application exposes no remote task API. The local HTTP server serves application assets only.

## Task service

- list(filter = All): returns task copies for All, Pending, or Done; no mutations.
- get(id): returns a copy of the selected existing task.
- add(title, description): validates title, assigns identity, saves a Pending task, returns the saved task.
- edit(id, title, description): validates fields, saves updated title/description, preserves identity and status.
- toggle(id): saves the opposite completion status.
- remove(id): saves removal; UI must obtain confirmation before invoking it.

UI supplies IDs from existing task records and one of the three valid filter values. Write failures propagate to UI; no successful navigation or state change is reported on failure. Returned records must not allow callers to mutate saved state without a service operation.

## Storage adapter

- load(): returns the task array; absent key returns []; malformed/unavailable storage throws.
- save(tasks): serializes and persists the complete next array; failure throws.

Tests may replace this interface with fresh in-memory storage per scenario. Only persistence knows the key and serialization. No UI or domain details belong in the adapter.

## User-visible behavior

| Context | Required behavior |
| --- | --- |
| List | App name, All/Pending/Done with active state, task rows, Add task, friendly empty/no-match message. |
| Row | Status indicator and title; Done uses muted strikethrough; selecting row opens details. |
| Details | Back, title, description or No description, status, Edit, state-dependent toggle label, warning-colored Delete. |
| Add/Edit | Same form, required title and optional description, Save and Cancel; edit prefilled; invalid title shows message and saves nothing. |
| Save/Cancel | Add saves to All list; edit saves to details; Cancel returns without saving. |
| Delete | Ask confirmation; cancel preserves task; confirm removes and returns to list. |
| Error | Visible load/save failure; no false empty list on load failure and no false successful write. |

Use semantic controls, associated field labels, visible focus, and an announced validation/error message. Interactive targets are >=44x44px. Test normal/large text at >=4.5:1 / >=3:1 contrast. Check wrapping and actions at 320px and 1440px; retain the specified light, single-accent visual style.
