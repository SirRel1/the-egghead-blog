
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
    const to_what = id;
    const to_whom = document.getElementById(`blogUserName${id}`).value
    if (user_id && to_what && to_whom && description ) {
        const response = await fetch('/api/users/comments', {
            method: 'POST',
            body: JSON.stringify({ user_id, to_whom, to_what, description }),
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

} 


