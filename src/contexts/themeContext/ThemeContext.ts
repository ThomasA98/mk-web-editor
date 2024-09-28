import { createContext } from 'react'
import { Theme } from '../../interfaces/markdownEditor.interfaces'

export const ThemeContext = createContext<Theme>({} as Theme)
