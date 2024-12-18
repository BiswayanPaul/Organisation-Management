import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
// import Cookies from 'js-cookie';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


interface RegisterProps {
    name?: string;
    setName?: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    darkMode,
    setDarkMode,
}: RegisterProps) => {
    const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !email || !password) {
            toast.error('Please fill out all fields!')
            return;
        }

        setLoading(true);

        try {
            const bodyData = { name, email, password };
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const result = await response.json();

            toast.success(result.message)
            navigate("/login");
            setTimeout(() => { navigate(0) }, 100);

        } catch (error) {
            const err = error as Error;
            console.error('Error:', err.message);
            toast.error(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // console.log("Hello")
        // const val = Cookies.get("token")
        // console.log({ val });
    }, []);

    return (
        <div className={`flex items-center justify-center min-h-screen p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Toaster position='top-center'></Toaster>
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-lg shadow-md`}>
                <Switch
                    onClick={() => setDarkMode(!darkMode)}
                    className={`${darkMode ? 'bg-yellow-400' : 'bg-gray-800'} mr-[30%] ${darkMode ? 'text-black' : 'text-white'} transition duration-200`}
                />
                <h1 className={`text-2xl font-semibold text-center inline-block mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Register</h1>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-8`}>Create an account to get started!</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => { if (setName) setName(e.target.value) }}
                            className={`w-full p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            autoComplete='password'
                            required
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-6 text-sm text-gray-400">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-gray-100 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
