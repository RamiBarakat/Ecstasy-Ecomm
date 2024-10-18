import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import axios from 'axios';

export default function Register() {
  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, 'Username must be at least 2 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$#_]/, 'Password must contain at least one special character (@, $, #, _)')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema, 
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });


  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, values);
      if (data.message === 'success') {
        alert('User registered successfully');
      } else {
        alert('Signup failed, please try again');
      }
    } catch (error) {
      console.error('Error during signup', error);
      alert('An error occurred, please try again');
    }
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Username Field */}
        <div>
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div>{formik.errors.userName}</div>
          ) : null}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
