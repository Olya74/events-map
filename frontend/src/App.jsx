import { useState, useEffect } from 'react'
import './App.css';
import api from './api'
import Register from './components/Register';
import Chat from './components/Chat';
function App() {
  //   const [users,setUsers] = useState([])
  // useEffect(() => {
  //   api
  //     .get("/users")
  //     .then((res) => {
  //       setUsers(res.data)})
  //     .catch(() => setUsers(null));
  // }
  // ,[])
    const [user,setUser] = useState(null)
  useEffect(() => {
    api
      .get("/auth")
      .then((res) => {
        setUser(res.data)})
      .catch(() => setUser(null));
  }
  ,[])
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  };
  return (
    <div>
      <Chat eventId={1} user={user} />
      {user ? (
      <div>
        <h1>Welcome {user.name}</h1>
        <p>{user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
     ) : (
      <div>
        <h1>Please login</h1>
      </div>
     )}
      {/* <Register /> */}
      {/* {users.length>0 ? (
      <div>
        <h1>Welcome {users[0].name}</h1>
        <p>{users[0].email}</p>
      </div>
     ) : (
      <div>
        <h1>Please login</h1>
      
      </div>
     )} */}
    </div>
  );
}

export default App
