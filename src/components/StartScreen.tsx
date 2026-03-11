import QuizzicalIcon from "./QuizzicalIcon";
import type { JSX } from "react";

type StartScreenProps = {
    questionCount: number
    questionDifficulty: string
    setQuestionCount: (count: number) => void
    setQuestionDifficulty: (difficulty: string) => void
    handleStartClick: () => void
}

export default function StartScreen({
  questionCount,
  questionDifficulty,
  setQuestionCount,
  setQuestionDifficulty,
  handleStartClick
}: StartScreenProps): JSX.Element {
    return (
        <>
            <div className="start-header">
                <QuizzicalIcon size={48} />
                <h1>Quizzical</h1>
            </div>
            <p className="start-description">Test your knowledge - <span className="italic">how much do you know?</span> 🤔</p>

            <div className="question-count-container">
                <label htmlFor="question-count-input" className="start-description">Number of questions:</label>
                <select id="question-count-input" className="question-count-select" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
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
    )
}