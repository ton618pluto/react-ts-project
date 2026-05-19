# Question Jump

## Purpose

Enable single-choice questions to redirect users to specific target questions based on the selected option, replacing the default sequential flow.

## Requirements

### Requirement: Single Choice Jump Configuration
The system SHALL allow each option in a single-choice question to specify a target question to jump to when that option is selected.

#### Scenario: Set jump target on option
- **WHEN** editor configures a single-choice question with multiple options
- **THEN** each option SHALL display a dropdown to select a jump target (another question in the questionnaire)
- **AND** jump target SHALL default to empty (no jump)

#### Scenario: Options have independent jump targets
- **WHEN** editor sets option A to jump to question D and option B to jump to question E
- **THEN** selecting option A redirects to question D
- **AND** selecting option B redirects to question E

### Requirement: JumpTo Stored in Component Props
The system SHALL store jump targets in the `jumpTo` property of the question component.

#### Scenario: JumpTo structure
- **WHEN** a single-choice question is configured with jump targets
- **THEN** `jumpTo` SHALL be a `Record<string, string>` where key is the option value and value is the target component's `fe_id`

### Requirement: Dynamic Question Jumping at Runtime
The system SHALL jump to the target question based on user selection during questionnaire fill-out in preview mode.

#### Scenario: Jump to target after selection
- **WHEN** user selects an option with a configured jump target
- **THEN** the questionnaire SHALL display the target question next
- **AND** intermediate questions between current and target SHALL NOT be displayed

#### Scenario: No jump when target is empty
- **WHEN** user selects an option with no jump target (empty)
- **THEN** no jump SHALL occur and the questionnaire continues normally to the next question

#### Scenario: Jump target is before current question
- **WHEN** user selects an option whose jump target appears before the current question in the sequence
- **THEN** no jump SHALL occur and the questionnaire continues normally