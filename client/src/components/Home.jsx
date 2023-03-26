import React from 'react';
import {useQuery, gql, NetworkStatus} from '@apollo/client'
import Navbar from './Navbar';

export const GET_ALL_USERS = gql`
  query getUser {
  users {
    _id
    name
    email
    gender
  }
}
`

const Home = () => {
    document.title = "Home"
    const {data, loading, error, networkStatus} = useQuery(GET_ALL_USERS, {
        notifyOnNetworkStatusChange: true,
    })
    if(networkStatus === NetworkStatus.refetch) return <h1>Refetching ...</h1>
    if(error) return <h1>{error.message}</h1>
    if(loading) return <h1>Loading ... </h1>
    return (
        <>
            <Navbar />
            <table width={`100%`} cellPadding={10} border={1}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                </tr>
                </thead>
                <tbody style={{textAlign: "center"}}>
                {
                    data.users.map((user, index) => <tr key={index} style={{padding: ".5rem"}}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    </tr>)
                }
                </tbody>
            </table>
        </>
    );
};

export default Home;