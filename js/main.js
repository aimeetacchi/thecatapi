import '../scss/main.scss';
import 'regenerator-runtime/runtime'

let apiKey = '439f241a-3e19-4e5d-8ef8-3a697de5e3fb';
let url = 'https://api.thecatapi.com/v1/breeds';


// SEARCH A CAT BREED ===
let value, resultsDiv;
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
            
        breedData.forEach(cat => {
            
        })
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


}
