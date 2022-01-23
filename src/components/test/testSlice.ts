import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'


export interface IQuestion {
    question: string;
    exampleCode: string;
    answersList: string[];
    userAnswers: string[];
}
export interface AnswersState {
    answersAmount: number,
    questionsAmount: number,
    currentQuestion: number,
    correctAnswers: boolean[],
    checkedAnswers: boolean[][],
    questions: IQuestion[],
}


const questions: IQuestion[] = [
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `console.log(typeof null)`.trim(),
        answersList: ["[object]", "[null]", "[undefined]", "Error"],
        userAnswers: ["[object]"]
    },
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `function func() {
                            return 0;
                      }

                      console.log(typeof func)`,
        answersList: ["[object]", "[function]", "[undefined]", "Error"],
        userAnswers: ["[function]"]
    },
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `console.log(typeof 1/0)
                        `.trim(),
        answersList: ["Infinity", "NaN", "[number]", "Error"],
        userAnswers: ["NaN"],
    }
]


const questionsAmount = 3;
const answersAmount = 4;

const initialState: AnswersState = {
    questionsAmount,
    answersAmount,
    currentQuestion: 0,
    correctAnswers: new Array(questionsAmount).fill(false),
    checkedAnswers: new Array(questionsAmount).fill(new Array(answersAmount).fill(false)),
    questions
}

interface ISetCheckedState {
    questionNumber: number;
    answerNumber: number;
}


export const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        incrementCurrentQuestion: (state) => {
            state.currentQuestion += 1

        },
        decrementCurrentQuestion: (state) => {
            state.currentQuestion -= 1
        },
        setCurrentQuestion: (state, action: PayloadAction<number>) => {
            state.currentQuestion = action.payload
        },
        changeCheckedState: (state, action: PayloadAction<ISetCheckedState>) => {
            state.checkedAnswers[action.payload.questionNumber][action.payload.answerNumber] = !state.checkedAnswers[action.payload.questionNumber][action.payload.answerNumber]
        }
    },
})

export const { decrementCurrentQuestion, incrementCurrentQuestion, setCurrentQuestion, changeCheckedState } = answersSlice.actions


export const selectCurrentQuestion = (state: AppState) => state.answers.currentQuestion;

export const selectCheckedAnswers = (state: AppState) => state.answers.checkedAnswers;
export const selectQuestions = (state: AppState) => state.answers.questions;

export default answersSlice.reducer