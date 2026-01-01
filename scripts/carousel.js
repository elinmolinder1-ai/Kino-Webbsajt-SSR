import { fetchMovies } from "./api.js"; // Ensure the .js extension is present

export async function movieCarousel() {
    const currentTrack = document.getElementById('currentMoviesTrack');
    const upcomingTrack = document.getElementById('comingSoonTrack');
    const eventsTrack = document.getElementById('eventsTrack');
    const heroInner = document.querySelector('.carousel_inner');
    const indicatorsContainer = document.querySelector('.carousel_indicators');

    try {

        const movieData = await fetchMovies();

        // Check if data exists to avoid errors
        if (!movieData || !Array.isArray(movieData)) {
            console.error("No movie data found");
            return;
        }

        // Category
        const getAgeCategory = (certificate) => {
            if (!certificate) return { category: null, class: null };
            
            if (certificate === 'A' || certificate === 'R') {
                return { category: 'Adult', class: 'adults-only' };
            } else if (certificate === 'U' || certificate === 'UA' || certificate === 'PG-13') {
                return { category: 'Children', class: 'for-children' };
            } else {
                return { category: certificate, class: 'other-rating' };
            }
        };

        const heroMovies = [...movieData].sort(() => Math.random() - 0.5).slice(0, 6);
        heroInner.innerHTML = heroMovies.map((movie, index) => {
            const { category, class: categoryClass } = getAgeCategory(movie.Certificate);
            
            return `
            <div class="carousel_slide ${index === 0 ? 'active' : ''}" style="background-image: url('${movie.Poster_Link}')">
                <div class="slide_content">
                    <h1 class="film_title">${movie.Series_Title}</h1>
                    <div class="festival_dates">
                        <h2>Released: ${movie.Released_Year}</h2>
                        <h3>${category ? `<span class="certificate-badge ${categoryClass}">${category}</span>` : ''}</h3>
                    </div>
                </div>
            </div>`;
        }).join('');

        const generateMovieHTML = (data, showDays, prefix) => {
            const days = ["Idag", "Imorgon", "Fredag 19/12", "Lördag 20/12", "Söndag 21/12"];
            return data.map((movie, index) => {
                const { category, class: categoryClass } = getAgeCategory(movie.Certificate);
                
                return `
                    <div class="movie-wrapper">
                        ${showDays ? `<h3 class="movie-day-label">${days[index] || ''}</h3>` : ''}
                        <div class="movie-card">
                            <img src="${movie.Poster_Link}" alt="${movie.Series_Title}">
                            <div class="card-footer">
                                <span><i class="fas fa-play"></i> Trailer</span>
                                <span class="details-btn" data-prefix="${prefix}" data-id="${movie.id}">Detaljer ▼</span>
                            </div>
                            <div class="movie-details-content" id="${prefix}-details-${movie.id}" style="display: none;">
                                <p><strong>Rating:</strong> ⭐ ${movie.IMDB_Rating}</p>
                                <p><strong>Grupp:</strong> ${category ? `<span class="certificate-badge ${categoryClass}">${category}</span>` : ''}</p>
                                <p><strong>År:</strong> ${movie.Released_Year}</p>
                                <p><strong>Regissör:</strong> ${movie.Director}</p>
                                <p><strong>Handling:</strong> ${movie.Overview}</p>
                            </div>
                        </div>
                    </div>`}).join('');
        };

        // SHUFFLE & RENDER ROWS
        const shuffledCurrent = [...movieData].sort(() => Math.random() - 0.5).slice(0, 5);
        const shuffledUpcoming = [...movieData].sort(() => Math.random() - 0.5).slice(5, 10); // Slice different movies for variety

        if (currentTrack) currentTrack.innerHTML = generateMovieHTML(shuffledCurrent, true, 'current');
        if (upcomingTrack) upcomingTrack.innerHTML = generateMovieHTML(shuffledUpcoming, false, 'upcoming');

        //EVENTS
        if (eventsTrack) {
            const shuffledEvents = [...movieData].sort(() => Math.random() - 0.5).slice(0, 5);
            eventsTrack.innerHTML = shuffledEvents.map(movie => `
                <div class="event_card">
                    <img src="${movie.Poster_Link}" alt="${movie.Series_Title}">
                </div>`).join('');
        }

        // Initialize listeners once HTML is injected
        setupDetailsListeners();

    } catch (error) {
        console.error("Movie Carousel Error:", error);
    }
}

// EVENT LISTENERS
function setupDetailsListeners() {
    document.removeEventListener('click', handleDetailClick);
    document.addEventListener('click', handleDetailClick);
}

function handleDetailClick(e) {
    if (e.target.classList.contains('details-btn')) {
        const movieId = e.target.getAttribute('data-id');
        const prefix = e.target.getAttribute('data-prefix');
        const detailsDiv = document.getElementById(`${prefix}-details-${movieId}`);

        if (detailsDiv) {
            const isHidden = detailsDiv.style.display === 'none';
            detailsDiv.style.display = isHidden ? 'block' : 'none';
            e.target.innerHTML = isHidden ? 'Detaljer ▲' : 'Detaljer ▼';
        }
    }
}