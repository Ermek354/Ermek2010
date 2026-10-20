// --- ТИЛДИ ӨЗГӨРТҮҮ СЛОВАРЫ ---
const translations = {
    ru: {
        btnAbout: "О себе",
        btnSkills: "Мои знания",
        btnContacts: "Контакты",
        siteTitle: "Мой сайт",
        aboutTitle: "О себе",
        aboutText: "Меня зовут Эрмек. Я родился в 2010 году. Больше всего меня интересует сфера информационных технологий (IT). Мне также нравится заниматься дизайном, изучать новые технологии, создавать что-то новое и постоянно развиваться. Особенно люблю изучать языки программирования и работать над собственными проектами. Также я хочу выучить английский язык, так как он очень важен для программистов и открывает больше возможностей для развития и работы.\nВ свободное время я увлекаюсь спортом, особенно футболом и боксом. Моя цель — стать Junior Frontend-разработчиком, а в будущем вырасти до уровня Middle Developer. Также я хочу поступить в Университет Манас и набрать более 200 баллов на ОРТ. Я уверен, что благодаря упорству, постоянному обучению и практике смогу достичь своих целей.",
        skillsTitle: "Мои знания",
        contactTitle: "Контакты",
        welcomeMsg: "Здравствуйте, Эрмек! Добро пожаловать на сайт!"
    },
    ky: {
        btnAbout: "Өзүм жөнүндө",
        btnSkills: "Менин билимим",
        btnContacts: "Байланыш",
        siteTitle: "Менин сайтым",
        aboutTitle: "Өзүм жөнүндө",
        aboutText: "Менин атым Эрмек. Мен 2010-жылы туулгам. Мени эң ашыкча кызыктырган тармак — маалымат технологиялары (IT). Мага ошондой эле дизайн жасоо, жаңы технологияларды үйрөнүү, жаңы нерселерди жаратуу жана дайыма өнүгүү жагат. Өзгөчө программалоо тилдерин үйрөнүүнү жана жеке долбоорлорумдун үстүнөн иштөөнү жакшы көрөм. Ошондой эле англис тилин үйрөнгүм келет, анткени ал программалоочулар үчүн абдан маанилүү жана өнүгүүгө чоң мүмкүнчүлүктөрдү ачат.\nБош убактымда спорт менен ачык машыгам, өзгөчө футбол жана бокс менен. Менин максатым — Junior Frontend-иштеп чыгуучу болуу, ал эми келечекте Middle Developer деңгээлине чейин өсүү. Ошондой эле Манас Университетине тапшырып, ОРТдан 200дөн жогору балл алууну каалайм. Түптүү аракетимдин аркасында максаттарыма жете алам деп ишенем.",
        skillsTitle: "Менин билимим",
        contactTitle: "Байланышуу",
        welcomeMsg: "Салам Эрмек! Сайтка кош келдиңиз!"
    }
};

let currentLang = "ru";

// Тилди которуу функциясы
function toggleLanguage() {
    currentLang = currentLang === "ru" ? "ky" : "ru";
    
    const langBtn = document.getElementById("langBtn");
    if (langBtn) {
        langBtn.innerText = currentLang === "ru" ? "RU" : "KG";
    }

    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[currentLang][key]) {
            element.innerText = translations[currentLang][key];
        }
    });

    const welcomeEl = document.getElementById("welcomeMessage");
    if (welcomeEl && welcomeEl.innerText !== "") {
        welcomeEl.innerText = translations[currentLang].welcomeMsg;
    }
}

// Теманы которуу жана LocalStorage'ге сактоо
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.innerText = isDark ? "☀️" : "🌙";
    }
}

// Фондогу музыканы өчүрүү / күйгүзүү
let isMusicPlaying = false;
function toggleMusic() {
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    
    if (bgMusic) {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "🔇";
            isMusicPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.innerText = "🔊";
            isMusicPlaying = true;
        }
    }
}

// ==========================================
// ЭРМА AI ҮН ЧЫГАРУУ ЛОГИКАСЫ (TEXT TO SPEECH)
// ==========================================
function ermaSpeak(text, callback) {
    const ermaBox = document.getElementById("ermaAssistant");
    const ermaStatus = document.getElementById("ermaStatus");

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Мурдагы үндөрдү токтотуу

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ru-RU"; // Эрма тунук сүйлөө үчүн ru тилин колдонот
        utterance.pitch = 1.1;    // Футуристикалык үн бийиктиги
        utterance.rate = 1.0;    // Табигый сүйлөө ылдамдыгы

        utterance.onstart = () => {
            if (ermaBox) ermaBox.classList.add("speaking");
            if (ermaStatus) ermaStatus.innerText = "Сүйлөп жатат...";
        };

        utterance.onend = () => {
            if (ermaBox) ermaBox.classList.remove("speaking");
            if (ermaStatus) ermaStatus.innerText = "Активдүү";
            if (callback) callback();
        };

        utterance.onerror = () => {
            if (ermaBox) ermaBox.classList.remove("speaking");
            if (ermaStatus) ermaStatus.innerText = "Ката чыкты";
            if (callback) callback();
        };

        window.speechSynthesis.speak(utterance);
    } else {
        if (callback) callback();
    }
}

// ==========================================
// ЭРМА ҮН МЕНЕН БАШКАРУУ (SPEECH RECOGNITION)
// ==========================================
function startVoiceControl() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Сиздин браузер үн менен башкарууну колдобойт.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU"; // Буйруктарды угуу тили
    recognition.interimResults = false;

    const ermaStatus = document.getElementById("ermaStatus");
    if (ermaStatus) ermaStatus.innerText = "Угуп жатам...";

    recognition.start();

    recognition.onresult = (event) => {
        const K1 = event.results[0][0].transcript.toLowerCase();
        console.log("Угулган буйрук:", K1);

        if (K1.includes("тема") || K1.includes("тему")) {
            toggleTheme();
            ermaSpeak("Тема изменена!");
        } 

        // бул жерге мен ал мени менен суйлошуу буйrukтарын коштум 
        // Мисалы Салам десем ал жооп берет
        else if (K1.includes("салам") || K1.includes("привет")) {
            ermaSpeak("Салам! Как я могу вам помочь?");
        }

        else if (K1.includes("кто ты") || K1.includes("кто вы")) {
            ermaSpeak("Я Эрма, ваш личный помощник и виртуальный помощник на этом сайте.");
        }

        else if (K1.includes("тил") || K1.includes("язык")) {
            toggleLanguage();
            ermaSpeak("Язык изменился!");
        }

        else if (K1.includes("музыка")) {
            toggleMusic();
            ermaSpeak("Музыка настроена!");
        } 
        else if (K1.includes("билим") || K1.includes("навыки") || K1.includes("знания")) {
            window.location.href = "#skills";
            ermaSpeak("Я открыл раздел знаний.");
        } 
        else if (K1.includes("байланыш") || K1.includes("контакт")) {
            window.location.href = "#contacts";
            ermaSpeak("Мы перешли в раздел контактов.");
        } 
        else if (K1.includes("жөнүндө") || K1.includes("о себе")) {
            window.location.href = "#about";
            ermaSpeak("Информация о развлечениях здесь.");
        } 
        else {
            ermaSpeak("Простите , я не понимаю эту команду.");
        }
    };

    recognition.onerror = () => {
        if (ermaStatus) ermaStatus.innerText = "Ката чыкты";
    };

    recognition.onend = () => {
        if (ermaStatus) ermaStatus.innerText = "Активдүү";
    };
}

// ==========================================
// КИРҮҮ ЛОГИКАСЫ ЖАНА БАРАКЧА СҮКТӨЛГӨНДӨ
// ==========================================
function login() {
    const name = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (name.toLowerCase() === "эрмек" && pass === "1234") {
        document.getElementById("loginModal").style.display = "none";
        
        const messageText = translations[currentLang].welcomeMsg;
        const welcomeEl = document.getElementById("welcomeMessage");
        welcomeEl.innerText = messageText;

        const greetingText = currentLang === "ky" 
            ? "Салам Эрмек! Сайтка кош келдиңиз!" 
            : "Здравствуйте Эрмек! Добро пожаловать на сайт!";

        ermaSpeak(greetingText, () => {
            const bgMusic = document.getElementById("bgMusic");
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                }).catch(err => console.log(err));
            }
        });

    } else {
        errorMsg.innerText = "Атыңыз же пароль ката!";
    }
}

// Эсте калган теманы жүктөп алуу жана Эрмага клик окуясын кошуу
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        const themeBtn = document.getElementById("themeBtn");
        if (themeBtn) themeBtn.innerText = "☀️";
    }

    const ermaBox = document.getElementById("ermaAssistant");
    if (ermaBox) {
        ermaBox.style.cursor = "pointer";
        ermaBox.setAttribute("title", "Эрма менен сүйлөшүү үчүн басыңыз");
        ermaBox.addEventListener("click", startVoiceControl);
    }
});