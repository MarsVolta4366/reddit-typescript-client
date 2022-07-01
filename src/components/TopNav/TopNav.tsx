import { AccountCircle, DarkMode, KeyboardArrowDown, PermIdentity, Search } from "@mui/icons-material"
import { Menu, MenuItem, Switch } from "@mui/material"
import React, { SetStateAction, useState } from "react"
import { useThemeContext } from "../../context/ThemeContext"
import styles from "./TopNav.module.scss"

type Props = {
    setSignUpDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

const TopNav = ({ setSignUpDialogOpen }: Props) => {

    const [rightMenuAnchorEl, setRightMenuAnchorEl] = useState<null | HTMLElement>(null)
    const rightMenuOpen = Boolean(rightMenuAnchorEl)
    const { theme, setTheme } = useThemeContext()

    const handleRightMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setRightMenuAnchorEl(event.currentTarget)
    }

    const handleRightMenuClose = () => {
        setRightMenuAnchorEl(null)
    }

    const toggleTheme = () => {
        theme === "light" ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light")
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <nav className={`${styles.TopNavContainer} componentBackground`}>
            <img src="../../reddit-logo-light.png" alt="Reddit Logo" className={styles.redditLogoImg} />
            <div className={`${styles[theme]} ${styles.searchInputContainer}`}>
                <label htmlFor="search" className={styles.searchLabel}>
                    <Search className={styles.searchIcon} />
                </label>
                <input type="text" name="search" id="search" className={`${styles[theme]} ${styles.searchInput}`} placeholder="Search Reddit" />
            </div>
            <div className={styles.rightButtonSection}>
                <button className={`${styles[theme]} ${styles.logInButton}`}>
                    Log In
                </button>
                <button className={`${styles[theme]} ${styles.signUpButton}`} onClick={() => setSignUpDialogOpen(true)}>
                    Sign Up
                </button>
                <div className={`${styles[theme]} ${styles.iconContainer}`}
                    onClick={handleRightMenuClick}
                >
                    <PermIdentity className={styles.smGrayIcon} />
                    <KeyboardArrowDown className={styles.smGrayIcon} />
                </div>
                <Menu
                    anchorEl={rightMenuAnchorEl}
                    open={rightMenuOpen}
                    onClose={handleRightMenuClose}
                >
                    <MenuItem
                        onClick={() => {
                            setRightMenuAnchorEl(null)
                            setSignUpDialogOpen(true)
                        }}
                        className={`${styles[theme]} ${styles.rightMenuItem}`}
                    >
                        <AccountCircle className={`${styles[theme]} ${styles.rightMenuIcon}`} />
                        Sign Up or Log In
                    </MenuItem>
                    <MenuItem onClick={toggleTheme} className={`${styles[theme]} ${styles.rightMenuItem}`}>
                        <DarkMode className={`${styles[theme]} ${styles.rightMenuIcon}`} />
                        Dark Mode
                        <Switch checked={theme === "dark" ? true : false} />
                    </MenuItem>
                </Menu>
            </div>
            {/* Home menu button (WIP) */}
            {/* <div className={styles.homeMenuButtonContainer}>
                <button
                    className={styles.homeMenuButton}
                >
                    <Home className={styles.homeIcon} />
                    Home
                    <KeyboardArrowDown className={styles.downArrowIcon} />
                </button>
                <div className={styles.homeMenu}>
                    <ul>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>

                    </ul>
                </div>
            </div> */}
        </nav>
    )
}

export default TopNav