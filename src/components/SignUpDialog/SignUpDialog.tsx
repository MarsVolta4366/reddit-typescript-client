import { Close } from "@mui/icons-material"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from "@mui/material"
import React, { SetStateAction, useState } from "react"
import { useCurrentUserContext } from "../../context/CurrentUserContext"
// import styles from "./SignUpDialog.module.scss"

type Props = {
    signUpDialogOpen: boolean,
    setSignUpDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

const SignUpDialog = ({ signUpDialogOpen, setSignUpDialogOpen }: Props) => {

    const usernamePattern = new RegExp(/^[a-zA-Z0-9_-]*$/)

    const { setCurrentUser } = useCurrentUserContext()
    // user is object with credentials submitted by NEW user to create an account
    const [user, setUser] = useState({ username: "", password: "" })
    const [usernameTaken, setUsernameTaken] = useState(false)
    const [usernameLongEnough, setUsernameLongEnough] = useState(true)
    const [passwordLongEnough, setPasswordLongEnough] = useState(true)
    const [usernamePassesRegExp, setUsernamePassesRegExp] = useState(true)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (usernamePattern.test(user.username)) {
            const submitUser = await (await fetch("http://localhost:4000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(user)
            })).json()

            if (submitUser.message === "Username is already taken") {
                setUsernameTaken(true)
            } else if (submitUser.username) {
                setCurrentUser(submitUser)
                setSignUpDialogOpen(false)
            }
        }
    }

    return (
        <Dialog
            open={signUpDialogOpen}
            onClose={() => setSignUpDialogOpen(false)}
        >
            <DialogActions>
                <Close onClick={() => setSignUpDialogOpen(false)} />
            </DialogActions>
            <DialogTitle>Choose your username</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your username is how other community members will see you. This name will be used to
                    credit you for things you share on Reddit. What should we call you?
                </DialogContentText>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        label="CHOOSE A USERNAME"
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value })
                            setUsernameTaken(false)
                            e.target.value.length < 3 ? setUsernameLongEnough(false) : setUsernameLongEnough(true)
                            // Make sure username only includes letters, numbers, dashes, and underscores
                            setUsernamePassesRegExp(usernamePattern.test(e.target.value))
                        }}
                        value={user.username}
                        error={usernameTaken || !usernameLongEnough || !usernamePassesRegExp}
                        helperText={(usernameTaken && "Username is already taken") || (!usernamePassesRegExp && "Letters, numbers, dashes, and underscores only. Please try again without symbols.") || (!usernameLongEnough && "Username must be between 3 and 20 characters")}
                        required
                        inputProps={{ minLength: 3, maxLength: 20 }}
                    />
                    <TextField
                        variant="outlined"
                        label="PASSWORD"
                        type="password"
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value })
                            e.target.value.length < 8 ? setPasswordLongEnough(false) : setPasswordLongEnough(true)
                        }}
                        value={user.password}
                        error={!passwordLongEnough}
                        helperText={!passwordLongEnough && "Password must be at least 8 characters long"}
                        required
                        inputProps={{ minLength: 8, maxLength: 50 }}
                    />
                    <Divider />
                    <button type="submit">Sign Up</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpDialog