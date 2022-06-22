import axios from "axios";
import { GET_QUESTIONS_URL, POST_QUESTIONS_URL } from "constants/urls";
import { Question } from "interfaces/questions.interface";
import QuestionsPage from "pages/questions";

// const question = {
//     question: `sdf sdf sЧто будет выведено в консоль?`,
//     exampleCode: 
//     `console.log(typeof null);
//         console.log(typeof null);
//         console.log(typeof null);
//         console.log(typeof null);`,
//     answersList: [
//       "[object]",
//       "[null]",
//       "[undefined]",
//       "Error"
//     ],
//     correctAnswers: [
//       "[object]"
//     ]
//   }; 
  
//   let resp = await fetch('http://localhost:3004/questions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(question)
//   });

export async function fetchQuestions(): Promise<Question[] | null > {

    const response = await axios.get(GET_QUESTIONS_URL);

    return response.data;
}

export async function postQuestion(question: Question){

    const response = await axios.post(POST_QUESTIONS_URL, question);

    console.log(response);
    // return response.data;
}