import clsx from "clsx";

export type QuestionProps = {
  question: string;
  answers: string[];
  isSelected: string | null;
  isCorrect: string;
  selectAnswer: (answer: string) => void;
  gameOver: boolean;
};

export default function Question({
  question,
  answers,
  isSelected,
  isCorrect,
  selectAnswer,
  gameOver,
}: QuestionProps) {
  return (
    <fieldset className="question-container">
      <legend className="question">{question}</legend>
      <div className="answers-container" role="group">
        {answers.map((answer: string) => {
          const selected = isSelected === answer;
          const correct = answer === isCorrect;
          let ariaLabel = answer;

          if (gameOver) {
            if (correct) {
              ariaLabel = `${answer}, correct answer`;
            } else if (selected && !correct) {
              ariaLabel = `${answer}, incorrect answer`;
            }
          }

          return (
            <button
              className={clsx("answer-button", {
                selected: selected,
                correct: gameOver && correct,
                incorrect: gameOver && selected && !correct
              })}
              key={answer}
              onClick={() => selectAnswer(answer)}
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
}
