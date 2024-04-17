// DYNAMICALLY LOADS PORTFOLIO IMAGES

var gallery = [];

function fetchImages() {
  fetch("/admin/images")
    .then(response => response.json())
    .then(data => {
      gallery.push(...data["images"]);
      // Once the images are fetched, update the grid items
      updateGridItems();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function updateGridItems() {
  var portfolio = document.querySelector('.qrt-masonry-grid');
  if (gallery.length < 1) {
    portfolio.textContent = '<p>No Images To Show </p>';
  } else {
    portfolio.innerHTML = gallery.map((image) => {
      return `
      <div class="qrt-masonry-grid-item ${image.category.toLowerCase()}">
            <div class="qrt-work-item">
                <a data-fancybox="works" href="${image.filepath}" class="qrt-cursor-scale qrt-work-cover-frame"><img src="${image.filepath}" alt="work cover">
                    <div class="qrt-item-zoom qrt-cursor-color"><i class="fas fa-expand"></i></div>
                    <div class="qrt-work-category"><span>${image.category}</span></div>
                </a>
                <div class="qrt-work-descr">
                    <h4 class="qrt-cursor-color qrt-white"><a href="#" class="qrt-anima-link">${image.filename}</a></h4>
                </div>
            </div>
        </div>`;
    }).join('');
  }
}

// Filter function
function filterItems(category) {
  var gridItems = document.querySelectorAll('.qrt-masonry-grid-item');
  gridItems.forEach(item => {
    if (category === '*' || item.classList.contains(category.slice(1))) {
      item.style.display = 'block'; // Show items in selected category
    } else {
      item.style.display = 'none'; // Hide items not in selected category
    }
  });
}

// Event listener for filter buttons
const filterButtons = document.querySelectorAll('.qrt-work-category');
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    const category = this.getAttribute('data-filter');
    filterItems(category);
  });
});

fetchImages();
