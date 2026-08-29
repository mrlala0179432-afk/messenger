const cursor = document.getElementById('virtual-cursor');
const toggle = document.getElementById('cursorToggle');
const statusText = document.getElementById('status');

// স্ক্রিনের স্পর্শ বা মাউসের সাথে সার্কেল মুভমেন্ট
function moveCursor(e) {
    let x = e.clientX || (e.touches && e.touches[0].clientX);
    let y = e.clientY || (e.touches && e.touches[0].clientY);

    if (x !== undefined && y !== undefined) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    }
}

// পয়েন্টার অন/অফ সুইচ লজিক
toggle.addEventListener('change', function() {
    if (this.checked) {
        cursor.classList.remove('hidden');
        statusText.innerText = "ON";
        statusText.style.color = "#00f3ff";
        
        // মাউস ও টাচ ইভেন্ট লিসেনার চালু
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('touchmove', moveCursor);
    } else {
        cursor.classList.add('hidden');
        statusText.innerText = "OFF";
        statusText.style.color = "#ff0055";
        
        // ইভেন্ট লিসেনার বন্ধ
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('touchmove', moveCursor);
    }
});

// ভিডিও বা বাটনের ওপর আনলে সার্কেল একটু বড় হওয়ার ইফেক্ট
document.querySelectorAll('button, a, input').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (toggle.checked) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    element.addEventListener('mouseleave', () => {
        if (toggle.checked) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});
