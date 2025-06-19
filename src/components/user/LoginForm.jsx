import React, { useState } from 'react';
import { useAuth } from '@/components/common/provider/AuthProvider';


const LoginForm = () => {
    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(userId, password);
        } catch (error) {
            alert(error);
            setPassword('');
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <span>or use your account</span>
                <input
                    name="userId"
                    type="userId"
                    placeholder="ID"
                    value={userId}
                    onChange={(e) => setuserId(e.target.value)}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;