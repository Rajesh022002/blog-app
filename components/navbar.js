// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <p className="text-white text-xl font-bold">Home</p>
                </Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/about">
                            <p className="text-white">About</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <p className="text-white">Contact</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog">
                            <p className="text-white">Blog</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
