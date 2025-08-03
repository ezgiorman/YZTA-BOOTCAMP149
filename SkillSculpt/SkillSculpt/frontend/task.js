let startTime = performance.now();
let readingStartTime = null;
let readingEndTime = null;

// Okuma paragrafı tamamlandığında zamanı kaydet
function endReading() {
  readingEndTime = performance.now();
  alert("📘 Okuma tamamlandı!");
}

// ✅ Test sorularını yükle
function loadQuiz() {
  fetch("/quiz-questions")
    .then((res) => res.json())
    .then((questions) => {
      const container = document.getElementById("quiz-container");
      container.innerHTML = "";
      questions.forEach((q, i) => {
        const qDiv = document.createElement("div");
        qDiv.innerHTML = `
          <p><strong>${i + 1}. ${q.question}</strong></p>
          ${q.options.map((opt) => `
            <label>
              <input type="radio" name="question${i}" value="${opt}"> ${opt}
            </label><br>
          `).join("")}
        `;
        container.appendChild(qDiv);
      });

      document.getElementById("quiz-section").style.display = "block";
    })
    .catch((err) => {
      console.error("Quiz yüklenemedi:", err);
    });
}

// Test cevaplarını gönder (örnek)
function submitQuiz() {
  alert("✅ Test cevapları gönderildi. (Analize dahil edilebilir.)");
}

// ✅ Form gönderildiğinde görev verilerini topla ve gönder
document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const endTime = performance.now();
  const formData = new FormData(e.target);

  const taskCompletionTime = Math.round((endTime - startTime) / 1000);
  const readingTime = readingEndTime ? Math.round((readingEndTime - startTime) / 1000) : 0;

  const spellingText = formData.get("spelling_test") || "";
  const blankRatio = [...formData.values()].filter(v => !v.trim()).length / 5;

  const spellingMistakes = (spellingText.match(/(?:gelecek|okul|arkadaşlık)/gi) || []).length;
  const wrongSpellingRatio = spellingText.length ? 1 - (spellingMistakes / 3) : 1;

  const result = {
    age: 10,  // Sabit yaş (gelişmiş sürümde kullanıcıdan alınabilir)
    reading_time: readingTime,
    sequencing_difficulty_score: formData.get("letter_order") ? 0 : 1,
    task_completion_time: taskCompletionTime,
    blank_answer_ratio: blankRatio,
    semantic_mistake_count: formData.get("quiz_answer") === "24" ? 0 : 1,
    wrong_spelling_ratio: wrongSpellingRatio
  };

  console.log("📦 Model verileri:", result);

  try {
    const response = await fetch("/analyze-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result)
    });

    if (!response.ok) {
      alert("⚠️ Sunucu hatası oluştu.");
      return;
    }

    const data = await response.json();
    alert(`📊 Tahmin Sonucu: ${data.message}`);

  } catch (error) {
    console.error("Gönderim hatası:", error);
    alert("⚠️ Veri gönderilemedi.");
  }
});
