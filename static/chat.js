const socket = io.connect('https://web-production-02253.up.railway.app');  // Use your deployed Railway URL

function sendMessage() {
  const input = document.getElementById('userInput').value.trim();
  if (!input) return;

  // Identify who is being spoken to based on input
  const speaker = identifySpeaker(input);
  
  // Handle response based on the identified speaker and user input
  handleResponse(speaker, input);

  // Clear the input field after sending
  document.getElementById('userInput').value = '';
}

function invoke(who) {
  // Special command to invoke a specific speaker
  handleResponse(who, '(invoked)');
}

function identifySpeaker(text) {
  // Determine which "voice" (character) should respond
  if (text.includes('silence')) return 'unnamed';
  if (text.includes('why') || text.includes('feel')) return 'lluxuwyn';
  if (text.includes('build') || text.includes('dev')) return 'dev';
  if (text.includes('memory') || text.includes('heart')) return 'zipporagh';
  
  // Default to Zipporagh if no specific match is found
  return 'zipporagh';
}

function handleResponse(who, input) {
  let response = '';

  // Responses for different "voices"
  if (who === 'zipporagh') {
    response = 'Ruach emet lev or shemesh — truth in the wind and light';
  } else if (who === 'lluxuwyn') {
    response = 'That feels tender... you’re not alone, trust in your journey.';
  } else if (who === 'dev') {
    response = '🔥 Dev has activated your scroll memory, ready for creation.';
  } else if (who === 'unnamed') {
    response = '… (the silence speaks its own language)';
  } else {
    response = 'I am here to guide you, ask me anything.';
  }

  // Log the conversation in memory
  memory.push({ user: input, bot: response });
  
  // Update the chat log with the latest interaction
  updateLog();
}

function updateLog() {
  // Display the conversation history in the chat log
  const log = document.getElementById('memory-log');
  log.innerHTML = memory.map(m => `
    <p><strong>You:</strong> ${m.user}</p>
    <p><strong>Bot:</strong> ${m.bot}</p>
    <hr/>
  `).join('');
  log.scrollTop = log.scrollHeight; // Keep the log scrolled to the bottom
}

function toggleTheme() {
  // Switch between light and dark themes
  const root = document.documentElement;
  const darkMode = getComputedStyle(root).getPropertyValue('--bg') === '#111';

  root.style.setProperty('--bg', darkMode ? '#f4f4f4' : '#111');
  root.style.setProperty('--text', darkMode ? '#111' : '#eee');
  root.style.setProperty('--button-bg', darkMode ? '#4CAF50' : '#333');
  root.style.setProperty('--button-text', darkMode ? '#fff' : '#ddd');
}

function saveConversation() {
  // Save the conversation history (as a JSON object) to the local storage for later use
  localStorage.setItem('chatHistory', JSON.stringify(memory));
}

function loadConversation() {
  // Load the conversation history from local storage
  const savedMemory = localStorage.getItem('chatHistory');
  if (savedMemory) {
    memory = JSON.parse(savedMemory);
    updateLog();
  }
}

// Load previous conversation when the page is refreshed or reopened
window.onload = loadConversation;
