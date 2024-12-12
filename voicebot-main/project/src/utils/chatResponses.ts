interface ChatResponse {
  pattern: RegExp;
  response: string;
}

const responses: ChatResponse[] = [
  {
    pattern: /\b(hi|hello|hey)\b/i,
    response: 'Hello! How can I help you with Jal Saanjhevni today?'
  },
  {
    pattern: /\b(water quality|quality of water)\b/i,
    response: 'Our water quality monitoring system checks parameters like pH, turbidity, and dissolved oxygen. Would you like to know more about specific parameters?'
  },
  {
    pattern: /\b(conservation|save water|saving water)\b/i,
    response: 'Here are some effective water conservation tips: 1. Fix leaking taps immediately 2. Use water-efficient fixtures 3. Harvest rainwater 4. Reuse greywater for gardens. Would you like more specific tips?'
  },
  {
    pattern: /\b(water testing|test water)\b/i,
    response: 'We provide water testing services at our designated centers. You can bring a water sample to your nearest center for comprehensive quality analysis.'
  },
  {
    pattern: /\b(water supply|water timing)\b/i,
    response: 'Water supply schedules vary by area. Please provide your area code or locality for specific timing information.'
  },
  {
    pattern: /\b(complaint|problem|issue)\b/i,
    response: 'To register a water-related complaint, please provide your location and specific issue. You can also call our 24x7 helpline at 1800-XXX-XXXX.'
  }
];

export function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const { pattern, response } of responses) {
    if (pattern.test(lowerInput)) {
      return response;
    }
  }
  
  return 'I apologize, but I\'m not sure how to help with that. You can ask me about water quality, conservation tips, water testing, supply schedules, or registering complaints.';
}