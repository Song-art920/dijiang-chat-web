import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { systemPrompt } from '../../utils/prompt';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages
    ],
  });

  res.status(200).json({ reply: completion.data.choices[0].message?.content });
}
