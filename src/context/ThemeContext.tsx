import { createContext, useContext } from "react"

export type ThemeInitialState = {
    theme: string,
    setTheme: (newTheme: string) => void
}

export const MyThemeContext = createContext<ThemeInitialState>({
    theme: "light",
    setTheme: () => { }
})

export const useThemeContext = () => useContext(MyThemeContext)