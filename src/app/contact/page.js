// pages/contact.js
import React from 'react';

const Contact = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <form className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Your Email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-600">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Your Message"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
