export function email(value: string): string | undefined {
  const error = 'Неправильный формат email'
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  const notEmptyResult = notEmpty(value)

  if (notEmptyResult) {
    return notEmptyResult
  }

  if (typeof value === 'string') {
    return re.test(value.toLowerCase()) ? undefined : error
  }

  return error
}

export function notEmpty(value: any): string | undefined {
  const error = 'Поле не должно быть пустым'

  if (typeof value === 'string') {
    return value.replace(/\s/g, '') ? undefined : error
  }

  if (Array.isArray(value) && !value.length) {
    return error
  }

  return value ? undefined : error
}

export const sameAsOriginal = (originalName: string, errorText: string) => (
  value: any,
  allValue: Object
): string | undefined => {
  const originalValue = allValue[originalName]

  if (value !== originalValue) {
    return errorText
  }

  return undefined
}
