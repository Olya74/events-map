import { useState } from "react";
import axios from "axios";
import useAuthStore from '../store/useAuthStore.jsx'

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { fetchUser } = useAuthStore();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8834/api/login", form);
      console.log("login", form);
      await fetchUser();
    } catch (e) {
      alert(e.response.data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="email"
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
