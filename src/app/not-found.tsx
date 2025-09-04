export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-16 text-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">The page you’re looking for doesn’t exist or was moved.</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Go back home
        </a>
      </div>
    </main>
  );
}


