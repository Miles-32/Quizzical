import { useState, useEffect } from "react";
import { getQuestions } from "./utility/quizUtilities";
import type { Question } from "./utility/quizUtilities";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import BlobBlue from "./components/BlobBlue";
import BlobYellow from "./components/BlobYellow";

export type SelectedAnswer = {
  questionIndex: number;
  answer: string;
}

export default function App() {
  // States //
  const [screen, setScreen] = useState("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [questionDifficulty, setQuestionDifficulty] = useState("easy");

  // Derived Values //
  async function handleStartClick() {
    const questions = await getQuestions(questionCount, questionDifficulty)
    setGameOver(false)
    setSelectedAnswers([])
    setQuestions(questions)
    setScreen("quiz")
  }

  function handleSelectAnswer(questionIndex: number, answer: string):void {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = { questionIndex, answer };
      return updated;
    });
  }

  function handleCheckAnswers() {
    setGameOver(true);
  }

  function handleBackToStart() {
    setScreen("start");
  }

  useEffect(() => {
    if (screen === "quiz" && questions.length > 0) {
      setTimeout(() => window.scrollTo(0, 0), 0)
    }
  }, [questions])

  // Main Application //
  return (
    <>
      <main aria-label="Quizzical: a trivia app">
        {screen === "start" && (
          <StartScreen
            questionCount={questionCount}
            questionDifficulty={questionDifficulty}
            setQuestionCount={setQuestionCount}
            setQuestionDifficulty={setQuestionDifficulty}
            handleStartClick={handleStartClick}
          />
        )}

        {screen === "quiz" && (
          <QuizScreen
            questions={questions}
            selectedAnswers={selectedAnswers}
            gameOver={gameOver}
            selectAnswer={handleSelectAnswer}
            checkAnswers={handleCheckAnswers}
            playAgain={handleStartClick}
            backToStart={handleBackToStart}
          />
        )}
      </main>
      <BlobBlue className={screen === "quiz" ? "blob-blue tucked" : "blob-blue"} />
      <BlobYellow className="blob-yellow" />
    </>
  );
}
