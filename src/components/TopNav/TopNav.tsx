import styles from "./TopNav.module.scss"
import { styled } from "@mui/system"
import { MenuItemUnstyled, MenuUnstyled } from "@mui/base"
import React, { useState } from "react"

const TriggerButton = styled('button')(
    ({ theme }) => `
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 0.75em;
    margin: 0.5em;
    padding: 10px 20px;
    line-height: 1.5;
    `
)

const StyledMenuItem = styled(MenuItemUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
    user-select: none;
    `
)

const TopNav = () => {

    // Anchor and open boolean for home menu
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const isOpen = Boolean(anchorEl)

    const handleHomeMenuClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isOpen) {
            setAnchorEl(null)
        } else {
            setAnchorEl(event.currentTarget)
        }
    }

    return (
        <nav className={styles.TopNavContainer}>
            <img src="../../reddit-logo-light.png" alt="Reddit Logo" className={styles.redditLogoImg} />
            <TriggerButton
                type="button"
                onClick={handleHomeMenuClicked}
            >
                Home
            </TriggerButton>
            <MenuUnstyled
                open={isOpen}
                anchorEl={anchorEl}
            >
                <StyledMenuItem>
                    Home
                </StyledMenuItem>
            </MenuUnstyled>
        </nav>
    )
}

export default TopNav