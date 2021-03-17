export interface QuizSubmissionDTO {
  score: number | null;
  questions: Array<Array<String | Number>>;
}
