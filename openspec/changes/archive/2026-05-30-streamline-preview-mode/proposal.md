## Why

The current editor preview mode only swaps the canvas content while keeping the left and right editing panels visible, so the page still feels like an editing workspace instead of a focused questionnaire preview. We need a clearer preview state now because the editor already supports runtime preview behaviors such as question jump logic, and the surrounding editing UI weakens that experience.

## What Changes

- Introduce an immersive editor preview state that hides the left and right side panels when preview mode is enabled.
- Simplify preview-mode controls so the header exposes a clear exit path without leaving editing actions active during preview.
- Adjust the center canvas layout in preview mode so the questionnaire preview remains centered and visually distinct from the editing layout.
- Limit preview mode to viewing and answering behavior rather than full editing behavior.

## Capabilities

### New Capabilities
- `editor-preview-mode`: Defines the editor's immersive preview behavior, including layout changes, preview-only controls, and interaction boundaries while preview mode is active.

### Modified Capabilities
- None.

## Impact

- Affected code in `src/pages/question/Edit/` including editor layout, header, toolbar, and canvas presentation.
- Affected editor state usage around `previewMode` and related interaction handling in hooks and Redux-connected components.
- No API or dependency changes are expected.
