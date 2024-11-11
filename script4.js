let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill4.style.left = value * 1.5 + 'px';
    hill5.style.left = value * -1.5 + 'px';
    hill1.style.top = value * 1 + 'px';
})


function scrollAnimation() {
    const images = document.querySelectorAll('.scroll-animation');
    
    images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);

        if (isVisible) {
            img.classList.add('visible');
        } else {
            img.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', scrollAnimation);

scrollAnimation();


let currentQuestionIndex = 0;
let userFilters = [];

// Вопросы и ответы на эстонском языке
const questions = [
    {
        question: "Kas oled poiss või tüdruk?",
        answers: [
            { text: "Tüdruk", filter: ["male"] },
            { text: "Poiss", filter: ["female"] }
        ]
    },
    {
        question: "Milline juuksevärv sulle meeldib?",
        answers: [
            { text: "Heledad", filter: ["light_hair"] },
            { text: "Tumedad", filter: ["dark_hair"] },
            { text: "Eredad (roosa, sinine jne)", filter: ["bright_hair"] }
        ]
    },
    {
        question: "Milline isiksusetüüp sulle meeldib?",
        answers: [
            { text: "Hooliv ja lahke", filter: ["caring"] },
            { text: "Külm ja tugev", filter: ["cold"] },
            { text: "Lõbus ja energiline", filter: ["cheerful"] }
        ]
    },
    {
        question: "Milline oskus või võime sind huvitab?",
        answers: [
            { text: "Võitluskunst", filter: ["martial_arts"] },
            { text: "Maagia", filter: ["magic"] },
            { text: "Intelligentsus ja strateegia", filter: ["intellectual"] }
        ]
    }
];

// Персонажи и их фильтры (результаты на английском)
const animeHusbands = [
    { name: "Zoro", anime: "One Piece", filters: ["male", "dark_hair", "cold", "martial_arts"], image: "C:\Users\balduhhova\Desktop\veebileht\piltid\zoro.jpg" },
    { name: "Luffy", anime: "One Piece", filters: ["male", "dark_hair", "cheerful", "martial_arts"], image: "path/to/luffy.jpg" },
    { name: "Nami", anime: "One Piece", filters: ["female", "bright_hair", "cheerful", "intellectual"], image: "path/to/nami.jpg" },
    { name: "Robin", anime: "One Piece", filters: ["female", "dark_hair", "cold", "intellectual"], image: "path/to/robin.jpg" },
    { name: "Gojo Satoru", anime: "Jujutsu Kaisen", filters: ["male", "light_hair", "cheerful", "magic"], image: "path/to/gojo.jpg" },
    { name: "Mahito", anime: "Jujutsu Kaisen", filters: ["male", "bright_hair", "cold", "magic"], image: "path/to/mahito.jpg" },
    { name: "Nobara", anime: "Jujutsu Kaisen", filters: ["female", "dark_hair", "cheerful", "martial_arts"], image: "path/to/nobara.jpg" },
    { name: "Maki", anime: "Jujutsu Kaisen", filters: ["female", "dark_hair", "cold", "martial_arts"], image: "path/to/maki.jpg" },
    { name: "Yoruichi", anime: "Bleach", filters: ["female", "dark_hair", "cheerful", "martial_arts"], image: "path/to/yoruichi.jpg" },
    { name: "Byakuya", anime: "Bleach", filters: ["male", "dark_hair", "cold", "martial_arts"], image: "path/to/byakuya.jpg" },
    { name: "Kenpachi", anime: "Bleach", filters: ["male", "dark_hair", "cold", "martial_arts"], image: "path/to/kenpachi.jpg" },
    { name: "Ukitake", anime: "Bleach", filters: ["male", "light_hair", "caring", "intellectual"], image: "path/to/ukitake.jpg" },
    { name: "Orihime", anime: "Bleach", filters: ["female", "bright_hair", "caring", "magic"], image: "path/to/orihime.jpg" },
    { name: "Rukia", anime: "Bleach", filters: ["female", "dark_hair", "cold", "martial_arts"], image: "path/to/rukia.jpg" },
    { name: "Kisuke", anime: "Bleach", filters: ["male", "light_hair", "cheerful", "intellectual"], image: "path/to/kisuke.jpg" }
];

// Функция для показа текущего вопроса
function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    // Показываем текущий вопрос и ответы
    questionElement.innerText = questions[currentQuestionIndex].question;
    answersElement.innerHTML = "";

    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");
        button.addEventListener("click", () => handleAnswer(answer.filter));
        answersElement.appendChild(button);
    });
}

// Обработка ответа
function handleAnswer(filter) {
    userFilters.push(...filter);  // Добавляем выбранные фильтры в массив
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Показываем результат — только один персонаж
function showResults() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    questionElement.innerText = "Sinu anime mees:";
    answersElement.innerHTML = "";

    const filteredAnimeHusbands = animeHusbands.filter(husband =>
        husband.filters.every(filter => userFilters.includes(filter))
    );

    const result = filteredAnimeHusbands.length > 0 ? filteredAnimeHusbands[0] : getClosestMatch();

    // Создаем карточку с результатом
    const resultElement = document.createElement("div");
    resultElement.classList.add("recommendation-card", "fade-in");
    
    const husbandImage = document.createElement("img");
    husbandImage.src = result.image;
    husbandImage.alt = result.name;
    husbandImage.classList.add("husband-image");
    
    const husbandTitle = document.createElement("h3");
    husbandTitle.innerText = result.name;
    
    const husbandAnime = document.createElement("p");
    husbandAnime.innerText = `Anime: ${result.anime}`;
    
    resultElement.appendChild(husbandImage);
    resultElement.appendChild(husbandTitle);
    resultElement.appendChild(husbandAnime);
    answersElement.appendChild(resultElement);
}

// Получение ближайшего совпадения, если точного нет
function getClosestMatch() {
    const similarityScores = animeHusbands.map(husband => ({
        ...husband,
        matches: husband.filters.filter(filter => userFilters.includes(filter)).length
    }));

    similarityScores.sort((a, b) => b.matches - a.matches);
    return similarityScores[0];
}

// Запуск теста
showQuestion();
