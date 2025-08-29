// Generar o recuperar sessionId
const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
localStorage.setItem("sessionId", sessionId);

// Enviar mensaje al Webhook
await fetch("https://https://d780cd998562.ngrok-free.app/webhook/chat-agent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sessionId: sessionId,
    messages: [
      {
        role: "user",
        content: userInput
      }
    ]
  })
});
