## ADDED Requirements

### Requirement: Mint Fresh Primary Color
The system SHALL use soft mint green `#4ECDC4` as the primary color for interactive elements, buttons, and highlights.

#### Scenario: Primary color is applied to buttons
- **WHEN** a primary button is rendered
- **THEN** it SHALL use `--color-primary: #4ECDC4` as its background or border color

#### Scenario: Primary color is used for links and accents
- **WHEN** a link or accent element is styled
- **THEN** it SHALL use `--color-primary: #4ECDC4`

### Requirement: Soft Mint Background
The system SHALL use warm mint `#E8F8F5` as the page background color instead of pure gray or white.

#### Scenario: Page background is warm mint
- **WHEN** any page content area is rendered
- **THEN** it SHALL use `--color-bg-page: #E8F8F5` as the background

### Requirement: Deep Teal Text Color
The system SHALL use deep teal `#2C5F52` as the primary text color for optimal readability on mint backgrounds.

#### Scenario: Primary text on mint background
- **WHEN** primary text is rendered on mint background
- **THEN** it SHALL use `--color-text: #2C5F52` providing at least 4.5:1 contrast ratio

#### Scenario: Secondary text on mint background
- **WHEN** secondary or muted text is rendered
- **THEN** it SHALL use `--color-text-secondary: #6B8E8A` providing at least 3:1 contrast ratio

### Requirement: Soft Mint Border
The system SHALL use soft mint `#B8D4D0` as the border color for cards and panels.

#### Scenario: Card borders are soft mint
- **WHEN** a card or panel border is rendered
- **THEN** it SHALL use `--color-border: #B8D4D0`

### Requirement: No Hardcoded Gray Background
The system SHALL replace hardcoded gray backgrounds `#f5f5f5` with coordinated mint-gray `#E0EBE8`.

#### Scenario: Components use mint-gray instead of gray
- **WHEN** a component needs a subtle background
- **THEN** it SHALL use `--color-gray: #E0EBE8` instead of `#f5f5f5`