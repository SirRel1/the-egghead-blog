const moment= require('moment');


const reverse = ('reverseArray', (array) => array.reverse())
  



module.exports = {
    format_time: (a) => {
     
      return moment(a).format('llll');
      
    },

    reverse

    
  
  }
