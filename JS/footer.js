document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer');
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
            const yearElement = document.getElementById('footer-year');
            const currentYear = new Date().getFullYear();
            yearElement.textContent = currentYear;
        })
        .catch(error => console.error('Error loading footer:', error));
});
