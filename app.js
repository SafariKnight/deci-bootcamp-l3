let stressCount = 0;

/** Generate Questions **/
const questions = [
  "Did you feel stressed at work today?",
  "Did you find your workload not manageable today?",
  "Did you feel your day was not balanced at work?",
  "Did you feel not supported by your colleagues today?",
  "Did you feel not supported by your manager today?",
  "Do you experience any stress symptoms today?",
  "Do you think you will not be able to do well at work tomorrow?",
  "Did you feel uncomfortable in your work environment?",
  "Did you feel like you needed to take more breaks throughout your day?",
  "Did you feel that communication with your team was not effective?",
];

const questionList = document.querySelector(".question__list");

function updateQuestions() {
  questionList.innerHTML = "";
  questions.forEach((question, index) => {
    questionList.innerHTML += `
      <section class="question__box j-question-${index} flow">
        <h2 class="question__title">${question}</h2>
        <div class="question__yes">
          <input type="radio" name="q${index}" id="q${index}-y">
          <label for="q${index}-y">Yes</label>
        </div>
        <div class="question__no">
          <input type="radio" name="q${index}" id="q${index}-n">
          <label for="q${index}-n">No</label>
        </div>
      </section
  `;
  });
}
updateQuestions();

/** Change Stress Counter **/
function choiceToValue(selectedRadio) {
  const typeOfRadio = selectedRadio.id.substr(selectedRadio.id.length - 1);

  if (typeOfRadio === "y") return 1;
  // if (typeOfRadio === "n") return 0;
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

  const responses = getResponses();

  // Calculate the stress level based on responses
  const adviceMessage = generateAdvice(responses);

  if (stressLevel >= 5) {
    alert(`Your Stress Level is ${stressLevel}/10\n\n${adviceMessage}\n\n\Check the links below for more help\nA report regarding your stress level will be sent to your manager`);
    return;
  }
  alert(`Your Stress Level is ${stressLevel}`)
})

/** Case Advice **/
const advice = {
  workload: "We'll consider discussing your workload with your manager and see if there are ways to prioritize tasks or delegate.",
  support: "A message will be sent to your manager about how your colleagues should support you better.",
  environment: "Ensure you have a comfortable and ergonomic workspace. Please check recommended co-workers activities at the end of this page.",
  communication: "If communication is an issue, try setting up regular check-ins with your team to ensure everyone is on the same page.",
  breaks: "Make sure to take regular breaks during the day to recharge. Short breaks can significantly boost productivity and reduce stress.",
  dayOff: "Your stress level is quite high. It might be beneficial to consider taking a day off to recharge and address the sources of stress."
};

function getResponses() {
  let responses = {};
  
  for (let i = 0; i < questions.length; i++) {
    const checkedRadio = document.querySelector(`.j-question-${i} input:checked`);
    if (checkedRadio) {
      const answerValue = choiceToValue(checkedRadio);
      if (questions[i].includes("workload")) {
        responses.workload = answerValue;
      } else if (questions[i].includes("support") || questions[i].includes("communication")) {
        responses.support = answerValue;
      } else if (questions[i].includes("environment")) {
        responses.environment = answerValue;
      } else if (questions[i].includes("breaks")) {
        responses.breaks = answerValue;
      }
    } else {
      alert("Please answer all the questions");
      return;
    }
  }
  return responses;
}

/** Preparing Stress Level & Case Advice **/ 
function generateAdvice(responses) {
  let adviceMessage = "Here are some tips to manage your stress based on your responses:\n";

  // Sum the values of the responses to get the total stress level
  const stressLevel = getStressLevel();

  // Generate advice based on responses
  if (responses.workload === 1) {
    adviceMessage += `- ${advice.workload}\n`;
  }
  if (responses.support === 1) {
    adviceMessage += `- ${advice.support}\n`;
  }
  if (responses.environment === 1) {
    adviceMessage += `- ${advice.environment}\n`;
  }
  if (responses.communication === 1) {
    adviceMessage += `- ${advice.communication}\n`;
  }
  if (responses.breaks === 1) {
    adviceMessage += `- ${advice.breaks}\n`;
  }

  // Add day off advice if stress level is more than 7
  if (stressLevel > 7) {
    adviceMessage += `- ${advice.dayOff}\n`;
  }

  // if (adviceMessage === "Here are some tips to manage your stress based on your responses:\n    ") return "";

  return adviceMessage;
}

/** Showing Welcome Slide */
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-questions');
  const welcomeSlide = document.getElementById('welcome-slide');
  const questionForm = document.getElementById('question-form');

  startButton.addEventListener('click', () => {
    welcomeSlide.classList.add('hidden');
    questionForm.classList.remove('hidden');
    document.body.style.overflow = 'auto'; // Re-enable scrollbars
    updateQuestions(); // Load questions after showing the form
  });
});