import { createContext, useContext } from "react"

type ThemeInitialState = {
    theme: string,
    setTheme: (newTheme: string) => void
}

export const MyThemeContext = createContext<ThemeInitialState>({
    theme: "light",
    setTheme: () => { }
})

export const useThemeContext = () => useContext(MyThemeContext)

// Used this article: https://dev.to/madv/usecontext-with-typescript-23ln