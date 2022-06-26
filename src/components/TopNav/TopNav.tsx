import { AccountCircle, DarkMode, KeyboardArrowDown, PermIdentity, Search } from "@mui/icons-material"
import { Input, InputAdornment, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"
import { useThemeContext } from "../../context/ThemeContext"
import styles from "./TopNav.module.scss"

const TopNav = () => {

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
        handleRightMenuClose()
        theme === "light" ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light")
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <nav className={styles.TopNavContainer}>
            <img src="../../reddit-logo-light.png" alt="Reddit Logo" className={styles.redditLogoImg} />
            <Input
                className={styles.searchInput}
                disableUnderline={true}
                placeholder="Search Reddit"
                startAdornment={
                    <InputAdornment position="start">
                        <Search className={styles.smGrayIcon} />
                    </InputAdornment>
                }
            />

            <div className={styles.rightButtonSection}>
                <button className={styles.logInButton}>
                    Log In
                </button>
                <button className={styles.signUpButton}>
                    Sign Up
                </button>
                <div className={styles.iconContainer}
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
                    <MenuItem onClick={handleRightMenuClose} className={styles.rightMenuItem}>
                        <AccountCircle className={styles.rightMenuIcon} />
                        Sign Up or Log In
                    </MenuItem>
                    <MenuItem onClick={toggleTheme} className={styles.rightMenuItem}>
                        <DarkMode className={styles.rightMenuIcon} />
                        Dark Mode
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