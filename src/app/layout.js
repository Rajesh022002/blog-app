import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../../components/Navbar/navbar';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Blog-Appsdeployer',
    openGraph: {
        description:
            'Creating delightful,customer-friendly tech products with excellence',
        images: [
            {
                url: '/images/image1.png', // URL to your image
                width: 1200, // Image width
                height: 630, // Image height
                alt: 'Image Alt Text', // Alt text for the image
            },
        ],
    },
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
