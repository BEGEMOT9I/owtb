export function email(value: string): string | undefined {
  const error = 'Неправильный формат email'
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  if (typeof value === 'string') {
    return re.test(value.toLowerCase()) ? undefined : error
  }

  return error
}
