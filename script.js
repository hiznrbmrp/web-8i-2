const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const postsContainer = document.getElementById('posts');

let posts = [];

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const post = {
                id: Date.now(),
                image: event.target.result,
                comments: []
            };
            posts.unshift(post);
            renderPosts();
        };
        reader.readAsDataURL(file);
    }
});

function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.image}" alt="Uploaded image">
            <div class="comments">
                ${post.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
            </div>
            <form class="commentForm">
                <input type="text" placeholder="Tambahkan komentar">
                <button type="submit">Kirim</button>
            </form>
        `;

        const commentForm = postElement.querySelector('.commentForm');
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const commentInput = this.querySelector('input');
            const comment = commentInput.value.trim();
            if (comment) {
                post.comments.push(comment);
                renderPosts();
            }
            commentInput.value = '';
        });

        postsContainer.appendChild(postElement);
    });
}

renderPosts();
