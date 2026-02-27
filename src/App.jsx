import { useState } from "react";
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

  // Derived Values //
  async function handleStartClick() {
    const questions = await getQuestions()
    setGameOver(false)
    setSelectedAnswers({})
    setQuestions(questions)
    setScreen("quiz")
  }

  console.log(questions)
  console.log(selectedAnswers)
  const questionsLength = questions.length;
  const numCorrect = questions.filter((question, qi) => selectedAnswers[qi] === question.correct).length;

  const questionElements = questions.map((question, qi) => {
    return (
      <div className="question-container" key={qi}>
        <h2 className="question">{question.question}</h2>
        <div className="answers-container">
          {question.answers.map((answer) => {
            const isSelected = selectedAnswers[qi] === answer;
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
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
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

  async function getQuestions() {
    const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple");
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
    console.log(numCorrect)
    setGameOver(true);
  }

  // Main Application //
  return (
    <>
      <main>
        {screen === "start" && (
          <>
            <h1>Quizzical</h1>
            <p className="start-description">Test your knowledge with our quiz app!</p>
            <button className="start-btn" onClick={handleStartClick}>Start quiz</button>
          </>
        )}
        {screen === "quiz" && (
          <>
            {questionElements}
            <section className="submit-section">
              {gameOver ?
                <>
                  <p className="score">You scored {numCorrect} out of {questionsLength}</p>
                  <button className="submit-btn" onClick={handleStartClick}>Play again</button>
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
