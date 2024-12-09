import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LabelWithInput from './LabelWithInput';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://dogs.kobernyk.com/login', formData);
            const token = response.data.token;

            // Збереження токена в localStorage
            localStorage.setItem('token', token);

            // Переадресація на головну сторінку
            navigate('/home');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to login. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <LabelWithInput
                    type="text"
                    labelText="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <LabelWithInput
                    type="password"
                    labelText="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
