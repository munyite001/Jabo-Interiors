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