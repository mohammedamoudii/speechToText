const startButton = document.getElementById("startBtn");
const outputDiv = document.getElementById("output");
const finalTranscriptInput = document.getElementById("finalTranscript");
const saveButton = document.getElementById("saveBtn");

if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US"; // Set the language to English

    recognition.onstart = () => {
        startButton.textContent = "Recording...";
    };

    recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
            } else {
                interimTranscript += transcript;
            }
        }

        outputDiv.innerHTML = `
            <p>Interim: ${interimTranscript}</p>
            <p>Final: ${finalTranscript}</p>
        `;

        finalTranscriptInput.value = finalTranscript;
        saveButton.style.display = "block";
    };

    recognition.onend = () => {
        startButton.textContent = "Start Recording";
    };

    startButton.addEventListener("click", () => {
        if (recognition.start) {
            recognition.start();
        }
    });
} else {
    outputDiv.textContent = "Web Speech API not supported in this browser.";
}
