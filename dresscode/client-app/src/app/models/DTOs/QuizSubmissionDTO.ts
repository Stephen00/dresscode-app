export interface QuizSubmissionDTO {
  score: number | null;
  questions: Array<Array<number | string>>;
}
