<script type="module">
const webhookUrl = "https://d780cd998562.ngrok-free.app/webhook/chat-agent";

// Generar o recuperar sessionId
const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
localStorage.setItem("sessionId", sessionId);

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatLog = document.getElementById("chatLog");
  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("p");
  userMsg.textContent = "🟣 Tú: " + message;
  chatLog.appendChild(userMsg);
  input.value = "";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({
        sessionId: sessionId,
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    const botMsg = document.createElement("p");
    botMsg.textContent = "🟡 Nathan: " + (data.messages?.[0]?.content || "Sin respuesta");
    chatLog.appendChild(botMsg);
  } catch (error) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "⚠️ Error al conectar con el servidor.";
    chatLog.appendChild(errorMsg);
    console.error("Error:", error);
  }
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);
</script>
