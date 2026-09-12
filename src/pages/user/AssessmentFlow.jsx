import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { assessmentAPI } from '../../api/endpoints';
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

export const AssessmentFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const { data } = await assessmentAPI.getById(id);
        setAssessment(data.assessment);
      } catch (err) {
        setError('Failed to load assessment. It may not exist or you might not have access.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [id]);

  const handleSelectOption = (optionIndex, score) => {
    const newResponses = [...responses];
    const existingIndex = newResponses.findIndex(r => r.questionIndex === currentIndex);
    
    if (existingIndex >= 0) {
      newResponses[existingIndex] = { questionIndex: currentIndex, selectedOptionIndex: optionIndex, score };
    } else {
      newResponses.push({ questionIndex: currentIndex, selectedOptionIndex: optionIndex, score });
    }
    
    setResponses(newResponses);
    
    // Auto-advance after a short delay for better UX
    setTimeout(() => {
      if (currentIndex < assessment.questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 400);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await assessmentAPI.submit({
        assessmentId: id,
        responses
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit assessment.');
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  
  if (error) return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card padding="lg" className="text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-danger mx-auto" />
        <h2 className="text-xl font-bold text-primary">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Button onClick={() => navigate('/app/assessments')}>Back to Assessments</Button>
      </Card>
    </div>
  );

  if (!assessment) return null;

  if (submitted) return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card padding="lg" className="text-center space-y-6">
        <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-teal" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-primary">Assessment Complete</h2>
        <p className="text-gray-600">Thank you for completing the {assessment.name}. Your responses have been saved.</p>
        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={() => navigate('/app/snapshot')}>View Wellbeing Snapshot</Button>
          <Button variant="outline" onClick={() => navigate('/app/assessments')}>Back to Assessments</Button>
        </div>
      </Card>
    </div>
  );

  const currentQuestion = assessment.questions[currentIndex];
  const currentResponse = responses.find(r => r.questionIndex === currentIndex);
  const progress = ((currentIndex) / assessment.questions.length) * 100;
  const isLastQuestion = currentIndex === assessment.questions.length - 1;
  const allAnswered = responses.length === assessment.questions.length;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">{assessment.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{assessment.instructions}</p>
          </div>
          <span className="text-sm font-medium text-teal bg-teal-light/30 px-3 py-1 rounded-full">
            {currentIndex + 1} of {assessment.questions.length}
          </span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <Card padding="lg" className="min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-xl font-medium text-primary">
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentResponse?.selectedOptionIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx, option.score)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-teal bg-teal-light/20 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isSelected ? 'text-teal-dark' : 'text-gray-700'}`}>
                        {option.text}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                      {!isSelected && (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0 || submitting}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              loading={submitting}
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentIndex(Math.min(assessment.questions.length - 1, currentIndex + 1))}
              disabled={!currentResponse}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};