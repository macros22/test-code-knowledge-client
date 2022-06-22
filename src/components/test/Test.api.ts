import { GET_QUESTION_URL } from "constants/urls";
import { Question } from "interfaces/questions.interface";

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

export async function fetchQuestions(): Promise<Question[] > {

 


    const response = await fetch(GET_QUESTION_URL, {method:'GET'});
    const result = await response.json();
    
    return result
}