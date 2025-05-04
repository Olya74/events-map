import RegisterForms from "./components/register/RegisterForms";
import LoginForm from "./components/login/LoginForm";
import Home from "./pages/Home";
import EventsList from "./components/events/EventsList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import useAuthStore from "./store/useAuthStore.jsx";
import { useEffect } from "react";
import './App.css';
const App = () => {
  const { user, loading, fetchUser, logout } = useAuthStore();
  // const [showRegister, setShowRegister] = useState(false);
useEffect(() => {
  fetchUser();
}, [fetchUser]);

if (loading) return <p> Loading....</p>;
  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  // if (loading) return <p>Loading....</p>;

  // // if (user) {
  // //   return (
  // //     <div>
  // //       <h1>Welcome back,{user.name}</h1>
  // //       <button onClick={logout}>Logout</button>
  // //     </div>
  // //   );
  // // }
  return (
    
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForms />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventsList />} />
          <Route path="/events/:id/edit" element={<EventsList />} />
          <Route path="/events/:id/delete" element={<EventsList />} />
          <Route path="/events/:id/media" element={<EventsList />} />
          <Route path="/events/:id/media/:mediaId" element={<EventsList />} />
          <Route
            path="/events/:id/media/:mediaId/edit"
            element={<EventsList />}
          />
          <Route
            path="/events/:id/media/:mediaId/delete"
            element={<EventsList />}
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          {/* </Route> */}
        </Routes>
      </Layout>
    
    //   <div>
    //      <h1 class="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    //     {showRegister ? <RegisterForms /> : <LoginForm />}

    //     <p>
    //       {showRegister ? (
    //         <>
    //           Already have an account?{" "}
    //           <button onClick={() => setShowRegister(false)}>Login</button>
    //         </>
    //       ) : (
    //         <>
    //           Don't have an account ?{" "}
    //           <button onClick={() => setShowRegister(true)}>Register</button>
    //         </>
    //       )}
    //     </p>
    //   </div>
  );
};

export default App;
