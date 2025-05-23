import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { register as registerUser } from '~/services/auth';

const schema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  phone: z.string().min(8, { message: 'Phone is required' }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email might be already in use.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input {...register('name')} className="w-full p-2 mb-2 border border-gray-300 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email')} className="w-full p-2 mb-2 border border-gray-300 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Password</label>
        <input type="password" {...register('password')} className="w-full p-2 mb-2 border border-gray-300 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Phone</label>
        <input {...register('phone')} className="w-full p-2 mb-4 border border-gray-300 rounded" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
