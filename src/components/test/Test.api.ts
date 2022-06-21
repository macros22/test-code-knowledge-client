import { Question } from "interfaces/questions.interface";


export async function fetchQuestions(): Promise<Question[] > {
    const response = await fetch('http://localhost:3004/questions', {method:'GET'});
    const result = await response.json();
    
    return result
}