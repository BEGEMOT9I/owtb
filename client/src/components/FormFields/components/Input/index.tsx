import React, { SFC } from 'react'
import { FieldRenderProps } from 'react-final-form'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

interface OuterProps {
  label?: string
  controlProps?: FormControlProps
}
interface Props extends FieldRenderProps, OuterProps {}

const FormInput: SFC<Props> = ({
  label,
  input: { name, onChange, value, ...restInput },
  meta,
  controlProps,
  ...rest
}) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched && !meta.active
  const errorText = meta.submitError || meta.error

  return (
    <FormControl error={showError} aria-describedby={`${name}-error`} {...controlProps}>
      {!!label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Input
        {...rest}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        inputProps={restInput}
        error={showError}
      />
      {showError && <FormHelperText id={`${name}-error`}>{errorText}</FormHelperText>}
    </FormControl>
  )
}

export default FormInput
