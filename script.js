document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const imageModalElement = document.getElementById('imageModal');
    const imageModal = new bootstrap.Modal(imageModalElement);
    const deleteImageButton = document.getElementById('deleteImage');
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');
    let currentImageSrc = '';

    // Handle file upload
    uploadButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'col position-relative';

                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'img-thumbnail';
                img.style.cursor = 'pointer';

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.innerHTML = '&times;';
                deleteButton.addEventListener('click', () => {
                    gallery.removeChild(imgContainer);
                });

                imgContainer.appendChild(img);
                imgContainer.appendChild(deleteButton);
                gallery.appendChild(imgContainer);
            };
            reader.readAsDataURL(file);
            fileInput.value = ''; // Clear the file input
        }
    });

    // Handle image click to open in modal
    gallery.addEventListener('click', event => {
        if (event.target.tagName === 'IMG') {
            currentImageSrc = event.target.src;
            document.querySelector('#imageModal .modal-body img').src = currentImageSrc;
            imageModal.show();
        }
    });

    // Handle image deletion from modal
    deleteImageButton.addEventListener('click', () => {
        const images = gallery.querySelectorAll('img');
        images.forEach(img => {
            if (img.src === currentImageSrc) {
                gallery.removeChild(img.parentElement); // Remove the entire column
            }
        });
        imageModal.hide();
    });
});
