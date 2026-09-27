/* =========================
   NAVIGATION
========================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================
   Ka → pKa
========================= */

function calculatePKA() {

    const ka = parseFloat(
        document.getElementById("kaInput").value
    );

    const result = document.getElementById("kaResult");

    if (isNaN(ka) || ka <= 0) {

        result.innerHTML =
            "⚠️ Shkruaj një vlerë të vlefshme për Ka.";

        return;
    }

    const pka = -Math.log10(ka);

    result.innerHTML =
        `Ka = ${ka}<br>
         pKa = −log(${ka})<br>
         <strong>pKa = ${formatNumber(pka)}</strong>`;
}


/* =========================
   pKa → Ka
========================= */

function calculateKA() {

    const pka = parseFloat(
        document.getElementById("pkaInput").value
    );

    const result = document.getElementById("pkaResult");

    if (isNaN(pka)) {

        result.innerHTML =
            "⚠️ Shkruaj një vlerë të vlefshme për pKa.";

        return;
    }

    const ka = Math.pow(10, -pka);

    result.innerHTML =
        `pKa = ${pka}<br>
         Ka = 10<sup>−${pka}</sup><br>
         <strong>Ka = ${scientificNotation(ka)}</strong>`;
}


/* =========================
   Kb → pKb
========================= */

function calculatePKB() {

    const kb = parseFloat(
        document.getElementById("kbInput").value
    );

    const result = document.getElementById("kbResult");

    if (isNaN(kb) || kb <= 0) {

        result.innerHTML =
            "⚠️ Shkruaj një vlerë të vlefshme për Kb.";

        return;
    }

    const pkb = -Math.log10(kb);

    result.innerHTML =
        `Kb = ${kb}<br>
         pKb = −log(${kb})<br>
         <strong>pKb = ${formatNumber(pkb)}</strong>`;
}


/* =========================
   pKb → Kb
========================= */

function calculateKB() {

    const pkb = parseFloat(
        document.getElementById("pkbInput").value
    );

    const result = document.getElementById("pkbResult");

    if (isNaN(pkb)) {

        result.innerHTML =
            "⚠️ Shkruaj një vlerë të vlefshme për pKb.";

        return;
    }

    const kb = Math.pow(10, -pkb);

    result.innerHTML =
        `pKb = ${pkb}<br>
         Kb = 10<sup>−${pkb}</sup><br>
         <strong>Kb = ${scientificNotation(kb)}</strong>`;
}


/* =========================
   FORMAT NUMBERS
========================= */

function formatNumber(number) {

    if (Number.isInteger(number)) {
        return number;
    }

    return number.toFixed(4);
}


function scientificNotation(number) {

    return number.toExponential(4)
        .replace("e-", " × 10⁻")
        .replace("e+", " × 10⁺");
}


/* =========================
   QUIZ
========================= */

const questions = [

    {
        question: "1. Çfarë tregon Ka?",

        options: [
            "Fuqinë e acidit",
            "Fuqinë e bazës",
            "Temperaturën",
            "Masën e acidit"
        ],

        answer: 0
    },


    {
        question: "2. Cila është formula për pKa?",

        options: [
            "pKa = log(Ka)",
            "pKa = −log(Ka)",
            "pKa = Ka × 10",
            "pKa = Ka + 10"
        ],

        answer: 1
    },


    {
        question: "3. Cila është formula për pKb?",

        options: [
            "pKb = −log(Kb)",
            "pKb = log(Kb)",
            "pKb = Kb × 10",
            "pKb = Kb + 10"
        ],

        answer: 0
    },


    {
        question: "4. Nëse Ka rritet, acidi bëhet:",

        options: [
            "Më i dobët",
            "Më i fortë",
            "Neutral",
            "Bazë"
        ],

        answer: 1
    },


    {
        question: "5. Nëse pKa zvogëlohet, acidi bëhet:",

        options: [
            "Më i fortë",
            "Më i dobët",
            "Neutral",
            "Gjithmonë bazë"
        ],

        answer: 0
    },


    {
        question: "6. Nëse pKa = 5, sa është Ka?",

        options: [
            "10⁵",
            "10⁻⁵",
            "5 × 10",
            "5⁻¹"
        ],

        answer: 1
    },


    {
        question: "7. Nëse pKb = 3, sa është Kb?",

        options: [
            "10³",
            "10⁻³",
            "3 × 10",
            "10⁻¹"
        ],

        answer: 1
    }

];


function loadQuiz() {

    const container =
        document.getElementById("quizContainer");

    container.innerHTML = "";


    questions.forEach((q, index) => {

        const questionDiv =
            document.createElement("div");

        questionDiv.className = "question";


        const title =
            document.createElement("h3");

        title.textContent = q.question;

        questionDiv.appendChild(title);


        q.options.forEach((option, optionIndex) => {

            const label =
                document.createElement("label");

            label.className = "option";


            const input =
                document.createElement("input");

            input.type = "radio";

            input.name = `question${index}`;

            input.value = optionIndex;


            label.appendChild(input);

            label.appendChild(
                document.createTextNode(option)
            );


            questionDiv.appendChild(label);

        });


        container.appendChild(questionDiv);

    });

}


function checkQuiz() {

    let score = 0;

    let answered = 0;


    questions.forEach((question, index) => {

        const selected =
            document.querySelector(
                `input[name="question${index}"]:checked`
            );


        if (selected) {

            answered++;

            if (
                parseInt(selected.value) ===
                question.answer
            ) {

                score++;

            }

        }

    });


    const result =
        document.getElementById("quizResult");


    if (answered < questions.length) {

        result.innerHTML =
            `⚠️ Ke përgjigjur vetëm në ${answered} nga ${questions.length} pyetje.`;

        result.style.color = "#a16b00";

        return;
    }


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    result.innerHTML =
        `Rezultati: ${score}/${questions.length} — ${percentage}%`;


    if (percentage >= 80) {

        result.innerHTML +=
            "<br>🎉 Shumë mirë! E ke kuptuar mësimin.";

        result.style.color = "#18785c";

    } else if (percentage >= 50) {

        result.innerHTML +=
            "<br>👍 Mirë! Përsëriti edhe një herë disa pjesë.";

        result.style.color = "#8a6a00";

    } else {

        result.innerHTML +=
            "<br>📚 Përsërite përmbledhjen dhe provo përsëri.";

        result.style.color = "#a13a4a";

    }

}


/* =========================
   START QUIZ
========================= */

document.addEventListener(
    "DOMContentLoaded",
    loadQuiz
);