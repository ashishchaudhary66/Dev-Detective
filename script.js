let API="https://api.github.com/users/";
const userId=document.querySelector("[user-input]");
const dp=document.querySelector(".profile-pic");
const fullName=document.querySelector("[full-name]");
const joined=document.querySelector("[joined-date]");
const userName=document.querySelector("[user-name]");
const bio=document.querySelector("[about]");
const repository=document.querySelector("[repos-total]");
const followers=document.querySelector("[followers-total]");
const following=document.querySelector("[following-total]");
const userLocation=document.querySelector("[location]");
const website=document.querySelector("[website]");
const twitter=document.querySelector("[twitter]");
const company=document.querySelector("[company]");
const button=document.querySelector("[submitButton]");
const heroSection=document.querySelector(".hero-section");
const errorHeroSection=document.querySelector(".error-hero-section");
const wrapper=document.querySelector('.wrapper');
const searchBar=document.querySelector(".search-bar");
const followBox=document.querySelector('.follow-box');
const mode=document.querySelector('.mode');
const modePara=document.querySelector('[mode-para]');
const modeImg=document.querySelector('[mode-icon]');


button.addEventListener('click',()=>{
    errorHeroSection.classList.remove('active');
    fetchData(userId.value);
});

async function fetchData(id){
    try{
        console.log(id);
        let response=await fetch(API+id);
        let data=await response.json();
        renderData(data);
    }
    catch(e){
        heroSection.classList.remove('active');
        errorHeroSection.classList.add('active');
    }
}

function renderData(result){
    let message=`${result?.message}`;
    if(message=='Not Found'){

        heroSection.classList.remove('active');
        errorHeroSection.classList.add('active');
        let para=document.createElement('p');
        para.innerHTML="User Not Found";
        errorHeroSection.appendChild(para);
        return;
    }

    dp.src=`${result?.avatar_url}`;
    fullName.innerHTML=`${result?.name}`;
    joined.innerHTML= formatDate(`${result?.created_at}`);
    userName.innerHTML=`@${result?.login}`;
    bio.innerHTML=`${result?.bio}`!=`null`?`${result?.bio}`:`Not Available`;
    repository.innerHTML=`${result?.public_repos}`;
    followers.innerHTML=`${result?.followers}`;
    following.innerHTML=`${result?.following}`;
    userLocation.innerHTML=`${result?.location}`!=`null`?`${result?.location}`:`Not Available`;
    website.innerHTML=`${result?.site_admin}`!=`false`?`${result?.site_admin}`:`Not Available`;
    twitter.innerHTML=`${result?.twitter_username}`!=`null`?`${result?.twitter_username}`:`Not Available`;
    company.innerHTML=`${result?.company}`!=`null`?`${result?.company}`:`Not Available`;
    heroSection.classList.add('active');
}

function formatDate(date){
    date=date.substring(0,10);
    let day=date.substring(8,10);
    let month=date.substring(5,7);
    let year=date.substring(0,4);
    let formatedDate="Joined "+day+" "+findMonthName(month)+" "+year;
    return formatedDate;
}
function findMonthName(num){
    switch(num){
        case `01`:return 'Jan';
        case `02`:return 'Feb';
        case `03`:return 'Mar';
        case `04`:return 'Apr';
        case `05`:return 'May';
        case `06`:return 'Jun';
        case `07`:return 'Jul';
        case `08`:return 'Aug';
        case `09`:return 'Sep';
        case `10`:return 'Oct';
        case `11`:return 'Nov';
        case `12`:return 'Dec';
    }
}
let val=0;
mode.addEventListener('click',()=>{
    if(val==1){
        light();
        val=0;
    }
    else{
        dark();
        val=1;
    }
    
})

function dark(){
    let text='#bfbfbf';
    let dark1='#565656';
    let dark2='#3b3b3b';
    let dark3='#15191d';
    wrapper.style.backgroundColor=dark3;
    wrapper.style.color=text;
    searchBar.style.backgroundColor=dark2;
    searchBar.style.color=text;
    searchBar.style.border='none';
    userId.style.color=text;
    searchBar.style['-webkit-box-shadow'] ='0px 0px 20px black';
    button.style.backgroundColor=dark1;
    heroSection.style.backgroundColor=dark2;
    heroSection.style['-webkit-box-shadow'] ='0px 0px 20px black';
    followBox.style.backgroundColor=dark1;
    mode.style.color=text;
    modePara.innerHTML='light';
    modeImg.src='./images/sun-icon.svg';
}

function light(){
    let text='#bfbfbf';
    let dark1='#565656';
    let dark2='#3b3b3b';
    let dark3='#15191d';
    wrapper.style.backgroundColor='#cff1fef2';
    wrapper.style.color='black';
    searchBar.style.backgroundColor='aliceblue';
    searchBar.style.color='black';
    searchBar.style.border='2px solid white';
    userId.style.color='black';
    searchBar.style['-webkit-box-shadow'] ='0px 0px 20px #bebcbc';
    button.style.backgroundColor='rgba(10, 57, 246, 0.825)';
    heroSection.style.backgroundColor='aliceblue';
    heroSection.style['-webkit-box-shadow'] ='0px 0px 20px #bebcbc';
    followBox.style.backgroundColor='#daf4fef2';
    mode.style.color='black';
    modePara.innerHTML='dark';
    modeImg.src='./images/moon-icon.svg';
}