import { Outlet,NavLink } from 'react-router-dom'
import './layout.css'
import useAuthStore from '../../store/useAuthStore.jsx';

function Layout({children}) {
    const { user, logout} = useAuthStore();
  return (
    <div className="">
      <header className="bg-[#9ec2d3]   p-4">
        <nav>
          <ul className="flex items-center justify-between">
            <li>
              <img className="logo" src="/brandenburg-tor.png" alt="logo" />
            </li>
            <li>
              <NavLink to="/">Main</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              {user ? (
                <>
                  <span>Welcome {user.name}</span>
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <ul className="flex items-center gap-4">
                  <li>Welcome Guest</li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <div id="content">{children}</div>
      <footer className="footer">Footer</footer>
      <Outlet />
    </div>
  );
}

export default Layout
