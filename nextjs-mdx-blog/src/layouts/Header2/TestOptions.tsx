import { IItemsInfo } from 'libs/interfaces/common.interface'
import { useRouter } from 'next/router'
import { NavDropdown } from 'react-bootstrap'
import styles from './Header.module.scss'

export const TestOptions = ({
  questionsInfo,
}: {
  questionsInfo: IItemsInfo
}): JSX.Element => {
  const router = useRouter()

  return (
    <>
      {Object.keys(questionsInfo).map((category) => {
        return (
          <NavDropdown.Item
            key={category}
            className={styles.navbarDropdownItem}
            onClick={() =>
              router.replace(`/test/${questionsInfo[category].categoryURLName}`)
            }
          >
            <a>{category}</a>
          </NavDropdown.Item>
        )
      })}
    </>
  )
}
