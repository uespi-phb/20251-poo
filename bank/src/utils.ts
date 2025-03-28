export function alignText(data: string, colFormat: string[]): string {
  const columns = data.split('\t')
  let formattedText = ''

  for (let index in columns) {
    const format = colFormat[index]
    let data = columns[index]
    let width: number

    switch (format[0]) {
      case '>':
        width = parseInt(format.substring(1))
        formattedText += data.padStart(width)
        break
      case '<':
        width = parseInt(format.substring(1))
        formattedText += data.padEnd(width)
        break
      default:
        width = parseInt(format)
        const leftWidth = Math.floor((width - data.length) / 2)
        data = data.padStart(data.length + leftWidth)
        formattedText += data.padEnd(width)
    }

    if (parseInt(index) < columns.length - 1) {
      formattedText += ' '
    }
  }

  return formattedText
}

export function alignLine(colWidths: number[]) {
  let line = ''

  for (const index in colWidths) {
    line += '-'.repeat(colWidths[index])

    if (parseInt(index) < colWidths.length - 1) {
      line += ' '
    }
  }

  return line
}

export function formatCurrency(value: number): string {
  const locale = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
  return locale.format(value)
}
