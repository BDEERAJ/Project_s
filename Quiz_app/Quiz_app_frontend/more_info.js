let topic=window.localStorage.getItem('topic');

function data(){
fetch(`http://localhost:3000/content:${topic}`,{
    method:'GET',
    headers:{
    'content-type':'application/json'
    }
}).then((e)=>{
   return e.json();
}).then((e)=>{
document.querySelector('#content').innerHTML=`${e.content}`    
})
}
setTimeout(() => {
    data();
}, 0);