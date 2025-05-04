// Verifica si el navegador soporta SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  document.getElementById('output').textContent = "Tu navegador no soporta reconocimiento de voz.";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES'; // Configura el idioma a español
  recognition.interimResults = false; // Solo resultados finales
  recognition.maxAlternatives = 1;

  let isListening = false;

  // Evento para iniciar la acción de "escuchar"
  document.getElementById('start-btn').addEventListener('click', () => {
    if (!isListening) {
      isListening = true;
      document.getElementById('output').textContent = "Escuchando...";
      recognition.start();
    }
  });

  // Evento para detener la acción de "escuchar"
  document.getElementById('stop-btn').addEventListener('click', () => {
    if (isListening) {
      isListening = false;
      recognition.stop();
      document.getElementById('output').textContent = "Detenido.";
    }
  });

  // Evento cuando se recibe un resultado
  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('output').textContent = `Tú: ${transcript}`;
    console.log(`Texto reconocido: ${transcript}`);
  });

  // Manejo de errores
  recognition.addEventListener('error', (event) => {
    if (event.error === 'network') {
      document.getElementById('output').textContent = "Error de red. Verifica tu conexión a Internet.";
    } else if (event.error === 'not-allowed') {
      document.getElementById('output').textContent = "Permiso denegado. Habilita el acceso al micrófono.";
    } else if (event.error === 'service-not-allowed') {
      document.getElementById('output').textContent = "El servicio no está disponible. Intenta más tarde.";
    } else {
      document.getElementById('output').textContent = `Error: ${event.error}`;
    }
    isListening = false;
  });

  // Evento cuando se detiene el reconocimiento
  recognition.addEventListener('end', () => {
    if (isListening) {
      recognition.start(); // Reinicia automáticamente si está escuchando
    }
  });
}