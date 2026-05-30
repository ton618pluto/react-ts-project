## 1. Layout Updates

- [x] 1.1 Update the edit page container to switch between the standard three-column layout and a preview-only center layout based on `previewMode`.
- [x] 1.2 Add preview-specific layout styles so the canvas remains centered and visually distinct when the side panels are hidden.

## 2. Preview Controls

- [x] 2.1 Update the editor header and toolbar so preview mode exposes a clear exit-preview control.
- [x] 2.2 Hide editing-only toolbar actions while preview mode is active.

## 3. Interaction Boundaries

- [x] 3.1 Disable edit-oriented keyboard shortcuts and similar edit interactions while preview mode is active.
- [x] 3.2 Keep preview canvas interactions working for questionnaire answering and jump-flow validation.
- [x] 3.3 Remove or simplify duplicate in-canvas exit affordances if the header becomes the primary preview exit path.

## 4. Verification

- [x] 4.1 Verify entering preview hides both side panels and keeps preview content visible and centered.
- [x] 4.2 Verify exiting preview restores the editing layout without reloading the page.
- [x] 4.3 Verify preview mode no longer exposes editing toolbar actions or edit-state mutations from keyboard shortcuts.
