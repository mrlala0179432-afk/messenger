const cursor = document.getElementById('virtual-cursor');
const toggle = document.getElementById('cursorToggle');
const statusText = document.getElementById('status');

// কার্সারের শুরুর পজিশন (স্ক্রিনের মাঝামাঝি)
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

let startTouchX = 0;
let startTouchY = 0;
let isDragging = false;

// কার্সার পজিশন সেট করা
function updateCursor() {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
}

// টাচ স্টার্ট (স্পর্শ করার সময়)
function handleTouchStart(e) {
    if (!toggle.checked) return;
    isDragging = true;
    startTouchX = e.touches[0].clientX;
    startTouchY = e.touches[0].clientY;
}

// টাচ মুভ (আঙুল দিয়ে ঘষলে ট্র্যাকপ্যাডের মতো নড়বে)
function handleTouchMove(e) {
    if (!toggle.checked || !isDragging) return;

    let deltaX = e.touches[0].clientX - startTouchX;
    let deltaY = e.touches[0].clientY - startTouchY;

    cursorX += deltaX;
    cursorY += deltaY;

    // স্ক্রিনের বাইরে যাওয়া আটকানো
    cursorX = Math.max(10, Math.min(window.innerWidth - 10, cursorX));
    cursorY = Math.max(10, Math.min(window.innerHeight - 10, cursorY));

    updateCursor();

    startTouchX = e.touches[0].clientX;
    startTouchY = e.touches[0].clientY;
}

// টাচ এন্ড (আঙুল তুললে ও ক্লিক সিমুলেট করা)
function handleTouchEnd(e) {
    if (!toggle.checked) return;
    isDragging = false;

    // কার্সারটি বর্তমানে যে এলিমেন্টের ওপর আছে তাতে ক্লিক করা
    let elementAtCursor = document.elementFromPoint(cursorX, cursorY);
    if (elementAtCursor) {
        // ভিজ্যুয়াল ফিডব্যাক (ছোট ক্লিক ইফেক্ট)
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 150);

        elementAtCursor.click();
    }
}

// সুইচ অন/অফ লজিক
toggle.addEventListener('change', function() {
    if (this.checked) {
        cursor.classList.remove('hidden');
        statusText.innerText = "ON";
        statusText.style.color = "#00f3ff";
        
        cursorX = window.innerWidth / 2;
        cursorY = window.innerHeight / 2;
        updateCursor();

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    } else {
        cursor.classList.add('hidden');
        statusText.innerText = "OFF";
        statusText.style.color = "#ff0055";

        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
    }
});
