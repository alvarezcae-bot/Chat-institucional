const webhookUrl = "https://d780cd998562.ngrok-free.app/webhook/chat"; // Ajusta si tu endpoint es diferente

export async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatLog = document.getElementById("chatLog");
  const message = input.value.trim();

  if (!message) return;

  // Mostrar mensaje del usuario
  const userMsg = document.createElement("p");
  userMsg.textContent = "👤 Tú: " + message;
  chatLog.appendChild(userMsg);

  input.value = "";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Mostrar respuesta del bot
    const botMsg = document.createElement("p");
    botMsg.textContent = "🤖 Bot: " + (data.reply || "Sin respuesta");
    chatLog.appendChild(botMsg);
  } catch (error) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "⚠️ Error al conectar con el servidor.";
    chatLog.appendChild(errorMsg);
    console.error("Error:", error);
  }
}
