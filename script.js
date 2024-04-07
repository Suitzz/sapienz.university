document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('popup-container').style.display = 'flex';
    setTimeout(() => {
      document.getElementById('popup-container').classList.add('show');
    }, 50);
  
    document.getElementById('close-popup').onclick = function() {
      document.getElementById('popup-container').style.display = 'none';
    };

    const imageSources = {
        EN: {
            "patreonCard": "/assets/img/Sapienz 1st Page Patreon Card.png",
            "onlyFansCard": "/assets/img/Sapienz 1st Page Only Card.png",
            "patreonButton": "/assets/img/Button Patreon Sapienz EN.png",
            "onlyFansButton": "/assets/img/Button Onlyfans Sapienz EN.png"
        },
        ES: {
            "patreonCard": "/assets/img/Sapienz 1st Page Patreon Card ES.png",
            "onlyFansCard": "/assets/img/Sapienz 1st Page Only Card ES.png",
            "patreonButton": "/assets/img/Button Patreon Sapienz ES.png",
            "onlyFansButton": "/assets/img/Button Onlyfans Sapienz ES.png"
        },
        PT: {
            "patreonCard": "/assets/img/Sapienz 1st Page Patreon Card PT.png",
            "onlyFansCard": "/assets/img/Sapienz 1st Page Only Card PT.png",
            "patreonButton": "/assets/img/Button Patreon Sapienz PT.png",
            "onlyFansButton": "/assets/img/Button Onlyfans Sapienz PT.png"
        }
    };

    window.changeLanguage = function(lang) {
        // Update card images
        document.getElementById('patreonCard').src = imageSources[lang]['patreonCard'];
        document.getElementById('onlyFansCard').src = imageSources[lang]['onlyFansCard'];
        
        // Update button images
        document.getElementById('patreonButton').src = imageSources[lang]['patreonButton'];
        document.getElementById('onlyFansButton').src = imageSources[lang]['onlyFansButton'];
    
        console.log("Language changed to: " + lang);
        document.getElementById('popup-container').style.display = 'none';
    };
    
});

document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.card-container');

    cardContainers.forEach(container => {
        container.addEventListener('click', function() {
            const url = container.dataset.href;
            if (url) {
                window.location.href = url;
            }
            container.classList.add('click-animation');
            setTimeout(() => container.classList.remove('click-animation'), 300); // Animation duration
        });
        container.style.cursor = 'pointer';
    });

    cardContainers.forEach((container, index) => {
        const glowEffect = document.createElement('div');
        glowEffect.classList.add('glow-effect', index === 0 ? 'blue-glow' : 'purple-glow');
        glowEffect.style.position = 'absolute';
        glowEffect.style.width = '550px';
        glowEffect.style.height = '550px';
        glowEffect.style.borderRadius = '50%';
        glowEffect.style.transform = 'translate(-50%, -50%)';
        glowEffect.style.opacity = '0'; // Start invisible
        container.appendChild(glowEffect);
    });

    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 1024) {
            cardContainers.forEach(container => {
                const glowEffect = container.querySelector('.glow-effect');
                const rect = container.getBoundingClientRect();
                const mousePosX = e.clientX;
                const mousePosY = e.clientY;

                const overCard = mousePosX >= rect.left && mousePosX <= rect.right && mousePosY >= rect.top && mousePosY <= rect.bottom;

                // Adjust these values to change the glow's opacity when over the card and the fade effect
                const maxOpacityOverCard = 0.2; // Max opacity when cursor is directly over the card
                const maxOpacityNearCard = 0.2; // Max opacity when cursor is near the card but not directly over it
                const fadeDistance = 150; // Distance from the card where the glow effect starts to fade

                if (overCard) {
                    glowEffect.style.opacity = maxOpacityOverCard.toString();
                } else {
                    const distance = Math.min(
                        Math.abs(rect.left - mousePosX),
                        Math.abs(rect.right - mousePosX),
                        Math.abs(rect.top - mousePosY),
                        Math.abs(rect.bottom - mousePosY)
                    );

                    let opacity = distance <= fadeDistance ? Math.max(0, 1 - (distance / fadeDistance)) * maxOpacityNearCard : 0;
                    glowEffect.style.opacity = opacity.toString();
                }

                glowEffect.style.left = `${mousePosX - rect.left}px`;
                glowEffect.style.top = `${mousePosY - rect.top}px`;
            });
        }
    });
});
