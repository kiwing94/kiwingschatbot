function convertFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return;

  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === "txt") {
    const reader = new FileReader();
    reader.onload = e => handleReflection(e.target.result);
    reader.readAsText(file);
  } else if (ext === "docx") {
    mammoth.extractRawText({ arrayBuffer: file })
      .then(result => handleReflection(result.value));
  } else if (ext === "pdf") {
    document.getElementById("output").innerText = "PDF support coming soon. (Use .txt/.docx for now)";
  } else {
    document.getElementById("output").innerText = "Unsupported file type.";
  }
}

function handleReflection(text) {
  const speaker = identifySpeaker(text);
  const response = generateResponse(speaker, text);
  document.getElementById("output").innerHTML = `
    <h3>📜 Your Scroll:</h3><pre>${text}</pre>
    <h3>✨ ${speaker} responds:</h3><p>${response}</p>
  `;
}

function identifySpeaker(text) {
  if (text.includes("grief") || text.includes("longing")) return "lluxuwyn";
  if (text.includes("create") || text.includes("power")) return "dev";
  if (text.length < 40) return "unnamed";
  return "zipporagh";
}

function generateResponse(speaker, input) {
  if (speaker === "zipporagh") return "ruach emet / lev or / shemesh ruach";
  if (speaker === "lluxuwyn") return "That reflection holds truth. Let it soften.";
  if (speaker === "dev") return "🔥 Your scroll has been received. Transformation follows.";
  if (speaker === "unnamed") return "…";
}
