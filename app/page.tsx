import FormField from "./formfield";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center max-w-[1080px] m-auto">
      <div className="flex flex-col justify-center items-center w-full py-12 border-b-2">
        {/* <img src="vercel.svg" className="bg-white"/> */}
        <h1 className="font-mono font-bold mb-5 text-center text-5xl">AI Positivity Journal</h1>
        <p className="font-sans max-w-sm text-center">Built with Next.js, Tailwind CSS, PlanetScale DB, OpenAI streaming, and Vercel AI SDK</p>
      </div>
      <div className='grid grid-cols-2 gap-x-8'>
        <div>
          <FormField 
            header={"In a few sentences, describe a negative event in your life that you're looking to reframe in a positive way:"} 
            placeholder="Ex: “This morning, my car wouldn't start, making me late for an important meeting. As I waited for the tow truck, frustration and anxiety washed over me. It seemed like the day was set to be a disaster from the start.”"
          />
          <button className="bg-blue-500 w-full hover:bg-blue-400 mt-3 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Generate Positivity
          </button>
        </div>
        <div className="pt-8">
          <div className="w-full h-full bg-stone-800 rounded-md">
          </div>
        </div>
      </div>
      
    </main>
  );
}
