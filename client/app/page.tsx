import Link from 'next/link';

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white overflow-hidden relative">
      {/* Content */}
      <div className="text-center px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 drop-shadow-md mb-6 tracking-tight animate-slideDown">
          Welcome to <span className="text-blue-600">Video Caption Converter</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto animate-fadeInSlow">
          Effortlessly transform your videos into captions with our intuitive and powerful tool.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/cloudinary">
            <button className="px-8 py-3 bg-blue-600 text-white font-medium text-lg md:text-xl rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none transition-transform transform hover:scale-105">
              Upload to Database
            </button>
          </Link>

          <Link href="/get-started">
            <button className="px-8 py-3 bg-gray-200 text-gray-800 font-medium text-lg md:text-xl rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:ring-4 focus:ring-gray-400 focus:outline-none transition-transform transform hover:scale-105">
              Upload to Uploadcare
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-12 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">Video Caption Converter</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
