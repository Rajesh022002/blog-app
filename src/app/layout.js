import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../../components/Navbar/navbar';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Blog-Appsdeployer',
    description:
        'Creating delightful,customer-friendly tech products with excellence',
    Image: '/image/image1.png',
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />

                {children}
            </body>
        </html>
    );
}
