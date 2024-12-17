import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Switch } from "@/components/ui/switch"
import Cookies from 'js-cookie';



interface LoginProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    darkMode,
    setDarkMode,
}: LoginProps) => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            alert('Please fill out both fields!');
            return;
        }

        setLoading(true);

        try {
            console.log('Email:', email);
            console.log('Password:', password);

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const result = await response.json();
            console.log('Login Response:', { result });
            Cookies.set("token", result.token)
            alert('Login Successful!');
        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            alert(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-lg shadow-md`}>
                <Switch
                    onClick={() => setDarkMode(!darkMode)}
                    className={`${darkMode ? 'bg-yellow-400' : 'bg-gray-800'} mr-[30%] ${darkMode ? 'text-black' : 'text-white'} transition duration-200`}
                />
                <h1 className={`text-2xl font-semibold text-center inline-block mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login</h1>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-8`}>
                    Welcome Back! Please log in to continue.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your password"
                            autoComplete="password"
                            required
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-6 text-sm text-gray-400">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-gray-100 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>



            </div>
        </div>
    );
};

export default Login;
