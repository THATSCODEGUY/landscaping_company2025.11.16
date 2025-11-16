/**
 * AI Sales Engine - Professional landscaping service responses
 * Provides intelligent, context-aware responses to customer inquiries
 */

interface ServiceInfo {
  name: string;
  keywords: string[];
  description: string;
  benefits: string[];
  callToAction: string;
}

const services: Record<string, ServiceInfo> = {
  interlocking: {
    name: "Interlocking (铺砖)",
    keywords: ["interlocking", "paver", "铺砖", "铺路", "pavers", "driveway", "patio"],
    description: "Professional interlocking paver installation using premium materials and expert craftsmanship.",
    benefits: [
      "Beautiful and durable surface",
      "Custom design options",
      "Enhanced property value",
      "Long-lasting quality"
    ],
    callToAction: "Would you like a free consultation for your interlocking project?"
  },
  powerwashing: {
    name: "Powerwashing (高压清洗)",
    keywords: ["powerwashing", "power wash", "cleaning", "clean", "高压清洗", "清洗", "清理", "污渍"],
    description: "Professional power washing to remove weeds, dirt, and stains from brick joints and outdoor surfaces.",
    benefits: [
      "Removes stubborn weeds and dirt",
      "Eco-friendly cleaning solutions",
      "Restores outdoor space beauty",
      "Extends surface lifespan"
    ],
    callToAction: "Ready to restore your outdoor space? Let's schedule a free estimate!"
  },
  relevelling: {
    name: "Relevelling (车道修复)",
    keywords: ["relevelling", "releveling", "driveway", "repair", "sunken", "车道", "修复", "下沉", "坑洼"],
    description: "Expert repair and relevelling of sunken or damaged driveways to ensure safety and aesthetics.",
    benefits: [
      "Improved safety",
      "Enhanced appearance",
      "Extended driveway lifespan",
      "Professional installation"
    ],
    callToAction: "Let us assess your driveway condition. Free quote available!"
  },
  polymersand: {
    name: "Polymer Sand (胶沙更换)",
    keywords: ["polymer sand", "polymeric sand", "胶沙", "砂", "sand", "joint", "缝隙", "杂草"],
    description: "High-quality polymeric sand filling for brick joints to prevent weed growth and enhance drainage.",
    benefits: [
      "Prevents weed growth",
      "Improves drainage",
      "Extends paver lifespan",
      "Professional installation"
    ],
    callToAction: "Interested in protecting your pavers with polymer sand?"
  },
  sealing: {
    name: "Paver Sealing (铺路石密封)",
    keywords: ["sealing", "seal", "paver sealing", "密封", "保护", "褪色", "污渍", "防护"],
    description: "Professional paver sealing to protect your investment and maintain long-term beauty.",
    benefits: [
      "Prevents fading",
      "Protects from stains",
      "Maintains appearance",
      "Extends paver life"
    ],
    callToAction: "Protect your pavers with professional sealing. Get a free quote!"
  },
  yardworks: {
    name: "Yard Works (庭院工作)",
    keywords: ["yard works", "yard", "landscaping", "landscape", "design", "庭院", "景观", "花园", "绿化"],
    description: "Comprehensive yard maintenance and renovation including landscape design, planting, and hardscaping.",
    benefits: [
      "Complete yard transformation",
      "Professional design",
      "Quality materials",
      "Expert installation"
    ],
    callToAction: "Let's create your dream yard! Schedule a free design consultation."
  }
};

interface ConversationContext {
  serviceInterest?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  previousQuestions?: string[];
}

function detectService(message: string): string | null {
  const lowerMessage = message.toLowerCase();
  
  for (const [key, service] of Object.entries(services)) {
    for (const keyword of service.keywords) {
      if (lowerMessage.includes(keyword)) {
        return key;
      }
    }
  }
  
  return null;
}

function detectIntent(message: string): "question" | "quote" | "contact" | "general" {
  const lowerMessage = message.toLowerCase();
  
  if (
    lowerMessage.includes("quote") ||
    lowerMessage.includes("报价") ||
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("estimate") ||
    lowerMessage.includes("多少钱") ||
    lowerMessage.includes("价格")
  ) {
    return "quote";
  }
  
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("联系") ||
    lowerMessage.includes("电话") ||
    lowerMessage.includes("邮箱")
  ) {
    return "contact";
  }
  
  if (
    lowerMessage.includes("?") ||
    lowerMessage.includes("？") ||
    lowerMessage.includes("how") ||
    lowerMessage.includes("what") ||
    lowerMessage.includes("when") ||
    lowerMessage.includes("why") ||
    lowerMessage.includes("怎样") ||
    lowerMessage.includes("什么") ||
    lowerMessage.includes("为什么")
  ) {
    return "question";
  }
  
  return "general";
}

function generateServiceResponse(serviceKey: string, intent: string): string {
  const service = services[serviceKey];
  
  if (intent === "quote") {
    return `Excellent question about ${service.name}! We'd be happy to provide a free estimate. Our team will assess your specific needs and provide a detailed quote. Here are some key benefits of our ${service.name} service:

${service.benefits.map(b => `• ${b}`).join("\n")}

${service.callToAction}`;
  }
  
  if (intent === "question") {
    return `Great question! ${service.description}

Key benefits include:
${service.benefits.map(b => `• ${b}`).join("\n")}

${service.callToAction}`;
  }
  
  return `Thank you for your interest in our ${service.name} service! ${service.description}

${service.callToAction}`;
}

function generateContactResponse(): string {
  return `We'd love to hear from you! Here are the best ways to reach us:

📞 Phone: (416) 555-1234
   Call us anytime for immediate assistance

📧 Email: info@premiumlandscaping.ca
   Send us your project details

📍 Service Area: Toronto, GTA
   We serve the greater Toronto area

You can also fill out the contact form on our website to request a free quote. Our team typically responds within 24 hours!`;
}

function generateWelcomeResponse(): string {
  return `Welcome to Premium Landscaping Services! 👋

We specialize in six core services:
1. **Interlocking** - Professional paver installation
2. **Powerwashing** - Cleaning and maintenance
3. **Relevelling** - Driveway repair and leveling
4. **Polymer Sand** - Joint filling and weed prevention
5. **Paver Sealing** - Protection and maintenance
6. **Yard Works** - Complete landscaping solutions

Which service interests you most? I'm here to help! 😊`;
}

function generateGeneralResponse(message: string): string {
  const responses = [
    "That's a great point! At Premium Landscaping, we pride ourselves on quality workmanship and customer satisfaction. Is there a specific service you'd like to learn more about?",
    "I appreciate your interest! We've been serving the Toronto area for over 15 years with professional landscaping solutions. What can I help you with today?",
    "Absolutely! Our team is experienced in all aspects of landscaping. Would you like to discuss a specific project or service?",
    "That sounds interesting! We'd love to help bring your vision to life. Which of our services would be most beneficial for your project?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function isGreeting(message: string): boolean {
  const greetings = ["hello", "hi", "hey", "greetings", "你好", "嗨", "喂"];
  return greetings.some(g => message.toLowerCase().includes(g));
}

function isThankYou(message: string): boolean {
  const thanks = ["thank", "thanks", "appreciate", "谢谢", "感谢"];
  return thanks.some(t => message.toLowerCase().includes(t));
}

export function generateAISalesResponse(
  userMessage: string,
  context?: ConversationContext
): string {
  // Handle empty messages
  if (!userMessage.trim()) {
    return "I didn't catch that. Could you please rephrase your question?";
  }

  // Handle greetings
  if (isGreeting(userMessage)) {
    return `Hello! Welcome to Premium Landscaping Services! 👋 How can I assist you today? Feel free to ask about any of our services or request a free quote!`;
  }

  // Handle thank you
  if (isThankYou(userMessage)) {
    return `You're welcome! We're always happy to help. Is there anything else you'd like to know about our services?`;
  }

  // Detect intent and service
  const intent = detectIntent(userMessage);
  const detectedService = detectService(userMessage);

  // Handle contact requests
  if (intent === "contact") {
    return generateContactResponse();
  }

  // Handle service-specific questions
  if (detectedService) {
    return generateServiceResponse(detectedService, intent);
  }

  // Handle general inquiries about the company
  if (
    userMessage.toLowerCase().includes("company") ||
    userMessage.toLowerCase().includes("about") ||
    userMessage.toLowerCase().includes("公司") ||
    userMessage.toLowerCase().includes("关于")
  ) {
    return `Premium Landscaping Services is a trusted landscaping company serving the Toronto and GTA area. With over 15 years of experience, we specialize in:

✓ Professional interlocking installation
✓ Power washing and cleaning
✓ Driveway repair and relevelling
✓ Polymer sand installation
✓ Paver sealing and protection
✓ Complete yard works and landscaping

Our team is certified, professional, and committed to exceeding customer expectations. Would you like to learn more about any specific service?`;
  }

  // Handle warranty/guarantee questions
  if (
    userMessage.toLowerCase().includes("warranty") ||
    userMessage.toLowerCase().includes("guarantee") ||
    userMessage.toLowerCase().includes("保修") ||
    userMessage.toLowerCase().includes("保证")
  ) {
    return `Great question! We stand behind our work with quality guarantees on all our services. Our commitment includes:

✓ Professional installation
✓ Premium materials
✓ Attention to detail
✓ Customer satisfaction guarantee

For specific warranty details on your project, we'd love to discuss this during your free consultation. Would you like to schedule one?`;
  }

  // Handle timeline/scheduling questions
  if (
    userMessage.toLowerCase().includes("when") ||
    userMessage.toLowerCase().includes("schedule") ||
    userMessage.toLowerCase().includes("timeline") ||
    userMessage.toLowerCase().includes("什么时候") ||
    userMessage.toLowerCase().includes("日期")
  ) {
    return `Project timelines depend on the scope and complexity of your work. During your free consultation, we'll discuss:

• Your preferred timeline
• Project complexity
• Seasonal considerations
• Weather conditions
• Our current schedule

We aim to complete projects efficiently while maintaining our high quality standards. When would be a good time to discuss your project?`;
  }

  // Default to general response
  return generateGeneralResponse(userMessage);
}

export function getWelcomeMessage(): string {
  return generateWelcomeResponse();
}
