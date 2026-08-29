const cursor = document.getElementById('virtual-cursor');
const toggle = document.getElementById('cursorToggle');
const statusText = document.getElementById('status');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

let startTouchX = 0;
let startTouchY = 0;
let isMoved = false;

function updateCursor() {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
}

window.addEventListener('touchstart', (e) => {
    if (!toggle.checked) return;
    startTouchX = e.touches[0].clientX;
    startTouchY = e.touches[0].clientY;
    isMoved = false; // আঙুল মোশন চেক করার জন্য reset
});

window.addEventListener('touchmove', (e) => {
    if (!toggle.checked) return;

    let deltaX = e.touches[0].clientX - startTouchX;
    let deltaY = e.touches[0].clientY - startTouchY;

    // আঙুল একটু বেশি সরলে মাউস নড়বে
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        isMoved = true;
        
        cursorX += deltaX * 1.3;
        cursorY += deltaY * 1.3;

        cursorX = Math.max(0, Math.min(window.innerWidth - 10, cursorX));
        cursorY = Math.max(0, Math.min(window.innerHeight - 10, cursorY));

        updateCursor();

        startTouchX = e.touches[0].clientX;
        startTouchY = e.touches[0].clientY;
    }
});

window.addEventListener('touchend', (e) => {
    if (!toggle.checked) return;

    // আঙুল না সরিয়ে শুধুমাত্র স্ক্রিনে ট্যাপ (Tap) করলেই ক্লিক/টাইপ হবে
    if (!isMoved) {
        let elementAtCursor = document.elementFromPoint(cursorX, cursorY);
        
        if (elementAtCursor) {
            // ক্লিক ইফেক্ট
            cursor.style.transform = 'scale(0.8)';
            setTimeout(() => cursor.style.transform = 'scale(1)', 100);

            // ইনপুট বক্স হলে সাথে সাথে কিবোর্ড ফোকাস করবে
            elementAtCursor.click();
            if (typeof elementAtCursor.focus === "function") {
                elementAtCursor.focus();
            }
        }
    }
});

// অন/অফ সুইচ
toggle.addEventListener('change', function() {
    if (this.checked) {
        cursor.classList.remove('hidden');
        statusText.innerText = "ON";
        statusText.style.color = "#00f3ff";
        updateCursor();
    } else {
        cursor.classList.add('hidden');
        statusText.innerText = "OFF";
        statusText.style.color = "#ff0055";
    }
});
