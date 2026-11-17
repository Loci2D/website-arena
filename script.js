// =====================================================
// CARROSSEL GENÉRICO & REUTILIZÁVEL (LOCI ARENA)
// Funciona para Campeões, Participantes e qualquer outra trilha
// =====================================================

function initCarousel({ trackId, prevBtnId, nextBtnId, indicatorsId }) {
    const track = document.getElementById(trackId);
    const prevButton = document.getElementById(prevBtnId);
    const nextButton = document.getElementById(nextBtnId);
    const indicators = document.getElementById(indicatorsId);

    if (!track) return;

    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    let currentIndex = 0;

    // Cria os indicadores (dots)
    if (indicators) {
        indicators.innerHTML = "";
        cards.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            dot.setAttribute("aria-label", `Item ${index + 1}`);

            dot.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });

            indicators.appendChild(dot);
        });
    }

    function updateCarousel() {
        const card = cards[currentIndex];
        if (!card) return;

        track.scrollTo({
            left: card.offsetLeft - track.offsetLeft,
            behavior: "smooth"
        });

        if (indicators) {
            const dots = indicators.querySelectorAll(".carousel-dot");
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });
    }

    // Atualização em rolagem livre / swipe touch
    let scrollTimeout;
    track.addEventListener("scroll", () => {
        window.clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let activeIndex = 0;
            let minDistance = Infinity;
            const trackLeft = track.getBoundingClientRect().left;

            cards.forEach((card, index) => {
                const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });

            currentIndex = activeIndex;
            if (indicators) {
                const dots = indicators.querySelectorAll(".carousel-dot");
                dots.forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentIndex);
                });
            }
        }, 80);
    });

    updateCarousel();
}

document.addEventListener("DOMContentLoaded", () => {
    // Carrossel dos Campeões
    initCarousel({
        trackId: "championTrack",
        prevBtnId: "championPrevBtn",
        nextBtnId: "championNextBtn",
        indicatorsId: "championIndicators"
    });

    // Carrossel da Equipe / Participantes
    initCarousel({
        trackId: "teamTrack",
        prevBtnId: "teamPrevBtn",
        nextBtnId: "teamNextBtn",
        indicatorsId: "teamIndicators"
    });
});
