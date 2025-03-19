// Enhanced mock data with better images and descriptions
const mockGifts = [
    {
        name: "Premium Wireless Headphones",
        price: 14999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        description: "High-quality noise-cancelling headphones with premium sound",
        rating: 4.8,
        buyLink: "#"
    },
    {
        name: "Smart Watch Series 7",
        price: 24999,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
        description: "Advanced fitness tracking and smart features",
        rating: 4.9,
        buyLink: "#"
    },
    {
        name: "Professional Art Set",
        price: 3499,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80",
        description: "Complete art supplies set for creative minds",
        rating: 4.7,
        buyLink: "#"
    },
    {
        name: "Gourmet Coffee Maker",
        price: 12999,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
        description: "Professional-grade coffee brewing system",
        rating: 4.6,
        buyLink: "#"
    },
    {
        name: "Pro Gaming Controller",
        price: 5999,
        image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80",
        description: "Ergonomic design with customizable buttons",
        rating: 4.8,
        buyLink: "#"
    },
    {
        name: "Luxury Book Collection",
        price: 8999,
        image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&q=80",
        description: "Curated collection of bestselling novels",
        rating: 4.7,
        buyLink: "#"
    }
];

// DOM Elements
const giftForm = document.getElementById('giftForm');
const resultsSection = document.getElementById('resultsSection');
const giftsGrid = document.getElementById('giftsGrid');
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatTextarea = document.getElementById('chatTextarea');
const sendButton = document.getElementById('sendButton');
const clearChatButton = document.getElementById('clearChatButton');
let isTyping = false;

// Enhanced gift display function
function displayGifts(gifts) {
    const giftsGrid = document.getElementById('giftsGrid');
    giftsGrid.innerHTML = gifts.map((gift, index) => `
        <div class="gift-card" style="animation-delay: ${index * 0.2}s">
            <div class="gift-image">
            <img src="${gift.image}" alt="${gift.name}" loading="lazy">
                <div class="gift-badge">
                    <i class="fas fa-thumbs-up"></i> Top Pick
                </div>
            </div>
            <div class="gift-card-content">
                <h3>${gift.name}</h3>
                <div class="rating">
                    ${'★'.repeat(Math.floor(gift.rating))}${'☆'.repeat(5-Math.floor(gift.rating))}
                    <span>${gift.rating}</span>
                </div>
                <p class="gift-description">${gift.description}</p>
                <p class="price">₹${gift.price.toLocaleString('en-IN')}</p>
                <div class="gift-card-actions">
                <button class="btn-primary" onclick="window.location.href='${gift.buyLink}'">
                    <i class="fas fa-shopping-cart"></i> Buy Now
                </button>
                    <button class="btn-secondary wish-button">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add wishlist functionality
    document.querySelectorAll('.wish-button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('wished');
            this.querySelector('i').classList.toggle('fas');
            this.querySelector('i').classList.toggle('far');
        });
    });
}

// Update the loading animation and results display
function showLoadingAnimation(formData) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = `
        <div class="loading-container">
            <div class="loading-content">
                <div class="robot-animation">
                    <i class="fas fa-robot"></i>
                    <div class="scan-line"></div>
                </div>
                <div class="loading-text">
                    <h3>AI is finding perfect gifts for you...</h3>
                    <div class="loading-steps">
                        <div class="step active">
                            <i class="fas fa-brain"></i>
                            <span>Analyzing preferences</span>
                        </div>
                        <div class="step">
                            <i class="fas fa-search"></i>
                            <span>Searching gift database</span>
                        </div>
                        <div class="step">
                            <i class="fas fa-gift"></i>
                            <span>Curating perfect matches</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Get form data for personalized message
    const relationship = formData.get('relationship');
    const occasion = formData.get('occasion');
    const interests = formData.get('interests');

    // Animate the steps
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function animateNextStep() {
        if (currentStep > 0) {
            steps[currentStep - 1].classList.remove('active');
        }
        steps[currentStep].classList.add('active');
        currentStep++;
    }

    // Trigger step animations
    setTimeout(() => animateNextStep(), 0);
    setTimeout(() => animateNextStep(), 1500);
    setTimeout(() => animateNextStep(), 3000);

    // Show results with header
    setTimeout(() => {
        resultsSection.innerHTML = `
            <div class="results-header">
                <div class="results-title">
                    <h2>Best Gifts Found for You</h2>
                    <p>Based on: ${relationship} • ${occasion} • Interests: ${interests}</p>
                </div>
                <div class="results-summary">
                    <div class="summary-item">
                        <i class="fas fa-gift"></i>
                        <span>${mockGifts.length} Gifts Found</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-star"></i>
                        <span>Top Rated Selection</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-heart"></i>
                        <span>Personalized for You</span>
                    </div>
                </div>
            </div>
            <div class="gifts-grid" id="giftsGrid"></div>
        `;
        displayGifts(mockGifts);
    }, 4500);
}

// Update form submission handler
giftForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(giftForm);
    showLoadingAnimation(formData);
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
});

// Updated chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    // Chat elements
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatForm = document.getElementById('chatForm');
    const chatTextarea = document.getElementById('chatTextarea');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const clearChatButton = document.getElementById('clearChatButton');

    // Chat toggle functionality
    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatWindow.classList.remove('hidden');
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatWindow.classList.add('hidden');
    });

    // Auto-resize textarea
    chatTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        sendButton.disabled = !this.value.trim();
    });

    // Handle Enter key
    chatTextarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) {
                chatForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        if (type === 'ai') {
            const botAvatar = document.createElement('div');
            botAvatar.classList.add('bot-avatar-small');
            botAvatar.innerHTML = '<i class="fas fa-robot"></i>';
            messageContent.appendChild(botAvatar);
        }

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.textContent = text;
        
        messageContent.appendChild(messageBubble);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Enhanced AI responses with categories and emojis
    const aiResponses = {
        greetings: [
            "Hello! I'm excited to help you find the perfect gift! 🎁",
            "Hi there! Need help finding something special? ✨",
            "Welcome! Let's find an amazing gift together! 🌟"
        ],
        budget_friendly: [
            "Here's a budget-friendly option: Professional Art Set for ₹3,499. Perfect for creative souls! 🎨",
            "The Pro Gaming Controller at ₹5,999 is great value for money! 🎮",
            "Looking for something affordable? Our Luxury Book Collection at ₹8,999 is a timeless gift! 📚"
        ],
        premium: [
            "For something premium, check out our Smart Watch Series 7 at ₹24,999. It's a game-changer! ⌚",
            "The Premium Wireless Headphones at ₹14,999 offer exceptional sound quality! 🎧",
            "Our Gourmet Coffee Maker at ₹12,999 is perfect for coffee enthusiasts! ☕"
        ],
        suggestions: [
            "Have you considered personalized gifts? They add a special touch! 💝",
            "Based on your interests, I think you'll love our tech collection! 📱",
            "For special occasions, our luxury gift sets are always a hit! 🎀"
        ],
        helpful_tips: [
            "Pro tip: Adding a heartfelt card makes any gift more special! ❤️",
            "Quick suggestion: Gift wrapping service is available for all items! 🎁",
            "Remember: Sometimes the simplest gifts mean the most! ✨"
        ]
    };

    // Typing animation function
    function showTypingAnimation() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai-message', 'typing-message');
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="bot-avatar-small">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Enhanced message handling with smart responses
    function getSmartResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response;

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            response = aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
        }
        else if (message.includes('budget') || message.includes('cheap') || message.includes('affordable')) {
            response = aiResponses.budget_friendly[Math.floor(Math.random() * aiResponses.budget_friendly.length)];
        }
        else if (message.includes('best') || message.includes('premium') || message.includes('expensive')) {
            response = aiResponses.premium[Math.floor(Math.random() * aiResponses.premium.length)];
        }
        else if (message.includes('suggest') || message.includes('recommend') || message.includes('idea')) {
            response = aiResponses.suggestions[Math.floor(Math.random() * aiResponses.suggestions.length)];
        }
        else {
            response = aiResponses.helpful_tips[Math.floor(Math.random() * aiResponses.helpful_tips.length)];
        }

        return response;
    }

    // Enhanced chat form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = chatTextarea.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear and reset textarea
        chatTextarea.value = '';
        chatTextarea.style.height = 'auto';
        sendButton.disabled = true;

        // Show typing animation
        const typingDiv = showTypingAnimation();

        // Get AI response with delay
        setTimeout(() => {
            typingDiv.remove();
            const response = getSmartResponse(message);
            addMessage(response, 'ai');
        }, 1500);
    });

    // Add suggested questions
    function addSuggestedQuestions() {
        const suggestions = [
            "What's a good gift for a tech lover?",
            "I need a budget-friendly gift idea",
            "Suggest premium gift options",
            "Best gifts for special occasions"
        ];

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.classList.add('suggested-questions');
        suggestionsDiv.innerHTML = `
            <div class="suggestions-title">Suggested Questions:</div>
            ${suggestions.map(q => `
                <button class="suggestion-btn" onclick="handleSuggestion(this)">
                    ${q}
                </button>
            `).join('')}
        `;
        chatMessages.appendChild(suggestionsDiv);
    }

    // Handle suggestion clicks
    window.handleSuggestion = function(button) {
        chatTextarea.value = button.textContent;
        chatTextarea.focus();
        sendButton.disabled = false;
    };

    // Add suggestions after initial greeting
    addSuggestedQuestions();
});

// Add animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease-out ${index * 0.2}s forwards`;
    });
});

// Update the budget select options in the form
document.querySelector('select[name="budget"]').innerHTML = `
    <option value="">Select Budget</option>
    <option value="1000">Under ₹1,000</option>
    <option value="5000">₹1,000 - ₹5,000</option>
    <option value="10000">₹5,000 - ₹10,000</option>
    <option value="25000">₹10,000 - ₹25,000</option>
    <option value="50000">₹25,000+</option>
`;

// Update chatbot responses to include Rupee prices
const mockResponses = [
    {
        text: "I'd recommend the Premium Wireless Headphones for ₹14,999. They're perfect for music lovers! 🎧",
        emoji: "🎧"
    },
    {
        text: "The Smart Watch Series 7 at ₹24,999 would make an excellent gift! ⌚",
        emoji: "⌚"
    },
    {
        text: "Our Professional Art Set for ₹3,499 is perfect for creative people! 🎨",
        emoji: "🎨"
    },
    {
        text: "Consider the Gourmet Coffee Maker at ₹12,999 - it makes amazing coffee! ☕",
        emoji: "☕"
    },
    {
        text: "The Pro Gaming Controller for ₹5,999 is a must-have for gamers! 🎮",
        emoji: "🎮"
    }
];

// Example of displaying a discounted price
function displayDiscountedPrice(originalPrice, discountedPrice) {
    return `
        <p class="price">
            <span class="original-price">₹${originalPrice.toLocaleString('en-IN')}</span>
            ₹${discountedPrice.toLocaleString('en-IN')}
        </p>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}); 