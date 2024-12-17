import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';

const App = () => {
  const [email, setEmail] = useState<string>(''); // State for email
  const [password, setPassword] = useState<string>(''); // State for password
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [name, setName] = useState<string>(''); // State for name
  const [darkMode, setDarkMode] = useState<boolean>(false); // State for dark mode

  useEffect(() => {
    // Check the system preference for dark mode and set the initial state
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []); // Empty array ensures this runs only once after the initial render

  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <Login
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
        <Register
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
      path:"*",
      element:<div>Page Not Found</div>
    }
  ]);

  return (
    <main className={darkMode ? 'dark' : ''}>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
