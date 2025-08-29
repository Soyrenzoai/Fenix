document.addEventListener('DOMContentLoaded', () => {
  const timeDisplay = document.getElementById('time-display');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  let totalSeconds = 14 * 60 + 47; // Valor inicial como en tu imagen
  let timerInterval = null;
  let isRunning = false;

  function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function toggleTimer() {
    if (isRunning) {
      // Pausar
      clearInterval(timerInterval);
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      // Iniciar
      if (totalSeconds <= 0) return; // No iniciar si el tiempo es cero
      timerInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay();
        if (totalSeconds <= 0) {
          clearInterval(timerInterval);
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
          isRunning = false;
          alert("¡Tiempo terminado!");
        }
      }, 1000);
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    updateDisplay();
    isRunning = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  
  playPauseBtn.addEventListener('click', toggleTimer);
  resetBtn.addEventListener('click', resetTimer);

  presetBtns.forEach(button => {
    button.addEventListener('click', () => {
      const minutesToAdd = parseInt(button.dataset.minutes, 10);
      totalSeconds += minutesToAdd * 60;
      updateDisplay();
    });
  });

  // Mostrar el tiempo inicial al cargar la página
  updateDisplay();
});
