const navigation_height=document.getElementById('navigation').offsetHeight;
//console.log(navigation_height);
document.documentElement.style.setProperty('--scroll-padding',navigation_height+'px');
const menu=document.getElementById("menu");
//console.log(menu);
menu.addEventListener('click',(e)=>{
    const navbar=document.getElementById('navbar');
    navbar.style.display='grid';
    let nav_items=document.getElementsByClassName('nave_item');
    for(let i=0;i<nav_items.length;i++){
        nav_items[i].addEventListener('click',(e)=>{
            navbar.style.display='none';
        })
    }
})
