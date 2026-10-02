import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { elements, categoryLabels, type Element } from "@/data/elements";
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import type { QuizCategory, QuizDifficulty } from "@/pages/Quiz";
import Navbar from "@/components/layout/Navbar";

interface QuizGameProps {
  categories: QuizCategory[];
  difficulty: QuizDifficulty;
  onEnd: () => void;
}

const BASE_CATEGORIES: QuizCategory[] = ["symbols", "atomic-numbers", "electron-config", "categories"];

/** "Mixed" stands in for all four base categories; dedupe once expanded. */
const expandCategories = (categories: QuizCategory[]): QuizCategory[] => {
  const expanded = categories.flatMap((c) => (c === "mixed" ? BASE_CATEGORIES : [c]));
  const unique = Array.from(new Set(expanded));
  return unique.length > 0 ? unique : BASE_CATEGORIES;
};

interface Question {
  question: string;
  correctAnswer: string;
  options: string[];
  element: Element;
  type: QuizCategory;
}

const questionCounts: Record<QuizDifficulty, number> = {
  easy: 5,
  medium: 10,
  hard: 15,
};

// Get random elements for questions
function getRandomElements(count: number): Element[] {
  const shuffled = [...elements].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate wrong options
function getWrongOptions(correct: string, allOptions: string[], count: number = 3): string[] {
  const filtered = allOptions.filter(opt => opt !== correct);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate questions cycling through every selected category
function generateQuestions(categories: QuizCategory[], count: number): Question[] {
  const selectedElements = getRandomElements(count);
  const pool = expandCategories(categories);

  return selectedElements.map((element, i) => {
    const type = pool[i % pool.length];
    
    switch (type) {
      case "symbols": {
        const correctAnswer = element.symbol;
        const allSymbols = elements.map(e => e.symbol);
        const wrongOptions = getWrongOptions(correctAnswer, allSymbols);
        return {
          question: `What is the symbol for ${element.name}?`,
          correctAnswer,
          options: [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5),
          element,
          type,
        };
      }
      case "atomic-numbers": {
        const correctAnswer = element.atomicNumber.toString();
        const wrongOptions = [
          (element.atomicNumber + 1).toString(),
          (element.atomicNumber - 1).toString(),
          (element.atomicNumber + 2).toString(),
        ].filter(n => parseInt(n) > 0 && parseInt(n) <= 118);
        while (wrongOptions.length < 3) {
          wrongOptions.push((Math.floor(Math.random() * 118) + 1).toString());
        }
        return {
          question: `What is the atomic number of ${element.name} (${element.symbol})?`,
          correctAnswer,
          options: [...wrongOptions.slice(0, 3), correctAnswer].sort(() => Math.random() - 0.5),
          element,
          type,
        };
      }
      case "electron-config": {
        const correctAnswer = element.electronShells.join("-");
        const wrongShells = elements
          .filter(e => e.atomicNumber !== element.atomicNumber)
          .map(e => e.electronShells.join("-"));
        const wrongOptions = getWrongOptions(correctAnswer, wrongShells);
        return {
          question: `What is the electron shell configuration of ${element.name} (${element.symbol})?`,
          correctAnswer,
          options: [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5),
          element,
          type,
        };
      }
      case "categories":
      default: {
        const correctAnswer = categoryLabels[element.category];
        const allCategories = Object.values(categoryLabels);
        const wrongOptions = getWrongOptions(correctAnswer, allCategories);
        return {
          question: `What category does ${element.name} (${element.symbol}) belong to?`,
          correctAnswer,
          options: [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5),
          element,
          type,
        };
      }
    }
  });
}

const QuizGame = ({ categories, difficulty, onEnd }: QuizGameProps) => {
  const questionCount = questionCounts[difficulty];
  const questions = useMemo(
    () => generateQuestions(categories, questionCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- categories is an array; re-run only when its contents actually change
    [categories.join(","), questionCount],
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  // Results screen
  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : "Keep Practicing!";
    
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-saffron to-magenta flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">Here's how you did</p>
            
            <div className="bg-card/50 border border-white/10 rounded-2xl p-8 mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-cyanine to-viridian bg-clip-text text-transparent mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-2xl text-muted-foreground mb-4">{percentage}%</p>
              <div className="inline-block px-4 py-2 rounded-full bg-iris/20 text-iris font-semibold">
                {grade}
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button onClick={onEnd} className="bg-gradient-to-r from-iris to-magenta gap-2">
                <Home className="w-4 h-4" />
                Back to Quiz Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-card/50 border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-xs text-iris uppercase tracking-wider mb-2">
            {currentQuestion.type.replace("-", " ")}
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, i) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = "w-full p-4 rounded-xl border text-left transition-all duration-200 ";
              
              if (isAnswered) {
                if (isCorrect) {
                  buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                } else {
                  buttonClass += "bg-white/5 border-white/10 text-muted-foreground opacity-50";
                }
              } else {
                buttonClass += "bg-white/5 border-white/10 text-foreground hover:border-iris hover:bg-iris/10";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback & Next */}
        {isAnswered && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}>
              <p className="text-sm">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <span className="text-green-400">🎉 Correct! Well done!</span>
                ) : (
                  <span className="text-red-400">
                    ❌ Incorrect. The answer is <strong>{currentQuestion.correctAnswer}</strong>
                  </span>
                )}
              </p>
            </div>
            
            <Button 
              onClick={handleNext} 
              className="w-full bg-gradient-to-r from-iris to-magenta gap-2"
            >
              {currentIndex < questions.length - 1 ? (
                <>Next Question <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>See Results <Trophy className="w-4 h-4" /></>
              )}
            </Button>
          </div>
        )}

        {/* Element Preview */}
        <div className="mt-8 text-center">
          <Link 
            to={`/element/${currentQuestion.element.atomicNumber}`}
            className="text-sm text-muted-foreground hover:text-cyanine transition-colors"
          >
            Learn more about {currentQuestion.element.name} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
