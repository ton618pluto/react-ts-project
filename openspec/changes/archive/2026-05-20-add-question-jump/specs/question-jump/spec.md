## ADDED Requirements

### Requirement: Single Choice Jump Configuration
The system SHALL allow each option in a single-choice question to specify how many subsequent questions to skip when that option is selected.

#### Scenario: Set skip count on option
- **WHEN** editor configures a single-choice question with multiple options
- **THEN** each option SHALL display a numeric input field for skip count (default 0)
- **AND** skip count SHALL be an integer >= 0

#### Scenario: Options have independent skip counts
- **WHEN** editor sets option A skip count to 3 and option B skip count to 1
- **THEN** selecting option A skips 3 subsequent questions
- **AND** selecting option B skips only 1 subsequent question

### Requirement: Skip Count Stored in JumpTo
The system SHALL store skip counts in the `jumpTo` property of the question component.

#### Scenario: JumpTo structure
- **WHEN** a single-choice question is configured
- **THEN** `jumpTo` SHALL be a `Record<string, number>` where key is the option value and value is the skip count

### Requirement: Dynamic Question Skipping at Runtime
The system SHALL skip questions dynamically based on user selection during questionnaire fill-out.

#### Scenario: Skip questions after selection
- **WHEN** user selects an option with skip count > 0
- **THEN** the next N questions SHALL NOT be displayed, where N is the skip count
- **AND** skipped questions' IDs SHALL be recorded in the answer submission

#### Scenario: No skip when count is zero
- **WHEN** user selects an option with skip count = 0
- **THEN** no questions SHALL be skipped and the questionnaire continues normally

#### Scenario: Skip count exceeds remaining questions
- **WHEN** skip count is greater than the number of remaining questions
- **THEN** skip all remaining questions and end the questionnaire gracefully
- **AND** no error SHALL be thrown

### Requirement: Skipped Questions Marked in Submission
The system SHALL record which questions were skipped in the answer submission.

#### Scenario: Skipped IDs in submission
- **WHEN** user completes a questionnaire with skipped questions
- **THEN** the submission SHALL include a list of skipped question IDs
- **AND** the order of questions SHALL match the original sequence with skips removed