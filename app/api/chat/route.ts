import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const PLANETSCALE_API_KEY = 'your_planetscale_api_key_here';
// const DATABASE_NAME = 'your_database_name';
// const TABLE_NAME = 'your_table_name';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'gpt-4',
    max_tokens: 2000,
    stream: true,
    prompt,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}