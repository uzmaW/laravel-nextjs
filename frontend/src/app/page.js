'use client'
import { useRouter } from 'next/navigation';

export const Home = ()=> {
    const router = useRouter();

    router.push('/login');

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                     Welcome to TaskManager 
                </div>
            </div>
        </>
    )
}

export default Home;