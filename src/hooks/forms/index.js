// @flow
import { useState, useEffect, useCallback } from 'react'

export const useForm = function (stateForm: Object, validations: Object = {}, callback: Function) {
  const [formState, setFormState] = useState(stateForm)
  const [disable, setDisable] = useState(true)
  const [isDirty, setIsDirty] = useState(false)

  const validateState = useCallback(() => {
    const hasError = Object.keys(validations).some(key => {
      const isRequired = validations[key].required
      const value = formState[key].value
      const error = formState[key].error

      return (isRequired && !value) || error
    })
    return hasError
  }, [formState, validations])

  const onChangeHandler = useCallback(({ target: { name, value } }: Object) => {
    const inputValidator = validations[name].validator
    let error = ''

    setIsDirty(true)

    if (validations[name].required) {
      if (!value) error = 'This field is required!!!'
    }

    if (inputValidator !== null && typeof inputValidator === 'object') {
      if (value && !inputValidator.regEx.test(value)) {
        error = inputValidator.error
      }
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: { value, error }
    }))
  }, [validations])

  const onSubmitHandler = useCallback((event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    !validateState() && callback(formState)
  }, [formState, callback, validateState])

  useEffect(() => {
    isDirty && setDisable(validateState())
  }, [formState, isDirty, validateState])

  return { formState, disable, onChangeHandler, onSubmitHandler }
}
