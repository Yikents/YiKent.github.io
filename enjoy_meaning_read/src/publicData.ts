export const commonData={
    dealTime:(value: string)=>{
        let date=new Date();
        let currentYear=date.getFullYear();
        let currentMonth=date.getMonth()+1;
        let currentDay=date.getDate();
        let time=String(value);
        let year=parseInt(time.substring(0,4));
        let month=parseInt(time.substring(4,6));
        let day=parseInt(time.substring(6,8));
        if(currentYear>year){
            return {
                year:currentYear-year,
                month,
                day,
                oldTime:[month,day,year]
            }
        }else{
            if(currentMonth>year){
    
                return {
                    year:0,
                    month:currentMonth-month,
                    day,
                    oldTime:[month,day,year]
                }
            }else{
                return {
                    year:0,
                    month:0,
                    day:currentDay-day,
                    oldTime:[month,day,year]
                }
            }
        }
    
    
    }
}
export const WordTime:any={
    1:'一',
    2:'二',
    3:'三',
    4:'四',
    5:'五',
    6:'六',
    7:'七',
    8:'八',
    9:'九',
    10:'一O',
    11:'一一',
    12:'一二',
    13:'一三',
    14:'一四',
    15:'一五',
    16:'一六',
    17:'一七',
    18:'一八',
    19:'一九',
    20:'廿十',
    21:'廿一',
    22:'廿二',
    23:'廿三',
    24:'廿四',
    25:'廿五',
    26:'廿六',
    27:'廿七',
    28:'廿八',
    29:'廿九',
    30:'三O',
    31:'三一'
}

export const dealWeek:any={
    0:'周日',
    1:'周一',
    2:'周二',
    3:'周三',
    4:'周四',
    5:'周五',
    6:'周六'
}

export const textData=[
    {
        type:'night',
        text:'夜间模式',
        arrow:'icon-arrowright'

    },
    {
        type:'read',
        text:'阅读版式',
        arrow:'icon-arrowright'

    },
    {
        type:'word',
        text:'语言',
        arrow:'icon-arrowright'

    },
    {
        type:'notice',
        text:'回复通知',
        arrow:'icon-arrowright'

    },
    {
        type:'startUp',
        text:'默认启动项',
        arrow:'icon-arrowright'

    },
    {
        type:'',
        text:''

    },
    {
        type:'share',
        text:'分享给朋友',
        arrow:'icon-arrowright'

    },
    {
        type:'about',
        text:'关于',
        arrow:'icon-arrowright'

    },
]

export const renderMonth=[
    {
        type:12,
        text:'十二',
        dataObj:{},
    },
    {
        type:11,
        text:'十一',
        dataObj:{}
    },
    {
        type:10,
        text:'十',
        dataObj:{}
    },
    {
        type:9,
        text:'九',
        dataObj:{}
    },
    {
        type:8,
        text:'八',
        dataObj:{}
    },
    {
        type:7,
        text:'七',
        dataObj:{}
    },
    {
        type:6,
        text:'六',
        dataObj:{}
    },
    {
        type:5,
        text:'五',
        dataObj:{}
    },
    {
        type:4,
        text:'四',
        dataObj:{}
    },
    {
        type:3,
        text:'三',
        dataObj:{}
    },
    {
        type:2,
        text:'二',
        dataObj:{}
    },
    {
        type:1,
        text:'一',
        dataObj:{}
    }
]

export const beforehandDealTime=()=>{
    let date=new Date();
    let year:string|number=date.getFullYear();
    let month:string|number=date.getMonth()+1;
    let day:string|number=date.getDate();
    year=year<10?'0'+year:year;
    month=month<10?'0'+month:month;
    day=day<10?'0'+day:day;
    console.log(`${year}${month}${day}`);
    return `${year}${month}${day}`
}
