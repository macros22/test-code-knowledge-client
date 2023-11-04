import { useRouter } from 'next/router'
import { NavDropdown } from 'react-bootstrap'
import styles from './Header.module.scss'
import { IItemsInfo } from '@/lib/interfaces/common.interface'

export const SnippetsOptions = ({
  snippetsInfo,
}: {
  snippetsInfo: IItemsInfo
}): JSX.Element => {
  const router = useRouter()

  return (
    <>
      {Object.keys(snippetsInfo).map((category) => {
        return (
          <NavDropdown.Item
            key={category}
            className={styles.navbarDropdownItem}
            onClick={() =>
              router.replace(
                `/snippets/${snippetsInfo[category].categoryURLName}`,
              )
            }
          >
            <a>{category}</a>
          </NavDropdown.Item>
        )
      })}
    </>
  )
}