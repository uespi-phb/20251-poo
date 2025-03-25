
export function formatText(data: string, colWidths: number[]): string {
    const columns = data.split('\t')
    let formmatedText = ''

    for (let index in columns) {
        const data = columns[index]
        const width = Math.abs(colWidths[index])
        formmatedText += (colWidths[index] < 0) 
                            ? data.padEnd(width) 
                            : data.padStart(width)
    }

    return formmatedText
}

