import { Person } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useThemeContext } from "../../context/ThemeContext"
import styles from "./CreatePostLinkBox.module.scss"

const CreatePostLinkBox = () => {

    const { theme } = useThemeContext()

    return (
        <div className={`${theme} galleryCard`}>
            <div className={`${styles.createPostLinkBox}`}>
                <Link to="/" className={styles.profileLink}>
                    <Person />
                </Link>
                <Link to="/submit" className={styles.submitLink}>
                    <input placeholder="Create Post" className={`${styles[theme]} ${styles.createPostInput}`} readOnly />
                </Link>
            </div>
        </div>
    )
}

export default CreatePostLinkBox