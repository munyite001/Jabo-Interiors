const sidebarLinks = document.querySelectorAll(".sidebar-link");
const displaySections = document.querySelectorAll(".display-container");


sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        sidebarLinks.forEach((item) => {
            item.classList.remove("active")
        })
        link.classList.add("active");

        const target = link.getAttribute("data-target");
        displaySections.forEach((section) => {
            if (section.id == target) {
                section.style.display = "block"
            }
            else {
                section.style.display= "none"
            }
        })
    })
})


const success = document.querySelector('.file-upload-success');

document.getElementById('image-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('/admin/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
        // Display a success message or update the gallery with the new image
        success.style.display = "block"
        document.getElementById('image-upload-form').reset();

        setTimeout(() => {
            success.style.display = "none"
        }, 2000)
    })
    .catch(error => {
        console.error('Error:', error);
        // Display an error message
    });
});