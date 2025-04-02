import {useState} from 'react'
import api from '../api'
function Login() {
    const [form,setForm] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
       try{
        const {data} = await api.post('/login',form)
        console.log(data)
        localStorage.setItem('token',data.token)
        alert('Login successful!')
        // Redirect to dashboard or perform any other action
        // For example, you can use react-router to navigate to the dashboard page
        // history.push('/dashboard')
        // Clear the form after successful login
        setForm({
            email: '',
            password: ''
        })
       }catch(err){
        alert(err.response?.data?.message || 'Login failed! Please try again')
        console.log(err)
       }
    }
  return (
    <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder='Email' onChange={handleChange} required />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"  onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
        <p>Or <a href="/">go back</a></p>
        <p>By logging in, you agree to our <a href="/terms">terms and conditions</a>.</p>
        <p>We value your privacy. Please read our <a href="/privacy">privacy policy</a>.</p>
        <p>Need help? <a href="/support">Contact support</a>.</p>
        <p>Follow us on <a href="/social-media">social media</a> for updates.</p>
        <p>Check out our <a href="/blog">blog</a> for tips and tricks.</p>
        <p>Forgot your password? <a href="/reset-password">Reset it here</a>.</p>
        <p>Remember me? <a href="/remember-me">Learn more</a>.</p>
        <p>Check your spam folder if you don't see our email.</p>
        <p>Need to update your profile? <a href="/update-profile">Update here</a>.</p>
        <p>Want to delete your account? <a href="/delete-account">Delete here</a>.</p>
        <p>Check out our <a href="/events">events</a> for more information.</p>
      
    </form>
  )
}

export default Login
