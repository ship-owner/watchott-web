import React, { useState } from 'react';
import { apiClient } from '@/utils/apiClient';

const LoginForm = ({ onLoginSuccess, onError }) => {
    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await apiClient.post('/api/user/login',{
                userId: userId,
                password: password, 
            }); 

            const data = await response.data;
            if (data && data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                onLoginSuccess();
            } else {
                onError("로그인 성공했지만, 토큰이 없습니다.");
            }
           
        } catch (error) {
            onError(error);
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