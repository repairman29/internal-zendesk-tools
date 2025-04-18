import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AIReadinessAssessment from '../AIReadinessAssessment';

// Basic rendering tests
test('renders the assessment title', () => {
  render(<AIReadinessAssessment />);
  const titleElement = screen.getByText(/AI Readiness Assessment/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the first section title', () => {
  render(<AIReadinessAssessment />);
  const sectionTitle = screen.getByText(/Data & Knowledge Foundation/i);
  expect(sectionTitle).toBeInTheDocument();
});

// Radio button interaction tests
test('allows selecting a radio button answer', async () => {
  render(<AIReadinessAssessment />);
  const radioButton = screen.getByLabelText(/Poor - Outdated or incomplete/i);
  await userEvent.click(radioButton);
  expect(radioButton).toBeChecked();
});

test('updates progress when answering questions', async () => {
  render(<AIReadinessAssessment />);
  const progressText = screen.getByText(/0% Complete/i);
  expect(progressText).toBeInTheDocument();

  // Answer the first question
  const radioButton = screen.getByLabelText(/Poor - Outdated or incomplete/i);
  await userEvent.click(radioButton);

  // Progress should update to 8% (1 out of 12 questions)
  const updatedProgress = screen.getByText(/8% Complete/i);
  expect(updatedProgress).toBeInTheDocument();
});

// Section navigation tests
test('enables next section button when all questions are answered', async () => {
  render(<AIReadinessAssessment />);
  const nextButton = screen.getByText(/Next Section/i);
  expect(nextButton).toBeDisabled();

  // Answer all questions in the first section
  const questions = [
    "Poor - Outdated or incomplete",
    "Not integrated - Separate silos",
    "Inconsistent - Multiple formats and duplicates"
  ];

  for (const question of questions) {
    const radioButton = screen.getByLabelText(new RegExp(question, 'i'));
    await userEvent.click(radioButton);
  }

  expect(nextButton).not.toBeDisabled();
});

test('navigates to next section when clicking next button', async () => {
  render(<AIReadinessAssessment />);
  
  // Answer all questions in the first section
  const questions = [
    "Poor - Outdated or incomplete",
    "Not integrated - Separate silos",
    "Inconsistent - Multiple formats and duplicates"
  ];

  for (const question of questions) {
    const radioButton = screen.getByLabelText(new RegExp(question, 'i'));
    await userEvent.click(radioButton);
  }

  // Click next button
  const nextButton = screen.getByText(/Next Section/i);
  await userEvent.click(nextButton);

  // Verify we're in the second section
  const secondSectionTitle = screen.getByText(/Process Maturity/i);
  expect(secondSectionTitle).toBeInTheDocument();
});

test('navigates back to previous section', async () => {
  render(<AIReadinessAssessment />);
  
  // Answer all questions in the first section and move to second
  const firstSectionQuestions = [
    "Poor - Outdated or incomplete",
    "Not integrated - Separate silos",
    "Inconsistent - Multiple formats and duplicates"
  ];

  for (const question of firstSectionQuestions) {
    const radioButton = screen.getByLabelText(new RegExp(question, 'i'));
    await userEvent.click(radioButton);
  }

  // Move to second section
  const nextButton = screen.getByText(/Next Section/i);
  await userEvent.click(nextButton);

  // Answer one question in second section
  const secondSectionQuestion = screen.getByLabelText(/Not documented - Tribal knowledge/i);
  await userEvent.click(secondSectionQuestion);

  // Click previous button
  const previousButton = screen.getByText(/Previous/i);
  await userEvent.click(previousButton);

  // Verify we're back in the first section
  const firstSectionTitle = screen.getByText(/Data & Knowledge Foundation/i);
  expect(firstSectionTitle).toBeInTheDocument();
});

// Results calculation tests
test('calculates and displays results when completing all sections', async () => {
  render(<AIReadinessAssessment />);
  
  // Complete all sections
  const sections = [
    {
      questions: [
        "Poor - Outdated or incomplete",
        "Not integrated - Separate silos",
        "Inconsistent - Multiple formats and duplicates"
      ]
    },
    {
      questions: [
        "Not documented - Tribal knowledge",
        "Minimal - Few or no automations",
        "Basic - Limited metrics tracking"
      ]
    },
    {
      questions: [
        "No - Multiple versions behind",
        "Minimal - No API usage",
        "Limited - No dedicated resources"
      ]
    },
    {
      questions: [
        "Limited - No clear executive sponsorship",
        "Undeveloped - No formal processes",
        "Resistant - Concerns about job security"
      ]
    }
  ];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    for (const question of section.questions) {
      const radioInput = screen.getByLabelText(question.options[0].text);
      await userEvent.click(radioInput);
    }
    if (i < sections.length - 1) {
      const nextButton = screen.getByRole('button', { name: /next section/i });
      await userEvent.click(nextButton);
    }
  }

  // Verify results are displayed
  expect(screen.getByText('Your AI Readiness Assessment Results')).toBeInTheDocument();
  expect(screen.getByText('Overall Readiness Score')).toBeInTheDocument();
  expect(screen.getByText('25%')).toBeInTheDocument();

  // Verify category scores
  const categories = [
    'Data & Knowledge Foundation',
    'Process Maturity',
    'Technology Readiness',
    'Organizational Readiness'
  ];

  for (const category of categories) {
    const categoryScore = screen.getByText(category, { selector: 'span.text-sm.text-shamrock.font-medium' });
    expect(categoryScore).toBeInTheDocument();
  }
});

// Mobile responsiveness tests
test('renders mobile-friendly layout', () => {
  // Set viewport to mobile size
  global.innerWidth = 375;
  global.dispatchEvent(new Event('resize'));

  render(<AIReadinessAssessment />);
  
  // Verify mobile-specific classes are applied
  const container = screen.getByTestId('assessment-container');
  expect(container).toHaveClass('p-4'); // Mobile padding
  expect(container).not.toHaveClass('p-8'); // Desktop padding
});

// Error state tests
test('disables next button when not all questions are answered', async () => {
  render(<AIReadinessAssessment />);
  
  // Answer only one question in the first section
  const radioButton = screen.getByLabelText(/Poor - Outdated or incomplete/i);
  await userEvent.click(radioButton);

  // Verify next button is still disabled
  const nextButton = screen.getByText(/Next Section/i);
  expect(nextButton).toBeDisabled();
});

test('disables previous button on first section', () => {
  render(<AIReadinessAssessment />);
  
  const previousButton = screen.getByText(/Previous/i);
  expect(previousButton).toBeDisabled();
}); 