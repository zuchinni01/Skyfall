const mainCard = document.getElementById('main-card');
const successPage = document.getElementById('success-page');
const mainImg = document.getElementById('display-img');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Audio elements
const music = document.getElementById('bgMusic');
const dodgeSound = document.getElementById('dodgeSound');
const successSound = document.getElementById('successSound');

// State
let noClicks = 0;
let yesScale = 1;

// Image list (Make sure these exist in your folder!)
const noMemes = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic1.jpg", "pic2.jpg"];

// Text progression
const noTexts = [
    "No", "Are you sure? 🥺", "Really?? 💔", "Think again!", 
    "Last chance!", "I'll be very sad...", "You're mean! 😂", 
    "Okay, catch me now! 🏃‍♂️"
];

// 1. Floating Hearts Background
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['❤️', '💜', '✨', '🌸'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heartContainer = document.getElementById('bg-hearts');
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 500);

// 2. Start music on first interaction
document.addEventListener('click', () => {
    music.play().catch(() => {});
}, { once: true });

// 3. Move No Button Logic
function moveNoButton() {
    const padding = 40;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    // Play dodge sound
    dodgeSound.currentTime = 0;
    dodgeSound.play();
}

// 4. Yes Button Action
yesBtn.addEventListener('click', () => {
    successSound.play();
    mainCard.classList.add('hidden');
    successPage.classList.remove('hidden');
});

// 5. No Button Action
noBtn.addEventListener('click', () => {
    noClicks++;

    // Grow Yes Button
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Change Meme
    mainImg.src = noMemes[noClicks % noMemes.length];

    // Change Text
    if (noClicks < noTexts.length) {
        noBtn.innerText = noTexts[noClicks];
    }

    // Activate dodging on final stages
    if (noClicks >= noTexts.length - 1) {
        moveNoButton();
    }
});

// 6. Mouseover Dodge
noBtn.addEventListener('mouseover', () => {
    if (noClicks >= noTexts.length - 1) {
        moveNoButton();
    }
});

// 7. Mobile Touch Dodge
noBtn.addEventListener('touchstart', (e) => {
    if (noClicks >= noTexts.length - 1) {
        e.preventDefault();
        moveNoButton();
    }
});

// Replace the moveNoButton function and the noBtn listeners with this:

function moveNoButton() {
    const padding = 50; // Safety margin
    
    // Get the button size
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe random coordinates within the screen
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Apply styles to make it "float" over the screen
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '1000'; // Make sure it's on top
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Play the dodge sound
    if (dodgeSound) {
        dodgeSound.currentTime = 0;
        dodgeSound.play().catch(() => {});
    }
}

noBtn.addEventListener('click', () => {
    noClicks++;
    
    // Grow Yes Button
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Change Meme
    mainImg.src = noMemes[noClicks % noMemes.length];

    // Change Text
    if (noClicks < noTexts.length) {
        noBtn.innerText = noTexts[noClicks];
    }

    // Check if it's time to dodge
    if (noClicks >= noTexts.length - 1) {
        noBtn.innerText = "Catch me! 🏃‍♂️";
        moveNoButton(); // This will move it the first time so it doesn't "vanish"
    }
});

// Avoid the cursor
noBtn.addEventListener('mouseenter', () => {
    if (noClicks >= noTexts.length - 1) {
        moveNoButton();
    }
});