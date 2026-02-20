let candlesBlown = false;
let cakeCut = false;

function setMessage() {
  let name = document.getElementById("nameInput").value;
  if (name.trim() !== "") {
    document.getElementById("message").innerText =
      "All the best " + name +
      " 🌍✨ May your internship journey be amazing!";
  }
}

/* Blow candles */
function startBlowing() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      mic.connect(analyser);
      let data = new Uint8Array(analyser.frequencyBinCount);

      function detectBlow() {
        analyser.getByteFrequencyData(data);
        let volume = data.reduce((a, b) => a + b) / data.length;

        if (volume > 60) {
          document.querySelectorAll(".flame")
            .forEach(f => f.style.display = "none");

          candlesBlown = true;
          document.getElementById("hint").innerText =
            "✨ Candles blown out! Tap the cake to cut 🍰";
        } else {
          requestAnimationFrame(detectBlow);
        }
      }

      detectBlow();
    })
    .catch(() => alert("Please allow microphone access"));
}

/* Cut cake */
function cutCake() {
  if (!candlesBlown || cakeCut) return;

  document.getElementById("cake").classList.add("cut");
  document.querySelector(".cake-container").classList.add("cutting");
  cakeCut = true;

  document.getElementById("hint").innerText =
    "🍰 Cake cut! Sweet success awaits ✨";
}
