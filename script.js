

const api_key = "PlL4jyMhv0YbghmAdSNEsLrBHj9Mnn5dyhW5U1zF";
let currentDate = new Date().toISOString().split("T")[0];
// console.log(currentDate);
let container = document.getElementById("current-image-container");
let list = document.getElementById("search-history");

localStorage.removeItem("searches");


//function to display current Image of Day when the page load as well as when history dates are clicked
async function getCurrentImageOfTheDay(){
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key}`);
    const Data = await response.json();
    // console.log(Data);

    let currentImageData=`<h1>NASA Picture of the Day</h1>
    <img src="${Data.url}" alt="planetand Space"> <br>
    <h3>${Data.title}</h3> 
    <p>${Data.explanation}</p>`
    
    container.innerHTML = currentImageData;
    
}
// calling function for the Today's date as the page is loaded and reloaded
getCurrentImageOfTheDay();

let button = document.getElementById("btn");
button.addEventListener("click",getImageOfTheDay);

// function for getting the Image and explanation of the Date entered in input tab
async function getImageOfTheDay(event){
    event.preventDefault();
    let searchDate = document.getElementById("search-input").value;
    console.log(searchDate);

    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${searchDate}&api_key=${api_key}`);
    const Data = await response.json();

    let currentImageData=`<h1>Picture On ${searchDate}</h1>
    <img src="${Data.url}" alt="planetand Space"> <br>
    <h3>${Data.title}</h3> 
    <p>${Data.explanation}</p>`;

    container.innerHTML = currentImageData;
    
    addSearchToHistory();
    saveSearch();
}

// function for saving the date entered in local storage
function saveSearch(){
    let searchDate = document.getElementById("search-input").value;
    if(localStorage.getItem("searches")==null){
        let searches =[];
        let obj={date:searchDate};
        searches.push(obj);
        localStorage.setItem("searches",JSON.stringify(searches));
    }
    else{
        let searches =JSON.parse(localStorage.getItem("searches"));
        let obj={date:searchDate};
        searches.push(obj);
        localStorage.setItem("searches",JSON.stringify(searches));
    }
}

// function for showing the search in the history list in UI
function addSearchToHistory(){
    let searchDate = document.getElementById("search-input").value;
    const listItem = document.createElement("li");
    const dateLink = document.createElement("a");
    dateLink.href="#";
    dateLink.innerText = searchDate;
    listItem.setAttribute('dateVal',searchDate);
    dateLink.onclick = ()=>{
        currentDate=listItem.getAttribute('dateVal');
        getCurrentImageOfTheDay();
    }
    
    listItem.appendChild(dateLink);
    list.appendChild(listItem);
}