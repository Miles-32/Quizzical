import { useState, useEffect } from "react";
import clsx from "clsx";
import { decode } from "he";
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

  useEffect(() => {
    if (screen === "quiz" && questions.length > 0) {
      setTimeout(() => window.scrollTo(0, 0), 0)
    }
  }, [questions])

  
  const questionsLength = questions.length;
  const numCorrect = questions.filter((question, qi) => selectedAnswers[qi] === question.correct).length;

  const questionElements = questions.map((question, qi) => {
    return (
      <fieldset key={qi} className="question-container">
        <legend className="question">{question.question}</legend>
        <div className="answers-container" role="group" aria-label={`Answers for question ${qi + 1}`}>
          {question.answers.map((answer) => {
            const isSelected = selectedAnswers[qi] === answer;
            const isCorrect = answer === question.correct;
            let ariaLabel = answer;
            
            if (gameOver) {
              if (isCorrect) {
                ariaLabel = `${answer}, correct answer`;
              } else if (isSelected && !isCorrect) {
                ariaLabel = `${answer}, incorrect answer`;
              }
            }
            
            return (
              <button
                className={clsx("answer-button", {
                  selected: isSelected,
                  correct: gameOver && answer === question.correct,
                  incorrect: gameOver && isSelected && answer !== question.correct
                })}
                key={answer}
                onClick={() => setSelectedAnswers((prev) => ({ ...prev, [qi]: answer }))}
                disabled={gameOver}
                aria-label={ariaLabel}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  });

  // Static Values //
  function shuffleAnswers(answers) {
    const answersShuffled = [...answers]  
    for (let i = answers.length - 1; i > 0; i--) {
        const randomNum = Math.floor(Math.random() * (i + 1));
        [answersShuffled[i], answersShuffled[randomNum]] = [answersShuffled[randomNum], answersShuffled[i]]
      }
      return answersShuffled;
  }

  async function getQuestions(amount = 5, difficulty = "easy") {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=9&type=multiple&difficulty=${difficulty}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.results.map((result) => {
      const question = decode(result.question);
      const correctAnswer = decode(result.correct_answer);
      const answers = [correctAnswer, ...result.incorrect_answers.map(decode)];
      return {
        question,
        answers: shuffleAnswers(answers),
        correct: correctAnswer
      };
    });
  }

  function checkAnswers() {
    let numCorrect = 0;
    questions.forEach((question, qi) => {
      if (selectedAnswers[qi] === question.correct) numCorrect++;
    });
    setGameOver(true);
  }

  // Main Application //
  return (
    <>
      <main aria-label="Quizzical quiz application">
        {screen === "start" && (
          <>
            <h1>Quizzical</h1>
            <p className="start-description">Test your knowledge - <span className="italic">how much do you know?</span> 🤔</p>
            <div className="question-count-container">
              <label htmlFor="question-count-input" className="start-description">Number of questions:</label>
              <select id="question-count-input" className="question-count-select" value={questionCount} onChange={(e) => setQuestionCount(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="question-count-container">
              <label htmlFor="question-difficulty-input" className="start-description">Difficulty:</label>
              <select id="question-difficulty-input" className="question-count-select" value={questionDifficulty} onChange={(e) => setQuestionDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button className="start-btn" onClick={handleStartClick} aria-label="Start the quiz">Start quiz</button>
          </>
        )}
        {screen === "quiz" && (
          <>
            <h2 className="sr-only">Question {questions.length > 0 ? `1 of ${questions.length}` : ''}</h2>
            {questionElements}
            <section className="submit-section">
              {gameOver ?
                <>
                  <p className="score" role="status" aria-live="polite">You scored {numCorrect} out of {questionsLength}</p>
                  <div className="buttons-container">
                    <button className="submit-btn" onClick={handleStartClick}>Play again</button>
                    <button className="submit-btn" onClick={() => setScreen("start")}>Back to start</button>
                  </div>
                </> :
                <button className="submit-btn" onClick={checkAnswers}>Check answers</button>}
            </section>
          </>
        )}
      </main>
      <BlobBlue className={screen === "quiz" ? "blob-blue tucked" : "blob-blue"} />
      <BlobYellow className="blob-yellow" />
    </>
  );
}
