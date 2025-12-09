import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 800);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100 relative overflow-hidden p-4">
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-sm p-6 shadow-xl border-green-100">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-20 h-20 mb-4 flex items-center justify-center">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M 40 10 A 30 30 0 0 1 40 70"
                                    stroke="#1e40af"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 25 20 L 40 55 L 55 20"
                                    stroke="#1e40af"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M 50 25 Q 55 20 60 25 Q 55 30 50 25"
                                    fill="#22c55e"
                                    stroke="#ffffff"
                                    strokeWidth="1"
                                />
                                <path
                                    d="M 50 25 Q 52 22 54 25 Q 52 28 50 25"
                                    fill="#ffffff"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">VayuVision</h1>
                        <p className="text-gray-500 mt-2">Urban Carbon Capture & Planning</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@vayuvision.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="flex justify-end">
                                <a href="#" className="text-xs text-green-600 hover:text-green-800 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-black mt-6 transition-all border border-black"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or</span>
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                            onClick={() => { }}
                        >
                            Create New Account
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;

