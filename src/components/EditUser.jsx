import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router';
import { fetchUserById, updateUser } from './Apis';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  
    useEffect(() => {
        fetchUserById(id).then((data) => setUser(data.data));
      }, [id]);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });
      
        if (response.ok) {
          // Update local storage or pass updated data to UsersList
          const updatedUser = { id, ...user };
          
          // Store in session storage so UsersList can access it
          sessionStorage.setItem(`user_${id}`, JSON.stringify(updatedUser));
          
          navigate("/users");
        }
      };
  
    return (
      <div className="p-4">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input className="border p-2 w-full mb-2" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} placeholder="First Name" required />
          <input className="border p-2 w-full mb-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} placeholder="Last Name" required />
          <input className="border p-2 w-full mb-2" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" required />
          <button className="bg-green-500 text-white p-2 w-full" type="submit">Save</button>
        </form>
      </div>
    );
}

export default EditUser
