// Perguntas do quiz
const baseQuestions = [
    {
        question: "Quais os meus artistas favoritos no momento?",
        options: [
            { text: "Daniel Caesar, Luccas Carlos e Marília Mendonça", personality: "A" },
            { text: "Drake, Justin Bieber e Demi Lovato", personality: "B" },
            { text: "Kehlani, Rihanna e Veigh", personality: "C" },
            { text: "Alexandre Pires, Taylor Swift e Selena Gomez", personality: "D" }
        ]
    },
    {
        question: "Qual meu petisco favorito?",
        options: [
            { text: "Salame com limão", personality: "A" },
            { text: "Queijo", personality: "B" },
            { text: "Ovo de codorna", personality: "C" },
            { text: "Presunto", personality: "D" }
        ]
    },
    {
        question: "Como eu gosto de te ouvir me chamar?",
        options: [
            { text: "Vida", personality: "A" },
            { text: "Amor", personality: "B" },
            { text: "Juliana", personality: "C" },
            { text: "Amiga", personality: "D" }
        ]
    },
    {
        question: "Quando estou animada, eu:",
        options: [
            { text: "Falo pelos cotovelos", personality: "A" },
            { text: "Pulo", personality: "B" },
            { text: "Danço", personality: "C" },
            { text: "Como tudo o que vejo pela frente", personality: "D" }
        ]
    },
    {
        question: "Artista que me lembra você:",
        options: [
            { text: "Gigi Perez", personality: "A" },
            { text: "Djavan", personality: "B" },
            { text: "Tyler, the Creator", personality: "C" },
            { text: "Ludmilla", personality: "D" }
        ]
    },
    {
        question: "Meu doce industrializado favorito:",
        options: [
            { text: "Twix", personality: "A" },
            { text: "Snickers", personality: "B" },
            { text: "Alpino", personality: "C" },
            { text: "Prestígio", personality: "D" }
        ]
    },
    {
        question: "Minha segunda escolha de profissão quando criança era:",
        options: [
            { text: "Professora de matemática", personality: "A" },
            { text: "Secretária", personality: "B" },
            { text: "Engenheria", personality: "C" },
            { text: "Cozinheira", personality: "D" }
        ]
    }
];

// Resultados das personalidades
const personalityResults = {
    A: {
        title: "VOCÊ ME AMA MUITO!",
        emoji: "😍",
        color: "pink",
        bgColor: "bg-pink-200",
        description: "Provou que me conhece mais que todos e merece muitos beijinhos!"
    },
    B: {
        title: "Você me conhece quase completamente.",
        emoji: "😅",
        color: "purple",
        bgColor: "bg-purple-200",
        description: "Você errou alguma, mas eu ainda te amo!"
    },
    C: {
        title: "Você não me conhece tanto...",
        emoji: "🙁",
        color: "blue",
        bgColor: "bg-blue-200",
        description: "Errou muitas e não merece beijinhos...",
    },
    D: {
        title: "VOCÊ ME ODEIA!",
        emoji: "😡",
        color: "orange",
        bgColor: "bg-orange-200",
        description: "Errou quase todas, mané. Deve me odiar!!!",
    }
};

// Estado do jogo
let gameState = "start";
let currentQuestionIndex = 0;
let answers = [];
let shuffledQuestions = [];

// Função para embaralhar array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Função para renderizar a tela inicial
function renderStartScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 books-pattern">
            <div class="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 book-page book-shadow stars-decoration">
                <div class="flex justify-center mb-6 float-animation">
                    <div class="text-7xl">🤓</div>
                </div>
                
                <h1 class="text-4xl font-bold text-pink-600 text-center mb-3 text-with-depth">Quiz sobre mim 💫</h1>
                <p class="text-center text-purple-600 font-medium mb-8 text-lg">Responda ${baseQuestions.length} perguntas e descubra se me conhece!</p>
                
                <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-pink-200">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-3 text-gray-700">
                            <div class="text-2xl">💕</div>
                            <span class="font-medium">Se acertar todas as ${baseQuestions.length}, você me ama MUITO!</span>
                        </div>
                        <div class="flex items-center gap-3 text-gray-700">
                            <div class="text-2xl">💭</div>
                            <span class="font-medium">Se acertar quase todas, deveria me conhecer mais...</span>
                        </div>
                        <div class="flex items-center gap-3 text-gray-700">
                            <div class="text-2xl">👎</div>
                            <span class="font-medium">Se errar a maioria, não me ama!</span>
                        </div>
                    </div>
                </div>
                
                <button onclick="startQuiz()" class="playful-button w-full py-6 text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 shadow-lg">
                    BORA!
                </button>
            </div>
        </div>
    `;
}

// Função para iniciar o quiz
function startQuiz() {
    const questionsWithShuffledOptions = baseQuestions.map(q => ({
        ...q,
        options: shuffleArray(q.options)
    }));
    shuffledQuestions = shuffleArray(questionsWithShuffledOptions);
    
    gameState = "playing";
    currentQuestionIndex = 0;
    answers = [];
    
    renderQuestionScreen();
}

// Função para renderizar a tela de perguntas
function renderQuestionScreen() {
    const app = document.getElementById('app');
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    
    const optionsHTML = currentQuestion.options.map((option, index) => `
        <button onclick="selectOption('${option.personality}', ${index})" class="playful-button option-btn w-full p-5 text-left text-lg bg-white border-2 border-purple-300 rounded-2xl hover:border-pink-400 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all hover:shadow-lg hover:-translate-y-1">
            ${option.text}
        </button>
    `).join('');
    
    app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 books-pattern">
            <div class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 book-page book-shadow">
                <div class="mb-8">
                    <div class="flex justify-between text-sm font-semibold text-purple-600 mb-3">
                        <span class="flex items-center gap-2">📖 Pergunta ${currentQuestionIndex + 1} de ${shuffledQuestions.length}</span>
                        <span class="flex items-center gap-2">${Math.round(progressPercentage)}% ✨</span>
                    </div>
                    <div class="w-full h-3 bg-purple-100 rounded-full overflow-hidden shadow-inner">
                        <div class="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 transition-all duration-300 shadow-lg" style="width: ${progressPercentage}%"></div>
                    </div>
                </div>
                
                <h2 class="text-3xl font-bold text-purple-700 mb-8 text-center text-with-depth">${currentQuestion.question}</h2>
                
                <div class="flex flex-col gap-4">
                    ${optionsHTML}
                </div>
            </div>
        </div>
    `;
}

// Função para selecionar opção
function selectOption(personality, optionIndex) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        btn.classList.remove('hover:border-pink-300', 'hover:bg-pink-50');
        if (index === optionIndex) {
            btn.classList.add('border-pink-500', 'bg-pink-50', 'scale-98');
        }
    });
    
    setTimeout(() => {
        answers.push(personality);
        
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            currentQuestionIndex++;
            renderQuestionScreen();
        } else {
            gameState = "results";
            renderResultsScreen();
        }
    }, 300);
}

// Função para calcular a personalidade
function calculatePersonality() {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    
    answers.forEach(answer => {
        counts[answer]++;
    });
    
    const dominantLetter = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
    );
    
    return personalityResults[dominantLetter];
}

// Função para renderizar a tela de resultados
function renderResultsScreen() {
    const app = document.getElementById('app');
    const personality = calculatePersonality();
    

    app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 books-pattern">
            <div class="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 book-page book-shadow stars-decoration">
                <div class="flex justify-center mb-6 sparkle-animation">
                    <div class="${personality.bgColor} p-8 rounded-full shadow-xl">
                        <span class="text-7xl">${personality.emoji}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-center gap-3 mb-3">
                    <span class="text-3xl sparkle-animation">🌟</span>
                    <h2 class="text-base font-bold text-pink-500 uppercase tracking-wider">Seu Resultado</h2>
                    <span class="text-3xl sparkle-animation">🌟</span>
                </div>
                
                <h1 class="text-4xl font-bold text-purple-700 text-center mb-6 text-with-depth">${personality.title}</h1>
                
                <div class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 mb-6 border-2 border-pink-200 shadow-inner">
                    <p class="text-gray-800 text-xl leading-relaxed mb-6 text-center font-medium">${personality.description}</p>
                    
                </div>
                
                <button onclick="restartQuiz()" class="playful-button w-full py-6 text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 shadow-lg flex items-center justify-center gap-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Fazer Novamente
                </button>
            </div>
        </div>
    `;
}

// Função para reiniciar o quiz
function restartQuiz() {
    gameState = "start";
    currentQuestionIndex = 0;
    answers = [];
    shuffledQuestions = [];
    renderStartScreen();
}

// Inicializar o app
renderStartScreen();