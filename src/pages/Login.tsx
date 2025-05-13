import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { login } from '~/services/auth';

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
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
            await login(data.email, data.password);
            navigate('/home');
        } catch (error) {
            setError('Email or password incorrect');   
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form 
            onSubmit={handleSubmit(onSubmit)} 
            className='bg-white p-8 rounded shadow-md w-full max-w-md'
            >
                <h2 className='text-2xl font-bold mb-6'>Login</h2>

                {error && <p className='text-red-500 mb-4'>{error}</p>}

                <input 
                    type='email'
                    placeholder='Email'
                    {...register('email')}
                    className='w-full p-2 mb-2 border rounded'
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                <input 
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                    className='w-full p-2 mb-2 border rounded'
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                <button 
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4'
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;