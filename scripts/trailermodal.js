// trailers.js
const modal = document.getElementById("trailerModal");
const iframe = document.getElementById("trailerIframe");

export function openTrailer(trailerId) {
    if (!modal || !iframe) return;
    iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0`;
    //iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
    modal.classList.remove("hidden");
    
}

export function closeTrailer() {
    if (!modal || !iframe) return;
    iframe.src = "";
    modal.classList.add("hidden");
}

// Ensure elements exist before adding listeners
if (modal) {
    const closeBtn = modal.querySelector(".trailer-modal__close");
    const backdrop = modal.querySelector(".trailer-modal__backdrop");

    if (closeBtn) closeBtn.addEventListener("click", closeTrailer);
    if (backdrop) backdrop.addEventListener("click", closeTrailer);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTrailer();
});