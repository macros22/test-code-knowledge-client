import React from 'react';
import styles from './List.module.scss';
import { IListProps } from './List.props';
import { BsPlusLg } from 'react-icons/bs';
import { Button, Card, Modal } from 'react-bootstrap';
import { useUser } from 'libs/hooks/useUser';
import { useRouter } from 'next/router';
import { useItemsInfo } from './useItemsInfo.hook';
import { getQuestionExample } from 'components/questions/QuestionForm/questionExample';

import { getSnippetExample } from 'components/snippets/SnippetForm/snippetExample';
import { IQuestion } from 'libs/interfaces/questions.interface';
import { ISnippet } from 'libs/interfaces/snippets.interface';

import dynamic from "next/dynamic";
const QuestionCard = dynamic(() => import('../questions/QuestionCard/QuestionCard'));
const QuestionForm = dynamic(() => import('../questions/QuestionForm/QuestionForm'));
const SnippetCard = dynamic(() => import('../snippets/SnippetCard/SnippetCard'));
const SnippetForm = dynamic(() => import('../snippets/SnippetForm/SnippetForm'));

export const List = ({
	itemsName,
	items,
	category: currentCategory
}: IListProps): JSX.Element => {
	const [currentItemIndex, setCurrentItemIndex] = React.useState(0);

	const [isAddNewItemMode, setIsAddNewItemMode] = React.useState(false);
	const [isEditItemMode, setIsEditItemMode] = React.useState(false);

	const { isLoggedIn, isAdmin } = useUser();

	const { itemsInfo } = useItemsInfo(itemsName);

	const handleAddNewItemButton = () => {
		setIsAddNewItemMode(true);
	};

	const makeHandleEditItemButton = (index: number) => {
		return () => {
			setCurrentItemIndex(index);
			setIsEditItemMode(true);
		};
	}

	const router = useRouter();
	const categoryButtonHandler = (category: string) => {
		router.replace(`/${itemsName}/${itemsInfo[category].categoryURLName}`);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<div className={styles.categoryButtons}>
					{Object.keys(itemsInfo).map(category => {
						return (
							<Button
								variant={category == currentCategory ? 'primary' : 'secondary'}
								className={category == currentCategory ? '' : styles.inActiveButton}
								key={category}
								onClick={() => categoryButtonHandler(category)}
							>
								{`${category}: ${itemsInfo[category].amount}`}
							</Button>
						);
					})}
				</div>

				{isLoggedIn && isAdmin && (
					<BsPlusLg
						className={styles.addNewItemButton}
						onClick={handleAddNewItemButton}
					/>
				)}
			</div>

			<div className={styles.container}>
				<div className={styles.column}>
					{items && items.length
						?
						items.map((item, index) => {

							return (
								<Card
									key={item.id}
								>
									{itemsName == 'questions'
										?
										<QuestionCard
											withEdit={isLoggedIn && isAdmin}
											handleEditButton={makeHandleEditItemButton(index)}
											question={item}
											key={item.id}
											index={index + 1}
										/>
										:
										<SnippetCard
											withEdit={isLoggedIn && isAdmin}
											handleEditButton={makeHandleEditItemButton(index)}
											snippet={item}
											key={item.id}
											index={index + 1}
										/>
									}
								</Card>
							);
						})
						: <Card className={styles.noItemsCard}>{`No ${itemsName} yet`}</Card>}
				</div>
			</div>

			{isLoggedIn && isAddNewItemMode && (
				<Modal size='lg' show={isAddNewItemMode} onHide={() => setIsAddNewItemMode(false)}>
					<Modal.Body>
						{itemsName == 'questions'
							?
							<QuestionForm
								questionItem={getQuestionExample(currentCategory)}
								mode="add"
								setIsModalOpen={setIsAddNewItemMode}
							/>
							:
							<SnippetForm
								snippetItem={getSnippetExample(currentCategory)}
								mode="add"
								setIsModalOpen={setIsAddNewItemMode}
							/>
						}
					</Modal.Body>
				</Modal>
			)}

			{isLoggedIn && items && isEditItemMode && (
				<Modal size='lg' show={isEditItemMode} onHide={() => setIsEditItemMode(false)}>
					<Modal.Body>
						{itemsName == 'questions'
							?
							<QuestionForm
								questionItem={items[currentItemIndex] as IQuestion}
								mode="edit"
								setIsModalOpen={setIsEditItemMode}
							/>
							:
							<SnippetForm
								snippetItem={items[currentItemIndex] as ISnippet}
								mode="edit"
								setIsModalOpen={setIsEditItemMode}
							/>
						}
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
};
