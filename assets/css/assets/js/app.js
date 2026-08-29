const $ = selector =>
    document.querySelector(selector);


/* =========================
   ELEMENTS
========================= */

const screens =
    document.querySelectorAll(".screen");

const startScreen =
    $("#startScreen");

const puzzleScreen =
    $("#puzzleScreen");

const nameScreen =
    $("#nameScreen");

const questionScreen =
    $("#questionScreen");

const resultScreen =
    $("#resultScreen");

const startArea =
    $("#startArea");

const startButton =
    $("#startButton");

const escapeMessage =
    $("#escapeMessage");

const puzzleBoard =
    $("#puzzleBoard");

const puzzleMessage =
    $("#puzzleMessage");

const nameInput =
    $("#nameInput");

const nameButton =
    $("#nameButton");

const nameError =
    $("#nameError");

const questionCounter =
    $("#questionCounter");

const questionSide =
    $("#questionSide");

const progressFill =
    $("#progressFill");

const questionTitle =
    $("#questionTitle");

const questionText =
    $("#questionText");

const answersBox =
    $("#answers");

const nextButton =
    $("#nextButton");

const finalTitle =
    $("#finalTitle");

const finalText =
    $("#finalText");

const chillBar =
    $("#chillBar");

const energyBar =
    $("#energyBar");

const chaosBar =
    $("#chaosBar");

const chillValue =
    $("#chillValue");

const energyValue =
    $("#energyValue");

const chaosValue =
    $("#chaosValue");

const songTitle =
    $("#songTitle");

const songArtist =
    $("#songArtist");

const spotifyPlayer =
    $("#spotifyPlayer");

const spotifyStatus =
    $("#spotifyStatus");

const restartButton =
    $("#restartButton");


/* =========================
   STATE
========================= */

let escapeCount = 0;

let startUnlocked = false;

let selectedPuzzlePiece = null;

let userName = "";

let questionIndex = 0;

let selectedAnswer = null;

let userAnswers = [];


/* =========================
   SCREEN
========================= */

function showScreen(screen) {

    screens.forEach(item => {

        item.classList.remove("active");

    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   START BUTTON
========================= */

const teasingMessages = [

    "wkwk mau ke mana 😭",

    "eh jangan dikejar dong",

    "skill issue detected 👀",

    "hampir... tapi nggak 😭",

    "kok serius banget ngejarnya",

    "pelan-pelan bestie 😭",

    "lah kok masih nyoba",

    "sabar dulu dong 😭",

    "kok masih dikejar 😭",

    "ya ampun gigih banget..."

];


function moveStartButton() {

    if (startUnlocked) {
        return;
    }


    const areaWidth =
        startArea.clientWidth;

    const areaHeight =
        startArea.clientHeight;

    const buttonWidth =
        startButton.offsetWidth;

    const buttonHeight =
        startButton.offsetHeight;


    const padding = 10;


    const minX =
        buttonWidth / 2 + padding;

    const maxX =
        areaWidth -
        buttonWidth / 2 -
        padding;

    const minY =
        buttonHeight / 2 + padding;

    const maxY =
        areaHeight -
        buttonHeight / 2 -
        padding;


    const x =
        minX +
        Math.random() *
        Math.max(1, maxX - minX);

    const y =
        minY +
        Math.random() *
        Math.max(1, maxY - minY);


    const rotate =
        Math.random() * 12 - 6;


    startButton.style.left =
        `${x}px`;

    startButton.style.top =
        `${y}px`;

    startButton.style.transform =
        `translate(-50%, -50%) rotate(${rotate}deg)`;


    escapeMessage.textContent =
        teasingMessages[
            escapeCount %
            teasingMessages.length
        ];


    escapeCount++;


    if (escapeCount >= 6) {

        setTimeout(() => {

            unlockStartButton();

        }, 400);

    }

}


function unlockStartButton() {

    if (startUnlocked) {
        return;
    }


    startUnlocked = true;


    startButton.style.left =
        "50%";

    startButton.style.top =
        "50%";

    startButton.style.transform =
        "translate(-50%, -50%)";


    startButton.textContent =
        "yaudah deh, mulai ✨";


    escapeMessage.textContent =
        "oke kamu menang 😭 sekarang boleh diklik.";

}


startButton.addEventListener(
    "mouseenter",
    () => {

        if (!startUnlocked) {
            moveStartButton();
        }

    }
);


startButton.addEventListener(
    "touchstart",
    event => {

        if (!startUnlocked) {

            event.preventDefault();

            moveStartButton();

        }

    },
    {
        passive: false
    }
);


startButton.addEventListener(
    "click",
    () => {

        if (!startUnlocked) {

            moveStartButton();

            return;

        }

        startPuzzle();

        showScreen(puzzleScreen);

    }
);


/* =========================
   PUZZLE
========================= */

const correctWord =
    "CANTIK";


function shuffle(array) {

    const copy =
        [...array];


    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            copy[i],
            copy[randomIndex]
        ] =
        [
            copy[randomIndex],
            copy[i]
        ];

    }


    return copy;

}


function startPuzzle() {

    puzzleBoard.innerHTML =
        "";

    selectedPuzzlePiece =
        null;


    let letters =
        shuffle(
            correctWord.split("")
        );


    while (
        letters.join("") ===
        correctWord
    ) {

        letters =
            shuffle(
                correctWord.split("")
            );

    }


    letters.forEach(letter => {

        const button =
            document.createElement("button");


        button.type =
            "button";

        button.className =
            "puzzle-piece";

        button.textContent =
            letter;


        button.addEventListener(
            "click",
            () => selectPuzzlePiece(button)
        );


        puzzleBoard.appendChild(button);

    });


    puzzleMessage.textContent =
        "susun pelan-pelan aja bestie 👀";

}


function selectPuzzlePiece(piece) {

    if (!selectedPuzzlePiece) {

        selectedPuzzlePiece =
            piece;

        piece.classList.add(
            "selected"
        );

        return;

    }


    if (
        selectedPuzzlePiece ===
        piece
    ) {

        piece.classList.remove(
            "selected"
        );

        selectedPuzzlePiece =
            null;

        return;

    }


    const firstLetter =
        selectedPuzzlePiece.textContent;

    const secondLetter =
        piece.textContent;


    selectedPuzzlePiece.textContent =
        secondLetter;

    piece.textContent =
        firstLetter;


    selectedPuzzlePiece.classList.remove(
        "selected"
    );

    selectedPuzzlePiece =
        null;


    checkPuzzle();

}


function checkPuzzle() {

    const pieces =
        [
            ...document.querySelectorAll(
                ".puzzle-piece"
            )
        ];


    const currentWord =
        pieces
            .map(
                piece => piece.textContent
            )
            .join("");


    if (
        currentWord !==
        correctWord
    ) {
        return;
    }


    puzzleMessage.textContent =
        "NAH KAN 😭✨ developer approved.";

    pieces.forEach(piece => {

        piece.disabled =
            true;

    });


    setTimeout(() => {

        showScreen(nameScreen);

        nameInput.focus();

    }, 1000);

}


/* =========================
   NAME
========================= */

function saveName() {

    const name =
        nameInput.value.trim();


    if (!name) {

        nameError.textContent =
            "namanya jangan dikosongin dong 😭";

        return;

    }


    nameError.textContent =
        "";

    userName =
        name;

    questionIndex =
        0;

    userAnswers =
        [];

    selectedAnswer =
        null;


    renderQuestion();

    showScreen(questionScreen);

}


nameButton.addEventListener(
    "click",
    saveName
);


nameInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            saveName();

        }

    }
);


/* =========================
   QUESTIONS
========================= */

const questions = [

    {
        title:
            "hari ini mood kamu gimana?",

        text:
            "jujur aja. kita nggak bakal ngejudge kok 😭",

        side:
            "pelan-pelan",

        answers: [

            {
                text:
                    "😵 kepala rame banget",
                value:
                    "heavy"
            },

            {
                text:
                    "😌 biasa aja, santai",
                value:
                    "calm"
            },

            {
                text:
                    "😆 seru banget hari ini",
                value:
                    "happy"
            },

            {
                text:
                    "🤡 chaos tapi masih hidup",
                value:
                    "chaos"
            }

        ]

    },


    {
        title:
            "sekarang kamu paling pengen apa?",

        text:
            "jawab berdasarkan isi hati, bukan ekspektasi orang 😭",

        side:
            "no pressure",

        answers: [

            {
                text:
                    "🛏️ rebahan dan ilang sebentar",
                value:
                    "rest"
            },

            {
                text:
                    "🌳 keluar, jalan-jalan, cari udara",
                value:
                    "explore"
            },

            {
                text:
                    "🔥 produktif dan ngerjain sesuatu",
                value:
                    "focus"
            },

            {
                text:
                    "🎉 have fun dulu lah",
                value:
                    "fun"
            }

        ]

    },


    {
        title:
            "musiknya mau yang mana?",

        text:
            "yang paling cocok sama telinga dan kondisi kamu sekarang 👀",

        side:
            "last one!",

        answers: [

            {
                text:
                    "🌙 slow dan adem",
                value:
                    "slow"
            },

            {
                text:
                    "🌿 chill tapi nggak ngantuk",
                value:
                    "chill"
            },

            {
                text:
                    "⚡ yang bikin semangat",
                value:
                    "energy"
            },

            {
                text:
                    "🎸 bebas, yang penting enak",
                value:
                    "random"
            }

        ]

    }

];


function renderQuestion() {

    const question =
        questions[questionIndex];


    questionCounter.textContent =
        `QUESTION ${questionIndex + 1}/3`;

    questionSide.textContent =
        question.side;

    progressFill.style.width =
        `${((questionIndex + 1) / questions.length) * 100}%`;


    questionTitle.textContent =
        question.title;

    questionText.textContent =
        question.text;


    answersBox.innerHTML =
        "";

    selectedAnswer =
        null;

    nextButton.disabled =
        true;


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.type =
            "button";

        button.className =
            "answer-button";

        button.textContent =
            answer.text;


        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".answer-button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                selectedAnswer =
                    answer.value;


                nextButton.disabled =
                    false;

            }
        );


        answersBox.appendChild(button);

    });


    nextButton.textContent =
        questionIndex ===
        questions.length - 1
            ? "lihat hasil ✨"
            : "lanjut →";

}


nextButton.addEventListener(
    "click",
    () => {

        if (!selectedAnswer) {
            return;
        }


        userAnswers.push(
            selectedAnswer
        );


        questionIndex++;


        if (
            questionIndex <
            questions.length
        ) {

            renderQuestion();

            return;

        }


        generateResult();

    }
);


/* =========================
   RESULT LOGIC
========================= */

function calculateVibe() {

    const [
        mood,
        activity,
        music
    ] =
        userAnswers;


    let chill = 50;
    let energy = 50;
    let chaos = 50;


    if (mood === "heavy") {

        chill += 25;
        energy -= 15;
        chaos += 20;

    }


    if (mood === "calm") {

        chill += 30;
        chaos -= 15;

    }


    if (mood === "happy") {

        energy += 25;
        chill += 10;

    }


    if (mood === "chaos") {

        chaos += 35;
        energy += 15;

    }


    if (activity === "rest") {

        chill += 25;
        energy -= 15;

    }


    if (activity === "explore") {

        energy += 20;
        chill += 5;

    }


    if (activity === "focus") {

        energy += 15;
        chaos -= 10;

    }


    if (activity === "fun") {

        energy += 25;
        chaos += 15;

    }


    if (music === "slow") {

        chill += 20;
        energy -= 10;

    }


    if (music === "chill") {

        chill += 20;

    }


    if (music === "energy") {

        energy += 25;

    }


    if (music === "random") {

        chaos += 10;

    }


    chill =
        Math.max(
            15,
            Math.min(100, chill)
        );

    energy =
        Math.max(
            15,
            Math.min(100, energy)
        );

    chaos =
        Math.max(
            10,
            Math.min(100, chaos)
        );


    return {
        chill,
        energy,
        chaos
    };

}


function getResultText() {

    const mood =
        userAnswers[0];

    const activity =
        userAnswers[1];


    if (
        mood === "heavy"
    ) {

        return {
            title:
                `${userName}, hari ini nggak usah kuat-kuat amat 🌙`,

            text:
                "kayaknya kepala kamu lagi lumayan penuh. gapapa banget kalau hari ini kamu jalan pelan. nggak semua hal harus selesai sekarang, serius."
        };

    }


    if (
        activity === "fun"
    ) {

        return {
            title:
                `${userName}, kamu lagi mode gaskeun 😭✨`,

            text:
                "energinya lumayan nyala nih. manfaatin buat seru-seruan, ketawa, atau ngelakuin hal random yang nanti mungkin bakal kamu ceritain."
        };

    }


    if (
        mood === "chaos"
    ) {

        return {
            title:
                `${userName}, chaos tapi aesthetic 🤡✨`,

            text:
                "hidup lagi agak random ya. tapi somehow kamu masih jalan terus. respect sih. sekarang tinggal cari soundtrack biar chaos-nya punya background music."
        };

    }


    if (
        mood === "happy"
    ) {

        return {
            title:
                `${userName}, hari ini auranya enak banget ☀️`,

            text:
                "lagi ada energi bagus nih. jangan dipikirin terlalu ribet, nikmatin aja. siapa tau hari ini jadi salah satu hari yang unexpectedly seru."
        };

    }


    return {
        title:
            `${userName}, slow aja hari ini 🌿`,

        text:
            "nggak semua hari harus rame dan produktif. kadang hidup cuma butuh jalan pelan, minum sesuatu yang enak, terus denger lagu yang pas."
    };

}


/* =========================
   GENERATE RESULT
========================= */

async function generateResult() {

    showScreen(resultScreen);


    const result =
        getResultText();

    const vibe =
        calculateVibe();


    finalTitle.textContent =
        result.title;

    finalText.textContent =
        result.text;


    chillBar.style.width =
        "0%";

    energyBar.style.width =
        "0%";

    chaosBar.style.width =
        "0%";


    chillValue.textContent =
        `${vibe.chill}%`;

    energyValue.textContent =
        `${vibe.energy}%`;

    chaosValue.textContent =
        `${vibe.chaos}%`;


    setTimeout(() => {

        chillBar.style.width =
            `${vibe.chill}%`;

        energyBar.style.width =
            `${vibe.energy}%`;

        chaosBar.style.width =
            `${vibe.chaos}%`;

    }, 150);


    await getSong();

}


/* =========================
   SPOTIFY
========================= */

function getSearchQuery() {

    const [
        mood,
        activity,
        music
    ] =
        userAnswers;


    if (
        mood === "heavy"
    ) {

        return "calm relaxing peaceful music";

    }


    if (
        music === "slow"
    ) {

        return "slow relaxing indie";

    }


    if (
        music === "chill"
    ) {

        return "chill indie relaxing";

    }


    if (
        music === "energy"
    ) {

        return "upbeat energetic feel good";

    }


    if (
        mood === "happy" ||
        activity === "fun"
    ) {

        return "happy feel good pop";

    }


    if (
        mood === "chaos"
    ) {

        return "alternative indie energetic";

    }


    return "chill relaxing music";

}


async function getSong() {

    spotifyStatus.textContent =
        "lagi nyari soundtrack yang cocok... 🎧";

    songTitle.textContent =
        "mencari lagu...";

    songArtist.textContent =
        "Spotify lagi dipanggil 😭";

    spotifyPlayer.innerHTML =
        "";


    const query =
        getSearchQuery();


    try {

        const response =
            await fetch(
                `/api/spotify?q=${encodeURIComponent(query)}`
            );


        if (!response.ok) {

            throw new Error(
                "Spotify API gagal"
            );

        }


        const data =
            await response.json();


        if (!data.id) {

            throw new Error(
                "Lagu tidak ditemukan"
            );

        }


        showSong(data);

        spotifyStatus.textContent =
            "ini soundtrack yang kepilih buat kamu ✨";

    }

    catch (error) {

        console.warn(
            "Spotify gagal, pakai fallback:",
            error
        );


        await useFallbackSong();

    }

}


function showSong(song) {

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;


    spotifyPlayer.innerHTML =
        `
        <iframe
            src="https://open.spotify.com/embed/track/${song.id}?utm_source=generator"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
        ></iframe>
        `;

}


/* =========================
   FALLBACK JSON
========================= */

async function useFallbackSong() {

    try {

        const response =
            await fetch(
                "assets/data/songs.json"
            );


        if (!response.ok) {

            throw new Error(
                "Fallback gagal"
            );

        }


        const songs =
            await response.json();


        const randomSong =
            songs[
                Math.floor(
                    Math.random() *
                    songs.length
                )
            ];


        showSong({
            title:
                randomSong.title,

            artist:
                randomSong.artist,

            id:
                randomSong.spotifyId
        });


        spotifyStatus.textContent =
            "Spotify lagi sibuk, jadi ini playlist cadangan yang tetap enak 😭";

    }

    catch (error) {

        songTitle.textContent =
            "yah lagunya nyasar 😭";

        songArtist.textContent =
            "coba refresh sekali lagi";

        spotifyStatus.textContent =
            "nggak bisa ambil rekomendasi sekarang.";

    }

}


/* =========================
   RESTART
========================= */

restartButton.addEventListener(
    "click",
    () => {

        escapeCount = 0;

        startUnlocked = false;

        selectedPuzzlePiece = null;

        userName = "";

        questionIndex = 0;

        selectedAnswer = null;

        userAnswers = [];


        nameInput.value = "";

        nameError.textContent = "";


        startButton.textContent =
            "mulai ✨";

        startButton.style.left =
            "50%";

        startButton.style.top =
            "50%";

        startButton.style.transform =
            "translate(-50%, -50%)";


        escapeMessage.textContent =
            "coba pencet mulai kalau bisa 👀";


        spotifyPlayer.innerHTML =
            "";


        showScreen(startScreen);

    }
);
