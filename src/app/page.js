'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import Image from 'next/image';
import { Pagination } from '@nextui-org/react';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetchData(0).then(() => {
            setLoading(false);
        }); // Call the  function immediately
    }, []); // Empty dependency array to run this effect once on mount
    function scrollToTop() {
        const currentY = window.scrollY;

        function scrollToTopAnimation(timestamp) {
            const duration = 1000; // Duration of the animation in milliseconds
            const elapsed = timestamp - startTimestamp;

            if (elapsed < duration) {
                const progress = elapsed / duration;
                const easeInOutCubic =
                    progress < 0.5
                        ? 4 * progress * progress * progress
                        : (progress - 1) *
                              (2 * progress - 2) *
                              (2 * progress - 2) +
                          1;

                window.scrollTo(0, currentY * (1 - easeInOutCubic));
                requestAnimationFrame(scrollToTopAnimation);
            } else {
                window.scrollTo(0, 0);
            }
        }

        const startTimestamp = performance.now();
        requestAnimationFrame(scrollToTopAnimation);
    }

    const handlePageChange = useCallback((selected) => {
        fetchData(selected).then(() => {
            scrollToTop();
        });
    }, []);
    const fetchData = async (selected) => {
        try {
            const response = await fetch(
                'https://task.appsdeployer.com/api/web/blogs',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers as needed
                    },
                    body: JSON.stringify({
                        page_number: selected,
                        page_size: 11,
                    }), // Replace with your request data
                },
            );

            if (response.ok) {
                const data = await response.json();
                setBlogs(data.data); // Assuming 'data' contains the list of blogs
            } else {
                console.error('Error fetching data:', response.statusText);
                setBlogs([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setBlogs([]);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // const options = { day: 'numeric', month: 'short', year: 'numeric' };

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
    function shorten(text, max) {
        return text && text.length > max
            ? text.slice(0, max).split(' ').slice(0, -1).join(' ')
            : text;
    }

    return (
        <>
            <div className={styles.main_div}>
                <section className={styles.first_section}>
                    <div className={styles.header_text}>
                        <h1 className={styles.h1_blog}>Blog</h1>
                        <h1 className={styles.h1_blog2}>
                            Selection of insightful Content <br />
                            Written By Peopal from our team
                        </h1>
                    </div>
                    {loading ? (
                        <div role="status" className={styles.loader}>
                            <svg
                                aria-hidden="true"
                                class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div className={styles.first_section_card}>
                            <div className={styles.card_image_section}>
                                <Image
                                    src={
                                        'https://task.appsdeployer.com/api/' +
                                        blogs[0]?.titleImage
                                    }
                                    alt="blogImage"
                                    width={500}
                                    height={350}
                                    className={styles.image_of_blog}
                                />
                            </div>
                            <div className={styles.card_text_section}>
                                <p className={styles.card_keywords}>Blog</p>
                                <h1 className={styles.card_header_text}>
                                    {blogs[0]?.title}
                                </h1>
                                <p className={styles.description}>
                                    {shorten(blogs[0]?.description, 300) || (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: shorten(
                                                    blogs[0]?.blog_content,
                                                    300,
                                                ),
                                            }}
                                        />
                                    )}
                                </p>
                                <hr className={styles.hr_line}></hr>
                                <div className={styles.bottom_div_text}>
                                    <span>
                                        {formatDate(blogs[0]?.uploadDate)}
                                    </span>
                                    <Link href={`/blog/${blogs[0]?._id}`}>
                                        <p className={styles.read_more_tag}>
                                            Read More --&gt;
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            {!loading && (
                <section className={styles.second_section}>
                    {blogs.slice(1).map((blog, index) => (
                        <div className={styles.second_section_card} key={index}>
                            <div className={styles.card_image_section}>
                                <Image
                                    src={
                                        'https://task.appsdeployer.com/api/' +
                                        blog?.titleImage
                                    }
                                    alt="blogImage"
                                    width={500}
                                    height={320}
                                    className={styles.second_image_of_blog}
                                />
                            </div>
                            <div className={styles.card_text_section}>
                                <p className={styles.card_keywords}>Blog</p>

                                <h1 className={styles.card_header_text}>
                                    {blog?.title}
                                </h1>
                                <p className={styles.description}>
                                    {shorten(blog?.description, 300) || (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: shorten(
                                                    blog?.blog_content,
                                                    300,
                                                ),
                                            }}
                                        />
                                    )}
                                </p>
                                <hr className={styles.hr_line}></hr>
                                <div className={styles.bottom_div_text}>
                                    <p>{formatDate(blog?.uploadDate)}</p>
                                    <Link href={`/blog/${blog?._id}`}>
                                        <p className={styles.read_more_tag}>
                                            Read More --&gt;
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}
            <div className={styles.head}>
                {!loading && (
                    <Pagination
                        isCompact
                        showControls
                        total={12}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </>
    );
}

export default Blog;
