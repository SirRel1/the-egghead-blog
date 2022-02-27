const post = document.querySelector('.textBox');
const createBtn = document.querySelector('.createBtn')

const postDetails = () => {
    const post = document.querySelector('.textBox').value.trim();

    return post
};

// post.addEventListener('keypress', postDetails)

const takeTake = async () => {
    const description = document.querySelector('.blogDetails').value;
    const title = document.querySelector('.blogTitle').value;
    const user_id = document.querySelector('.userId').value;
    const created_at= document.querySelector('.userCreatedAt').value;
    if (user_id && description && title && created_at) {
        const response = await fetch('/api/users/post', {
            method: 'POST',
            body: JSON.stringify({ user_id, title, description, created_at }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {
            setTimeout(() => {
                document.location.replace('/dashboard');
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
}
// Function to delete a user post when chose by user.
const delBlog = document.querySelector('.del')

function theDelete(blog) {
    const response = fetch(`/api/users/post/${blog}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    
}).then(() => setTimeout(() => {
    document.location.replace('/dashboard');
}, 2000) )}

// Funtion to edit/update a users post upon selection of blog entry

function theUpdate(num) {
    let title = document.querySelector('.theEditTitle').value
    let description = document.querySelector('.theEditDescription').value
    

    if ( description && title) {
        const response = fetch(`/api/users/post/${num}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            setTimeout(() => {
                document.location.replace('/dashboard');
            }, 1500)
        })
        }
        
    
}

document.addEventListener('click', function editNum (e) {
    const theNum = e.target.name.replace("'", '')
    return setTimeout(() => {
        theUpdate(theNum)
    }, 15000)
})
    
	


function theEdit(blog) {
 fetch(`/api/users/post/${blog}`)
  .then(response => response.json())
  .then(data => {
    let editTitle = document.querySelector('.theEditTitle')
    let editDescript = document.querySelector('.theEditDescription')

    editTitle.setAttribute('class', 'theEditTitle')
    editDescript.setAttribute('class', 'theEditDescription')
    setTimeout(() => {
      editTitle.textContent = data.cleanBlog.title;
      editDescript.textContent= data.cleanBlog.description;  
    }, 777)
    
  });   
}




