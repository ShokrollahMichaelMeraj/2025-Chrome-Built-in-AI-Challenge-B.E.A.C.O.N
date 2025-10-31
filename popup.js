// B.E.A.C.O.N. - Popup Script
// Feature 1.1 & 1.2: Basic extension + Prompt API integration
// Using the exact API from GoogleChromeLabs example

let session = null;

// DOM elements
const taskInput = document.getElementById('task-input');
const submitBtn = document.getElementById('submit-btn');
const voiceBtn = document.getElementById('voice-btn');
const clearBtn = document.getElementById('clear-btn');
const statusMessage = document.getElementById('status-message');
const responseSection = document.getElementById('response-section');
const aiResponse = document.getElementById('ai-response');

// System prompt for elderly-friendly guidance
const SYSTEM_PROMPT = 'You are a patient and friendly assistant helping elderly users navigate websites. Provide clear, simple, step-by-step instructions. Use short sentences and avoid technical jargon. Be encouraging and supportive.';

// Initialize the extension
async function initialize() {
    // Check if LanguageModel API is available (exact check from ChromeLabs)
    if (!('LanguageModel' in self)) {
        showStatus('error', 'Prompt API not available. Please use Chrome Dev or Canary and enable the API.');
        submitBtn.disabled = true;
        return;
    }

    try {
        // Get default parameters (exact method from ChromeLabs)
        let { defaultTopK, maxTopK, defaultTemperature, maxTemperature } = 
            await LanguageModel.params();
        
        defaultTopK ||= 3;  // Fallback from ChromeLabs code
        
        console.log('API Parameters:', { defaultTopK, maxTopK, defaultTemperature, maxTemperature });
        
        // Create session with exact options from ChromeLabs
        session = await LanguageModel.create({
        
            temperature: defaultTemperature,
            topK: defaultTopK,
            initialPrompts: [
                {
                role: 'system',
                content: SYSTEM_PROMPT,
                }
            ],
        });
        
        showStatus('success', '✓ B.E.A.C.O.N. is ready to help!');
        setTimeout(() => statusMessage.style.display = 'none', 3000);
        
        console.log('Session created successfully');
    } catch (error) {
        showStatus('error', `Error initializing AI: ${error.message}`);
        console.error('Initialization error:', error);
    }
}

// Handle form submission
submitBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
  
    if (!task) {
        showStatus('warning', 'Please enter a task or question.');
        return;
    }

    if (!session) {
        showStatus('error', 'AI session not ready. Please refresh the extension.');
        return;
    }

    await getAIGuidance(task);
});

// Get AI guidance using exact streaming method from ChromeLabs
async function getAIGuidance(task) {
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Thinking...';
        showStatus('info', 'Getting guidance...');

        // Use exact streaming method from ChromeLabs example
        const stream = await session.promptStreaming(task);

        let result = '';
        let previousChunk = '';

        responseSection.style.display = 'block';
        aiResponse.textContent = '';

        // Exact streaming loop from ChromeLabs
        for await (const chunk of stream) {
            const newChunk = chunk.startsWith(previousChunk)
                ? chunk.slice(previousChunk.length) : chunk;
            result += newChunk;
            aiResponse.textContent = result;
            previousChunk = chunk;
        }

        statusMessage.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Help';

    } catch (error) {
        showStatus('error', `Error: ${error.message}`);
        console.error('AI error:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Help';
    }
}

// Clear and reset
clearBtn.addEventListener('click', () => {
    taskInput.value = '';
    responseSection.style.display = 'none';
    aiResponse.textContent = '';
    statusMessage.style.display = 'none';
    taskInput.focus();
});

// Allow Enter key to submit (with Shift+Enter for new line)
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
    }
});

// Show status messages
function showStatus(type, message) {
    statusMessage.className = `status ${type}`;
    statusMessage.textContent = message;
    statusMessage.style.display = 'block';
}

// Voice button placeholder (Feature 1.3 - we'll implement this next)
voiceBtn.addEventListener('click', () => {
    showStatus('info', 'Voice input coming in Feature 1.3!');
});

// Initialize when popup opens
initialize();