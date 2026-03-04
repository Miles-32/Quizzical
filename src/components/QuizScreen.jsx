import Question from "./Question";

export default function QuizScreen({
    questions,
    selectedAnswers,
    gameOver,
    selectAnswer,
    checkAnswers,
    playAgain,
    backToStart
}) {
    const questionElements = questions.map((question, qi) => (
        <Question
            key={qi}
            question={question.question}
            answers={question.answers}
            isSelected={selectedAnswers[qi]}
            isCorrect={question.correct}
            selectAnswer={(answer) => selectAnswer(qi, answer)}
            gameOver={gameOver}
        />
    ));
    const questionsLength = questions.length;
    const numCorrect = questions.filter((question, qi) => selectedAnswers[qi] === question.correct).length;

    return (
        <>
            <h2 className="sr-only">
                Question {questions.length > 0 ? `1 of ${questions.length}` : ''}
            </h2>
            {questionElements}
            <section className="submit-section">
                {gameOver ?
                <>
                    <p className="score" role="status" aria-live="polite">You scored {numCorrect} out of {questionsLength}</p>
                    <div className="buttons-container">
                    <button className="submit-btn" onClick={playAgain}>Play again</button>
                    <button className="submit-btn" onClick={backToStart}>Back to start</button>
                    </div>
                </> :
                <button className="submit-btn" onClick={checkAnswers}>Check answers</button>}
            </section>
        </>
    )
}