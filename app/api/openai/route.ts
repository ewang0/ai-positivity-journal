import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
//import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const PLANETSCALE_API_KEY = 'your_planetscale_api_key_here';
// const DATABASE_NAME = 'your_database_name';
// const TABLE_NAME = 'your_table_name';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
      return res.json({ resultstatus: 'SUCCESS', message: 'OPENAI HERE' });
  }

  if (req.method === 'POST') {
      const { prompt } = req.body;
      try {
          const response = await openai.chat.completions.create({
              model: "gpt-4",
              messages: [
                  {
                      role: "user",
                      content: prompt,
                  },
              ],
          });

          return res.json({ message: response.choices[0].message.content });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
      }
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   if (req.method === 'GET') {
//     res.status(200).json({ message: "Success", OPENAI_API_KEY: OPENAI_API_KEY });
//     try {
//       res.status(200).json({ message: "Success", OPENAI_API_KEY: OPENAI_API_KEY });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   } else if (req.method === 'POST') {
//     const { prompt } = req.body;
//     if (!prompt || typeof prompt !== 'string') {
//       return res.status(400).json({ error: 'Invalid prompt provided' });
//     }

//     try {
//       const completion = await getChatCompletion(prompt);
//       // const savedData = await saveToDatabase(prompt, completion);
//       res.status(200).json({ completion });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// }

// export async function getChatCompletion(prompt: string): Promise<any> {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: prompt }],
//     model: 'gpt-4',
//   });

//   return completion.choices[0].message.content;
// }

// async function saveToDatabase(prompt: string, completion: string): Promise<any> {
//   const dataToSave = { prompt, completion };

//   const response = await axios.post(
//     `https://api.planetscale.com/v1/${DATABASE_NAME}/${TABLE_NAME}`,
//     dataToSave,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${PLANETSCALE_API_KEY}`
//       }
//     }
//   );

//   return response.data;
// }
