export const textLineDivider = (text: string | string[]) => {
    if (typeof text === 'string') {
        return text.split('\n')
    }
    return text
}