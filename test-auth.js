import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error)
);

async function test() {
  try {
    const res = await api.post('/auth/login', {
      email: "debug@example.com",
      password: "Password123!"
    });
    console.log("SUCCESS:", res);
    
    // Simulate useAuth onSuccess
    const data = res.data;
    console.log("Extracting data:", data);
    console.log("accessToken:", data.accessToken);
    console.log("user:", data.user);
  } catch (err) {
    console.log("ERROR:", err);
  }
}
test();
