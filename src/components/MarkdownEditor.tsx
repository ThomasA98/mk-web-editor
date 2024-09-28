import { useEffect, useRef, useState } from 'react'
import { markdownToHTML, textLineDivider } from '../helpers'
import { ThemeContext } from '../contexts/themeContext/ThemeContext'
import { Cursor, Theme } from '../interfaces/markdownEditor.interfaces'

export interface MarkdownEditorProps {
    text?: string | string[]
    theme?: Theme
    className?: HTMLDivElement['className']
    style?: React.CSSProperties
    renderLimits?: {
        top: number
        bottom: number
        lineHeight?: number
    }
}

// detector de makdawn
// interprete de markdown
// escuchar eventos de teclado para mover el cursor arriba y abajo

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    className,
    style,
    text = [''],
    theme = {},
    renderLimits = { bottom: 10, top: 10, lineHeight: 1 },
}) => {

    const [lines, setLines] = useState<string[]>(textLineDivider(text))

    const [cursor, setCursor] = useState<Cursor>({ line: 0, column: 0 })

    const [currentTextAreaValue, setCurrentTextAreaValue] = useState<string>(lines[cursor.line])
    const currentTestAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target

        if (value[value.length - 1] === '\n') {
            setLines(prev => [...prev, currentTextAreaValue.replace(/\n$/, '')])
            setCurrentTextAreaValue('')
            setCursor({ line: lines.length, column: value.length })
        }
        else
            setCurrentTextAreaValue(value)

    }

    useEffect(() => {
        setCurrentTextAreaValue(lines[cursor.line])
        currentTestAreaRef.current?.focus()
    }, [cursor])

  return (
    <ThemeContext.Provider value={theme}>
    <div
        className={className}
        style={{
            ...style,
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            overflowY: 'hidden',
            overflowX: 'scroll',
            position: 'relative',
        }}
    >
        {
            lines
            // .slice(
            //     Math.max(0, cursor.line - renderLimits.top),
            //     Math.min(lines.length, cursor.line + renderLimits.bottom)
            // )
            .map((line, index) => (
                <div
                    style={{
                        lineHeight: `${renderLimits.lineHeight}rem`,
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '0',
                        padding: '0',
                    }}
                >
                    <span
                        style={{
                            minWidth: '4rem',
                            height: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        { index }
                    </span>
                    {
                        index === cursor.line
                        ? <textarea
                            style={{
                                width: '100%',
                                height: '100%',
                                resize: 'none',
                                border: 'none',
                                outline: 'none',
                            }}
                            value={ currentTextAreaValue }
                            onChange={ handleChange }
                            ref={ currentTestAreaRef }
                            // onKeyDown={e => console.log(e.key)}
                        />
                        : <div
                            title={ line }
                            style={{
                                height: `calc(100% - ${renderLimits.lineHeight}rem)`,
                                width: '100%',
                                resize: 'none',
                                border: 'none',
                                outline: 'none',
                            }}
                            onClick={ () => setCursor({ line: index, column: line.length }) }
                        >
                            { markdownToHTML(line) }
                        </div>
                    }
                <br />
                </div>
            ))
        }
        <div
            style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
            }}
        >
            <span>line: { cursor.line }</span>
            <span>column: { cursor.column }</span>
        </div>
    </div>
    </ThemeContext.Provider>
  )
}