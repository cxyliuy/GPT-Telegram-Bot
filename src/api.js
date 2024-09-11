const { OpenAI } = require('openai');
const { OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL } = require('./config');

const client = new OpenAI({ 
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_BASE_URL
});

async function generateResponse(prompt, conversationHistory) {
  console.log('Generating response for:', prompt);
  console.log('Using model:', OPENAI_MODEL);

  try {
    const messages = [
      ...conversationHistory,
      { role: 'user', content: prompt }
    ];

    const response = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages: messages,
      temperature: 0.7,
    });

    console.log('Received response from OpenAI API');

    if (response.choices && response.choices.length > 0) {
      const generatedText = response.choices[0].message.content.trim();
      console.log('Generated text:', generatedText);
      return generatedText;
    } else {
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Error in generateResponse function:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

module.exports = { generateResponse };
