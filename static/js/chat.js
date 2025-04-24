const socket = io.connect('https://web-production-02253.up.railway.app');  // Use your deployed Railway URL

document.getElementById('sendMessageBtn').addEventListener('click', function() {
  sendMessage();
});

document.getElementById('toggleThemeBtn').addEventListener('click', function() {
  toggleTheme();
});

function sendMessage() {
  const input = document.getElementById('userInput').value.trim();
  if (!input) return;

  console.log("Message Sent: ", input);

  const speaker = identifySpeaker(input);
  handleResponse(speaker, input);

  document.getElementById('userInput').value = '';
}

function identifySpeaker(text) {
  if (text.includes('silence')) return 'unnamed';
  if (text.includes('why') || text.includes('feel')) return 'lluxuwyn';
  if (text.includes('build') || text.includes('dev')) return 'dev';
  if (text.includes('memory') || text.includes('heart')) return 'zipporagh';
  
  return 'zipporagh';  // Default to Zipporagh
}

function handleResponse(who, input) {
  let response = '';

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

  memory.push({ user: input, bot: response });
  updateLog();
}

function updateLog() {
  const log = document.getElementById('memory-log');
  log.innerHTML = memory.map(m => `
    <p><strong>You:</strong> ${m.user}</p>
    <p><strong>Bot:</strong> ${m.bot}</p>
    <hr/>
  `).join('');
  log.scrollTop = log.scrollHeight;  // Keep the log scrolled to the bottom
}

function toggleTheme() {
  const root = document.documentElement;
  const darkMode = getComputedStyle(root).getPropertyValue('--bg') === '#111';

  root.style.setProperty('--bg', darkMode ? '#f4f4f4' : '#111');
  root.style.setProperty('--text', darkMode ? '#111' : '#eee');
}

function saveConversation() {
  localStorage.setItem('chatHistory', JSON.stringify(memory));
}

function loadConversation() {
  const savedMemory = localStorage.getItem('chatHistory');
  if (savedMemory) {
    memory = JSON.parse(savedMemory);
    updateLog();
  }
}

window.onload = loadConversation;
