import {useState} from 'react'
import api from '../api'
function Register() {
    const [form,setForm] = useState({
        name: '',
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
        api.post('/register',form)
        .then((res) => {
            console.log(res.data)
            alert('Registration successful!Login to continue')
            // Redirect to login page or perform any other action
            // For example, you can use react-router to navigate to the login page
            // history.push('/login')
            // Clear the form after successful registration
            setForm({
                name: '',
                email: '',
                password: ''
            })
        })
        .catch((err) => {
            alert(err.response?.data?.message || 'Registration failed! Please try again')
            console.log(err)
        })
    }
    return (
    <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder='Name' onChange={handleChange} required />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email"  onChange={handleChange} required />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"  onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
        <p>Or <a href="/">go back</a></p>
        <p>By registering, you agree to our <a href="/terms">terms and conditions</a>.</p>
        <p>We value your privacy. Please read our <a href="/privacy">privacy policy</a>.</p>
        <p>Need help? <a href="/support">Contact support</a>.</p>
        <p>Follow us on <a href="/social-media">social media</a> for updates.</p>
        <p>Check out our <a href="/blog">blog</a> for tips and tricks.</p>
      
    </form>
  )
}

export default Register
