import { IQuestion } from "./Test.slice"

export async function fetchQuestions(): Promise<{ questions: IQuestion[] }> {
    const response = await fetch('/api/questions', {method:'GET'});
    const result = await response.json()

    return result
}