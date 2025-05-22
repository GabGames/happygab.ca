const video_container = document.querySelector(".video-container")
const searchBtn = document.querySelector("#searchBtn")

fetch(" https://api.freeapi.app/api/v1/public/youtube/videos")
.then((data) =>{
    data.json().then((d)=>{
        const videos_res = d;
        // console.log(videos_res);
        const yt_data = videos_res.data.data
        // console.log(yt_data)
        yt_data.forEach(element => {
            const video_id = element["items"]["id"];
            const video_title = element["items"]["snippet"]["title"];
            const thumbnail = element["items"]["snippet"]["thumbnails"]["high"].url;
            const video_views = element["items"]["statistics"]["viewCount"];
            const channel_title = element["items"]["snippet"].channelTitle;
            const video_tags = element["items"]["snippet"]["tags"] || "";
            // console.log(video_id);
            // console.log(video_title);
            // console.log(thumbnail);
            // console.log(video_views); 
            console.log(channel_title);
            // console.log(video_tags);

            const video_a = document.createElement("a");
            video_a.classList.add("video-anchor");
            video_a.setAttribute("href", `https://www.youtube.com/watch?v=${video_id}`)
            video_a.setAttribute("data-tags", video_tags)
            video_a.setAttribute("data-title", video_title)
            video_a.innerHTML = `
            <div class="video-box">
                <img src="${thumbnail}" class="thumbnail">
                <p class="video-title">${video_title}</p>
                <span class="video-channel-name">${channel_title}</span>
            </div>
            `
            // <span class="video-views">Views ${video_views}</span>
            // console.log(video_a);
            
            video_container.appendChild(video_a)
        });
        
    })
})

searchBtn.addEventListener("click", ()=>{
    noVideoTextDisable()
    let flag = true;
    const filter = document.getElementById("searchField").value;
    const video_boxes = document.querySelectorAll(".video-anchor");
    video_boxes.forEach((box) => {
        const tags = box.getAttribute("data-tags")
        const title = box.getAttribute("data-title")
        const tagsArr = tags.split(",")
        console.log(tagsArr);
        if(tagsArr.includes(filter.toLowerCase())){
            flag = false
            box.style.display = ""
        }
        else if(title.toLowerCase().includes(filter.toLowerCase())){
            flag = false
            box.style.display = ""
        }
        else{
            console.log("hiielse");
            box.style.display = "none"
        }
    })
    if(flag){
        console.log("enyering flag");
        const notext = document.getElementById("no-video-text")
        notext.style.display = "block"
    }
})

function noVideoTextDisable() {
    const notext = document.getElementById("no-video-text")
    notext.style.display = "none"
}

// -- Give tags to each video
// -- onclick Search the tags of videos

