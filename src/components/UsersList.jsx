import React, {useState, useEffect} from 'react'
import { fetchUsers,deleteUser } from './Apis';
import { useAuth } from '../context/AuthContext';


const UsersList = () => {
    const { logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
        fetch(`https://reqres.in/api/users?page=${page}`)
          .then(res => res.json())
          .then(data => {
            const updatedUsers = data.data.map(user => {
              // Check if this user was updated and exists in sessionStorage
              const storedUser = sessionStorage.getItem(`user_${user.id}`);
              return storedUser ? JSON.parse(storedUser) : user;
            });
            
            setUsers(updatedUsers);
          });
      }, [page]);
  
      const handleDelete = async (id) => {
        try {
          await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
          setUsers(users.filter(user => user.id !== id)); // Remove the user from UI
        } catch (error) {
          console.error("Failed to delete user", error);
        }
      };

      return (
        <div className="p-4">
          <button onClick={logout} className="bg-red-500 text-white p-2 mb-4">Logout</button>
          <h2 className="text-lg font-bold">Users List</h2>
          <ul className="space-y-4">
            {users.map(user => (
              <li key={user.id} className="border p-2 flex items-center justify-between rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full" />
                  <span className="font-semibold">{user.first_name} {user.last_name}</span>
                </div>
                <div className="flex space-x-2">
              <a href={`/edit/${user.id}`} className="text-blue-500 px-3 py-1">Edit</a>
              <button 
                onClick={() => handleDelete(user.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button 
              onClick={() => setPage(page - 1)} 
              disabled={page === 1} 
              className="bg-gray-300 px-4 py-2 mr-2 rounded disabled:opacity-50">
              Prev
            </button>
            <button 
              onClick={() => setPage(page + 1)} 
              className="bg-gray-300 px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      );
}

export default UsersList
