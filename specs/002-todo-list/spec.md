# Feature Specification: Curso-PSWE-07 To-Do List

**Feature Directory**: `specs/002-todo-list`
**Created**: 2026-10-26
**Status**: Ready for planning
**Input**: Previously supplied user requirements for Curso-PSWE-07: a simple daily task list with list and detail screens, add/edit forms, completion filters, persistent tasks, and a minimal responsive visual design.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Organize and open tasks (Priority: P1)

As a user, I want to add tasks and open their details so I can organize my day.

**Why this priority**: Creating and finding tasks is the application's core value.
**Independent Test**: Add tasks with and without descriptions and open each from the list.

**Acceptance Scenarios**:

1. **Given** an empty list, **When** I open the app, **Then** I see Curso-PSWE-07 in the header and application/window title, a friendly empty state, and an Add task button.
2. **Given** the list, **When** I select Add task, enter a title with or without a description, and select Save, **Then** the new task appears as Pending with its title and status indicator.
3. **Given** an existing task, **When** I select its row, **Then** details show its prominent title, description or muted “No description”, status label, back control, and Edit, completion, and Delete actions.
4. **Given** an add or edit form, **When** I save an empty or whitespace-only title, **Then** a title validation message appears and nothing is saved.
5. **Given** an add form with unsaved input, **When** I select Cancel, **Then** I return to the list without creating a task.
6. **Given** task details, **When** I select Back, **Then** I return to the list.

### User Story 2 - Track completion (Priority: P1)

As a user, I want to change task status and filter tasks so I can focus on unfinished work.

**Why this priority**: Completion tracking makes daily progress visible.
**Independent Test**: Toggle a task in both directions and verify All, Pending, and Done filters.

**Acceptance Scenarios**:

1. **Given** a Pending task, **When** I select Mark as done, **Then** the status becomes Done and the action becomes Mark as not done.
2. **Given** a Done task, **When** I select Mark as not done, **Then** the status becomes Pending and the action becomes Mark as done.
3. **Given** tasks of both statuses, **When** I select All, Pending, or Done, **Then** only matching tasks appear and the selected filter is highlighted.
4. **Given** a Done task in the list, **When** I view its row, **Then** its title has strikethrough and muted color with a completed status indicator.
5. **Given** no tasks match a filter, **When** I select it, **Then** I see a friendly message and can still add a task or change filters.

### User Story 3 - Edit and delete tasks (Priority: P2)

As a user, I want to maintain task details and remove tasks I no longer need.

**Why this priority**: Maintenance keeps the task list accurate.
**Independent Test**: Edit details, cancel an edit, cancel deletion, then confirm deletion.

**Acceptance Scenarios**:

1. **Given** task details, **When** I select Edit, **Then** the same form used for adding appears with existing title and description and Save/Cancel controls.
2. **Given** an edit form, **When** I save valid changes, **Then** updated details appear and completion status is preserved; clearing the description shows “No description”.
3. **Given** unsaved edits, **When** I select Cancel, **Then** original details remain unchanged.
4. **Given** task details, **When** I select Delete, **Then** confirmation is required before removal; cancelling preserves the task.
5. **Given** a deletion confirmation, **When** I confirm, **Then** the task is removed and I return to the list.

### User Story 4 - Retain tasks between sessions (Priority: P1)

As a user, I want saved tasks to survive closing and reopening the application.

**Why this priority**: Daily tracking depends on retaining previous work.
**Independent Test**: Create, edit, complete, and delete tasks, then reopen the application.

**Acceptance Scenarios**:

1. **Given** saved additions, edits, and completion changes, **When** I close and reopen in the same supported environment, **Then** latest titles, descriptions, and statuses remain.
2. **Given** a confirmed deletion, **When** I reopen, **Then** the deleted task remains absent.
3. **Given** saving fails, **When** I attempt any task change, **Then** I see an error, the last saved state remains intact, and the change is not shown as saved.

### Edge Cases

- Empty and whitespace-only titles are invalid on both add and edit; descriptions may be empty.
- Identical titles are allowed; editing or deleting one task affects only that task.
- Long titles and descriptions wrap without hiding actions or causing horizontal page scrolling.
- Empty lists and filters with no matches preserve access to Add task and filters.
- Failed loading displays an error rather than presenting unavailable saved tasks as an empty list.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST provide To-Do List and To-Do Detail screens.
- **FR-002**: The list MUST show task rows and allow adding tasks and opening any row's details.
- **FR-003**: Each task MUST have a required title, optional description, and Done/Pending completion status, and MUST be independently identifiable even when titles match.
- **FR-004**: Add and edit MUST reject empty or whitespace-only titles with a visible validation message and MUST NOT save invalid input.
- **FR-005**: Newly added tasks MUST be Pending.
- **FR-006**: The list MUST offer All, Pending, and Done filters, showing only matching tasks and highlighting the active filter.
- **FR-007**: Details MUST display a prominent title, description below it or muted “No description”, and a visible Done/Pending label.
- **FR-008**: Editing MUST reuse the add form, prefill existing values, provide Save/Cancel, and preserve completion status.
- **FR-009**: Details MUST allow status changes through Mark as done / Mark as not done, with the label reflecting current status.
- **FR-010**: Details MUST offer Delete in a distinct warning color and MUST require confirmation; cancellation MUST preserve the task and confirmation MUST return to the list after removal.
- **FR-011**: Saved additions, edits, status changes, and deletions MUST persist after normal closure and reopening in the same environment.
- **FR-012**: The app MUST show friendly empty-list and no-match messages, report loading/saving failures, and MUST NOT present failed writes as saved changes.
- **FR-013**: Curso-PSWE-07 MUST appear in the list header and as the application/window title.
- **FR-014**: The list MUST have a clearly visible Add task button opening title and description fields with Save/Cancel; Cancel MUST discard unsaved input.
- **FR-015**: Each row MUST show a status indicator and title; Done titles MUST be muted and struck through.
- **FR-016**: Details MUST provide a back control returning to the list, plus Edit, completion, and Delete actions.
- **FR-017**: The app MUST use a light background, generous whitespace, one sans-serif font family, one accent for primary actions and active filters, and titles larger and bolder than descriptions.
- **FR-018**: Interactive targets MUST be at least 44 by 44 px. Layout MUST work at 320px mobile and 1440px desktop widths without horizontal page scrolling. Normal text contrast MUST be at least 4.5:1 and large text at least 3:1.
- **FR-019**: The app MUST NOT include accounts, categories, due dates, priorities, search, sync, or other unrequested features.

### Key Entities

- **Task**: An independently identifiable daily item with a nonblank title, optional description, and Pending/Done status. Transitions: create as Pending; edit title/description without changing status; toggle status in either direction; delete only after confirmation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of first-time test users can add a task and open its details without help within two minutes.
- **SC-002**: At least 90% of test users can change completion status and find the task with the matching filter within one minute.
- **SC-003**: All persistence acceptance scenarios retain 100% of successfully saved changes after closure and reopening.
- **SC-004**: At least 90% of test users can edit and confirm deletion of a task within two minutes; all cancellation scenarios preserve saved data.
- **SC-005**: All specified controls and text pass the target-size and contrast checks at 320px and 1440px viewport widths; all task operations remain usable at both widths.
- **SC-006**: All invalid-title and failed-save scenarios show an error and leave previously saved task data unchanged.

## Assumptions

- One user's tasks in one environment; cross-device transfer and synchronization are excluded.
- Normal persistence assumes the user has not cleared application data and the environment permits durable storage; recovery of manually cleared data is out of scope.
- No external accounts or services are required by the feature. Available persistent storage is an environmental dependency.
- Titles need not be unique; no arbitrary field-length limits are introduced.
- User-facing labels are English, as supplied in the request.
- All is the initial filter. Saving a new task returns to All so the task is visible; saving edits returns to details. These defaults do not add features.
