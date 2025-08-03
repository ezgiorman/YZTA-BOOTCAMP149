const pageStartTime = performance.now();
let readingStartTime = 0;
let readingEndTime = 0;
let timerInterval = null;
let quizQuestions = [];

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-reading-btn');
const endBtn = document.getElementById('end-reading-btn');

function startReading() {
  clearInterval(timerInterval);
  readingStartTime = performance.now();
  startBtn.style.display = 'none';
  endBtn.style.display = 'block';

  let seconds = 0;
  timerDisplay.textContent = `${seconds}s`;
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `${seconds}s`;
  }, 1000);
}

function endReading() {
  readingEndTime = performance.now();
  clearInterval(timerInterval);
  endBtn.style.display = 'none';
  startBtn.style.display = 'block';
}


function loadQuiz() {
  fetch("/quiz-questions")
    .then((res) => res.json())
    .then((questions) => {
      quizQuestions = questions; 
      const container = document.getElementById("quiz-container");
      container.innerHTML = ""; 
      questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");
        
        let optionsHTML = q.options.map(opt => `
          <label>
            <input type="radio" name="question${index}" value="${opt}" required> ${opt}
          </label>
        `).join('<br>');

        questionDiv.innerHTML = `
          <p>${index + 1}. ${q.question}</p>
          <div class="options">${optionsHTML}</div>
        `;
        container.appendChild(questionDiv);
      });
    })
    .catch((err) => {
      console.error("Quiz yüklenemedi:", err);
      const container = document.getElementById("quiz-container");
      container.innerHTML = "<p>Test soruları yüklenirken bir hata oluştu.</p>";
    });
}


document.addEventListener("DOMContentLoaded", loadQuiz);


document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (readingStartTime === 0 || readingEndTime === 0) {
    alert("Lütfen okuma görevini başlatıp bitirin.");
    return;
  }

  const formData = new FormData(e.target);
  const formEndTime = performance.now();
  
  const taskCompletionTime = Math.round((formEndTime - pageStartTime) / 1000);
  const readingTime = Math.round((readingEndTime - readingStartTime) / 1000);

  const correctOrder = "A,D,K,L,R";
  const userAnswerOrder = (formData.get("letter_order") || "").replace(/[\s,.-]/g, "").toUpperCase();
  const sequencingMistake = userAnswerOrder === correctOrder ? 0 : 1;


  let totalSemanticMistakes = 0;
  if (formData.get("quiz_answer") !== "24") {
    totalSemanticMistakes++;
  }
  quizQuestions.forEach((q, index) => {
    const userAnswer = formData.get(`question${index}`);
    if (userAnswer !== q.answer) {
      totalSemanticMistakes++;
    }
  });

  const spellingText = formData.get("spelling_test") || "";
  const blankRatio = [...formData.values()].filter(v => !v.trim()).length / (5 + quizQuestions.length);
  const spellingMistakes = (spellingText.match(/(?:gelecek|okul|arkadaşlık)/gi) || []).length;
  const wrongSpellingRatio = spellingText.length ? 1 - (spellingMistakes / 3) : 1;

  const result = {
    age: 10,
    reading_time: readingTime,
    sequencing_difficulty_score: sequencingMistake,
    task_completion_time: taskCompletionTime,
    blank_answer_ratio: blankRatio,
    semantic_mistake_count: totalSemanticMistakes,
    wrong_spelling_ratio: wrongSpellingRatio,
  };

  try {
    const response = await fetch("/analyze-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result)
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('analysisResult', JSON.stringify(data));
      window.location.href = '/analyze';
    } else {
      alert("Sunucu hatası oluştu.");
    }
  } catch (error) {
    console.error("Hata:", error);
    alert("Veri gönderilemedi.");
  }
});