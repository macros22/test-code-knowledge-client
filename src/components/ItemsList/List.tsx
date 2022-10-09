import React from 'react';
import styles from './List.module.scss';
import { IListProps } from './List.props';
import { BsPlusLg } from 'react-icons/bs';
import { Button, Card, Modal } from 'react-bootstrap';
import { useUser } from 'libs/hooks/useUser';
import { useRouter } from 'next/router';
import { SnippetCard } from 'components/snippets/SnippetCard/SnippetCard';
import { useItemsInfo } from './useItemsInfo.hook';
import { QuestionCard } from 'components/questions/QuestionCard/QuestionCard';
import { questionExample } from 'components/questions/QuestionForm/questionExample';
import { QuestionForm } from 'components/questions/QuestionForm/QuestionForm';
import { SnippetForm } from 'components/snippets/SnippetForm/SnippetForm';
import { snippetExample } from 'components/snippets/SnippetForm/snippetExample';
import { IQuestion } from 'libs/interfaces/questions.interface';
import { ISnippet } from 'libs/interfaces/snippets.interface';

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
				{items && items.length && (
					<>
						<div className={styles.column}>
							{items.map((item, index) => {
								return (
									<Card
										className={styles.itemCard}
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
											: <SnippetCard
												withEdit={isLoggedIn && isAdmin}
												handleEditButton={makeHandleEditItemButton(index)}
												snippet={item}
												key={item.id}
												index={index + 1}
											/>
										}
									</Card>
								);

							})}
						</div>


					</>
				)}

				{!items || (!items.length && (
					<Card className={styles.itemCard}>Empty list</Card>
				))}
			</div>
			{isLoggedIn && isAddNewItemMode && (
				<Modal size='lg' show={isAddNewItemMode} onHide={() => setIsAddNewItemMode(false)}>
					<Modal.Body>
						{itemsName == 'questions'
							?
							<QuestionForm
								questionItem={questionExample}
								mode="add"
								setIsModalOpen={setIsAddNewItemMode}
							/>
							:
							<SnippetForm
								snippetItem={snippetExample}
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
