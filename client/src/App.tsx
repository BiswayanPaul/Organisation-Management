import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Todo from './components/Todo';

// Define types for props
interface AuthProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string; // Optional for Login
  setName?: React.Dispatch<React.SetStateAction<string>>; // Optional for Login
}

// Wrapper components with proper props typing
const LoginWrapper: React.FC<AuthProps> = (props) => <Login {...props} />;
const RegisterWrapper: React.FC<AuthProps> = (props) => <Register {...props} />;

const App = () => {
  const [email, setEmail] = useState<string>(''); // State for email
  const [password, setPassword] = useState<string>(''); // State for password
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [name, setName] = useState<string>(''); // State for name
  const [darkMode, setDarkMode] = useState<boolean>(false); // State for dark mode

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <LoginWrapper
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          setLoading={setLoading}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ),
    },
    {
      path: '/register',
      element: (
        <RegisterWrapper
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          setLoading={setLoading}
          name={name}
          setName={setName}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ),
    },
    {
      path: "/dashboard",
      element: <Dashboard darkMode={darkMode} setDarkMode={setDarkMode}/>
    },
    {
      path: "/todo",
      element: <Todo />
    },
    {
      path: '*',
      element: <div>Page Not Found</div>,
    },
  ]);

  return (
    <main className={darkMode ? 'dark' : ''}>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
