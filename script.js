/* =========================
   PAGE NAVIGATION
========================= */

function nextPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "game") {
        startGame();
    }
}


/* =========================
   MINI GAME
========================= */

let score = 0;
let gameStarted = false;

const heart = document.getElementById("game-heart");
const gameArea = document.getElementById("game-area");

function startGame() {

    if (gameStarted) return;

    gameStarted = true;
    score = 0;

    moveHeart();
}

function moveHeart() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const heartSize = 50;

    const randomX =
        Math.random() * (areaWidth - heartSize);

    const randomY =
        Math.random() * (areaHeight - heartSize);

    heart.style.left = randomX + "px";
    heart.style.top = randomY + "px";
}

heart.addEventListener("click", function () {

    score++;

    document.getElementById("score").textContent =
        score + " / 10";

    if (score >= 10) {

        gameStarted = false;

        document.getElementById("game-message").textContent =
            "Hehe, akhirnya ketangkep semua 💗";

        setTimeout(() => {
            nextPage("complete");
        }, 1000);

    } else {

        moveHeart();

        const messages = [
            "Hehe ketangkep 🤭",
            "Satu senyum buat Aru 💗",
            "Jangan serius-serius 😭",
            "Ayo satu lagi!",
            "Pinpin jago juga 😭",
            "Hampir selesai 🌻"
        ];

        const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];

        document.getElementById("game-message").textContent =
            randomMessage;
    }
});


/* =========================
   WALLPAPER
========================= */

function openWallpaper() {
    nextPage("wallpaper");
}

function downloadWallpaper(imagePath) {

    fetch(imagePath)
        .then(response => {

            if (!response.ok) {
                throw new Error("Gambar tidak ditemukan");
            }

            return response.blob();
        })

        .then(blob => {

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = imagePath;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        })

        .catch(error => {

            console.error(error);

            alert("Wallpaper gagal didownload 🤍");
        });
}


/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

    const container =
        document.querySelector(".hearts");

    const heart =
        document.createElement("span");

    heart.classList.add("floating-heart");

    heart.textContent =
        Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    heart.style.fontSize =
        (14 + Math.random() * 20) + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createHeart, 700);