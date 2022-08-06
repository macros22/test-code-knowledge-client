import { IWordFormValues } from "types/forms"
import { IUserWordPayload, WordStudyStatus } from "types/types"

// Made data transformation for react-hook-form correct work with fields array.

export const formDataToWordData = (data: IWordFormValues, studyStatus: WordStudyStatus): IUserWordPayload => {
    return ({
        word: data.word,
        transcription: data.transcription,
        translations: data.translations.map(translationField => translationField.translation),
        definitions: data.definitions.map(definitionField => definitionField.definition),
        usageExamples: data.usageExamples.map(usageExamplesField => ({
            sentence: usageExamplesField.sentence,
            translation: usageExamplesField.translation,
        })),
        studyStatus,
    });
}


export const wordDataToFormData = (data: IUserWordPayload): IWordFormValues => {
    return ({
        word: data.word,
        transcription: data.transcription,
        translations: data.translations.map(translation => ({ translation })),
        definitions: data.definitions.map(definition => ({ definition })),
        usageExamples: data.usageExamples.map(usageExamplesField => ({
            sentence: usageExamplesField.sentence,
            translation: usageExamplesField.translation,
        })),
        studyStatus: data.studyStatus,
    });
}
