import Image from 'next/image';
import JavaScriptLogo from 'assets/pictures/js-logo.png';
import TypeScriptLogo from 'assets/pictures/ts-logo.png';
import NodeJsLogo from 'assets/pictures/node-js-logo.png';
import styles from './TechnologyList.module.scss';
import { TechnologyListProps } from './TechnologyList.props';

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
		name: 'Nodejs',
		src: NodeJsLogo,
	},
];

export const TechnologyList = ({
	questionsListsSizes,
}: TechnologyListProps): JSX.Element => {
	console.log(questionsListsSizes);
	return (
		<div className={styles.wrapper}>
			{technologyList.map((technology) => {
				return (
					<div className={styles.card}>
						<h4>
							Questions:{' '}
							{questionsListsSizes[technology.name.toLocaleLowerCase()]}
						</h4>
						<Image
							className={styles.img}
							layout="responsive"
							src={technology.src}
							alt={technology.name}
						/>
					</div>
				);
			})}
		</div>
	);
};
