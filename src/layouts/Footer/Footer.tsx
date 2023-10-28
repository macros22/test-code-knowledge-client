import cn from 'clsx';
import { format } from 'date-fns';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.scss';
import { BsGithub } from 'react-icons/bs';

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer
      className={cn(
        className,
        styles.footer,
        'bg-light border-top py-4 mt-auto'
      )}
      {...props}
    >
      <p>Code knowledge test © 2021 - {format(new Date(), 'yyyy')}</p>
      <a
        href="https://github.com/kramax42/test-code-knowledge-client"
        target="_blank"
      >
        <BsGithub />
        {` Github`}
      </a>
    </footer>
  );
};
export default Footer;
