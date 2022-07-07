import { createContext, useContext } from "react"

export type UserState = {
    username: string
} | null

type UserInitialState = {
    currentUser: UserState,
    setCurrentUser: (userObject: UserState) => void
}

export const CurrentUserContext = createContext<UserInitialState>({
    currentUser: null,
    setCurrentUser: () => { }
})

export const useCurrentUserContext = () => useContext(CurrentUserContext)