// Get the modal
var modal = document.getElementById("myModal"); //Fetching the Modal window container class ".modal"

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");// Fetching the thumbnail
var modalImg = document.getElementById("img01");//Fetching the Modal content image
var captionText = document.getElementById("caption");//Fetching the text below the modal content
var navigateBack=document.getElementById("navigateBack");//Fetching the nav back button
var navigateForward=document.getElementById("navigateForward");//Fetching the nav forward button
var ARYthumbnails=Array.from(document.getElementsByClassName("thumbnails"));
let currentIndex=null;

let fileInput = document.getElementById("fileUpload")//Fetching the file upload button
const imageOutput = document.getElementById("output");//Fetching the output image
const thumbnailContainer=document.querySelector(".thumbnailContainer");
const buttonContainer=document.querySelector(".container");
let fileName = null;
// var currentIndex=;

    navigateBack.addEventListener("click",function(){
      navBack();

    });

    
    navigateForward.addEventListener("click",function(){
      navForward();

    });

function initializeThumbnails(){
ARYthumbnails.forEach(function(thumbnail,index){   // we execute actions below onto each items in the array
  console.log("initializeThumbnails() executed!!");
  thumbnail.addEventListener("click",function(){    
    console.log("click handler set!!");
    console.log("Photo",index,"clicked",ARYthumbnails[index]);
    currentIndex=index;
    modal.style.display = "block";// display:none からの blockにて表示
    modalImg.src = this.src;//modal imageのファイルパスをすり替えることによって画像を変える
    captionText.innerHTML = this.alt||fileName;
    
  
  });

    console.log(index,ARYthumbnails[index],", ready");


});

};

initializeThumbnails();

function navBack(index){
  console.log("navBack function called!"); 
  if(currentIndex===0){
    console.log("It has returned!");
    return;
  }
  else if(currentIndex!==0){
  currentIndex=currentIndex-1;
  console.log("Current Index is ",currentIndex);
  console.log("ARYthumbnails[currentIndex]=",ARYthumbnails[currentIndex]);
  
modalImg.src = ARYthumbnails[currentIndex].src;//modal imageのファイルパスをすり替えることによって画像を変える
captionText.innerHTML = ARYthumbnails[currentIndex].alt;
}

};


function navForward(index){
  console.log("navForward function called!"); 
  if(currentIndex>=ARYthumbnails.length-1){
    console.log("It has returned!");
    console.log("ARYthumbnails.length=",ARYthumbnails.length);
    return;
  }else{
  currentIndex=currentIndex+1;
  console.log("Current Index is ",currentIndex);
  console.log("ARYthumbnails[currentIndex]=",ARYthumbnails[currentIndex]);
  
modalImg.src = ARYthumbnails[currentIndex].src;//modal imageのファイルパスをすり替えることによって画像を変える
console.log("The image has been replaced!");
captionText.innerHTML = ARYthumbnails[currentIndex].alt || fileName;
console.log("ARYthumbnails.length=",ARYthumbnails.length);
}

};


//module for upload button////////////////



fileInput.addEventListener("change", async () => {
  console.log("change handler triggered!!");  
  let [file] = fileInput.files

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("image",e.target,"loaded!")
      let createdThumbnail=document.createElement("img");
      console.log("thumbnail created!");
      createdThumbnail.classList.add("thumbnails");
      console.log("class added to the thumbnail!");

      initializeThumbnails();
      console.log("Thumbnails Initialized!!");

      createdThumbnail.src=e.target.result;
      console.log("thumbnail's source replaced!");
      //thumbnailContainer.appendChild(createdThumbnail);
      thumbnailContainer.insertBefore(createdThumbnail,buttonContainer);
      console.log("thumbnail appended!");
    //imageOutput.src = e.target.result;

      // ARYthumbnails.push();

      //updating the array↓
      ARYthumbnails=Array.from(document.getElementsByClassName("thumbnails"));
    

      

    createdThumbnail.addEventListener("click",function(){
      console.log("click handler on createdThumbnail triggered!!");
      modal.style.display = "block";// display:none からの blockにて表示
    modalImg.src =e.target.result//modal imageのファイルパスをすり替えることによって画像を変える
    
      console.log("Current Index is ",currentIndex);

      fileInput=document.getElementById("fileUpload");//Fetching the file upload button
      fileName = fileInput.files[0].name;
      captionText.innerHTML = fileName;
      console.log("fileName is..",fileName);

    
      
    });
    };

    reader.onerror = (err) => {
        console.error("Error reading file:", err);
        alert("An error occurred while reading the file.");
    };


    reader.readAsDataURL(file);
})






//////////////////////////////////////////////////






// //関数///////
// img.onclick = function(){        
//   modal.style.display = "block";
//   modalImg.src = this.src;
//   captionText.innerHTML = this.alt;
// }
// //////////////
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  console.log("Modal window closed!");
}