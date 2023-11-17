import axios from 'axios'
import { QUESTIONS_BASE_URL } from '../constants/urls'
import { IItemsInfo } from '../interfaces/common.interface'
import { IQuestion, IQuestionDto } from '../interfaces/questions.interface'
import { Role } from '../interfaces/user.interface'

export const questionsApi =  {
    getQuestions: async (url: string) => {
      try {
        const res = await axios.get<IQuestion[]>(url, {
          withCredentials: true,
        })

        return res.data
      } catch (error) {
        console.log('getQuestions error: ', error)
      }

      return null
    },
    getQuestionsInfo: async (url: string) => {
      try {
        const res = await axios.get<IItemsInfo>(url, { withCredentials: true })
        return res.data
      } catch (error) {
        console.log('getQuestionsInfo error:', error)
      }

      return null
    },
    postQuestion: async (url: string, { arg }: { arg: IQuestionDto }) => {
      await axios.post<IQuestion>(url, arg, { withCredentials: true })
    },
    patchQuestion: async (url: string, { arg }: { arg: IQuestionDto }) => {
      await axios.patch<IQuestion>(url, arg, { withCredentials: true })
    },
    deleteQuestion: async (url: string) => {
      await axios.delete<IQuestion>(url, { withCredentials: true })
    },
  }



export const questionsApi2 = (userRole?: Role) => {
  return {
    getQuestions: async (url: string) => {
      try {
        const res = await axios.get<IQuestion[]>(url, {
          withCredentials: true,
        })

        return res.data
      } catch (error) {
        console.log('getQuestions error: ', error)
      }

      return null
    },
    getQuestionsInfo: async (url: string) => {
      try {
        const res = await axios.get<IItemsInfo>(url, { withCredentials: true })
        return res.data
      } catch (error) {
        console.log('getQuestionsInfo error:', error)
      }

      return null
    },
    postQuestion: async (question: IQuestionDto) => {
      try {
        // if (userRole == Role.ADMIN) {
        const url = QUESTIONS_BASE_URL
        const res = await axios.post<IQuestion[]>(url, question, {
          withCredentials: true,
        })
        return res.data
        // }
      } catch (error) {
        console.log(error)
      }

      return null
    },
    patchQuestion: async (question: IQuestionDto, questionId: string) => {
      try {
        const url = QUESTIONS_BASE_URL
        const res = await axios.patch<IQuestion>(
          url + `/${questionId}`,
          question,
          { withCredentials: true },
        )
        return res.data
      } catch (error) {
        console.log(error)
      }

      return null
    },
    deleteQuestion: async (questionId: string) => {
      try {
        const url = QUESTIONS_BASE_URL

        const res = await axios.delete<IQuestion>(url + `/${questionId}`, {
          withCredentials: true,
        })
        return res.data
      } catch (error) {
        console.log(error)
      }

      return null
    },
  }
}
