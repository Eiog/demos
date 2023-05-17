import fs from 'node:fs'

export function getMeta(filePath: string): { title?: string } | undefined {
  const file = fs.readFileSync(filePath, 'utf-8')
  const match = file.match(/(?<=---\n)(.+?)(?=\n---)/s)
  if (match !== null) {
    const meta = match[0].match(/(?<=const meta = {)(.+?)(?=})/s)
    if (meta !== null) {
      // eslint-disable-next-line no-eval
      const metaObj = eval(`({${meta[0]}})`)
      return metaObj
    }
    else { return undefined }
  }
  else {
    return undefined
  }
}
