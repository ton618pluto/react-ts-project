## Purpose

Define how the question editor preview mode behaves as an immersive preview state, including layout changes, preview-only controls, and interaction boundaries while preview mode is active.

## ADDED Requirements

### Requirement: Preview Mode Uses an Immersive Editor Layout
The system SHALL switch the question editor from the standard three-column editing layout to an immersive preview layout when preview mode is enabled.

#### Scenario: Side panels are hidden during preview
- **WHEN** the user enables preview mode from the editor
- **THEN** the left component panel SHALL not be displayed
- **AND** the right settings panel SHALL not be displayed
- **AND** the preview content SHALL remain visible in the center area

#### Scenario: Editing layout is restored after exiting preview
- **WHEN** the user exits preview mode
- **THEN** the editor SHALL restore the standard editing layout
- **AND** the left and right panels SHALL be displayed again

### Requirement: Preview Mode Provides a Clear Exit Control
The system SHALL keep a clear and discoverable exit-preview control available while preview mode is active.

#### Scenario: Header exposes exit preview control
- **WHEN** preview mode is active
- **THEN** the editor header SHALL provide a control for exiting preview mode

#### Scenario: Exit control returns to editing state
- **WHEN** the user activates the exit-preview control
- **THEN** preview mode SHALL be disabled
- **AND** the editor SHALL return to the editing state without reloading the page

### Requirement: Preview Mode Hides Editing-Only Toolbar Actions
The system SHALL not expose editing-only toolbar actions while preview mode is active.

#### Scenario: Editing actions are not shown in preview
- **WHEN** preview mode is active
- **THEN** toolbar actions for editing components SHALL not be displayed
- **AND** the preview toolbar SHALL only expose controls needed to leave preview mode

### Requirement: Preview Mode Blocks Editing Interactions
The system SHALL prevent edit-oriented interactions from mutating editor state while preview mode is active.

#### Scenario: Keyboard editing shortcuts do not modify the canvas
- **WHEN** preview mode is active
- **AND** the user triggers an editing keyboard shortcut
- **THEN** the editor SHALL not perform the corresponding edit action

#### Scenario: Preview canvas remains answerable
- **WHEN** preview mode is active
- **AND** the user interacts with questionnaire inputs inside the preview canvas
- **THEN** the preview SHALL accept those interactions
- **AND** the editor SHALL update only preview-session answer state needed for preview behavior

### Requirement: Preview Mode Uses Preview-Specific Canvas Presentation
The system SHALL apply a preview-specific center canvas presentation so the questionnaire remains visually focused after the editing panels are hidden.

#### Scenario: Preview content is centered in preview layout
- **WHEN** preview mode is active
- **THEN** the preview canvas SHALL be centered within the available editor content area

#### Scenario: Preview presentation is distinct from editing presentation
- **WHEN** preview mode is active
- **THEN** the canvas container SHALL use preview-specific layout styling rather than the standard editing layout styling
