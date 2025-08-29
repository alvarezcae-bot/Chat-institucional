const webhookUrl = "https://d780cd998562.ngrok-free.app/webhook/chat-agent";

// Generar o recuperar sessionId
const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
localStorage.setItem("sessionId", sessionId);

// Enviar mensaje al Webhook
async function sendMessage(userInput) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

  const data = await response.json();
  const assistantReply = data.messages?.[0]?.content || "⚠️ Error en la respuesta";
  displayMessage("assistant", assistantReply);
}
