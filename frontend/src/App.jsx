import { useState, useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import RegisterForms from "./components/RegisterForms";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";

const App = () => {
  const { user, loading, fetchUser, logout } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Loading....</p>;

  if (user) {
    return (
      <div>
          <Home />
        <h1>Welcome back,{user.name}</h1>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  return (
    <div>
       <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
      {showRegister ? <RegisterForms /> : <LoginForm />}

      <p>
        {showRegister ? (
          <>
            Already have an account?{" "}
            <button onClick={() => setShowRegister(false)}>Login</button>
          </>
        ) : (
          <>
            Don't have an account ?{" "}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </>
        )}
      </p>
    </div>
  );
};

export default App;
