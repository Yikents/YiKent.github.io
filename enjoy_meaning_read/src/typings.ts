
export interface lessonValid {
    article: string,
    author: { id: string, name: string }
    created_at: string,
    date_by_day: string,
    id: string,
    provenance: string,
    title: string,
    updated_at: string,
}

export interface homeType {
    [x: string]: any
    map(arg0: (item: mapVaid) => {
        time: { year: number; month: number; day: number; oldTime: Array<number> };
        week: string;
        month: string;
        day: string;
        constructor: Function; toString(): string; toLocaleString(): string; valueOf(): Object; hasOwnProperty(v: PropertyKey): boolean; isPrototypeOf(v: Object): boolean; propertyIsEnumerable(v: PropertyKey): boolean;
    }): any[]
    author: Object,
    title: string,
    article: string,
    provenance: string,
    date_by_day: string


}

export interface mapVaid {
    date_by_day: string,
}

export interface homeChildren {
    article: string,
    author: { id: string, name: string },
    date_by_day: string,
    day?: string,
    id: string,
    month?: string,
    provenance: string,
    time: { year: number, month: number, day: number, oldTime: Array<number> },
    title: string,
    week?: string
}

export interface commentVaild {
    content: string,
    content_tr_zh_hant: string,
    id: string,
    lesson_id: string,
    like_count: number
    my_like: false,
    status: number,
    sub_comment_count: number
    updated_at: number
    user: {

        avatar: string,
        id: string,
        nickname: string
    }
}

export interface exploreChildren {
    item: any;
    article: string,
    author: { id: string, name: string },
    id: string,
    name: string,
    content: string,
    content_tr_zh_hant: string,
    created_at: string,
    date_by_day: string,
    lesson_id: string,
    like_count: number,
    my_like: false,
    provenance: string,
    status: number,
    sub_comment_count: number,
    time: { year: number, month: number, day: number, oldTime: Array<number> }
    title: string,
    user: { id: string, nickname: string, avatar: string, }
}
export type exploreVaild = Array<exploreChildren>

export interface scrollVail {
    target: {
        scrollTop: number;
        scrollHeight: number;
        children: {
            scrollHeight: number
        }[]

    }
}

export interface renderVailItem {
    article: string,
    author: { id: string, name: string },
    comment: Array<any>,
    date_by_day: string,
    day: string,
    id: string,
    month: string,
    provenance: string,
    time: { year: number, month: number, day: number, oldTime: Array<number> }
    title: string,
    updated_at: string,
    week: string
}
export type renderVail = Array<renderVailItem>
export interface emptyTextVaild {
    way: string,
    like: string,
    record: string
}
export interface CalendarObject {
    id: string,
    article: string,
    title: string,
    provenance: string,
    date_by_day: string,
    author: {
        id: string,
        name: string
    },
    updated_at: string,
    created_at: string,
    day?:number
}

export interface CalendarItem {
    dataObj?: any;
    type: number,
    text?: string,
}
export type CalendarVaild = Array<CalendarItem>

export interface objectCalendarVaild{
    [obj:string]:CalendarObject
}
export interface CalendarSendData {
    article: string
    author: { id: string, name: string }
    created_at: string
    date_by_day: string
    day: string
    id: string
    month: string
    provenance: string
    time: { year: number, month: number, day: number, oldTime: Array<number> }
    title: string
    updated_at: string
    week: string
}

export interface RecordList {
    like: exploreVaild,
}

export interface objectVaild {
    [elem: string]: judgeVaild
}
export interface judgeVaild {
    [elem: string]: boolean
}
export interface storageVaild {
    [str: string]: { time: string, count: number }
}
export interface loginVaild {
    loginRun?: boolean
    logoUrl?: string,
    passwords?: string,
    telephone?: string,
    uName?: string
}

export interface exploreAnnounce{
    name:string,
    logoUrl:string,
    text:string,
    time:{year: number, month: number, day: number, oldTime:Array<number>}
}
export type exploreAnnounceVaild=Array<exploreAnnounce>;
export interface exploreComment{
    [elem:string]:exploreAnnounceVaild
}
export interface exploreObject{
    [elem:string]:exploreComment
}