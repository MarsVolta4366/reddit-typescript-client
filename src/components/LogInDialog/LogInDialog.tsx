import { Close } from "@mui/icons-material"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { SetStateAction, useState } from "react"
import { useCurrentUserContext } from "../../context/CurrentUserContext"

type props = {
    logInDialogOpen: boolean,
    setLogInDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

const LogInDialog = ({ logInDialogOpen, setLogInDialogOpen }: props) => {

    const { setCurrentUser } = useCurrentUserContext()
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [incorrectLogIn, setIncorrectLogIn] = useState(false)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const submitCredentials = await (await fetch("http://localhost:4000/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(credentials)
        })).json()

        if (submitCredentials.username) {
            // Log user in and close dialog
            setCurrentUser(submitCredentials)
            setLogInDialogOpen(false)
        } else if (submitCredentials.message === "Incorrect username or password") {
            // Display error 'Incorrect username or password
            setIncorrectLogIn(true)
        } else {
            console.log("There was a problem logging in")
        }
    }

    return (
        <Dialog
            open={logInDialogOpen}
            onClose={() => setLogInDialogOpen(false)}
        >
            <DialogActions>
                <Close onClick={() => setLogInDialogOpen(false)} />
            </DialogActions>
            <DialogTitle>Log in</DialogTitle>
            <DialogContent>
                <DialogContentText>By continuing, you agree to our User Agreement and Privacy Policy.</DialogContentText>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        label="USERNAME"
                        required
                        value={credentials.username}
                        onChange={(e) => {
                            setCredentials({ ...credentials, username: e.target.value })
                            setIncorrectLogIn(false)
                        }}
                        error={incorrectLogIn}
                        helperText={incorrectLogIn && "Incorrect username or password"}
                    />
                    <TextField
                        variant="outlined"
                        label="PASSWORD"
                        required
                        value={credentials.password}
                        onChange={(e) => {
                            setCredentials({ ...credentials, password: e.target.value })
                            setIncorrectLogIn(false)
                        }}
                        error={incorrectLogIn}
                        type="password"
                    />
                    <button type="submit">Log In</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default LogInDialog