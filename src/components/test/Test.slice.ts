import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../store/store'


export interface IQuestion {
    question: string;
    exampleCode: string;
    answersList: string[];
    correctAnswers: string[];
}
export interface AnswersState {
    answersAmount: number,
    questionsAmount: number,
    currentQuestion: number,
    userAnswers: boolean[],
    checkedAnswers: boolean[][],
    questions: IQuestion[],
}


const questions: IQuestion[] = [
    {
        question: "Что будет выведено в консоль?",
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


const questionsAmount = 3;
const answersAmount = 4;

const initialState: AnswersState = {
    questionsAmount,
    answersAmount,
    currentQuestion: 0,
    userAnswers: new Array(questionsAmount).fill(true),
    checkedAnswers: new Array(questionsAmount).fill(new Array(answersAmount).fill(false)),
    questions
}

interface ISetCheckedState {
    questionNumber: number;
    answerNumber: number;
}

interface IChangeUserAnswers {
    questionNumber: number;
    isCorrect: boolean;
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
        },
        changeUserCorrectAnswers: (state, action: PayloadAction<IChangeUserAnswers>) => {
            state.userAnswers[action.payload.questionNumber] = action.payload.isCorrect;
        },
        resetState: () => initialState,
    },
})

export const { decrementCurrentQuestion, incrementCurrentQuestion, setCurrentQuestion, changeCheckedState, changeUserCorrectAnswers, resetState } = answersSlice.actions


export const selectCurrentQuestion = (state: AppState) => state.answers.currentQuestion;

export const selectCheckedAnswers = (state: AppState) => state.answers.checkedAnswers;
export const selectQuestions = (state: AppState) => state.answers.questions;
export const selectUserAnswersStatus = (state: AppState) => state.answers.userAnswers;

export default answersSlice.reducer