'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import Image from 'next/image';
import Head from 'next/head';
import {Pagination} from "@nextui-org/react";
import "./page.css"

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [page,setPage]=useState(1)
useEffect(() => {
        async function fetchData() {
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
                            page_number: 0,
                            page_size: 10,
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
        }

    fetchData(); // Call the async function immediately
    }, []); // Empty dependency array to run this effect once on mount
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
    console.log('mn', blogs);

    const pagginationHandler = (page) => {
        console.log(page)
        let a=page.selected
        setPage(a)
        console.log(page)

    };
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
                    <div className={styles.first_section_card}>
                        <div className={styles.card_image_section}>
                            <Image
                                src="/images/mobile.jfif"
                                alt="mobile"
                                width={500}
                                height={350}
                                className={styles.image_of_blog}
                            />
                        </div>
                        <div className={styles.card_text_section}>
                            <p className={styles.card_keywords}>
                                product management
                            </p>

                            <h1 className={styles.card_header_text}>
                                {blogs[0]?.title}
                            </h1>
                            <p className={styles.description}>
                                {shorten(blogs[0]?.description) ||
                                    'Marketing research could be used to delve deep into a consumer’s mind to uncover some of the hidden reasons or thought processes that go into making a purchase decision for the type of goods being considered. An independent market research consultant will make this job easier for you. Read the blog '}
                            </p>
                            <hr className={styles.hr_line}></hr>
                            <div className={styles.bottom_div_text}>
                                <span>{formatDate(blogs[0]?.uploadDate)}</span>
                                <p className={styles.read_more_tag}>
                                    Read More --&gt;
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className={styles.second_section}>
                {blogs.map((blog, index) => (
                    <Link href={`/blog/${blog?._id}`} key={index}>
                        <div className={styles.second_section_card} key={index}>
                            <div className={styles.card_image_section}>
                                <Image
                                    src="/images/mobile.jfif"
                                    alt="mobile"
                                    width={500}
                                    height={320}
                                    className={styles.second_image_of_blog}
                                />
                            </div>
                            <div className={styles.card_text_section}>
                                <p className={styles.card_keywords}>
                                    product management
                                </p>

                                <h1 className={styles.card_header_text}>
                                    {blog.title}
                                </h1>
                                <p className={styles.description}>
                                    {shorten(blog.description) ||
                                        'Marketing research could be used to delve deep into a consumer’s mind to uncover some of the hidden reasons or thought processes that go into making a purchase decision for the type of goods being considered. An independent market research consultant will make this job easier for you. Read the blog '}
                                </p>
                                <hr className={styles.hr_line}></hr>
                                <div className={styles.bottom_div_text}>
                                    <p>{formatDate(blog.uploadDate)}</p>
                                    <p className={styles.read_more_tag}>
                                        Read More --&gt;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

            </section>

            <Pagination
      total={10}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider my-10",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
      }}
      onChange={pagginationHandler}
    />

        </>
    );
}

export default Blog;
