import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!rollNo || !password) {
      setError('Please enter both Roll Number and Password');
      return;
    }

    const result = login(rollNo, password);

    if (result.success) {
      if (result.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Invalid Roll Number or Password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-2">
              🪙 EduCoin
            </h1>
            <p className="text-gray-600">Learn, Earn & Redeem</p>
            <p className="text-sm text-gray-500 mt-2">Quality Education Project</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-2">
                Roll Number
              </label>
              <input
                id="rollNo"
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent outline-none transition"
                placeholder="Enter your Roll Number"
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent outline-none transition"
                placeholder="Enter your Password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-school-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          {/* <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo Credentials:</p>
            <p className="mt-2">
              <span className="font-semibold">Student:</span> Roll No: xxxxxx, Password: password123
            </p>
            <p>
              <span className="font-semibold">Admin:</span> Roll No: admin, Password: admin123
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

