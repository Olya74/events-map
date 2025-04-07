import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const RegisterForms = () => {
  const [form, setForm] = useState({ name: "",email:"", password: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const { setUser } = useAuthStore();

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
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} placeholder="name" required />
      <input name="email" type="email" onChange={handleChange} placeholder="email" required />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="password"
        required
      />
      <HCaptcha
        // sitekey="53f02434-8ee2-4760-b81c-533e5b7a5ada"
        sitekey="da8a03d4-3dcc-42a4-b86c-c1ec1614f426"
        onVerify={(token) => {
          setCaptchaToken(token);
        }}
      />
      <button type="submit">register</button>
    </form>
  );
};

export default RegisterForms;
