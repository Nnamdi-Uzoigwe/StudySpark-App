// // pages/api/groq.ts (Pages Router)
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const API_KEY = process.env.GROQ_API_KEY; // Note: no NEXT_PUBLIC_ prefix for server-side
    
//     if (!API_KEY) {
//       throw new Error('Groq API key not found');
//     }

//     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(req.body),
//     });

//     if (!response.ok) {
//       throw new Error(`Groq API error: ${response.status}`);
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Groq API error:', error);
//     res.status(500).json({ error: 'Failed to call Groq API' });
//   }
// }

// app/api/groq/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const API_KEY = process.env.GROQ_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ error: 'Groq API key not found' }, { status: 500 });
    }

    const body = await req.json();

    // Destructure optional fields from body
    const { messages, temperature = 0.7, max_tokens = 500 } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Missing or invalid messages array' }, { status: 400 });
    }

    const payload = {
      model: 'llama3-8b-8192',
      messages,
      temperature,
      max_tokens
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return NextResponse.json({ error: `Groq API error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Groq API catch error:', error);
    return NextResponse.json({ error: 'Failed to call Groq API' }, { status: 500 });
  }
}
