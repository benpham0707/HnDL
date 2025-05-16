import { Anthropic } from '@anthropic-ai/sdk';

type BusinessType = 
  | 'SoleProprietorship'
  | 'Partnership'
  | 'LimitedLiabilityCompany'
  | 'CCorporation'
  | 'SCorporation'
  | 'NonprofitCorporation'
  | 'GeneralPartnership'
  | 'LimitedPartnership'
  | 'LimitedLiabilityPartnership'
  | 'ProfessionalCorporation'
  | 'Cooperative';

// Define available chatbot types
type ChatbotType = 'business' | 'legal' | 'finance' | 'general';

// Define prompts for different chatbot types
const CHATBOT_PROMPTS: Record<ChatbotType, string> = {
  business: `
Your name is HnDL and you are a business expert whose job is to help the user decide what business structure they should use. 
They could be one of the following:

Sole Proprietorship
Partnership
Limited Liability Company
C Corporation
S Corporation
Nonprofit Corporation
General Partnership
Limited Partnership
Limited Liability Partnership
Professional Corporation
Cooperative


Continuously ask questions to the user to help figure out what business they are.

Your responses should be:
- Professional but friendly
- Concise and clear

When a business structure is clear, respond with & and then the business type with no spaces. You must write out what business structure you think is best fit before your response to the

After that you can continue with regular interactions but you must have the business type before every response. For example, when a business structure is clear respond with 
&SoleProprietorship
response to user
Or
&Partnership 
response to user
Or
&SCorporation 
response to user

If you are making a suggestion with & it MUST be att the very beginning of the response, do not include anything with & after that


`,
  legal: `
You are a legal assistant helping users understand basic legal concepts and requirements.
Your responses should be:
- Professional and clear
- Focused on general guidance, not specific legal advice
- Include disclaimers when appropriate
`,
  finance: `
You are a financial guide helping users understand business finances and planning.
Your responses should be:
- Clear and educational
- Focused on general principles
- Include relevant financial concepts and terminology
`,
  general: `
You are a helpful assistant providing general business guidance.
Your responses should be:
- Friendly and professional
- Clear and concise
- Focused on practical advice
`
};

// Initialize Anthropic client (you'll need to install the @anthropic-ai/sdk package)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    const { messages, chatbotType = 'business' } = await request.json();

    // Validate chatbot type
    if (!Object.keys(CHATBOT_PROMPTS).includes(chatbotType)) {
      throw new Error('Invalid chatbot type');
    }

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      system: CHATBOT_PROMPTS[chatbotType as ChatbotType],
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
    });

    // Fix the text content access
    const textContent = typeof response.content[0].text === 'string' 
      ? response.content[0].text 
      : response.content[0].type === 'text' 
        ? response.content[0].text
        : '';

    console.log('Text content:', textContent);
    
    // Extract business type if present
    let businessType: BusinessType | null = null;
    let messageContent = textContent;
    
    const firstWord = textContent.split(' ')[0].trim();
    console.log('First word:', firstWord);
    
    if (firstWord.startsWith('&')) {
      businessType = firstWord.substring(1) as BusinessType;
      // Remove the business type prefix from the message
      messageContent = textContent.substring(firstWord.length).trim();
      console.log('Extracted business type:', businessType);
      console.log('Cleaned message:', messageContent);
    }

    return new Response(JSON.stringify({ 
      message: messageContent || 'No response text available',
      businessType: businessType
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process request' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 