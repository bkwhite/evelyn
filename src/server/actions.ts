'use server';

import { GoogleGenAI } from '@google/genai';

export async function promptGemini(input: string) {
	const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

	if (!GEMINI_API_KEY) return;

	const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

	const response = await ai.models.generateContent({
		model: 'gemini-2.0-flash',
		contents: input
	});

	return response.text;
}
