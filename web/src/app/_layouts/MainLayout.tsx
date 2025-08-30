import { FC, ReactNode } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold">Welcome Back!</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-6 bg-white shadow-lg rounded-lg">Widget 1</div>
                    <div className="p-6 bg-white shadow-lg rounded-lg">Widget 2</div>
                    <div className="p-6 bg-white shadow-lg rounded-lg">Widget 3</div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout;