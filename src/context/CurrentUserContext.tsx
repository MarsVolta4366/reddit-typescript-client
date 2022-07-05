import { createContext, useContext } from "react"

type UserState = {
    username: string
}

type UserInitialState = {
    currentUser: { username: string } | null,
    setCurrentUser: (userObject: UserState | null) => void
}

export const CurrentUserContext = createContext<UserInitialState>({
    currentUser: null,
    setCurrentUser: () => { }
})

export const useCurrentUserContext = () => useContext(CurrentUserContext)