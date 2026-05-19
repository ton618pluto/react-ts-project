## Purpose

Design system specification defines the visual design language for the questionnaire platform, including colors, spacing, shadows, and border-radius tokens that ensure consistent styling across all pages and components.

## ADDED Requirements

### Requirement: CSS Variable System
The system SHALL define a comprehensive CSS variable system in `:root` for consistent design token management across all pages.

#### Scenario: Global CSS variables are defined
- **WHEN** any stylesheet is loaded
- **THEN** CSS variables for colors, spacing, shadows, and border-radius SHALL be available globally

#### Scenario: Color tokens are consistent
- **WHEN** components use CSS color variables
- **THEN** all pages SHALL display with the defined color palette (primary: #1890ff, background: #f7f9fc, card: #ffffff, text: #262626, text-secondary: #8c8c8c)

#### Scenario: Spacing tokens enable consistent layout
- **WHEN** margin/padding values are applied
- **THEN** they SHALL use predefined spacing tokens (sm: 12px, md: 16px, lg: 24px)

#### Scenario: Shadow tokens provide consistent elevation
- **WHEN** card or panel shadows are applied
- **THEN** they SHALL use predefined shadow tokens (sm: 0 2px 8px rgba(0,0,0,0.08), md: 0 4px 16px rgba(0,0,0,0.12))

### Requirement: Border Radius Standardization
The system SHALL use 8px as the standard border-radius for all cards and panels.

#### Scenario: Cards use standard border-radius
- **WHEN** a card component is rendered
- **THEN** it SHALL have border-radius: 8px

#### Scenario: Panel borders are rounded
- **WHEN** a panel or container is styled
- **THEN** it SHALL have border-radius: 8px

### Requirement: Responsive Layout
The system SHALL remove the global min-width constraint and implement max-width based layouts.

#### Scenario: Global min-width is removed
- **WHEN** the page loads
- **THEN** no min-width constraint SHALL be applied to the body

#### Scenario: Container uses max-width
- **WHEN** a layout container is rendered (e.g., ManageLayout)
- **THEN** it SHALL use max-width: 1200px with auto margin

#### Scenario: Layout adapts to viewport
- **WHEN** viewport width is less than 1200px
- **THEN** the layout SHALL adapt without horizontal scrolling

### Requirement: Visual Hierarchy
The system SHALL establish clear visual hierarchy through background colors, shadows, and spacing.

#### Scenario: Page background is unified
- **WHEN** any page content area is rendered
- **THEN** it SHALL use --color-bg-page (#f7f9fc) as background

#### Scenario: Cards stand out from background
- **WHEN** a card or panel is rendered
- **THEN** it SHALL use --color-bg-card (#ffffff) with shadow for elevation

#### Scenario: Header has subtle shadow
- **WHEN** the main header is rendered
- **THEN** it SHALL have a subtle bottom shadow for depth separation