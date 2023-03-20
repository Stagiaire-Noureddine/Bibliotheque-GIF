import axios from 'axios';

const getUserByEmailAndPassword = async (email, password) => {
  const response = await axios.get('http://localhost:4000/users');
  const users = response.data;
  return users.find((u) => u.email === email && u.password === password);
};

export { getUserByEmailAndPassword };
