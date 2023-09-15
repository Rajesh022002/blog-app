// pages/blogs/index.tsx
import React from 'react';
import styles from './blogListingPage.module.css';
import Link from 'next/link';
export async function generateMetadata({ params }) {
    // Read the blogId from the route params
    const { blogId } = params;

    // Fetch the blog data
    const blog = await getBlogData(blogId);

    console.log('ncnc', blog);
    // Generate metadata based on the fetched blog data
    return {
        title: blog && blog[0]?.title, // Set the title dynamically
        description: blog && blog[0]?.description, // Set the description dynamically
        Image: blog && 'https://task.appsdeployer.com/api/' + blog?.titleImage,
        // Add any other metadata fields you need
    };
}
async function BlogListingPage({ params: { blogId } }) {
    const data = await getBlogData(blogId);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        const year = date.getFullYear();
        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    };

    const getOrdinalSuffix = (number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
        return suffixes[lastDigit] || suffixes[lastTwoDigits] || suffixes[0];
    };
    console.log('jjf', data);
    return (
        <div className={styles.main}>
            {data?.map((blogItem) => (
                <div className={styles.container} key={blogItem._id}>
                    <div>
                        <h1 className={styles.title}>{blogItem.title}</h1>
                    </div>
                    <p className={styles.publish_date}>
                        Published on&nbsp;
                        {formatDate(blogItem.uploadDate)}
                        &nbsp;
                        <span className={styles.publisher}>Jaya Joshi</span>
                    </p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blogItem.blog_content,
                        }}
                    />
                </div>
            ))}
            <Link href="/">
                <button className={styles.back_button}>Back</button>
            </Link>
        </div>
    );
}
async function getBlogData(blogId) {
    try {
        const response = await fetch(
            `https://task.appsdeployer.com/api/web/blog/${blogId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
            },
        );

        if (!response.ok) {
            return {
                notFound: true, // Handle 404 error
            };
        }

        const data = await response.json();
        const blog = data.data;

        return blog;
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            notFound: true, // Handle 404 error
        };
    }
}
export default BlogListingPage;
