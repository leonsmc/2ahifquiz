document.addEventListener("DOMContentLoaded", function() {
    const questionContainer = document.getElementById("question");
    const answerButtons = document.getElementsByClassName("answer-btn");
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const introSection = document.getElementById("intro");
    const quizSection = document.getElementById("quiz");
    const resultsSection = document.getElementById("results");

    let currentQuestionIndex = 0;

    // Load questions (you can expand this array as needed)
    const questions = [
        { 
            question: "Was war unser Abschlussprojekt?", 
            answers: ["Pygame", "Excel Applikation", "Spiel des lebens"],
            correct: 0,  // <-- This is the first option, so index should be 0
            points: 200
        },
        { 
            question: "Wie heißt unser Klassenvorstand?", 
            answers: ["Ammon", "Diem", "Röser"],
            correct: 1,  // <-- This is the second option, so index should be 1
            points: 150
        },
        { 
            question: "Was machen wir in DBI im Moment?", 
            answers: ["Excel", "Programmieren", "Bildbearbeitung"],
            correct: 2,  // <-- This is the third option, so index should be 2
            points: 150
        },
        { 
            question: "Was ist keine Fachrichtung in unserer HTL?", 
            answers: ["Informatik", "Maschinenbau", "Elektronik"],
            correct: 1,
            points: 250
        },
        { 
            question: "Welcher der volgenden Zeilen platziert eine Stein Block?", 
            answers: ["minecraft.setBlock(x, y, z, block.STONE)", "minecraft.setBlock(x, y, z, block.WOOD)", "minecraft.setBlock(x, y, z, block.NETHER_Core)"],
            correct: 0,
            points: 100
        },

{
            question: "Was zeigt ein Flussdiagramm typischerweise an?", 
            answers: ["Die Struktur eines Programmcodes", "Die Hierarchie einer Organisation", "Die Geschichte eines historischen Ereignisses"],
            correct: 0,
            points: 175
        },

        {
            question: "Was ist Scratch", 
            answers: ["Ein Betriebssystem", "Ein Grafikbearbeitungsprogramm", "Eine bildungsorientierte visuelle Entwicklungsumgebung"],
            correct: 2,
            points: 187
            },

        {
            question: "Was ist die Einheit für die Stromstärke", 
            answers: ["Volt", "Ohm", "Ampere"],
            correct: 2,
            points: 300
            },

        {
            question: "Was ist eine GPU", 
            answers: ["Grafikkarte", "Prozessor", "Lüftung"],
            correct: 0,
            points: 200
            },

        // ... Add more questions as needed
    ];

    startButton.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        showQuestion();
    });

    function startQuiz() {
        // Initialize or reset points
        localStorage.setItem('quizPoints', '0');

        const name = document.getElementById("name").value;
        localStorage.setItem('quizUserName', name);

        // Switch to quiz section
        introSection.style.display = "none";
        quizSection.style.display = "block";
        
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionContainer.textContent = question.question;

            for (let i = 0; i < answerButtons.length; i++) {
                const btn = answerButtons[i];
                btn.textContent = question.answers[i];
                btn.onclick = () => checkAnswer(i);
            }
        } else {
            finishQuiz();
        }
    }

    function checkAnswer(index) {
        const correctIndex = questions[currentQuestionIndex].correct;
        if (index === correctIndex) {
            let currentPoints = parseInt(localStorage.getItem('quizPoints'));
            currentPoints += questions[currentQuestionIndex].points;
            localStorage.setItem('quizPoints', currentPoints.toString());
        }
        currentQuestionIndex++;
        showQuestion();
    }

    function finishQuiz() {
        const username = localStorage.getItem('quizUserName');
        const userScore = localStorage.getItem('quizPoints');
        saveScoreToServer(username, parseInt(userScore));
    
        alert(`Thank you, ${username}! Your total score is: ${userScore}`);
        window.location.href = "leaderboard.html";
    }

    function saveScoreToServer(name, score) {
        fetch('http://192.168.1.2:5000/save_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                score: score
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("Score saved successfully!");
            } else {
                console.log("Error saving score.");
            }
        });
    }

    // Add function to fetch leaderboard if you need it in the future
});
