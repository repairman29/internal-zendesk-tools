import { useState } from 'react';

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
          text: "Are you on the latest version of Zendesk products?",
          options: [
            { value: 1, text: "No - Multiple versions behind" },
            { value: 2, text: "Somewhat - One version behind" },
            { value: 3, text: "Yes - Current version" },
            { value: 4, text: "Yes - Current version with beta features enabled" }
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
    const { categoryScores, overallScore } = results;
    
    const recommendations = [];
    
    // Data recommendations
    if (categoryScores["Data & Knowledge Foundation"] < 50) {
      recommendations.push({
        category: "Data & Knowledge Foundation",
        actions: [
          "Conduct a comprehensive knowledge base audit and update",
          "Implement a data integration strategy across customer touchpoints",
          "Establish data quality standards and cleansing processes"
        ]
      });
    } else if (categoryScores["Data & Knowledge Foundation"] < 75) {
      recommendations.push({
        category: "Data & Knowledge Foundation",
        actions: [
          "Fill specific knowledge gaps identified in assessment",
          "Complete remaining data integration points",
          "Implement ongoing knowledge management processes"
        ]
      });
    }
    
    // Process recommendations
    if (categoryScores["Process Maturity"] < 50) {
      recommendations.push({
        category: "Process Maturity",
        actions: [
          "Document key customer service workflows and decision points",
          "Implement basic automation for routine processes",
          "Establish core performance metrics and reporting"
        ]
      });
    } else if (categoryScores["Process Maturity"] < 75) {
      recommendations.push({
        category: "Process Maturity",
        actions: [
          "Enhance workflow documentation with decision trees for edge cases",
          "Expand automation to more complex scenarios",
          "Develop advanced analytics for predictive insights"
        ]
      });
    }
    
    // Technology recommendations
    if (categoryScores["Technology Readiness"] < 50) {
      recommendations.push({
        category: "Technology Readiness",
        actions: [
          "Upgrade to latest Zendesk versions",
          "Develop basic API integration capabilities",
          "Allocate dedicated technical resources for implementation"
        ]
      });
    } else if (categoryScores["Technology Readiness"] < 75) {
      recommendations.push({
        category: "Technology Readiness",
        actions: [
          "Enable beta features for advanced capabilities",
          "Expand API ecosystem for richer data exchange",
          "Cross-train additional technical resources"
        ]
      });
    }
    
    // Organizational recommendations
    if (categoryScores["Organizational Readiness"] < 50) {
      recommendations.push({
        category: "Organizational Readiness",
        actions: [
          "Secure executive sponsorship for AI initiatives",
          "Develop basic change management approach",
          "Address staff concerns through education and involvement"
        ]
      });
    } else if (categoryScores["Organizational Readiness"] < 75) {
      recommendations.push({
        category: "Organizational Readiness",
        actions: [
          "Expand executive involvement to broader leadership team",
          "Enhance change management with detailed impact analysis",
          "Create AI champions program among staff"
        ]
      });
    }
    
    // If all areas are strong but could use some refinement
    if (overallScore >= 75 && overallScore < 90) {
      recommendations.push({
        category: "Fine-Tuning",
        actions: [
          "Conduct advanced AI strategy workshop with leadership",
          "Develop comprehensive AI governance framework",
          "Create centers of excellence for knowledge, change management, and technical implementation"
        ]
      });
    }
    
    // If organization is highly ready
    if (overallScore >= 90) {
      recommendations.push({
        category: "Advanced Implementation",
        actions: [
          "Begin phased implementation of sophisticated AI use cases",
          "Establish AI innovation lab for ongoing experimentation",
          "Develop metrics for measuring AI impact on business outcomes"
        ]
      });
    }
    
    return recommendations;
  };
  
  const getImplementationPath = (score) => {
    if (score < 40) {
      return {
        title: "Foundation Building",
        description: "Focus on establishing the fundamental building blocks before implementing AI capabilities.",
        timeline: "6-9 months preparation before initial AI implementation",
        approach: "Start with knowledge base enhancement and basic chatbots while building broader capabilities."
      };
    } else if (score < 60) {
      return {
        title: "Targeted Implementation",
        description: "Address specific readiness gaps while implementing AI in well-prepared areas.",
        timeline: "3-6 months preparation with phased implementation",
        approach: "Begin with specific use cases in areas of strength while developing capabilities in weaker areas."
      };
    } else if (score < 80) {
      return {
        title: "Accelerated Adoption",
        description: "Rapidly implement AI across multiple areas with focused enhancements in specific domains.",
        timeline: "1-3 months preparation with broad implementation",
        approach: "Implement multiple AI capabilities simultaneously while addressing minor gaps."
      };
    } else {
      return {
        title: "Advanced Implementation",
        description: "Full-scale implementation with sophisticated use cases and continuous innovation.",
        timeline: "Immediate implementation with continuous enhancement",
        approach: "Deploy comprehensive AI strategy across all customer touchpoints with ongoing optimization."
      };
    }
  };
  
  const results = showResults ? calculateResults() : null;
  const recommendations = results ? getRecommendations(results) : [];
  const implementationPath = results ? getImplementationPath(results.overallScore) : null;
  
  const getCurrentSection = () => {
    return sections[currentSection];
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Zendesk Premier Enterprise</h1>
      <h2 className="text-xl font-semibold text-blue-600 mb-6">AI Readiness Assessment</h2>
      
      {!showResults ? (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">
                Section {currentSection + 1} of {sections.length}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {Math.round((Object.keys(answers).length / sections.reduce((acc, section) => acc + section.questions.length, 0)) * 100)}% Complete
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(currentSection + 1) / sections.length * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {getCurrentSection().title}
            </h3>
            
            <div className="space-y-6">
              {getCurrentSection().questions.map((question) => (
                <div key={question.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-gray-700 mb-3">{question.text}</p>
                  
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option.value} className="flex items-start">
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={() => handleAnswerSelect(question.id, option.value)}
                          className="mt-1"
                        />
                        <span className="ml-2 text-gray-600">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={goToPreviousSection}
              disabled={currentSection === 0}
              className={`py-2 px-4 rounded font-medium ${
                currentSection === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={goToNextSection}
              disabled={!isCurrentSectionComplete()}
              className={`py-2 px-4 rounded font-medium ${
                isCurrentSectionComplete()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-300 text-white cursor-not-allowed'
              }`}
            >
              {currentSection < sections.length - 1 ? 'Next' : 'View Results'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your AI Readiness Assessment Results</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Overall Readiness Score</span>
                <span className="text-lg font-bold text-blue-600">{results.overallScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    results.overallScore >= 70 
                      ? 'bg-green-500' 
                      : results.overallScore >= 40 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                  }`} 
                  style={{ width: `${results.overallScore}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{category}</span>
                    <span className="text-sm font-medium text-gray-700">{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        score >= 70 
                          ? 'bg-green-500' 
                          : score >= 40 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`} 
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Recommended Implementation Path</h4>
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold text-blue-800">{implementationPath.title}</p>
                <p className="text-sm text-blue-700 mb-2">{implementationPath.description}</p>
                <p className="text-sm text-blue-700"><strong>Timeline:</strong> {implementationPath.timeline}</p>
                <p className="text-sm text-blue-700"><strong>Approach:</strong> {implementationPath.approach}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-3">Key Recommendations</h4>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                    <p className="font-medium text-gray-700 mb-2">{rec.category}</p>
                    <ul className="list-disc list-inside space-y-1">
                      {rec.actions.map((action, idx) => (
                        <li key={idx} className="text-sm text-gray-600">{action}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps with Zendesk Premier Enterprise</h3>
            <p className="text-gray-600 mb-4">
              Your Technical Account Manager will use these results to develop a customized AI implementation roadmap tailored to your organization's readiness level. This will include:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li className="text-gray-600">Detailed gap analysis and remediation plan</li>
              <li className="text-gray-600">Prioritized AI use case recommendations</li>
              <li className="text-gray-600">Timeline for phased implementation</li>
              <li className="text-gray-600">Resource planning and change management approach</li>
              <li className="text-gray-600">ROI projections and success metrics</li>
            </ul>
            <p className="text-sm text-blue-800 italic">
              To schedule a detailed review of your assessment results with a Zendesk AI specialist, please contact your Technical Account Manager.
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => {
                setAnswers({});
                setCurrentSection(0);
                setShowResults(false);
              }}
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-blue-50 p-4 rounded text-sm text-blue-800">
        <p className="font-semibold">Note:</p>
        <p>This assessment tool helps identify your organization's readiness for AI implementation. Your Technical Account Manager will work with you to develop a comprehensive strategy based on these insights, ensuring successful implementation of AI capabilities that align with your business objectives.</p>
      </div>
    </div>
  );
};

export default AIReadinessAssessment; 