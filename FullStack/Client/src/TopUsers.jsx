import React from 'react'
import { useState, useEffect } from 'react'


const TopUsers = () => {

    const [topUser, setTopUser] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:3000/topUsers')
          .then(response => response.json())
          .then(data => {
            setTopUser(data);
          })
          .catch(error => {
            console.error('Error fetching top users:', error);
          });
      }, []);

  return (
    <div>
      <h1>Top Users</h1>
      <ul>
        {topUser.map(user => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>Posts: {user.postCount}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopUsers
