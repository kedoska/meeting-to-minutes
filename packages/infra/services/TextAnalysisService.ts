import { Configuration, OpenAIApi } from 'openai';
export class TextAnalysisService {
  async analyze(text: string): Promise<string> {
    const configuration = new Configuration({
      apiKey: process.env['OPENAI_API_KEY'],
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `Summarize the meeting, extract minutes from the following content: \n\n${text}`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    if (
      response.status !== 200 ||
      !response.data.choices ||
      !response.data.choices[0] ||
      !response.data.choices[0].text
    ) {
      throw new Error('Unable to analyze text');
    }

    return response.data.choices[0].text;
  }
}
