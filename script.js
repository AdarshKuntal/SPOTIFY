console.log("Lets write javascript");
let currentsong = new Audio();
let songs;
let currfolder;

function formatTime(seconds) {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  // Return the formatted time
  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
  currfolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/${currfolder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${currfolder}/`)[1]);
    }
  }
  //  return songs;

  let songUl = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  songUl.innerHTML = "";
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `<li>  <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div> ${song.replaceAll("%20", " ")}</div>
                  <div>Adarsh</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="">
                </div> </li>`;
  }

  // Attaching eventlistener to each song
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });
  return songs
}

const playmusic = (track, pause = false) => {
  currentsong.src = `/${currfolder}/` + track;
  if (!pause) {
    currentsong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

// async function displayAlbums() {
//   let a = await fetch(`http://127.0.0.1:5500/songs/`);
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   // console.log(div)
//   let anchors = div.getElementsByTagName("a")
// // console.log(anchors)
//   let cardcontainer = document.querySelector(".cardcontainer");

//   let array = Array.from(anchors);
//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];
   
//    if (element.href.includes("/songs/J")) {
     
//     let folder = element.href;
//     console.log(folder)
    
//   //     //get the metadata of the folder
//      let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
//       let response = await a.json();
//      console.log(response);

//       cardcontainer.innerHTML =
//         cardcontainer.innerHTML +
//         `   <div data-folder="${folder}" class="card">
//             <div class="play">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 28 28"
//                 width="28"
//                 height="28"
//               >
//                 <path
//                   d="M20.8906 14.846C20.5371 16.189 18.8667 17.138 15.5257 19.0361C12.296 20.8709 10.6812 21.7884 9.37983 21.4196C8.8418 21.2671 8.35159 20.9776 7.95624 20.5787C7 19.6139 7 17.7426 7 14C7 10.2574 7 8.3861 7.95624 7.42132C8.35159 7.02245 8.8418 6.73288 9.37983 6.58042C10.6812 6.21165 12.296 7.12907 15.5257 8.96393C18.8667 10.86197 20.5371 11.811 20.8906 13.154C21.0365 13.7084 21.0365 14.2916 20.8906 14.846Z"
//                   fill="#000000"
//                   stroke="currentColor"
//                   stroke-width="1.5"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </div>

//             <img
//               src= "/songs/${folder}/cover.jpeg"
//               alt=""
//             />
//             <h2>${response.title}</h2>
//             <p> ${response.description}</p>
//           </div>`;
//    }
//    }
// }

async function main() {
  // getting list of all songs

  await getsongs("songs/JOY");
  playmusic(songs[0], true);

  //  display all albums on the page
  // displayAlbums();

  //  Attach an event listener to play, next and previous
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "pause.svg";
    } else {
      currentsong.pause();
      play.src = "play.svg";
    }
  });

  //listen for time update event
  currentsong.addEventListener("timeupdate", () => {
    // console.log(currentsong.currentTime,currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${formatTime(
      currentsong.currentTime
    )} / ${formatTime(currentsong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });

  //add event listener to seek bar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

  // adding eventlistener for hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });
  // adding event listener to previous and next
  previous.addEventListener("click", () => {
    console.log("previous clicked");

    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playmusic(songs[index - 1]);
    }
  });
  next.addEventListener("click", () => {
    console.log("next clicked");
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playmusic(songs[index + 1]);
    }
  });
  // adding event to volume
  document.querySelector(".range").addEventListener("change", (e) => {
    currentsong.volume = parseInt(e.target.value) / 100;
  });

  // LOAD THE PLAYLIST WHENEVER CARD IS CLICKED
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
      playmusic(songs[0])
    });
    
  });

  //adding event listener to mute the track
  document.querySelector(".volume>img").addEventListener("click", e=>{
    // console.log(e.target)
    if (e.target.src.includes("volume.svg")) {
      
        e.target.src=e.target.src.replace("volume.svg","mute.svg")
        currentsong.volume = 0;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
      }
      else{
        e.target.src=  e.target.src.replace("mute.svg","volume.svg")
        currentsong.volume = 0.1;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
      }
    
  })

}

main();
