import React, { useState } from 'react';
import { apiClient } from '@/utils/apiClient';

const SignUpForm = ({ onSignUpSuccess, onError }) => {
    const [userId, setUserId] = useState(''); 
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailMessage, setEmailMessage] = useState(''); 

    const validateEmailFormat = (inputEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(inputEmail);
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        if (inputEmail === '') {
            setIsEmailValid(false);
            setEmailMessage('');
        } else if (!validateEmailFormat(inputEmail)) {
            setIsEmailValid(false);
            setEmailMessage("올바른 이메일 형식을 입력해주세요.");
        } else {
            setIsEmailValid(true);
            setEmailMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !email || !name || !password || !confirmPassword) {
            onError("모든 필수 정보를 입력해주세요.");
            return;
        }

        if (!isEmailValid) {
            onError("이메일 형식이 올바르지 않습니다.");
            return;
        }

        if (password !== confirmPassword) {
            onError("비밀번호가 일치하지 않습니다.");
            setPassword('');
            setConfirmPassword(''); 
            return;
        }

        try {
            const response = await apiClient.post('/api/user/signup',{
                userId: userId,
                email: email,
                name: name,
                password: password, 
            }); 

            alert(response.message);
            onSignUpSuccess();
            setUserId('');
            setEmail('');
            setName('');
            setPassword('');
            setConfirmPassword('');
            setIsEmailValid(false);
            setEmailMessage('');
           
        } catch (error) {
            console.error("회원가입 요청 중 오류 발생:", error);
            onError("회원가입 요청 중 오류가 발생했습니다.");
        }
    };

    // 회원가입 버튼 활성화 조건
    const isSignUpButtonDisabled = !(
        userId &&
        email &&
        name &&
        password &&
        confirmPassword &&
        isEmailValid &&
        password === confirmPassword
    );

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <span>or use your email for registration</span>

                <input
                    name="userId"
                    type="text"
                    placeholder="ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                
                <input
                    name="email"
                    type="email"
                    placeholder="Email" 
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                {emailMessage && (
                    <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0', textAlign: 'left', width: '100%' }}>
                        {emailMessage}
                    </p>
                )}

                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password" // 플레이스홀더 "Confirm Password" 사용
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {password && confirmPassword && password !== confirmPassword && (
                    <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0', textAlign: 'left', width: '100%' }}>
                        Passwords do not match.
                    </p>
                )}

                <button type="submit" disabled={isSignUpButtonDisabled}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;