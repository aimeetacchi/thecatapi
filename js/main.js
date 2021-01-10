import '../scss/main.scss';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime/runtime';

let apiKey = '439f241a-3e19-4e5d-8ef8-3a697de5e3fb';
let url = 'https://api.thecatapi.com/v1/breeds';


// SEARCH A CAT BREED ===
let value;
const search = document.getElementById('search');
search.addEventListener('click', searchBreeds);

//Function that gets the value that's been inputted in search/
 function searchBreeds(){
    value = document.querySelector('.search-box').value;
    // call fetchCats
    fetchCatBreeds(value);
}


// SUBMIT AN IMAGE ====
const submitButton = document.getElementById('submitImageButton')
submitButton.addEventListener('click', uploadCatHandler);

// Uplodaing an image to the CAT API
function uploadCatHandler(e){
    e.preventDefault()
    //console.log("uploadCatHandler Run")
    const uploadInput = document.getElementById('catImageUpload').files[0];
   // console.log(uploadInput);
    uploadCat(uploadInput)
}

// Get the Breeds of Cat, you searched for
let fetchCatBreeds = async (value) => {
    let response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${value}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "x-api-key": apiKey,
            }
        })   
    let breedData = await response.json(); 
        
       
        // breedData.forEach(cat => {
            
        //     let html =+ `<div class='cat'> ${cat.name} </div>`
        //     document.querySelector('.results').innerHTML = html;
        // })

    let catEl = '';
    // Loop to access all rows  
    breedData.forEach(cat => {
        console.log(cat);
        let catDesc = cat.description ? `<p class="cat__description">${cat.description}</p>` : '<p class="cat__no-info">No Info</p>';
        let catIntelligence = cat.intelligence ? `<p class="cat__intelligence">${cat.intelligence}</p>` : '<p class="cat__no-info">No Info</p>';

        catEl += `<div class="cat">  
                    <h2 class="cat__name">${cat.name} </h2> 
                     ${catDesc}
                     <p>${cat.life_span}<p>
                     <p>${catIntelligence}</p>
                </div>`; 
                } )
    // Setting innerHTML as tab variable 
    document.querySelector('.results').innerHTML = catEl;
    }



// UPLODADING IMAGE TO API ===
let uploadCat = async (image) => {
    // this is the same as creating an empty object
    const formData = new FormData() 
    // this is the same as 'file': 'image' in an object.
    formData.append("file", image)

    // POSTING IMAGE that was uploaded - formData and storing the response in data.
   const data = await fetch('https://api.thecatapi.com/v1/images/upload', {
    method: "POST",
    mode: 'cors',
    headers: {
       // 'Content-Type':'multipart/form-data'
       "x-api-key": apiKey,
       'Access-Control-Allow-Origin': '*',
        },
    body: formData
    })

    // printing the response - if all ok, should be a object of your file you uploaded.
    console.log(data)
   
    let node = document.createElement("div");                 // Create a <li> node
    let textnode = document.createTextNode(`Thanks your photo has been uploaded`);         // Create a text node
    node.appendChild(textnode);  
    document.querySelector(".upload-image").appendChild(node);

    
}

// Getting your Uploaded photos
const getPhoto = async() => {
    const data = await fetch('https://api.thecatapi.com/v1/images?limit=10', {
    method: "GET",
    mode: 'cors',
    headers: {
       "x-api-key": apiKey,
        },
    })
    let photos = await data.json()
    console.log(photos.length)

    let photoUrl = '';
    photos.forEach(photo => {
        photoUrl += `<div class="img-box"><img class="photo-img" src=${photo.url}></div>`

        document.querySelector('.photos').innerHTML = photoUrl;
    })
}
let getPhotosBtn = document.getElementById('get-photos');
getPhotosBtn.addEventListener('click', () => {
    getPhoto();
})

