import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import axios from 'axios';


export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$#_]/, 'Password must contain at least one special character (@, $, #, _)')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues:{
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: () => {
      loginUser();
    }
  })

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, formik.values);
      if (data.message === 'success') {
        alert('User logged in successfully');

        localStorage.setItem("userToken", data.token);

      } else {
        alert('Login failed, please try again');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('An error occurred, please try again');
    }
  }

  return (
    <div className='register'>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* <div>
          <label>Username</label>
          <input
            id="userName"
            name='userName' 
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
        </div>

        {formik.errors.userName && formik.touched.userName ? (
          <div>{formik.errors.userName}</div>
        ): null} */}

        <div>
          <label>Email</label>
          <input
            id="email"
            name='email' 
            type='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        )
         : null}


        <div>
          <label>Password</label>
          <input
            id="password"
            name='password' 
            type='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>        
        
        {formik.errors.password && formik.touched.password ? (
          <div>{formik.errors.password}</div>
        ): null}

        <a href="#">Forgot Password?</a>
        <button type='submit'>Login</button>
      </form>
      
    </div>
  )
}
