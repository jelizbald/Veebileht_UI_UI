let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.bottom = value * 1.5 + 'px';
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
        question: "Kas eelistad mehi või naisi",
        answers: [
            { text: "Mehi", filter: ["male"] },
            { text: "Naisi", filter: ["female"] }
        ]
    },
    {
        question: "Milline juuksevärv sulle meeldib?",
        answers: [
            { text: "Heledad", filter: ["light_hair"] },
            { text: "Tumedad", filter: ["dark_hair"] },
            { text: "Värvilised (roosa, sinine jne)", filter: ["colorful"] }
        ]
    },
    {
        question: "Mis tüüpi iseloom tõmbab sind kõige rohkem?",
        answers: [
            { text: "Hooliv ja siiras", filter: ["caring"] },
            { text: "Salapärane ja vaoshoitud", filter: ["mysterious"] },
            { text: "Lahe ja enesekindel", filter: ["cool"] },
            { text: "Kohmakas, aga nunnu", filter: ["clumsy_cute"] },
            { text: "Karm ja emotsioonitu", filter: ["cold"] },
            { text: "Tõsine ja kohusetundlik", filter: ["responsible"] },
            { text: "Rõõmsameelne ja naljakas", filter: ["cheerful"] },
            { text: "Tujukas ja keeruline", filter: ["moody"] },
        ]
    },
    {
        question: "Millist tüüpi suhe sulle kõige rohkem meeldiks?",
        answers: [
            { text: "Romantiline ja emotsionaalne", filter: ["romantic"] },
            { text: "Sügav ja kirglik", filter: ["deep"] },
            { text: "Põnev ja seikluslik", filter: ["adventurous"] },
            { text: "Toetav ja usaldusväärne", filter: ["supportive"] },
            { text: "Ebastabiilne ja dramaatiline", filter: ["unstable"] },
            { text: "Kauge, aga hooliv", filter: ["distant"] }

        ]
    }, 
    {
        question: "Millist tüüpi võimeid või oskusi imetled kõige enam?",
        answers: [
            { text: "Võitluskunstid ja füüsiline tugevus", filter: ["martial_arts"] },
            { text: "Tervendavad ja support võimed", filter: ["healing"] },
            { text: "Sotsiaalne mõju ja karisma", filter: ["charisma"] },
            { text: "Ellujäämisoskused ja praktiline nutikus", filter: ["survival"] },
            { text: "Maagia ja müstilised jõud", filter: ["magic"] },
            { text: "Tehnoloogia ja mehaanilised oskused", filter: ["technology"] },
            { text: "Intelligentsus ja strateegiline mõtlemine", filter: ["intellectual"] },
        ]
    }   
];

// Персонажи и их фильтры (результаты на английском)
const animeHusbands = [
    { name: "Zoro", anime: "One Piece", filters: ["male", "colorful", "cool","distant","martial_arts"], image: "piltid/zoro(2).jpg" },
    { name: "Luffy", anime: "One Piece", filters: ["male", "dark_hair", "cheerful", "adventurous","martial_arts"], image: "piltid/luffy.jpg" },
    { name: "Franky", anime: "One Piece", filters: ["male", "colorful", "cheerful", "adventurous","technology"], image: "piltid/franky.jpg" },
    { name: "Sanji", anime: "One Piece", filters: ["male", "light_hair", "caring", "deep","survival"], image: "piltid/sanji.jpg" },

    { name: "Boa", anime: "One Piece", filters: ["female", "dark_hair", "moody", "romantic","charisma"], image: "piltid/boa.jpg" },
    { name: "Nami", anime: "One Piece", filters: ["female", "light_hair", "moody","adventurous", "survival"], image: "piltid/nami.jpg" },
    { name: "Robin", anime: "One Piece", filters: ["female", "dark_hair", "mysterious","supportive", "intellectual"], image: "piltid/robin.jpg" },

    { name: "Gojo Satoru", anime: "Jujutsu Kaisen", filters: ["male", "light_hair", "cool","romantic", "magic"], image: "piltid/gojo.jpg" },
    { name: "Nanami Kento", anime: "Jujutsu Kaisen", filters: ["male", "light_hair", "responsible","supportive", "magic"], image: "piltid/nanami.jpg" },
    { name: "Toji Fushiguro", anime: "Jujutsu Kaisen", filters: ["male", "dark_hair", "cold","unstable", "martial_arts"], image: "piltid/toji.jpg" },
    { name: "Yuji Itadori", anime: "Jujutsu Kaisen", filters: ["male", "colorful", "caring","adventurous", "martial_arts"], image: "piltid/Yuji.jpg" },

    { name: "Nobara", anime: "Jujutsu Kaisen", filters: ["female", "light_hair", "cool","romantic", "magic"], image: "piltid/nobara.jpg" },
    { name: "Maki", anime: "Jujutsu Kaisen", filters: ["female", "colorful", "cold","supportive", "martial_arts"], image: "piltid/maki.jpg" },
    { name: "MeiMei", anime: "Jujutsu Kaisen", filters: ["female", "light_hair", "mysterious","unstable", "charisma"], image: "piltid/meimei.jpg" },

    { name: "Yoruichi", anime: "Bleach", filters: ["female", "colorful", "cool", "adventurous","martial_arts"], image: "piltid/yoruichi.jpg" },
    { name: "Byakuya", anime: "Bleach", filters: ["male", "dark_hair", "cold","distant", "martial_arts"], image: "piltid/byakuya.jpg" },
    { name: "Kenpachi", anime: "Bleach", filters: ["male", "dark_hair", "cold","unstable", "martial_arts"], image: "piltid/kempachi.jpg" },
    { name: "Ukitake", anime: "Bleach", filters: ["male", "light_hair", "caring", "supportive","intellectual"], image: "piltid/ukitake.jpg" },
    { name: "Orihime", anime: "Bleach", filters: ["female", "colorful", "caring","romantic", "magic"], image: "piltid/orihime.jpg" },
    { name: "Rukia", anime: "Bleach", filters: ["female", "dark_hair", "cold", "deep", "martial_arts"], image: "piltid/rukia.jpg" },
    { name: "Kisuke", anime: "Bleach", filters: ["male", "light_hair", "cheerful", "adventurous", "intellectual"], image: "piltid/kusuke.jpg" }
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
    questionElement.innerText = "Sinu anime abikaasa:";
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
    husbandImage.classList.add("husband-image", "img_anime");
    
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

