let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let tree2 = document.getElementById('tree2');

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

function animateImagesOnScroll() {
    const images = document.querySelectorAll('.animated-image');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
            img.classList.add('visible'); // Добавляем класс для анимации
        } else {
            img.classList.remove('visible'); // Убираем класс, если невидимо
        }
    });
}

window.addEventListener('scroll', animateImagesOnScroll);
animateImagesOnScroll(); // Запускаем при загрузке страницы

window.addEventListener('scroll', scrollAnimation);

scrollAnimation();

// Инициализация текущего вопроса и выбранных фильтров
let currentQuestionIndex = 0;
let userFilters = [];

// Вопросы и варианты ответов
const questions = [
    {
        question: "Mis žanri animed sulle meeldivad?",
        answers: [
            { text: "Seinen: Täiskasvanutele/Tõsisemad teemad", filter: ["seinen"] },
            { text: "Shoujo: Romantilised ja emotsionaalsed", filter: ["shoujo"] },
            { text: "Shounen: Tegevus-ja seikluslood", filter: ["shounen"] },
            { text: "Horror", filter: ["horror"] },
            { text: "Mystery", filter: ["mystery"] },
            { text: "Ulme", filter: ["ulme"] },
            { text: "Komöödia", filter: ["comedy"] },
            { text: "Sport", filter: ["sports"] },
            { text: "Mecha", filter: ["mecha"] },
            { text: "Isekai", filter: ["isekai"] },
            { text: "Slice of Life", filter: ["slice_of_life"] }
        ]
    },
    {
        question: "Kas teile meeldivad rohkem keerukad ja mitmekihilised lood või lihtsamad?",
        answers: [
            { text: "keeruline ja mitmekihiline", filter: ["complex"] },
            { text: "Mõõdukalt keeruline, kuid arusaadav", filter: ["medium_complex"] },
            { text: "Lihtne ja meelelahutuslik", filter: ["simple"] }
        ]
    },
    {
        question: "Millised omadused kirjeldavad su lemmiktegelasi kõige paremini?",
        answers: [
            { text: "Hooliv ja siiras", filter: ["caring"] },
            { text: "Salapärane ja vaoshoitud", filter: ["mysterious"] },
            { text: "Lahe ja enesekindel", filter: ["cool"] },
            { text: "Kohmakas, aga nunnu", filter: ["clumsy_cute"] },
            { text: "Karm ja emotsioonitu", filter: ["cold"] },
            { text: "Tõsine ja kohusetundlik", filter: ["responsible"] },
            { text: "Rõõmsameelne ja naljakas", filter: ["cheerful"] },
            { text: "Tujukas ja keeruline", filter: ["moody"] }
        ]
    },
    {
        question: "Kas teile meeldivad romantilised jooned?",
        answers: [
            { text: "Jah, see on oluline", filter: ["romance"] },
            { text: "Vastuvõetav, kuid mitte oluline", filter: ["light_romance"] },
            { text: "Ei, parem on ilma nendeta", filter: ["no_romance"] }
        ]
    },
    {
        question: "Milline animatsioonistiil teile kõige rohkem meeldib?",
        answers: [
            { text: "Detailne ja realistlik stiil", filter: ["realistic"]},
            { text: "Fantaasiarikas ja loominguline", filter: ["fantasy"] },
            { text: "Retro ja nostalgiline", filter: ["retro"] },
            { text: "Animeeritud minimalistlik stiil", filter: ["minimal"]},
            { text: "Tumedad ja gootilikud efektid", filter: ["dark_gothic"]}
        ]
    }
];

// База данных аниме с фильтрами
const animeRecommendations = [
    { title: "Rainbow", filters: ["seinen", "moody", "complex", "no_romance", "dark_gothic"], image: "piltid/rainbow.jpg"  },
    { title: "Another", filters: ["horror", "mysterious", "medium_complex", "no_romance", "dark_gothic"], image: "piltid/another.jpg"  },
    { title: "Akame ga kill", filters: ["shounen", "responsible", "medium_complex", "light_romance", "fantasy"], image: "piltid/akame_ga_kill.jpg"  },

    { title: "Frieren", filters: ["seinen", "mysterious", "complex", "light_romance","minimal"], image: "piltid/frieren.jpg"  },
    { title: "Apothecary Diaries", filters: ["mystery", "cool", "medium_complex", "romance", "realistic"], image: "piltid/apothecary_diaries.jpg"  },
    { title: "Heavenly delusion", filters: ["ulme", "caring", "complex", "light_romance", "fantasy"], image: "piltid/heavenly_delusion.jpg"  },
    { title: "Mirai nikki", filters: ["ulme", "caring", "complex", "light_romance", "fantasy"], image: "piltid/mirai_nikki.jpg"  },

    { title: "Mashle", filters: ["comedy", "clumsy_cute", "simple", "no_romance", "fantasy"], image: "piltid/mashle.jpg"  },
    { title: "Free!", filters: ["sport", "caring", "simple", "light_romance", "realistic"], image: "piltid/free.jpg"  },

    { title: "Gurren Lagann!", filters: ["mecha", "cheerful", "simple", "light_romance","retro"], image: "piltid/gurren_lagann.jpg"  },
    { title: "The Rising of the Shield Hero", filters: ["isekai", "responsible", "medium_complex", "light_romance", "fantasy"], image: "piltid/shield_hero.jpg"  },


    { title: "March Comes in Like a Lion", filters: ["seinen", "caring", "medium_complex", "romance", "realistic"], image: "piltid/march_lion.jpg"  },
    { title: "Paradise Kiss", filters: ["shoujo","mysterious", "romance","medium_complex", "bright_animation", "retro"], image: "piltid/paradise_kiss.jpg"  },
    { title: "House of Five Leaves", filters: ["seinen", "cold", "simple", "no_romance", "minimal"], image: "piltid/house_leaves.jpg"  },
    { title: "Silver Spoon", filters: ["slice_of_life", "clumsy_cute", "simple", "light_romance", "realistic"], image: "piltid/silver_spoon.jpg"  },
    { title: "Honey and Clover", filters: ["slice_of_life", "cheerful", "medium_complex","romance", "realistic"], image: "piltid/honey_clover.jpg"  },
    { title: "Bartender", filters: ["slice_of_life", "responsible","simple", "no_romance", "minimal"], image: "piltid/bartender.jpg"  }
];

// Функция для отображения текущего вопроса
function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    // Очистка предыдущего содержимого
    questionElement.innerText = questions[currentQuestionIndex].question;
    answersElement.innerHTML = "";

    // Отображение вариантов ответов
    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer");
        button.addEventListener("click", () => handleAnswer(answer.filter));
        answersElement.appendChild(button);
    });
}

// Функция для обработки ответа
function handleAnswer(filter) {
    userFilters.push(...filter);  // Добавляем выбранные фильтры в массив
    currentQuestionIndex++;

    // Переход к следующему вопросу или показ результатов
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Функция для показа рекомендаций на основе ответов
function showResults() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    questionElement.innerText = "Teie soovitused:";
    answersElement.innerHTML = "";
    answersElement.className = "answ"
    answersElement.id = ""

    // Фильтрация аниме-рекомендаций по выбранным фильтрам пользователя
    const filteredAnime = animeRecommendations.filter(anime =>
        anime.filters.every(filter => userFilters.includes(filter))
    );

    // Если есть точное совпадение, показываем его, иначе ищем наиболее близкие совпадения
    const results = filteredAnime.length > 0 ? filteredAnime : getClosestMatches();

    results.forEach(anime => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("recommendation-card", "fade-in");

        const animeImage = document.createElement("img");
        animeImage.src = anime.image;
        animeImage.alt = anime.title;
        animeImage.classList.add("anime-image", "img_anime_test");
        
        const animeTitle = document.createElement("h3");
        animeTitle.innerText = anime.title;
        
        const animeInfo = document.createElement("p");
        animeInfo.innerText = `Anime:  ${anime.filters.join(", ")}`;
        
        resultElement.appendChild(animeImage);
        resultElement.appendChild(animeTitle);
        resultElement.appendChild(animeInfo);

        answersElement.appendChild(resultElement);
    });

}

// Функция для получения максимально близких совпадений, если точного совпадения нет
function getClosestMatches() {
    // Оценка сходства по количеству совпавших фильтров
    const similarityScores = animeRecommendations.map(anime => ({
        title: anime.title,
        matches: anime.filters.filter(filter => userFilters.includes(filter)).length
    }));

    // Сортировка по количеству совпадений и выбор первых 3 результатов
    similarityScores.sort((a, b) => b.matches - a.matches);
    const topMatches = similarityScores.slice(0, 3).map(score => 
        animeRecommendations.find(anime => anime.title === score.title)
    );

    return topMatches;
}

// Запуск теста
showQuestion();
