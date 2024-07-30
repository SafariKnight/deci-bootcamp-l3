let stressCount = 0;

/** Generate Questions **/
const questions = [
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?arstoeianrsoteairostne",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
  "Do you feel stressed at work?",
];

const questionList = document.querySelector(".question__list");

function updateQuestions() {
  questionList.innerHTML = "";
  questions.forEach((question, index) => {
    questionList.innerHTML += `
      <section class="question__box j-question-${index} flow">
        <h2 class="question__title">${question}</h2>
        <div>
          <input type="radio" name="q${index}" id="q${index}-y">
          <label for="q${index}-y">Yes</label>
        </div>
        <div>
          <input type="radio" name="q${index}" id="q${index}-n">
          <label for="q${index}-n">No</label>
        <div>
      </section
  `;
  });
}
updateQuestions();

/** Change Stress Counter **/
function choiceToValue(selectedRadio) {
  const typeOfRadio = selectedRadio.id.substr(selectedRadio.id.length - 1);

  if (typeOfRadio === "y") return 1;
  if (typeOfRadio === "n") return -1;
  return 0;
}

function getStressLevel() {
  let stress = 0;
  for (let i = 0; i < questions.length; i++) {
    const checkedRadio = document.querySelector(
      `.j-question-${i} input:checked`,
    );
    try {
      stress += choiceToValue(checkedRadio);
    } catch (err) {
      alert("Please Answer all the Questions");
      return;
    }
  }
  return stress;
}

document.querySelector(".question__form").addEventListener("submit", (e) => {
  e.preventDefault();
  const stressLevel = getStressLevel()
  if (stressLevel === undefined) return;
  alert(`Your Stress Level is ${stressLevel}/${questions.length}`)
})
