
export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-7xl font-black opacity-20 mb-4">404</h1>

      <h2 className="text-2xl font-bold mb-2">
        Page not found
      </h2>

      <p className="opacity-70 mb-6 text-center max-w-md">
        The address you requested does not exist in this educational demo project.
      </p>

      <a
        href="/"
        className="
          px-5 py-2 rounded-xl shadow-xl
          bg-black backdrop-blur-md font-medium
          transition duration-300
          hover:bg-white hover:text-black
        "
      >
        Back to dashboard
      </a>
    </main>
  );
}