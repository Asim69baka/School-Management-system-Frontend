import React, { useState } from 'react';
import axios from 'axios';
import Nalam from '../assets/Nalam.jpg';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function OTP() {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        axios.post("http://localhost:8000/api/verifyOTP", { otp, email })
            .then(response => {
                if (response.data === "OTP verified successfully") {
                    toast.success('OTP verified successfully');
                    history('/Home'); // Redirect to home page
                } else if (response.data === "OTP not found. Please sign up again.") {
                    toast.error('OTP not found');
                } else if (response.data === "Invalid OTP") {
                    toast.error('Invalid OTP');
                } else {
                    toast.error('An error occurred. Please try again.'); // Generic error message
                }
            }).catch(error => {
                console.error(error);
                toast.error('Please enter correct otp.'); // Generic error message
            })
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 my-10">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={Nalam}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Verify your Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                                    Enter Your email 
                                </label>
                            </div>
                            <div className="mt-2 my-2">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    autoComplete="otp"
                                    required
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                                    Enter Your OTP
                                </label>
                            </div>
                            <div className="mt-2 my-2">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    autoComplete="otp"
                                    required
                                    placeholder='Enter your otp'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Verify
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Didn't receive OTP?{' '}
                        <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Resend OTP
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}


export default OTP;
