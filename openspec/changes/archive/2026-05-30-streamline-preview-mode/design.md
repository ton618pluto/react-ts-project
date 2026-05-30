## Context

The question editor currently keeps a fixed three-column layout in `src/pages/question/Edit/index.tsx` and only swaps the canvas content when `previewMode` is enabled. This makes preview mode behave like a content toggle inside the editor rather than a focused preview state. The preview flow already has dedicated rendering logic in `EditCanvas.tsx`, including question jump handling, so the missing piece is a layout and interaction model that matches the intended "immersive preview" experience.

This change affects multiple editor modules:

- `index.tsx` and `index.module.scss` define the overall edit-page layout.
- `EditHeader.tsx` and `EditToolbar.tsx` define available controls.
- `EditCanvas.tsx` and `EditCanvas.module.scss` define editing and preview rendering behavior.
- `previewMode` is stored in Redux and consumed through `useGetComponentInfo()`.

The design needs to preserve a clear exit path from preview, avoid accidental editing while previewing, and minimize disruption to the existing edit flow.

## Goals / Non-Goals

**Goals:**

- Make preview mode visually distinct from edit mode by hiding the left and right side panels.
- Keep preview mode inside the existing editor route rather than introducing a separate page.
- Reduce preview controls to a clear exit path and prevent editing-oriented actions from remaining active.
- Preserve current questionnaire preview rendering, including jump logic and interactive answering behavior.

**Non-Goals:**

- Rebuild the questionnaire preview as a separate runtime page.
- Change question data structures, persistence format, or API contracts.
- Redesign the entire editor header or broader design system.
- Implement new preview business logic beyond layout and interaction boundary changes.

## Decisions

### 1. Treat preview as a layout state on the existing edit page

The editor will continue to use the existing `previewMode` Redux flag, but the page layout will react to it at the top-level edit container. In preview mode, `LeftPanel` and `RightPanel` will not render, and the center area will switch to a preview-specific layout class.

Why this approach:

- It keeps state transitions simple because preview mode already exists in the current store.
- It avoids introducing route changes, extra data loading, or duplicated page shells.
- It localizes the change to the editor page and its child components.

Alternative considered:

- Create a dedicated preview route or overlay. This would produce a purer runtime preview, but it would add routing and state handoff complexity that is not needed for the current requirement.

### 2. Keep the header, but simplify toolbar actions during preview

The page header will remain visible so users keep a stable navigation frame and an obvious exit path. However, `EditToolbar` will switch to a preview-specific control set when `previewMode` is active, showing only the exit-preview action.

Why this approach:

- It preserves the safest exit point without relying solely on in-canvas UI.
- It avoids the semantic conflict of showing destructive editing actions while the editor is supposed to be in preview mode.
- It is a smaller behavioral shift than removing the header entirely.

Alternative considered:

- Hide the entire header and rely on a canvas banner or floating action to exit preview. This is visually cleaner, but it weakens discoverability and raises the risk of trapping users in a narrower interaction shell.

### 3. Disable edit-oriented interactions while preview mode is active

Preview mode should allow questionnaire interaction, but not editing. The design therefore treats preview as a read-and-answer state:

- Editing side panels are removed from view.
- Toolbar edit actions are unavailable.
- Canvas keyboard bindings for edit actions should not run while preview mode is active.
- The preview canvas continues to accept input events required for question answering.

Why this approach:

- It aligns UI and behavior: if the page looks like preview, editing shortcuts should not still mutate state.
- It reduces accidental changes while someone is validating question flow.

Alternative considered:

- Leave keyboard editing bindings active because the side panels are hidden anyway. This is inconsistent and creates invisible editing power that users cannot easily reason about.

### 4. Use a dedicated preview canvas layout instead of reusing the editing container as-is

The center content area should apply preview-specific sizing and centering so the preview remains visually focused after the side panels disappear. This should be handled in the edit page layout styles rather than by relying on the existing fixed edit layout to stretch naturally.

Why this approach:

- The current center container is tuned for a three-column shell and fixed-width canvas placement.
- Preview mode needs its own spacing and alignment rules once the editor sidebars are removed.

Alternative considered:

- Hide the sidebars with CSS only and leave the current center layout untouched. This is fragile because the layout was not designed for that state and may leave awkward empty space or positioning behavior.

## Risks / Trade-offs

- Preview remains inside the editor route rather than matching the final questionnaire page exactly. -> Accept the limitation for now because the goal is an immersive editor preview, not a production runtime clone.
- Reducing toolbar actions during preview may surprise users who previously relied on the top bar staying fully interactive. -> Keep the exit action explicit and preserve the existing preview toggle entry point.
- Disabling keyboard shortcuts in preview adds a conditional path to shared editor interaction code. -> Scope the guard to `previewMode` so the edit path remains unchanged outside preview.
- Keeping both a header exit control and the current preview banner could feel redundant. -> Prefer a single primary exit path in the header and either simplify or remove the banner in implementation.

## Migration Plan

No data migration is required.

Implementation should proceed in this order:

1. Update the edit page layout to conditionally render preview-specific structure.
2. Simplify header and toolbar behavior when `previewMode` is active.
3. Gate editing keyboard interactions during preview.
4. Refine preview canvas presentation so exit affordances are not duplicated.

Rollback strategy:

- Revert the layout and toolbar conditional logic.
- Restore current preview rendering without affecting persisted questionnaire data.

## Open Questions

- Should preview keep the current fixed canvas width or allow a slightly wider centered container for desktop viewing?
- Should the preview banner remain as a passive status message, or be removed entirely once the header owns the exit action?
