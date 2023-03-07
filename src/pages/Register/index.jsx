import React, { useContext } from 'react';
import { registerFields, registerInitValues } from './registerFields';
import CustomForm from '../../components/CustomForm';
import { AuthContext } from '../../context/authContext';

// const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
function Register() {
  const { register } = useContext(AuthContext);

  return (
    <CustomForm
      initialValues={registerInitValues}
      fields={registerFields}
      onSubmit={register}
      btnProps={{
        children: 'Sign Up',
      }}
    />
  );
}

export default Register;
