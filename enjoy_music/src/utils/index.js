import axios from "axios";
export const bgUrl = [
    require("../assets/image/playing.gif"),
    require("../assets/image/pausing.png"),
];

export const PlayerButton = [
    require("../assets/image/bigplay.png"),
    require("../assets/image/bigpaused.png"),
]
export const AxiosApi = async (id) => {
    return await axios.get(`http://localhost:3000/artist/top/song?id=${id}`)
        .then((data) => {
            let it=data.data.songs[0]
            return {
                songName: it.name,
                audioId: it.id,
                publishTime: it.publishTime,
                songerTime: it.dt,
                imageUrl: it.al.picUrl,
                type: it.originCoverType,
                curSonger: it.ar[1]?.name,
                initSonger: it.ar[0]?.name,
                data:data.data.songs
            }
        })
}

export const GetSongApi = async (id) => {
    return await axios.get(`http://localhost:3000/song/url?id=${id}`)
        .then((data) => {
            return data.data.data[0].url
        })
}

export const GetHotWord=()=>{
   return  axios.get(`http://localhost:3000/search/hot/detail`)
        .then((data) => {
            // console.log(data.data.data);
            let curArr=data.data.data.map(it=>{
                return {
                    text:it.searchWord
                }
            })
            return curArr
        })
}

export const SearchSongDetail=(text)=>{
    return axios.get(`http://localhost:3000/search/suggest?keywords=${text}`).then((data)=>{
        return data.data.result.albums
    })
}