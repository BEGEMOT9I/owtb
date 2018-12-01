import { isArray, isObject, isNumber, isString, isUndefined, isNull } from 'lodash'

interface AppendToFormDataOptions {
  key: string
  value: any
  parentKey?: string
}

function objectToFormData(target: { [key: string]: any }, rootKey: string) {
  const formData = new FormData()

  const appendToFormData = ({ key, value, parentKey }: AppendToFormDataOptions) => {
    const currentKey = `${parentKey ? parentKey : ''}[${key}]`

    if (value instanceof File) {
      formData.append(currentKey, value)
    } else if (isNumber(value)) {
      formData.append(currentKey, value.toString())
    } else if (isString(value)) {
      formData.append(currentKey, value)
    } else if (isArray(value)) {
      const arrayValue = value as Array<any>
      arrayValue.forEach((entity, i) =>
        appendToFormData({ key: i.toString(), value: entity, parentKey: currentKey })
      )
    } else if (isObject(value)) {
      const objectValue = value as { [key: string]: any }
      Object.keys(objectValue).forEach((k: string) =>
        appendToFormData({ key: k, value: objectValue[k], parentKey: currentKey })
      )
    } else if (isNull(value) || isUndefined(value)) {
    } else {
      formData.append(currentKey, value + '')
    }
  }

  Object.keys(target).forEach(key =>
    appendToFormData({ key, value: target[key], parentKey: `${rootKey}` })
  )

  return formData
}

export { objectToFormData }
export default objectToFormData
