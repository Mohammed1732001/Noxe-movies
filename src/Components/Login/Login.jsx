import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login({ saveUserData }) {

  let baseurl = 'https://ecommerce.routemisr.com/';
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  let Navigate = useNavigate();

  // ***************************************************************
  async function handleLogin(values) {
    setIsLoading(true);
    let { data } = await axios.post(`${baseurl}api/v1/auth/signin`, values).catch((error) => {
      setMessageError(error.response.data.message);
      setIsLoading(false);
    })
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setIsLoading(false);
      Navigate('/')
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });
  // ****************************************************************
  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="w-75 mx-auto py-5">
      <h3>Login Now :</h3>

      {messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null}

      <form onSubmit={formik.handleSubmit}>

        <div className="my-3">
          <label htmlFor="email">Email :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            className='form-control mt-2' type="email" name="email" id="email" />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> :
            null}
        </div>

        <div className="my-3">
          <label htmlFor="password">Password :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
            className='form-control mt-2' type="password" name="password" id="password" />
          {formik.errors.password && formik.touched.password ? (<div className='alert alert-danger'>{formik.errors.password}
          </div>) : null}
        </div>

        <div className="float-start">
          {isLoading ? <button className='btn bg-info text-white' type='button'>
            <i className="fas fa-spinner fa-spin"></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)}
            className='btn bg-info text-white' type='submit'>Login</button>}
        </div>

      </form>
    </div>
  </>
}
