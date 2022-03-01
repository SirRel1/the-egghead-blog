
let count = 0;

let aNuComment = document.querySelector(`.commentArea`)



function makeComment (id) {
         
       let comment = document.getElementById(`theComment${id}`)
       let aNuCommentBtn = document.getElementById(`theBtn${id}`)

       count = count + 1
       if (count % 2 === 0) {
           comment.setAttribute('class', `commentArea`)  
           aNuCommentBtn.setAttribute('class', `commentTheBtn`)  
       } else {
           comment.setAttribute('class', 'hide')
           aNuCommentBtn.setAttribute('class', `hide`)  
       }   
   } 
    
   const makeAComment = async (id) => {
    const description = document.getElementById(`theComment${id}`).value;
    const user_id = document.querySelector('.userId').value;
    const comment_username = document.querySelector('.commentUserName').value;
    const to_what = id;
    const to_whom = document.getElementById(`blogUserName${id}`).value
    if (user_id && to_what && to_whom && description && comment_username ) {
        const response = await fetch('/api/users/comments', {
            method: 'POST',
            body: JSON.stringify({ user_id, to_whom, to_what, description, comment_username }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {
            setTimeout(() => {
                document.location.replace('/');
            }, 2000)
            document.querySelector('.blogDetails').value = ""
            document.querySelector('.blogTitle').value = ""
            
        })
        
    }

} 

function vuComs (id) {
  let Comments = document.getElementById(`showComs${id}`);
  count = count + 1

  if (count % 2 === 0) {
    Comments.setAttribute('class', 'hide')   
} else {
    Comments.setAttribute('class', 'commentsBox') 
     
} 
  
  
}

