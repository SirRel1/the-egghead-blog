

// document.querySelector('.commentBubble')

// document.addEventListener('click', (e) => {
//     console.log(e.target.name)
// })

let count = 0;

let commentBtn = document.querySelectorAll(`.commentArea`)


function makeComment (id) {
         
       let comment = document.getElementById(`${id}`)

       count = count + 1
       if (count % 2 === 0) {
           comment.setAttribute('class', `commentArea`)  
       } else {
           comment.setAttribute('class', 'hide')  
       } 
     console.log(comment)   
   } 
    


