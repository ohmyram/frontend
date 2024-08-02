import React, { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonLogos from "../components/subComponents/LoginBtn";
import Inputs from "../components/subComponents/Input";
import Option from "../components/subComponents/SpanOptions";
import BtnRegister from "../components/subComponents/RegisterBtn";
import LinkR from "../components/subComponents/LinkToReg";

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = useCallback(async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', data);
            alert(res.data.message);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl border border-gray-300">
                <img className="w-36" src="/devchallenges.svg" alt="Logo" />
                <h2 className="mt-6 text-2xl font-medium text-gray-900">
                    Join thousands of learners from around the world
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                    Master web development by making real-life projects. There are multiple paths for you to choose.
                </p>
                <form onSubmit={handleRegister} className="mt-8 space-y-6">
                    <Inputs />
                    <BtnRegister />
                </form>
                <Option />
                <ButtonLogos />
                <LinkR />
            </div>
        </div>
    );
};

export default Register;
