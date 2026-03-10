import { useState, useEffect } from "react";
import { getQuestions } from "./utility/quizUtilities";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import BlobBlue from "./components/BlobBlue";
import BlobYellow from "./components/BlobYellow";

export default function App() {
  // States //
  const [screen, setScreen] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // key: question index -> answer text, e.g. {0: "blue"}
  const [gameOver, setGameOver] = useState(false);
  const [questionCount, setQuestionCount] = useState("5");
  const [questionDifficulty, setQuestionDifficulty] = useState("easy");

  // Derived Values //
  async function handleStartClick() {
    const questions = await getQuestions(questionCount, questionDifficulty)
    setGameOver(false)
    setSelectedAnswers({})
    setQuestions(questions)
    setScreen("quiz")
  }

  function handleSelectAnswer(questionIndex, answer) {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
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
