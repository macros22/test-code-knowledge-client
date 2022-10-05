import React from 'react';
import styles from './SnippetCard.module.scss';
import { ISnippetCardProps } from './SnippetCard.props';
import { Code } from 'components';
import { BsPencilFill, BsFillTrashFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Badge } from 'react-bootstrap';

export const SnippetCard = ({
	snippet,
	handleEditButton,
	withEdit = false,
	index,
}: ISnippetCardProps): JSX.Element => {

	const handleDeleteButton = async () => {
		// await deleteQuestion(question.id);
	};

	return (<>
		<div className={styles.wrapper}>
			<div className={styles.snippetCard}>
				<div className={styles.description}>
					<h5>{'Snippet '}<Badge style={{ color: 'white', padding: '0.3rem 0.6rem' }} bg="danger"> {index}</Badge></h5>
					<hr />
					<h5>{snippet.description}</h5>
					<hr />
				</div>

				<div className={styles.snippet}>
					<Code codeExample={snippet.snippet} language='typescript' />
					<hr />
				</div>

				<div className={styles.buttons}>

					{withEdit && (
						<div className={styles.editButtons}>
							<BsPencilFill
								className={styles.iconButton}
								onClick={handleEditButton}
							/>
							<BsFillTrashFill
								className={styles.iconButton}
								onClick={handleDeleteButton}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	</>
	);
};
