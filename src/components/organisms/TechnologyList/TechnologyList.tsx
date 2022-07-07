import Image from 'next/image';
import styles from './TechnologyList.module.scss';
import { TechnologyListProps } from './TechnologyList.props';
import { Button } from 'components/atoms/Button/Button';
import Tag from 'components/atoms/Tag/Tag';
import { useRouter } from 'next/router';
import { technologyList } from 'constants/technologies';



export const TechnologyList = ({
	questionsListsSizes,
}: TechnologyListProps): JSX.Element => {
	const router = useRouter();

	const passTestButtonHandler = (technology) => () => {
		router.push(`/test/${technology}`);
	};

	return (
		<div className={styles.wrapper}>
			{technologyList.map((technology) => {
				return (
					<div className={styles.card}>
						<h3 className={styles.cardTitle}>{technology.name}</h3>
						<Image
							className={styles.img}
							layout="responsive"
							src={technology.src}
							alt={technology.name}
						/>
						<div className={styles.cardContainer}>
							<Button appearance="ghost">Show questions</Button>
							<Tag size="lg" className={styles.cardTag} color="error">
								{questionsListsSizes[technology.name.toLocaleLowerCase()]}
							</Tag>
							<Button
								onClick={passTestButtonHandler(technology.name.toLowerCase())}
								className={styles.cardButton}
								appearance="primary"
							>
								Pass the test
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
