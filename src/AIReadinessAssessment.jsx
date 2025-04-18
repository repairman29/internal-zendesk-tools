import React, { useState } from 'react';

const AIReadinessAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const sections = [
    {
      title: "Data & Knowledge Foundation",
      questions: [
        {
          id: "knowledge_quality",
          text: "How would you rate the quality and completeness of your knowledge base?",
          options: [
            { value: 1, text: "Poor - Outdated or incomplete" },
            { value: 2, text: "Fair - Basic information but gaps exist" },
            { value: 3, text: "Good - Mostly complete but some areas need improvement" },
            { value: 4, text: "Excellent - Comprehensive and regularly maintained" }
          ]
        },
        {
          id: "data_integration",
          text: "To what extent have you integrated customer data across service, sales, and marketing?",
          options: [
            { value: 1, text: "Not integrated - Separate silos" },
            { value: 2, text: "Partially integrated - Some systems connected" },
            { value: 3, text: "Mostly integrated - Working on final connections" },
            { value: 4, text: "Fully integrated - Comprehensive customer view" }
          ]
        },
        {
          id: "data_quality",
          text: "How consistent and standardized is your customer data?",
          options: [
            { value: 1, text: "Inconsistent - Multiple formats and duplicates" },
            { value: 2, text: "Somewhat standardized - Basic formatting rules" },
            { value: 3, text: "Mostly standardized - Few inconsistencies" },
            { value: 4, text: "Highly standardized - Consistent across systems" }
          ]
        }
      ]
    },
    {
      title: "Process Maturity",
      questions: [
        {
          id: "workflow_documentation",
          text: "How well documented are your customer service workflows?",
          options: [
            { value: 1, text: "Not documented - Tribal knowledge" },
            { value: 2, text: "Partially documented - Basic processes only" },
            { value: 3, text: "Mostly documented - Some gaps in complex areas" },
            { value: 4, text: "Fully documented - Comprehensive process maps" }
          ]
        },
        {
          id: "automation_current",
          text: "To what extent have you already implemented automation in your CX operations?",
          options: [
            { value: 1, text: "Minimal - Few or no automations" },
            { value: 2, text: "Basic - Simple triggers and macros" },
            { value: 3, text: "Moderate - Multiple automated workflows" },
            { value: 4, text: "Advanced - Sophisticated automation ecosystem" }
          ]
        },
        {
          id: "performance_measurement",
          text: "How robust is your performance measurement framework?",
          options: [
            { value: 1, text: "Basic - Limited metrics tracking" },
            { value: 2, text: "Developing - Key metrics identified but gaps exist" },
            { value: 3, text: "Established - Comprehensive metrics but limited insights" },
            { value: 4, text: "Advanced - Data-driven decision making" }
          ]
        }
      ]
    },
    {
      title: "Technology Readiness",
      questions: [
        {
          id: "zendesk_version",
          text: "Which Zendesk features are currently enabled in your environment?",
          options: [
            { value: 1, text: "Basic features only - No advanced capabilities" },
            { value: 2, text: "Some advanced features - Basic automation and reporting" },
            { value: 3, text: "Most advanced features - Including automation and analytics" },
            { value: 4, text: "All features enabled - Including AI and advanced capabilities" }
          ]
        },
        {
          id: "api_utilization",
          text: "How would you describe your current API utilization?",
          options: [
            { value: 1, text: "Minimal - No API usage" },
            { value: 2, text: "Basic - Simple API connections" },
            { value: 3, text: "Moderate - Multiple API integrations" },
            { value: 4, text: "Advanced - Sophisticated API ecosystem" }
          ]
        },
        {
          id: "tech_resources",
          text: "What technical resources do you have available for AI implementation?",
          options: [
            { value: 1, text: "Limited - No dedicated resources" },
            { value: 2, text: "Basic - Part-time administrator only" },
            { value: 3, text: "Moderate - Dedicated administrator" },
            { value: 4, text: "Extensive - Administrator plus developers" }
          ]
        }
      ]
    },
    {
      title: "Organizational Readiness",
      questions: [
        {
          id: "leadership_support",
          text: "How would you characterize executive support for AI initiatives?",
          options: [
            { value: 1, text: "Limited - No clear executive sponsorship" },
            { value: 2, text: "Moderate - Interest but no formal commitment" },
            { value: 3, text: "Strong - Executive sponsorship" },
            { value: 4, text: "Very Strong - Strategic priority with funding" }
          ]
        },
        {
          id: "change_management",
          text: "How mature is your organization's change management capability?",
          options: [
            { value: 1, text: "Undeveloped - No formal processes" },
            { value: 2, text: "Basic - Simple communication plans" },
            { value: 3, text: "Established - Structured approach to change" },
            { value: 4, text: "Advanced - Comprehensive change framework" }
          ]
        },
        {
          id: "staff_readiness",
          text: "How would you rate your staff's readiness to work alongside AI?",
          options: [
            { value: 1, text: "Resistant - Concerns about job security" },
            { value: 2, text: "Cautious - Willing but apprehensive" },
            { value: 3, text: "Receptive - Interested in possibilities" },
            { value: 4, text: "Enthusiastic - Actively seeking to leverage AI" }
          ]
        }
      ]
    }
  ];
  
  const handleAnswerSelect = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value)
    });
  };
  
  const isCurrentSectionComplete = () => {
    const currentQuestions = sections[currentSection].questions;
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };
  
  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      console.log('Calculating results with answers:', answers);
      const calculatedResults = calculateResults();
      console.log('Calculated results:', calculatedResults);
      setShowResults(true);
    }
  };
  
  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  
  const calculateResults = () => {
    const categories = {
      "Data & Knowledge Foundation": ["knowledge_quality", "data_integration", "data_quality"],
      "Process Maturity": ["workflow_documentation", "automation_current", "performance_measurement"],
      "Technology Readiness": ["zendesk_version", "api_utilization", "tech_resources"],
      "Organizational Readiness": ["leadership_support", "change_management", "staff_readiness"]
    };
    
    const results = {};
    
    Object.entries(categories).forEach(([category, questionIds]) => {
      const scores = questionIds.map(id => answers[id] || 0);
      const total = scores.reduce((a, b) => a + b, 0);
      const max = questionIds.length * 4;
      const percentage = Math.round((total / max) * 100);
      results[category] = percentage;
    });
    
    const overallScore = Math.round(
      Object.values(results).reduce((a, b) => a + b, 0) / Object.keys(results).length
    );
    
    return {
      categoryScores: results,
      overallScore
    };
  };
  
  const getRecommendations = (results) => {
    const recommendations = {
      "Data & Knowledge Foundation": [
        "Review and enhance your knowledge base content",
        "Implement data integration strategies",
        "Standardize customer data formats"
      ],
      "Process Maturity": [
        "Document key customer service workflows",
        "Implement basic automation where possible",
        "Establish performance metrics"
      ],
      "Technology Readiness": [
        "Enable additional Zendesk features based on your needs",
        "Explore API integration opportunities",
        "Assess technical resource requirements"
      ],
      "Organizational Readiness": [
        "Secure executive sponsorship",
        "Develop change management plans",
        "Provide staff training on new features"
      ]
    };

    return recommendations;
  };
  
  const getImplementationPath = (score) => {
    if (score < 25) {
      return {
        title: "Foundation Building",
        description: "Focus on enabling basic Zendesk features and establishing core processes before implementing AI capabilities.",
        steps: [
          "Enable essential Zendesk features",
          "Document basic workflows",
          "Establish data standards",
          "Train staff on core functionality"
        ]
      };
    } else if (score < 50) {
      return {
        title: "Feature Expansion",
        description: "Begin enabling more advanced features while strengthening your foundation.",
        steps: [
          "Enable automation features",
          "Implement basic integrations",
          "Expand knowledge base",
          "Train on advanced features"
        ]
      };
    } else if (score < 75) {
      return {
        title: "Advanced Features",
        description: "Focus on enabling and utilizing advanced features to prepare for AI implementation.",
        steps: [
          "Enable analytics features",
          "Implement advanced automations",
          "Optimize workflows",
          "Prepare for AI features"
        ]
      };
    } else {
      return {
        title: "AI Readiness",
        description: "You're ready to enable and implement AI features in your Zendesk environment.",
        steps: [
          "Enable AI features",
          "Implement AI-powered workflows",
          "Train staff on AI capabilities",
          "Monitor and optimize AI performance"
        ]
      };
    }
  };
  
  const results = showResults ? calculateResults() : null;
  const recommendations = results ? getRecommendations(results) : [];
  const implementationPath = results ? getImplementationPath(results.overallScore) : null;
  
  const getCurrentSectionData = () => {
    return sections[currentSection];
  };
  
  const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0);
  const completedQuestions = Object.keys(answers).length;
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="assessment-container">
        <div className="mb-8 text-center">
          <h1>Zendesk Premier</h1>
          <h2>AI Readiness Assessment</h2>
        </div>
        
        {!showResults ? (
          <div className="space-y-8">
            <div className="results-section">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-medium text-matcha">
                  Section {currentSection + 1} of {sections.length}: {getCurrentSectionData().title}
                </span>
                <span className="text-matcha">
                  {Math.round((completedQuestions / totalQuestions) * 100)}% Complete
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-6">
              {getCurrentSectionData().questions.map((question) => (
                <div key={question.id} className="question-card">
                  <p className="text-xl font-medium text-matcha mb-6">{question.text}</p>
                  
                  <div className="space-y-4">
                    {question.options.map((option) => (
                      <label 
                        key={option.value} 
                        className={`option-label ${answers[question.id] === option.value ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={() => handleAnswerSelect(question.id, option.value)}
                          className="mr-4"
                        />
                        <span className="text-lg">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={goToPreviousSection}
                disabled={currentSection === 0}
                className={`btn-secondary ${currentSection === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous Section
              </button>
              
              <button
                onClick={goToNextSection}
                disabled={!isCurrentSectionComplete()}
                className={`btn-primary ${!isCurrentSectionComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {currentSection < sections.length - 1 ? 'Next Section' : 'View Results'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="results-section">
              <h3>Your AI Readiness Results</h3>
              
              <div className="mb-12">
                <div className="score-display">
                  <span className="text-2xl font-medium">Overall Readiness Score</span>
                  <span className="text-4xl font-bold text-matcha">{results.overallScore}%</span>
                </div>
                <div className="progress-bar mt-4">
                  <div
                    className="progress-fill"
                    style={{ width: `${results.overallScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-8 mb-12">
                {Object.entries(results.categoryScores).map(([category, score]) => (
                  <div key={category}>
                    <div className="score-display">
                      <span className="text-xl font-medium">{category}</span>
                      <span className="text-2xl font-semibold text-matcha">{score}%</span>
                    </div>
                    <div className="progress-bar mt-2">
                      <div
                        className="progress-fill"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-12">
                <h4>Implementation Path</h4>
                <div className="recommendation-card">
                  <p className="text-xl font-semibold text-matcha mb-4">{implementationPath.title}</p>
                  <p className="mb-6">{implementationPath.description}</p>
                  <ul className="space-y-3">
                    {implementationPath.steps.map((step, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-matcha mr-3">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4>Key Recommendations</h4>
                <div className="space-y-6">
                  {Object.entries(recommendations).map(([category, recs], index) => (
                    <div key={index} className="recommendation-card">
                      <p className="text-xl font-semibold text-matcha mb-4">{category}</p>
                      <ul className="space-y-3">
                        {recs.map((rec, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-matcha mr-3">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="results-section">
              <h4>Next Steps with Zendesk Premier</h4>
              <p className="mb-6">
                Your Technical Account Manager will use these results to develop a customized AI implementation roadmap tailored to your organization's readiness level. This will include:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Detailed gap analysis and remediation plan',
                  'Prioritized AI use case recommendations',
                  'Timeline for phased implementation',
                  'Resource planning and change management approach',
                  'ROI projections and success metrics'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-matcha mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-matcha text-sm italic">
                To schedule a detailed review of your assessment results with a Zendesk AI specialist, please contact your Technical Account Manager.
              </p>
            </div>
            
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentSection(0);
                  setShowResults(false);
                }}
                className="btn-secondary"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReadinessAssessment; 