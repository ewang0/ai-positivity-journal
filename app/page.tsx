import FormField from "./formfield";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center max-w-[565px] m-auto">
      <div className="flex flex-col justify-center items-center py-16 border-b-2">
        {/* <img src="vercel.svg" className="bg-white"/> */}
        <h1 className="font-mono font-bold mb-5 text-center text-7xl">AI Naming App</h1>
        <p className="font-sans max-w-sm text-center">Built with Next.js, Tailwind CSS, TanStack Query, AWS Lambda, PlanetScale DB, and OpenAI</p>
      </div>
      <FormField 
        header={"What are you looking to name?"} 
        subheader={"butt"} 
        placeholder="Ex: “A composable platform that integrates all of a patient's data to enable more powerful medicine, today and tomorrow”"
      />
      <FormField 
        header={"Themes you'd like to explore:"} 
        subheader={"butt"} 
        placeholder="Ex: “Full picture, Freedom to focus, A vibrant future, Human perspective, etc.”"
      />
      <FormField 
        header={"Related words:"} 
        subheader={"butt"} 
        placeholder="Ex: “Innovation, Medicine, Technology, Assisted, Doctor, etc”"
      />
    </main>
  );
}
