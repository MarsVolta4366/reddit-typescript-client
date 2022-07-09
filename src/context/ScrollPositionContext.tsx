import { createContext, useContext } from "react"

type ScrollPositionInitialState = {
    scrollPosition: number,
    setScrollPosition: (position: number) => void
}

export const MyScrollPositionContext = createContext<ScrollPositionInitialState>({
    scrollPosition: 0,
    setScrollPosition: () => { }
})

export const useScrollPositionContext = () => useContext(MyScrollPositionContext)