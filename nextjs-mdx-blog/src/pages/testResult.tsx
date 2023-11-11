import { TestResult } from '@/components/test/test-result'
import { withLayout } from '@/layouts'
import { questionsInStorageName } from '@/lib/constants/names.storage'
import { useSessionStorage } from '@/lib/hooks'
import dynamic from 'next/dynamic'
// const TestResult = dynamic<ITestResultProps>(() =>
//   import('components/test/TestResult/TestResult').then(
//     module => module.TestResult
//   )
// );

const TestResultPage = (): JSX.Element => {
  const [questions] = useSessionStorage(questionsInStorageName, [])

  return <>{questions?.length && <TestResult questions={questions} />}</>
}

export default withLayout('main', TestResultPage)
