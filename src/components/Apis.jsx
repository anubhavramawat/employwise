const BASE_URL = "https://reqres.in/api";

// Function for login request
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json(); // Returns { token: "your-token" }
};

// Function to get users (paginated)
export const fetchUsers = async (page) => {
  const response = await fetch(`${BASE_URL}/users?page=${page}`);
  return response.json(); // Returns { data: [...users] }
};

// Function to fetch a single user by ID
export const fetchUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return response.json(); // Returns { data: { first_name, last_name, email } }
};

// Function to update user details
export const updateUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Function to delete a user
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
