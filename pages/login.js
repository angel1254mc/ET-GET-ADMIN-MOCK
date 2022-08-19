import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '../src/axiosAPI/axios';
import { style } from '@mui/system';
import Router from 'next/router';
import useAuth from '../src/hooks/useAuth';
import Logo from '../public/etLogo.webp';
const LOGIN_URL = 'api/login'; /** @note Gotta change this Something else actually */

const Login = () => {
    const { setAuth } = useAuth()
    const userRef = useRef();
    const errRef = useRef();
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response?.data)) //nooooo waydo not console log yo stuff
            if (response.status == '200' || response.status === 200)
            {
                setAuth({user, pwd})
                setErrMsg('');
                setSuccess(true);
                setTimeout (() => {
                    Router.push('/admin')
                }, 1000);
            }
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Wrong Username or Password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus(); //set focus on error display so screen reader reads the error msg
        }
        setUser('');
        setPwd('');
        setSuccess(true);
    }
  return (
    <div className={styles.login_background}>
        <div className={styles.login_column}>
            <div className={styles.login_image}>
                <Image src={Logo} object-fit="contain" layout="fill"></Image>
            </div>
            <div className={styles.header}>
                GET Admin Portal
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                <label htmlFor="username" className={styles.username_header}>Username:</label>
                <input
                    className={styles.username_input}
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password" className={styles.password_header}>Password:</label>
                <input
                    className={styles.password_input}
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <div className={styles.center_horizontal}>
                    <button className={styles.sign_in_button}>Sign In</button>
                </div>
            </form>

            </div>
        </div>
  )
}
export default Login