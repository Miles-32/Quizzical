import { decode } from "he";

interface Question {
  question: string;
  answers: string[];
  correct: string;
}

export async function getQuestions(
  amount: number = 5,
  difficulty: string = "easy"
): Promise<Question[]> {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=9&type=multiple&difficulty=${difficulty}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.results.map((result: any) => {
    const question = decode(result.question);
    const correctAnswer = decode(result.correct_answer);
    const answers = [correctAnswer, ...result.incorrect_answers.map(decode)];
    return {
      question,
      answers: shuffleAnswers(answers),
      correct: correctAnswer,
    };
  });
}

function shuffleAnswers(answers: string[]): string[] {
  const answersShuffled = [...answers];
  for (let i = answers.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));
    [answersShuffled[i], answersShuffled[randomNum]] = [
      answersShuffled[randomNum],
      answersShuffled[i],
    ];
  }
  return answersShuffled;
}
