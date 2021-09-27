export function capitalizeName(word: string) {
  const wordCapitalize = word.charAt(0).toUpperCase() + word.slice(1)

  return wordCapitalize
}