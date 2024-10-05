// get data from api 
async function giveData(api) {
   try {
      let values = await fetch(api);
      let data = await values.json();

      return (data)
   } catch (error) {
      console.log(error)
   }
}

// btn load 

// buttons 


// async function getBtn() {
//    let data = await giveData('https://openapi.programming-hero.com/api/phero-tube/categories');
//    for (let items of data.categories) {
//       console.log(items['category']);
//       let div = document.createElement('div');
//       div.classList = 'px-6 py-2 rounded-md bg-gray-200 font-bold mx-4';
//       div.innerHTML = `<button onclick= "myVideos(${items.category_id})" >${items['category']}</button>`;
//       document.getElementById('buttons').appendChild(div);
//    }
// }

async function getBtn() {
   let buttonContainer = document.getElementById('buttons');
   buttonContainer.innerHTML = '';

   let data = await giveData('https://openapi.programming-hero.com/api/phero-tube/categories');
   for (let items of data.categories) {
      let div = document.createElement('div');

      div.innerHTML = `<button id="btn-${items.category_id}" class=" px-6 py-2 btn_items rounded-md font-bold mx-4 bg-gradient-to-tr from-pink-300 to-blue-300" onclick= "myVideos(${items.category_id})" >${items['category']}</button>`;
      buttonContainer.appendChild(div);
   }
}
function removeStyle() {
   const btns = document.getElementsByClassName('btn_items');
   for (let i of btns) {
      i.classList.remove('active')

   }
}
getBtn()
let getVideo = async (myApi) => {
   let videoContainer = document.getElementById('video-container');

   let videoData = await giveData(myApi);
   for (let i = 0; i < videoData.videos.length; i++) {
      let videos = videoData.videos[i];
      let div = document.createElement('div');

      div.classList = ' cursor-pointer rounded overflow-hidden bg-base-100 z-10'

      div.innerHTML =
         `
         <figure class = "h-44 relative">
            <img class = "w-full h-full object-cover" src="${videos.thumbnail}" />
            <span class="text-[8px] px-1 absolute bg-gradient-to-br  from-pink-500 to-blue-300 rounded-sm right-2 bottom-2 " >${videos.others.posted_date ? timeControler(videos.others.posted_date) : ''}</span>
            </figure>
         <div class="flex flex-col py-1">         
            <div class="flex flex-row items-center gap-4">
               <img class = "w-8 h-8 rounded-full"  src="${videos.authors[0].profile_picture}" />
               <div class = "">
                  <h1 class="text-md font-bold">${videos.title}</h1>
                  <div class="flex flex-row items-center gap-9">
                     <p>${videos.authors[0].profile_name}</p>
                     ${videos.authors[0].verified ? `<img class='w-4 h-4' src="./images/done.png">` : ''}
                  </div>
               </div>
            </div>
            <div class="flex flex-col justify-center items-center ">
               <button onclick="showDetels('${videos.video_id}')" class="bg-gradient-to-br w-full  px-4 mx-auto from-pink-300 to-blue-300 rounded-sm" >see</button>
            </div>
         </div>
       `;
      videoContainer.appendChild(div);
   }
}

// showDetels
// async function showDetels(id) {
//    let modal = document.getElementById('video-container');
//    let data = await giveData(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`);
   
//    let div = document.createElement('div');
//    div.classList = 'w-full h-full bg-black bg-opacity-75 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center'; // মডাল ডিজাইন
   
//    div.innerHTML = `
//       <div class="bg-white p-6 rounded-lg shadow-lg max-w-md z-50 w-full">
//          <h2 class="text-xl font-bold mb-4">${data.video.title}</h2>
//          <p class="mb-4">Posted on: ${data.video.others.posted_date}</p>
//          <img src="${data.video.thumbnail}" class="w-full h-44 object-cover rounded mb-4" />
//          <p>${data.video.description}</p>
//          <button onclick="closeModal()" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
//       </div>
//    `;
   
//    modal.appendChild(div);
// }


getVideo('https://openapi.programming-hero.com/api/phero-tube/videos')

// times 
function timeControler(time) {
   // let years = parseInt(time / 31536000);  
   // let months = parseInt((time % 31536000) / 2592000);  
   let days = parseInt((time % 2592000) / 86400);
   let hours = parseInt((time % 86400) / 3600);
   let minutes = parseInt((time % 3600) / 60);
   let seconds = time % 60;

   return ` ${days}d ${hours}h ${minutes}m ${seconds}s ago`;
}

// load data 

async function myVideos(id) {
   removeStyle()
   let activeBtn = document.getElementById(`btn-${id}`);
   activeBtn.classList.add('active');
   let videoContainer = document.getElementById('video-container');
   videoContainer.innerHTML = '';

   let data = await giveData(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
   if (data.category.length == 0) {
      videoContainer.innerText = 'No video available'
   } else {
      for (let i = 0; i < data.category.length; i++) {
         let videos = data.category[i];
         console.log(videos)
         let div = document.createElement('div');

         div.classList = ' cursor-pointer rounded overflow-hidden bg-base-100 z-10'

         div.innerHTML =
            `
         <figure class = "h-44 relative">
            <img class = "w-full h-full object-cover" src="${videos.thumbnail}" />
            <span class="text-[8px] px-1 absolute bg-gradient-to-br  from-pink-500 to-blue-300 rounded-sm right-2 bottom-2 " >${videos.others.posted_date ? timeControler(videos.others.posted_date) : ''}</span>
         </figure>
         <div class="py-4 px-1 flex gap-2 items-center">         
            <img class = "w-8 h-8 rounded-full"  src="${videos.authors[0].profile_picture}"  />
            <div>
               <div class = "flex flex-row gap-2">
                  <h1 class="text-md font-bold">${videos.title}</h1>
               </div>
               <div class="flex flex-row items-center gap-9">
                  <p>${videos.authors[0].profile_name}</p>
                  ${videos.authors[0].verified ? `<img class='w-4 h-4' src="./images/done.png">` : ''}
               </div>
            </div>
         </div>
       `;
         videoContainer.appendChild(div);
      }
   }
}

