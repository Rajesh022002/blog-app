// components/Layout.js
import Head from 'next/head';

interface LayoutProps {
    title?: string;
    description?: string;
    ogImage?: string;
}

function Layout({ title, description, ogImage }: LayoutProps) {
    return (
        <div>
            <Head>
                <title>{title || 'Default Title'}</title>
                <meta
                    name="description"
                    content={description || 'Default description'}
                />
                <meta property="og:title" content={title || 'Default Title'} />
                <meta
                    property="og:description"
                    content={description || 'Default description'}
                />
                <meta
                    property="og:image"
                    content={ogImage || '/default-image.jpg'}
                />
                {/* Add more common meta tags as needed */}
            </Head>
            {/* Your page content goes here */}
        </div>
    );
}

export default Layout;
