const post = document.querySelector('.textBox');
const createBtn = document.querySelector('.createBtn')

const postDetails = () => {
    const post = document.querySelector('.textBox').value.trim();

    return post
};

// post.addEventListener('keypress', postDetails)

createBtn.addEventListener('click', async () => {
    const description = document.querySelector('.blogDetails').value;
    const title = document.querySelector('.blogTitle').value;
    if (description && title) {
        const response = await fetch('/api/users/post', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {
            setTimeout(() => {
                document.location.replace('/');
            }, 2000)
            document.querySelector('.blogDetails').value = ""
            document.querySelector('.blogTitle').value = ""
            
        })
        
        console.log(response)
    }
   
    const clearIt = () => {
        console.log('ran')
        document.querySelector('.blogDetails').value = ""
        document.querySelector('.titleBox').value = ""

    }
})

const delBlog = document.querySelector('.del')

function theDelete(blog) {
    const response = fetch(`/api/users/post/${blog}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    
}).then(() => setTimeout(() => {
    document.location.replace('/');
}, 2000) )}
