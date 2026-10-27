# Data Model

## Task

| Field | Type | Rule |
| --- | --- | --- |
| id | string | Generated once; unique stable identity, independent of title. |
| title | string | Required; nonblank after trimming. Duplicate titles allowed. |
| description | string | Optional user input; normalized to an empty string when absent. |
| done | boolean | false = Pending; true = Done; initially false. |

No relationships or additional domain entities. No dates, categories, priorities, or account fields.

## Lifecycle

Create -> Pending. Toggle Pending <-> Done. Edit replaces title/description and retains id/status. Confirmed delete removes the task; cancellation changes nothing. Forms keep unsaved input separate from saved tasks.

## Persistence and errors

Store an array of task records as JSON under `curso-pswe-07.tasks`. Missing storage key means an empty list. Unreadable or invalid stored records must produce the specified loading error, not silently overwrite or clear saved data. Loading validation should check this task shape; no migrations or recovery features are required.

For writes, prepare the next state, save it, and only then publish it as the current state. Failure leaves previous saved and in-memory task state unchanged. Preserve entered form values so the user can correct or retry. Storage lifetime is tied to the same browser profile and origin; cleared data and private-session retention are outside normal persistence assumptions.
