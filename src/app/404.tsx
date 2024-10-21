import React, { FC } from 'react';
import Link from 'next/link';

const Custom404: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Oops! Page not found.</h2>
      <p className="mb-8 text-gray-600">The page you&#39;re looking for doesn&#39;t exist or has been moved.</p>
      <Link href="/">
        <a className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Go Back Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
