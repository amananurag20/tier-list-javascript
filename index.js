document.addEventListener("DOMContentLoaded", (event) => {
    // Handle image upload
    document.querySelector(".button-upload").addEventListener("click", () => {
        let fileInput = document.querySelector(".import-input");
        fileInput.click();
    });

    document.querySelector(".import-input").addEventListener("change", (evt) => {
        if (!evt.target.files) {
            return;
        }
        const totalImages = Array.from(evt.target.files);
        totalImages.forEach((file, index) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", (event) => {
                let imageDataUrl = event.target.result;

                let imgElement = document.createElement("img");
                imgElement.src = imageDataUrl;
                imgElement.style.width = "90px";
                imgElement.style.height = "90px";
                imgElement.style.border = "2px solid green";
                imgElement.draggable = true;
                imgElement.id = `image-${Math.random()}-${index}`; // Unique ID for each image
                imgElement.addEventListener("dragstart", dragStart);
                imgElement.addEventListener("dragend", dragEnd);
                document.querySelector(".bottom-content").appendChild(imgElement);
            });
        });
    });

    // Make tier-section editable
    document.querySelectorAll('.section-info').forEach(section => {
        section.addEventListener('click', function() {
            let currentText = this.innerText;
            this.innerHTML = `<input type="text" value="${currentText}" />`;
            let input = this.querySelector('input');
            input.focus();
            input.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            input.addEventListener('blur', () => {
                this.innerHTML = input.value;
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });
        });
    });

    // Handle arrow buttons for moving sections
    document.querySelectorAll('.move-up').forEach(button => {
        button.addEventListener('click', function() {
            let section = this.parentNode.parentNode;
            let prevSection = section.previousElementSibling;
            if (prevSection) {
                section.parentNode.insertBefore(section, prevSection);
            }
        });
    });

    document.querySelectorAll('.move-down').forEach(button => {
        button.addEventListener('click', function() {
            let section = this.parentNode.parentNode;
            let nextSection = section.nextElementSibling;
            if (nextSection) {
                section.parentNode.insertBefore(nextSection, section);
            }
        });
    });

    // Handle drag and drop
    document.querySelectorAll('.tier-section, .bottom-content').forEach(section => {
        section.addEventListener("dragover", dragOver);
        section.addEventListener("drop", drop);
    });
});

function dragStart(evt) {   
    evt.dataTransfer.setData("text/plain", evt.target.id); // Store unique ID
    evt.effectAllowed = "move"; // Indicate that the drag operation is a move
}

function dragOver(evt) {
    evt.preventDefault(); // Allow dropping
}

function drop(evt) {
    evt.preventDefault();
    let imageId = evt.dataTransfer.getData("text/plain");
    let imgElement = document.getElementById(imageId);
    
    if (imgElement) {
        let imageUrl = imgElement.src;

        let newImgElement = document.createElement("img");
        newImgElement.src = imageUrl;
        newImgElement.style.width = "90px";
        newImgElement.style.height = "90px";
        newImgElement.style.marginRight = "5px";
        newImgElement.draggable = true;
        newImgElement.id = imageId; // Maintain the same ID
        newImgElement.addEventListener("dragstart", dragStart);
        newImgElement.addEventListener("dragend", dragEnd);
        
        evt.target.appendChild(newImgElement);

        // Remove the image from the original location
        imgElement.remove();
    }
}

function dragEnd(evt) {
    // Optionally handle any additional cleanup after dragging
}
