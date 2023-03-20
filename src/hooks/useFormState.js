import { useState } from 'react';

export const useFormState = (initialValues) => {
  const [values, setValues] = useState({
    ...initialValues,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

  const resetValues = () => {
    setValues(initialValues);
  };

  const handlePasswordVisibility = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  return [values, handleChange, resetValues, handlePasswordVisibility];
};