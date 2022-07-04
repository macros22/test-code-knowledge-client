import Image from 'next/image';
import JavaScriptLogo from 'assets/pictures/js-logo.png';
import TypeScriptLogo from 'assets/pictures/ts-logo.png';
import NodeJsLogo from 'assets/pictures/node-js-logo.png';
import styles from './TechnologyList.module.scss';

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
		name: 'Node.js',
		src: NodeJsLogo,
	},
];

export const TechnologyList = (): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			{technologyList.map((technology) => {
				return (
					<div className={styles.card}>
							<h4>Questions: 45</h4>
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
