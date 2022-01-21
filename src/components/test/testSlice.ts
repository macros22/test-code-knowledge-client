import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface AnswersState {
    answersAmount: number,
    currentQuestion: number,
    testAnswers: string[],
    correctAnswers: boolean[],
}


const answersAmount = 15;

const initialState: AnswersState = {
    answersAmount,
    currentQuestion: 0,
    testAnswers: new Array(answersAmount).fill(""),
    correctAnswers: new Array(answersAmount).fill(false),
}

interface IAddAnswerType {
    answerNumber: number;
    answer: string;
}


export const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        answerQuestion: (state, action: PayloadAction<IAddAnswerType>) => {
            state.testAnswers[action.payload.answerNumber] = action.payload.answer
        },
        incrementCurrentQuestion: (state) => {
            state.currentQuestion += 1

        },
        decrementCurrentQuestion: (state) => {
            state.currentQuestion -= 1
        },
        setCurrentQuestion: (state, action: PayloadAction<number>) => {
            state.currentQuestion = action.payload
        }
    },
})

export const { answerQuestion, decrementCurrentQuestion, incrementCurrentQuestion, setCurrentQuestion } = answersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAnswers = (state: AppState) => state.answers.testAnswers;

export const selectCurrentQuestion = (state: AppState) => state.answers.currentQuestion;

export default answersSlice.reducer