

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col justify-center items-center py-16 border-b-2">
        {/* <img src="vercel.svg" className="bg-white"/> */}
        <h1 className="font-mono font-bold mb-5 text-center text-7xl">AI Naming App</h1>
        <p className="font-sans max-w-sm text-center">Built with Next.js, Tailwind CSS, TanStack Query, AWS Lambda, PlanetScale DB, and OpenAI</p>
      </div>

    </main>
  );
}
