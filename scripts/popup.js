function togglePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
    if (popup.style.display === 'flex') renderAllKeywords();
}

document.getElementById('popup').addEventListener('click', function (e) {
    if (e.target === this) togglePopup();
});
