<template>
    <div class="calendar-view" :class="{'dark-mode':isCanBlack}">
        <div class="calendar-header">
            <div class="calendar-header-top">
                <div class="calendar-header-close" @click="backPreRouter"><span class="iconfont icon-close"></span>
                </div>
                <div class="calendar-theme">
                    <div class="calendar-select" @click="confirmCurrentEvent">{{ temper }}</div>
                </div>
            </div>
        </div>
        <div class="calendar-body">
            <div class="calendar-body-left">
                <div class="body-left-list">
                    <div class="left-list-item" v-for="item in renderMonth"><a :class="{ 'calendar-active': item.type == activeIndex }"
                            :href="`#${item.type}`" @click.stop="activeCurrentSelect(item.type)">
                            {{ item.text }} 月</a></div>
                </div>
            </div>
            <div class="calendar-body-right" @scroll="listenScrollEvent">
                <div class="body-right-list">
                    <div class="body-right-item" v-for="it in currentRenderData"
                        v-show="Object.keys(it.dataObj).length != 0">
                        <div class="right-item-theme" ref="monthIndex"><a :name="it.type" :class="{'ft-color':isCanBlack}">{{ it.text }}月</a></div>
                        <div class="right-item-container">
                            <div class="right-item-day" :class="{'back-color':isCanBlack}" v-for="its in dealTimeData(it.type)" :key="its"
                                @click.stop="jumpToDetail(it.dataObj[its])">
                                <div class="item-day-i">{{ its }}</div>
                                <div class="item-day-text">{{ it.dataObj[its]?.title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <van-loading type="spinner" color="#1989fa" v-if="isShow" class="data-loading"/>
            </div>
        </div>
        <Transition name="move">
            <div class="layer" @click="confirmCurrentEvent" v-show="isShowCalendar">
                <van-datetime-picker v-model="currentDate" :min-date="minYear" :max-date="maxYear" type="date"
                    :columns-order="['year']" :formatter="formatter" class="datetime" :show-toolbar="false" />
            </div>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import { ref, toRaw, Transition, type Ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { renderMonth } from '@/publicData'
import { Api } from '@/apis/index';
import type {  CalendarObject, CalendarItem, CalendarSendData, objectCalendarVaild } from '@/typings';
import { commonData, dealWeek, WordTime } from '@/publicData'
import { useDetailStore } from '@/stores/details';

import {switchDarkMode}from "@/stores/darkTheme"
const {isCanBlack}=switchDarkMode();


const currentDate = ref(new Date());
const minYear = new Date(2023, 0, 0);
const maxYear = new Date(2024, 0, 0);
const isShowCalendar = ref(false);
const { getCalendarData } = Api;
const isShow=ref(true)
const formatter = (type: string, val: number) => {
    if (type === 'year') {
        return val;
    } else {
        return '';
    }
};
const temper = ref(2022);
const $router = useRouter();
const $route=useRoute();
const backPreRouter = () => {
    if(CurrentStr.value=='read'){
        $router.push({
            path:'/my'
        })
    }else{
        $router.push({
            path:'/'
        })
    }
}
const confirmCurrentEvent = () => {
    isShowCalendar.value = !isShowCalendar.value;
    let getTime = +currentDate.value;
    temper.value = new Date(getTime).getFullYear();
    if (!isShowCalendar.value) {
        dealCalendarData();
    }
}

const dealTimeData = (num: number) => {
    let year = temper.value;
    let date = new Date(year, num, 1);
    date.setDate(date.getDate() - 1);
    let day = date.getDate();
    return day;
}

const activeIndex = ref(11);
const activeCurrentSelect = (index: number) => {
    activeIndex.value = index;
}
const monthIndex:Ref<Array<HTMLSelectElement>> = ref([]);
const listenScrollEvent = () => {
    let arr = monthIndex.value;
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i].getBoundingClientRect().top < 100) {
            activeIndex.value = arr.length - i;
        }
    }
}

const currentRenderData: Ref<CalendarItem[]> = ref([]);
const CurrentStr:Ref<string|string[]>=ref('');
const dealCalendarData = () => {
    let startTime = temper.value + '0101';
    let endTime = temper.value + '1231';

    getCalendarData(startTime, endTime).then(data => {
        currentRenderData.value = [];
        let arr: Array<CalendarItem> = [...renderMonth];
        data.forEach((item: CalendarObject) => {
            let currentData = String(item.date_by_day)
            let m = Number(currentData.substring(4, 6));
            let d = Number(currentData.substring(6));
            arr = arr.map((it) => {
                if (it.type == m) {
                    if (it.dataObj) {
                        let obj: objectCalendarVaild = {};
                        obj[d] = { ...item, day: d };
                        return {
                            ...it,
                            dataObj: { ...it.dataObj, ...obj }
                        }

                    } else {
                        let obj:objectCalendarVaild = {};
                        obj[d] = { ...item, day: d };
                        return {
                            ...it,
                            dataObj: { ...obj }
                        }
                    }
                } else {
                    return it
                }


            })
        });
        currentRenderData.value = arr;
        isShow.value=false;
    });

    CurrentStr.value=$route.params.text;
}
dealCalendarData();


const store = useDetailStore();
const { deliveryData } = store;

const jumpToDetail = (data: CalendarObject) => {
    let time = commonData.dealTime(data.date_by_day);
    let month = WordTime[time.oldTime[0]]
    let day = WordTime[time.oldTime[1]]
    let curtemper: number = new Date(time.oldTime[2] + '/' + time.oldTime[0] + '/' + time.oldTime[1]).getDay();
    let week: string = dealWeek[curtemper];
    let sendData:CalendarSendData = {
        ...data,
        time,
        week,
        month,
        day
    }
    deliveryData(toRaw([sendData]), 0);
    $router.push({
        path: '/home-detail'
    })

}

</script>
<style lang="scss" scoped>
.calendar-view {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: linear-gradient(rgba(222, 251, 251, 0.3), rgba(188, 248, 248, 0.6), #14f1f1fc);
    z-index: 999;

    .calendar-header {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 55px;

        &::after {
            position: absolute;
            content: '';
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            backdrop-filter: blur(20px);
            z-index: 2;
        }

        .calendar-header-top {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;

            z-index: 3;

            .calendar-header-close {
                width: 40px;
                height: 55px;
                line-height: 55px;
                text-align: center;

                .icon-close {
                    font-size: 20px;
                    font-weight: bolder;
                }
            }

            .calendar-theme {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 55px;

                .calendar-select {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;

                    &::after {
                        margin: 5px 0px 0px 5px;
                        display: block;
                        content: '';
                        border: 5px solid black;
                        border-color: black transparent transparent;
                        border-radius: 2px;
                    }
                }
            }
        }
    }

    .calendar-body {
        display: flex;
        height: 100vh;

        .calendar-body-left {
            width: 70px;
            height: 100vh;

            .left-list-item {
                height: 40px;
                line-height: 40px;
                text-align: right;
                font-size: 15px;
                color: gray;

                a {
                    display: block;
                    width:70px;
                    height:100%;
                    background: none;
                    text-decoration: none;
                    color: #aaa;
                }

            }

            .calendar-active {
                color: black !important;
            }
        }

        .calendar-body-right {
            flex: 1;
            box-sizing: border-box;
            height: 100vh;
            overflow: scroll;

            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            .body-right-list {
                padding-bottom: 60px;

                .right-item-theme {
                    padding: 0px 20px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .right-item-container {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;

                    .right-item-day {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 78px;
                        padding: 10px 15px;
                        margin: 10px 0px 10px 20px;
                        background: rgba(255, 255, 255, 0.7);
                        color: #aaa;

                        .item-day-i {
                            font-size: 26px;
                            padding: 10px 0px;
                        }

                        .item-day-text {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }

    .datetime {
        position: fixed;
        width: 100%;
        bottom: 0px;
        left: 0px;
    }

    .layer {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 33;
        background: rgba(1, 1, 1, 0.6)
    }

    .move-enter,
    .move-leave-to {
        transform: translateY(100%);
    }

    .move-enter-active,
    .move-leave-active {
        transition: all .3s linear;
    }

    .move-enter-to,
    .move-leave {
        transform: translateY(0px);
    }
}
.data-loading{
    position:absolute;
    width:80px;
    height:80px;
    line-height: 80px;
    text-align: center;
    left:0px;
    right:0px;
    top:0px;
    bottom:0px;
    margin:auto;
}
.dark-mode{
    background:rgb(54, 54, 54);
    color:#fff;
}

.back-color{
    background: #fff !important;
    color:#777 !important;
}
.ft-color{
    color:#fff !important;
}
</style>