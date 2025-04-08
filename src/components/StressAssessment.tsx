
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  assessmentQuestions, 
  analyzeStressResults, 
  getRecommendations,
  StressType,
  StressLevel
} from '@/utils/stressAssessmentUtils';
import RecommendationCard from './RecommendationCard';
import YogaVideoCard from './YogaVideoCard';
import ArticleCard from './ArticleCard';

const StressAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [stressResults, setStressResults] = useState<{
    primaryStressType: StressType;
    stressLevel: StressLevel;
    scores: Record<StressType, number>;
  } | null>(null);
  const [recommendations, setRecommendations] = useState<{
    yogaPractices: {title: string; description: string; videoUrl: string}[];
    remedies: string[];
    articles: {title: string; description: string; url: string}[];
  } | null>(null);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeAssessment = () => {
    const results = analyzeStressResults(answers);
    setStressResults(results);
    
    const recs = getRecommendations(results.primaryStressType, results.stressLevel);
    setRecommendations(recs);
    
    setAssessmentComplete(true);
  };

  const restartAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setAssessmentComplete(false);
    setStressResults(null);
    setRecommendations(null);
  };

  const getStressLevelColor = (level: StressLevel) => {
    switch(level) {
      case 'Low': return 'text-green-500';
      case 'Moderate': return 'text-yellow-500';
      case 'High': return 'text-orange-500';
      case 'Severe': return 'text-red-500';
      default: return 'text-primary';
    }
  };

  return (
    <div id="assessment" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Stress Assessment</h2>
        <p className="text-lg text-muted-foreground">
          Answer a few questions to receive personalized stress management recommendations
          tailored to your unique stress profile.
        </p>
      </div>

      {!assessmentComplete ? (
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1} of {assessmentQuestions.length}</CardTitle>
            <CardDescription>Select the option that best describes your situation</CardDescription>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h3 className="text-xl font-medium">{currentQuestion.text}</h3>
              <RadioGroup 
                value={answers[currentQuestion.id]?.toString()} 
                onValueChange={(value) => handleAnswer(parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined}
            >
              {currentQuestionIndex < assessmentQuestions.length - 1 ? 'Next' : 'Complete'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-12">
          {stressResults && (
            <Card className="max-w-3xl mx-auto shadow-lg animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Your Stress Assessment Results</CardTitle>
                <CardDescription>Based on your answers, we've analyzed your stress profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-center p-4 border rounded-lg bg-background">
                      <h3 className="text-lg font-medium text-muted-foreground">Primary Stress Type</h3>
                      <p className="text-3xl font-bold text-primary">{stressResults.primaryStressType}</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-background">
                      <h3 className="text-lg font-medium text-muted-foreground">Overall Stress Level</h3>
                      <p className={`text-3xl font-bold ${getStressLevelColor(stressResults.stressLevel)}`}>
                        {stressResults.stressLevel}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Stress Category Breakdown</h3>
                    {Object.entries(stressResults.scores).map(([category, score]) => {
                      const maxScore = 9; // 3 questions per category, max 3 points each
                      const percentage = (score / maxScore) * 100;
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span>{score}/{maxScore}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" onClick={restartAssessment}>Retake Assessment</Button>
              </CardFooter>
            </Card>
          )}
          
          {recommendations && (
            <div className="space-y-16 mt-16">
              <div id="yoga">
                <h3 className="text-2xl font-bold text-center mb-8">Recommended Yoga Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.yogaPractices.map((practice, index) => (
                    <YogaVideoCard
                      key={index}
                      title={practice.title}
                      description={practice.description}
                      videoUrl={practice.videoUrl}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-center mb-8">Daily Remedies & Techniques</h3>
                <RecommendationCard techniques={recommendations.remedies} />
              </div>
              
              <div id="articles">
                <h3 className="text-2xl font-bold text-center mb-8">Recommended Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.articles.map((article, index) => (
                    <ArticleCard
                      key={index}
                      title={article.title}
                      description={article.description}
                      url={article.url}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StressAssessment;
