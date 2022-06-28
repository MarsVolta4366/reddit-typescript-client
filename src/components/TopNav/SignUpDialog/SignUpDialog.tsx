import { Dialog, DialogTitle } from "@mui/material"
import React, { SetStateAction } from "react"

type Props = {
    signUpDialogOpen: boolean,
    setSignUpDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

const SignUpDialog = ({ signUpDialogOpen, setSignUpDialogOpen }: Props) => {
    return (
        <Dialog
            open={signUpDialogOpen}
            onClose={() => setSignUpDialogOpen(false)}
        >
            <DialogTitle>Choose your username</DialogTitle>
        </Dialog>
    )
}

export default SignUpDialog