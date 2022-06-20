const questions: IQuestion[] = [
    {
        question: "sdf sdf sЧто будет выведено в консоль?",
        exampleCode: `console.log(typeof null)`.trim(),
        answersList: ["[object]", "[null]", "[undefined]", "Error"],
        correctAnswers: ["[object]"]
    },
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `function func() {
                            return 0;
                      }

                      console.log(typeof func)`,
        answersList: ["[object]", "[function]", "[undefined]", "Error"],
        correctAnswers: ["[function]"]
    },
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `console.log(typeof 1/0)
                        `.trim(),
        answersList: ["Infinity", "NaN", "[number]", "Error"],
        correctAnswers: ["NaN"],
    }
]


import type { NextApiHandler } from 'next'
import { IQuestion } from '../../components/test/Test.slice'

const questionsHandler: NextApiHandler = async (request, response) => {


    // simulate IO latency
    await new Promise((resolve) => setTimeout(resolve, 100))

    response.json({ questions })
}

export default questionsHandler;