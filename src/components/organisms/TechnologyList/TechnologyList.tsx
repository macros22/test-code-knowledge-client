import Image from 'next/image';
import JavaScriptLogo from 'assets/pictures/js-logo.png';
import TypeScriptLogo from 'assets/pictures/ts-logo.png';
import NodeJsLogo from 'assets/pictures/node-js-logo.png';
import styles from './TechnologyList.module.scss';
import { TechnologyListProps } from './TechnologyList.props';
import { Button } from 'components/atoms/Button/Button';
import Tag from 'components/atoms/Tag/Tag';

const technologyList = [
	{
		name: 'JavaScript',
		src: JavaScriptLogo,
	},
	{
		name: 'TypeScript',
		src: TypeScriptLogo,
	},
	{
		name: 'NodeJs',
		src: NodeJsLogo,
	},
];

export const TechnologyList = ({
	questionsListsSizes,
}: TechnologyListProps): JSX.Element => {
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
							<Tag size="lg" className={styles.cardTag} color="primary">
								{questionsListsSizes[technology.name.toLocaleLowerCase()]}
							</Tag>
							<Button className={styles.cardButton} appearance="primary">
								Pass the test
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
