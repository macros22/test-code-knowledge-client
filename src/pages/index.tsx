// import { Categories } from 'components';
import Categories from 'components/Categories/Categories';
import { withLayout } from 'layouts';

// import dynamic from "next/dynamic";


// const Categories = dynamic(() => import('../components/Categories/Categories'))

// import { useQuestionsInfo } from 'libs/hooks';
// import { useSnippetsInfo } from 'libs/hooks/snippets/useSnippetssInfo';


const Index = () => {
	// const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();
	// const { snippetsInfo, isLoadingSnippetsInfo } = useSnippetsInfo();

	return (
		// <Suspense fallback={`Loading...`}>
			<Categories />
		// </Suspense>
		// <>asd</>
	);
};

// export default Index;
export default withLayout('main', Index);
