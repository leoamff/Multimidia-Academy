const quizForm = document.querySelector("#quiz-form");
const questionFieldset = document.querySelector("#question-fieldset");
const questionText = document.querySelector("#question-text");
const questionOptions = document.querySelector("#question-options");
const questionProgress = document.querySelector("#question-progress");
const quizProgress = document.querySelector("#quiz-progress");
const nextQuestionButton = document.querySelector("#next-question");
const quizResults = document.querySelector("#quiz-results");
const resultsTitle = document.querySelector("#results-title");
const scoreSummary = document.querySelector("#score-summary");
const answerReview = document.querySelector("#answer-review");
const restartButton = document.querySelector("#restart-quiz");
const questionsPerAttempt = 5;
let attemptQuestions = [];
let submittedAnswers = [];
let currentQuestionIndex = 0;
let attemptFinished = false;

function renderQuestion(moveFocus) {
  const question = attemptQuestions[currentQuestionIndex];
  questionFieldset.dataset.questionId = question.id;
  questionText.textContent = question.question;
  questionProgress.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questionsPerAttempt}`;
  quizProgress.value = currentQuestionIndex;
  questionOptions.replaceChildren();

  question.options.forEach((option, optionIndex) => {
    const label = document.createElement("label");
    label.className = "quiz-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = String(optionIndex);
    input.required = true;
    const text = document.createElement("span");
    text.textContent = option;
    label.append(input, text);
    questionOptions.append(label);
  });

  nextQuestionButton.firstChild.textContent = currentQuestionIndex === questionsPerAttempt - 1 ? "Finalizar " : "Avançar ";
  if (moveFocus) {
    questionText.focus();
  }
}

function startAttempt(moveFocus = false) {
  const shuffledQuestions = [...questionBank];
  for (let questionIndex = shuffledQuestions.length - 1; questionIndex > 0; questionIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (questionIndex + 1));
    [shuffledQuestions[questionIndex], shuffledQuestions[randomIndex]] = [shuffledQuestions[randomIndex], shuffledQuestions[questionIndex]];
  }

  attemptQuestions = shuffledQuestions.slice(0, questionsPerAttempt);
  submittedAnswers = [];
  currentQuestionIndex = 0;
  attemptFinished = false;
  scoreSummary.textContent = "";
  answerReview.replaceChildren();
  quizResults.hidden = true;
  quizForm.hidden = false;
  renderQuestion(moveFocus);
}

function showResults() {
  const correctCount = submittedAnswers.filter((answer) => answer.selectedIndex === answer.question.correctIndex).length;
  const percentage = Math.round((correctCount / questionsPerAttempt) * 100);
  scoreSummary.textContent = `${correctCount} de ${questionsPerAttempt} acertos · ${percentage}%`;

  submittedAnswers.forEach((answer) => {
    const correct = answer.selectedIndex === answer.question.correctIndex;
    const item = document.createElement("li");
    item.className = "quiz-feedback";
    item.dataset.questionId = answer.question.id;
    const heading = document.createElement("h4");
    heading.textContent = answer.question.question;
    const status = document.createElement("strong");
    status.className = correct ? "quiz-answer-correct" : "quiz-answer-incorrect";
    status.textContent = correct ? "Resposta correta" : "Resposta incorreta";
    const selected = document.createElement("p");
    selected.textContent = `Sua resposta: ${answer.question.options[answer.selectedIndex]}`;
    const expected = document.createElement("p");
    expected.textContent = `Resposta correta: ${answer.question.options[answer.question.correctIndex]}`;
    const explanation = document.createElement("p");
    explanation.textContent = answer.question.explanation;
    item.append(heading, status, selected, expected, explanation);
    answerReview.append(item);
  });

  quizProgress.value = questionsPerAttempt;
  quizForm.hidden = true;
  quizResults.hidden = false;
  resultsTitle.focus();
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (attemptFinished || submittedAnswers.length !== currentQuestionIndex) {
    return;
  }

  const selected = quizForm.querySelector('input[name="answer"]:checked');
  if (!selected) {
    quizForm.reportValidity();
    return;
  }

  submittedAnswers.push({ question: attemptQuestions[currentQuestionIndex], selectedIndex: Number(selected.value) });
  if (submittedAnswers.length === questionsPerAttempt) {
    attemptFinished = true;
    showResults();
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion(true);
});

restartButton.addEventListener("click", () => startAttempt(true));
startAttempt();