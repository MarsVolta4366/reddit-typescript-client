import { Close } from "@mui/icons-material"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from "@mui/material"
import React, { SetStateAction, useState } from "react"
// import styles from "./SignUpDialog.module.scss"

type Props = {
    signUpDialogOpen: boolean,
    setSignUpDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

const SignUpDialog = ({ signUpDialogOpen, setSignUpDialogOpen }: Props) => {

    const [user, setUser] = useState({ username: "", password: "" })
    const [usernameTaken, setUsernameTaken] = useState(false)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const submitUser = await fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const submitUserResponse = await submitUser.json()

        if (submitUserResponse.message === "Username is already taken") {
            setUsernameTaken(true)
        } else {
            // Log in user after sign up
            setSignUpDialogOpen(false)
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
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        value={user.username}
                        error={usernameTaken}
                        helperText={usernameTaken && "Username is already taken"}
                        required
                        inputProps={{ minLength: 3, maxLength: 20 }}
                    />
                    <TextField
                        variant="outlined"
                        label="PASSWORD"
                        type="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
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