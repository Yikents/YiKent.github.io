import http from "@/http";
import type {  exploreType, homeType, lessonValid } from "@/typings"

export const Api = {
    getExploreLatest: async () => {
        const { data } = await http.request<exploreType>({
            url: 'today_recommends',
            method: 'get'
        });
        // console.log(data);
        return data;
    },
    getHomeLatest: () => {
        return http.request<homeType>({
            url: 'lessons?form=20220101&to=20230930&updated_at=1664527511',
            method: 'get'
        })
    },
    getLessonData: async (id: string) => {
        const { data } = await http.request<lessonValid>({
            url: `lessons/${id}`,
            method: 'get'
        });
        return data;

    },
    getUserCommentData: (id: string) => {
        const data = http.request({
            url: `lessons/${id}/comments?offset=0&limit=13`,
            method: 'get'
        })
        return data;
    },
    getCalendarData: (startTime: string, endTime: string) => {
        const data = http.request({
            url: `lessons?form=${startTime}&to=${endTime}`,
            method: 'get'
        }).then(({data})=>{
            return data
        })
        return data;
    }
}