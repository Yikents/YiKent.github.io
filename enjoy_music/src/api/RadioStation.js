import axios from "axios";
export const CherryAudio=()=>{
   return axios.get('https://apis.netstart.cn/one/radio/htmlcontent/3861').then((data)=>{
        let cur=data.data.data
        return {
            audio:cur.audio,
            author:cur.author_list[0].user_name,
            title:cur.title
        };
    })
}
