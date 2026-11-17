/* ==========================================
   LOCI ARENA
   Carrossel de Campeões
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("championTrack");
    const prevButton = document.getElementById("championPrevBtn");
    const nextButton = document.getElementById("championNextBtn");
    const indicators = document.getElementById("championIndicators");

    if (!track || !prevButton || !nextButton || !indicators) {
        console.warn("Elementos do carrossel não encontrados.");
        return;
    }

    const cards = Array.from(track.children);

    if (cards.length === 0) {
        return;
    }

    let currentIndex = 0;

    // CRIA AS BOLINHAS DE NAVEGAÇÃO

    indicators.innerHTML = "";

    cards.forEach((card, index) => {

        const dot = document.createElement("button");

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Ir para o campeão ${index + 1}`
        );

        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });

        indicators.appendChild(dot);

    });


    // ATUALIZA A POSIÇÃO DO CARROSSEL

    function updateCarousel() {

        const card = cards[currentIndex];

        if (!card) return;

        track.scrollTo({
            left: card.offsetLeft - track.offsetLeft,
            behavior: "smooth"
        });

        updateIndicators();

    }


    // ATUALIZA AS BOLINHAS

    function updateIndicators() {

        const dots = indicators.querySelectorAll(".carousel-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    // BOTÃO PRÓXIMO

    nextButton.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }

        updateCarousel();

    });


    // BOTÃO ANTERIOR

    prevButton.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }

        updateCarousel();

    });


    // PERMITE NAVEGAÇÃO PELO TECLADO

    document.addEventListener("keydown", (event) => {

        const tag = document.activeElement.tagName;

        if (tag === "INPUT" || tag === "TEXTAREA") {
            return;
        }

        if (event.key === "ArrowRight") {

            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();

        }

        if (event.key === "ArrowLeft") {

            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();

        }

    });


    // ATUALIZA O ÍNDICE QUANDO O USUÁRIO ARRASTA O CARROSSEL

    let scrollTimeout;

    track.addEventListener("scroll", () => {

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {

            const trackPosition = track.scrollLeft;

            let closestIndex = 0;
            let smallestDistance = Infinity;

            cards.forEach((card, index) => {

                const cardPosition = card.offsetLeft - track.offsetLeft;
                const distance = Math.abs(cardPosition - trackPosition);

                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestIndex = index;
                }

            });

            currentIndex = closestIndex;
            updateIndicators();

        }, 100);

    });


    // INICIALIZA O CARROSSEL

    updateCarousel();

});