import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './register.css';
import useAuthStore from "../../store/useAuthStore.jsx";

const RegisterForms = () => {
  const [form, setForm] = useState({ name: "",email:"", password: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const { setUser} = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8834/api/register", {
        ...form,
        captcha: captchaToken,
      });
      alert("Registration successful");
       const user = { name: form.name, email: form.email, password: 'SEKRET' };
       setUser(user);
       navigate('/');
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="name"
          required
        />
      </div>
      <div className="form-name">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="email"
          required
        />
      </div>
       <div className="form-name">
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="password"
        required
      />
      </div>
      <div className={captchaToken ? "captcha-hidden" : "captcha"}>
        <HCaptcha
          // sitekey="53f02434-8ee2-4760-b81c-533e5b7a5ada"
          sitekey="da8a03d4-3dcc-42a4-b86c-c1ec1614f426"
          onVerify={(token) => {
            setCaptchaToken(token);
          }}
        />
      </div>

      <button type="submit">register</button>
    </form>
  );
};

export default RegisterForms;
