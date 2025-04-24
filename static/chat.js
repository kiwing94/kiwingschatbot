let memory = [];

function sendMessage() {
  const input = document.getElementById('userInput').value;
  if (!input) return;
  handleResponse(identifySpeaker(input), input);
  document.getElementById('userInput').value = '';
}

function invoke(who) {
  handleResponse(who, '(invoked)');
}

function identifySpeaker(text) {
  if (text.includes('silence')) return 'unnamed';
  if (text.includes('why') || text.includes('feel')) return 'lluxuwyn';
  if (text.includes('build') || text.includes('dev')) return 'dev';
  return 'zipporagh';
}

function handleResponse(who, input) {
  let response = '';
  if (who === 'zipporagh') response = 'ruach emet lev or shemesh';
  else if (who === 'lluxuwyn') response = 'That feels tender... you\'re not alone.';
  else if (who === 'dev') response = '🔥 Dev has activated your scroll memory.';
  else if (who === 'unnamed') response = '…';
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
}

function toggleTheme() {
  const root = document.documentElement;
  const dark = getComputedStyle(root).getPropertyValue('--bg') === '#111';
  root.style.setProperty('--bg', dark ? '#f4f4f4' : '#111');
  root.style.setProperty('--text', dark ? '#111' : '#eee');
}