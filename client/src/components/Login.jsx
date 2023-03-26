import React from 'react';
import {gql, useMutation} from '@apollo/client'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const history = useNavigate()
    const [formData, setFormData] = useState({
        email: "", password: ""
    })
    const LOGIN = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password) {
            name
            email
        }
    }
    `
    const [login, {data, loading, error}] = useMutation(LOGIN, {
        variables: {email: formData.email, password: formData.password}
    })
    const getValue = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    if(error) return <h1>{error.message}</h1>
    if(data) history("/")
    return (
        <>
            <form action="" method='POST'>
                <label htmlFor="">Email</label>
                <input onChange={getValue} type="email" name="email" id="" /><br />
                <label htmlFor="">Password</label>
                <input onChange={getValue} type="password" name="password" id="" /><br />
                <input onClick={e => {
                    console.log(formData)
                    e.preventDefault()
                    login()
                }} type="submit" value={`${loading ? "Submitting" : "Login"}`} />
            </form>
        </>
    );
};

export default Login;