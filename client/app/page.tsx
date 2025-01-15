import Link from 'next/link';

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
          Welcome to Video Caption Converter
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg mx-auto">
          Effortlessly convert your videos into captions with our easy-to-use tool.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/cloudinary">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium text-lg md:text-xl rounded-full shadow-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-transform transform hover:scale-105">
              Upload file to database
            </button>
          </Link>

          <Link href="/get-started">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium text-lg md:text-xl rounded-full shadow-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-transform transform hover:scale-105">
              Upload file to uploadcare
            </button>
          </Link>

          <Link href="/result">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium text-lg md:text-xl rounded-full shadow-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-transform transform hover:scale-105">
              Convert
            </button>
          </Link>
        </div>
      </div>

      <footer className="relative mt-12 text-sm text-gray-100">
        © {new Date().getFullYear()} Video Caption Converter. All rights reserved.
      </footer>
    </div>
  );
}
