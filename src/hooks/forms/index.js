import { useState, useEffect, useCallback } from 'react'

export const useForm = function(stateForm, validations = {}, callback) {
  const [formState, setFormState] = useState(stateForm)
  const [disable, setDisable] = useState(true)
  const [isDirty, setIsDirty] = useState(false)

  // useEffect(() => {
  //   setDisable(true)
  // }, [])

  useEffect(() => {
    isDirty && setDisable(validateState())
  }, [formState, isDirty])

  const validateState = useCallback(() => {
    const hasError = Object.keys(validations).some(key => {
      const isRequired = validations[key].required
      const value = formState[key].value
      const error = formState[key].error

      return (isRequired && !value) || error
    })
    return hasError
  }, [formState, validations])

  const onChangeHandler = useCallback(({ target: { name, value } }) => {
    const inputValidator = validations[name].validator
    let error = ''

    setIsDirty(true)

    if (validations[name].required) {
      if (!value) error = 'This field is required!!!'
    }

    if(inputValidator !== null && typeof inputValidator === 'object') {
      if(value && !inputValidator.regEx.test(value)) {
        error = inputValidator.error
      }
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: {value, error}
    }))
  }, [validations])

  const onSubmitHandler = useCallback(event => {
    event.preventDefault()
    !validateState && callback(formState)
  }, [formState])

  return { formState, disable, onChangeHandler, onSubmitHandler }
}