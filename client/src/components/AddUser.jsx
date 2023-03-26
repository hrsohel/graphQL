import React, { useState } from 'react';
import Navbar from './Navbar';
import {useMutation, gql} from '@apollo/client'
import {useNavigate} from 'react-router-dom'
import {GET_ALL_USERS} from './Home'
import {client} from '../index' 

const ADD_USER = gql`
mutation addUser($content: UserInput!) {
    createUser(content: $content) {
        _id
        name
        email
        password
    }
}
`

const AddUser = () => {
    const history = useNavigate()
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", gender: ""
    })
    document.title = "Add User"
    const [addUser, {data, loading, error, reset}] = useMutation(ADD_USER, {
        variables: {content: formData},
        refetchQueries: [
            {query: GET_ALL_USERS},
            "getUser"
        ]
    })
    const getValue = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    if(error) return <h1>{error.message}</h1>
    if(data) {
        history("/")
    }
    return (
        <>
            <Navbar />
           <form action="">
               <label htmlFor="">Full Name</label>
               <input onChange={getValue} type="text" name="name" id="" placeholder='Full Name' /><br />
               <label htmlFor="">Email</label>
               <input onChange={getValue} type="email" name="email" id="" placeholder='Email' /><br />
               <label htmlFor="">Password</label>
               <input onChange={getValue} type="password" name="password" id="" placeholder='Password' /><br />
               <label htmlFor="">Gender</label>
               <select onChange={getValue} name="gender" id="">
                   <option value="">Select Gender</option>
                   <option value="male">Male</option>
                   <option value="female">Female</option>
                   <option value="others">Others</option>
               </select> <br />
               <input onClick={e => {
                   e.preventDefault()
                   addUser()
               }} type="submit" value={`${loading ? "Loading" : "Add User"}`} />
           </form>
        </>
    );
};

export default AddUser;