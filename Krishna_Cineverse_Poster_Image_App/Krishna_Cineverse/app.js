// 10 movie titles with image posters. Three cards are displayed per page.
// Replace any poster URL with your own image URL when needed.
const movies = [
 {title:"Nanhey Dil",date:"20 Nov 2026",poster:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700"},
 {title:"Kaali Kheti",date:"20 Nov 2026",poster:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=700"},
 {title:"Party Animals",date:"20 Nov 2026",poster:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=700"},
 {title:"Pratap",date:"20 Nov 2026",poster:"https://images.unsplash.com/photo-1503095396549-807759245b35?w=700"},
 {title:"Suryaa: Ant Se Aarambh Tak",date:"20 Nov 2026",poster:"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=700"},
 {title:"Heat City: Antarpath – Chapter One",date:"20 Nov 2026",poster:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700"},
 {title:"Parivarik ManuRanjan",date:"13 Nov 2026",poster:"https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700"},
 {title:"Blind Game",date:"11 Nov 2026",poster:"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=700"},
 {title:"Ramayana: Rise of Legend",date:"5 Nov 2026",poster:"https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=700"},
 {title:"Nakhrewaalii",date:"30 Oct 2026",poster:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700"}
];

const perPage = 3;
let currentPage = 1;
const grid = document.getElementById("movieGrid");
const pagination = document.getElementById("pagination");

function renderMovies() {
 const start = (currentPage - 1) * perPage;
 const visible = movies.slice(start, start + perPage);

 grid.innerHTML = visible.map(movie => `
  <div class="col-6 col-md-4">
   <article class="movie-card">
    <div class="movie-poster">
     <img src="${movie.poster}" alt="${movie.title} poster" loading="lazy"
       onerror="this.onerror=null;this.src='https://placehold.co/600x900/171d30/ffffff?text=Movie+Poster';">
    </div>
    <div class="movie-info">
     <h3 title="${movie.title}">${movie.title}</h3>
     <div class="movie-date"><i class="bi bi-calendar3 me-1"></i>${movie.date}</div>
    </div>
   </article>
  </div>`).join("");

 renderPagination();
}

function renderPagination() {
 const totalPages = Math.ceil(movies.length / perPage);
 let buttons = `
  <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
   <button class="page-link" ${currentPage === 1 ? "disabled" : ""} data-page="${currentPage-1}" aria-label="Previous page"><i class="bi bi-chevron-left"></i></button>
  </li>`;

 for (let page = 1; page <= totalPages; page++) {
  buttons += `
   <li class="page-item ${page === currentPage ? "active" : ""}">
    <button class="page-link" data-page="${page}" ${page === currentPage ? 'aria-current="page"' : ""}>${page}</button>
   </li>`;
 }

 buttons += `
  <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
   <button class="page-link" ${currentPage === totalPages ? "disabled" : ""} data-page="${currentPage+1}" aria-label="Next page"><i class="bi bi-chevron-right"></i></button>
  </li>`;

 pagination.innerHTML = buttons;

 pagination.querySelectorAll("button[data-page]").forEach(button => {
  button.addEventListener("click", () => {
   const next = Number(button.dataset.page);
   if (next >= 1 && next <= totalPages) {
    currentPage = next;
    renderMovies();
    document.getElementById("movies").scrollIntoView({behavior:"smooth"});
   }
  });
 });
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("movieCount").textContent = `${movies.length} Movies`;
renderMovies();