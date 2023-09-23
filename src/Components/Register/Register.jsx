import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Register({ saveUserData }) {

  let baseurl = 'https://ecommerce.routemisr.com/';
  let Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  // **************** handleRegister *******************************
  async function handleRegister(values) {
    setIsLoading(true);
    let { data } = await axios.post(`${baseurl}api/v1/auth/signup`, values).catch((error) => {
      setMessageError(error.response.data.message);
      setIsLoading(false);
    })
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setIsLoading(false);
      Navigate('/login')
    }

  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'name minlength is 3').max(20, 'name maxlength is 20'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......'),
    rePassword: Yup.string().required('rePassword is required')
      .oneOf([Yup.ref('password')], 'password and rePassword does match'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone must valid number....'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister
  });
  // *************************************************************

  return <>
    <Helmet>
      <title>Register</title>
    </Helmet>

    <div className="w-75 mx-auto py-4">
      <h3>Registeration Form :</h3>

      {messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null}

      <form onSubmit={formik.handleSubmit}>

        <div className="my-3">
          <label htmlFor="name">Name :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
            className='form-control mt-2' type="text" name="name" id="name" />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
        </div>

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

        <div className="my-3">
          <label htmlFor="rePassword">rePassword :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}
            className='form-control mt-2' type="password" name="rePassword" id="rePassword" />
          {formik.errors.rePassword && formik.touched.rePassword ? (<div className='alert alert-danger'>
            {formik.errors.rePassword} </div>) : null}
        </div>

        <div className="my-3">
          <label htmlFor="phone">Phone :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
            className='form-control mt-2' type="tel" name="phone" id="phone" />
          {formik.errors.phone && formik.touched.phone ? (<div className='alert alert-danger'>{formik.errors.phone}
          </div>) : null}
        </div>

        {isLoading ? <button className='btn bg-info text-white' type='button'><i className="fas fa-spinner fa-spin"></i>
        </button> : <button disabled={!(formik.isValid && formik.dirty)}
          className='btn bg-info text-white' type='submit'>Register</button>}

      </form>
    </div>
  </>
}
