import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginscreen.css';
import { registerUser } from '../../connection/API';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        if (!username || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await registerUser(username, password);
            console.log('Registration successful:', response.data);
            // Redirect to login page or anywhere else after registration
            navigate('/Login');
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error);
            if (error.response && error.response.status === 406) {
                setError('Username already exists. Please try another one.');
            } else {
                setError('Failed to register. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <button onClick={() => navigate('/Login')}>Login</button>
            </p>
        </div>
    );
}

export default Register;
