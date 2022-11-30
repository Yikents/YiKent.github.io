<template>
    <div class="home-view" :class="{ 'dark-mode':isCanBlack}">
        <div class="home-swiper">
            <div class="home-swiper-title">
                <div class="swiper-title-page">{{ indexStatus + 1 }}</div>
                <div class="swiper-title-date">
                    <div class="title-date-week">
                        <div class="data-week-l">{{ initHomeData[indexStatus]?.week || '' }}</div>
                        <div class="data-week-r" @click.self="jumpCalendarEvent">点击阅读更多</div>
                    </div>
                    <div class="title-date-detail">
                        {{ `${initHomeData[indexStatus]?.month || ''}月${initHomeData[indexStatus]?.day || ''}` }}</div>
                </div>
            </div>
            <div class="home-swiper-item">
                <swiper class="swiper" @slideChange="getCurrentIndex">
                    <swiper-slide class="slide" v-for="(item, index) in initHomeData" :key="item.id"
                        @click="jumpToHomeDetail(initHomeData, index)">
                        <div class="slide-card">
                            <div class="card-main-title">{{ item.title }}</div>
                            <div class="card-container">
                                <div class="card-main-content">
                                    {{ item.article }}
                                </div>
                                <div class="card-main-footer">
                                    <div class="card-main-left"><span>107喜欢</span> . <span>118想法</span></div>
                                    <div class="card-main-right" :class="{ cardActive: judgeReaderStatus[item.id] }"
                                        @click.stop="readerEvent(item.id)">{{ judgeReaderStatus[item.id] ? '已阅读' : '阅读'
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <van-loading type="spinner" color="#1989fa" v-if="isShow" class="data-loading" />
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, toRaw, type Ref } from 'vue'
import { useDetailStore } from '@/stores/details'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Api } from '@/apis/index';
import swiper from 'swiper';
import type { Swiper as SwiperVaild } from 'swiper';
import type { homeChildren, judgeVaild, objectVaild } from '@/typings'
import { commonData, dealWeek, WordTime } from '@/publicData'

import { switchDarkMode } from '@/stores/darkTheme'


export default defineComponent({
    name: 'swiper-example-default',
    title: 'Default',
    url: import.meta.url,
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        onBeforeMount(() => {
            getHomeData();
        })
        let initHomeData: Ref<Array<homeChildren>> = ref([]);
        let judgeReaderStatus: Ref<judgeVaild> = ref({});
        const $router = useRouter()
        const store = useDetailStore();
        const { deliveryData } = store;
        const isShow = ref(true);
        const { isCanBlack } = switchDarkMode();
        const getHomeData = async () => {
            let { data } = await Api.getHomeLatest();
            initHomeData.value = data.map((item) => {
                let time = commonData.dealTime(item.date_by_day);
                let month = WordTime[time.oldTime[0]]
                let day = WordTime[time.oldTime[1]]
                let curtemper: number = new Date(time.oldTime[2] + '/' + time.oldTime[0] + '/' + time.oldTime[1]).getDay();
                let week: string = dealWeek[curtemper];
                return {
                    ...item,
                    time,
                    week,
                    month,
                    day
                }
            })
            isShow.value = false;
        }
        const jumpToHomeDetail = (dat: Array<homeChildren>, ind: number) => {
            deliveryData(toRaw(dat), ind);
            $router.push({
                path: '/home-detail'
            })
        }
        const indexStatus = ref(0);
        const getCurrentIndex = (Swiper: SwiperVaild) => {
            indexStatus.value = toRaw(Swiper).activeIndex
        }


        const readerEvent = (id: string) => {
            if (!judgeReaderStatus.value[id]) {
                judgeReaderStatus.value[id] = !judgeReaderStatus.value[id];
                let o: objectVaild = {};
                o[userName.value] = judgeReaderStatus.value;
                if (localStorage.readered) {
                    let currentStorage = JSON.parse(localStorage.readered);
                    currentStorage = { ...currentStorage, ...o };
                    localStorage.readered = JSON.stringify(currentStorage);
                } else {
                    localStorage.readered = JSON.stringify(o);

                }
            }
        }

        const jumpCalendarEvent = () => {
            $router.push({
                path: '/calendar/currentHome'
            })
        }
        const userName = ref('');
        const getCurrentUserMessage = () => {
            let Uname = '';
            for (let key in localStorage) {
                let reg = /[0-9]{11}/;
                let res = reg.test(key);
                if (res) {
                    let ct = JSON.parse(localStorage[key]);
                    if (ct.loginRun) {
                        Uname = ct.uName;
                    }

                }
            }
            userName.value = Uname;

            if (localStorage.readered) {
                let storage = JSON.parse(localStorage.readered);
                if (storage[Uname]) {
                    judgeReaderStatus.value = storage[Uname]
                }
            }
        }
        getCurrentUserMessage();
        return {
            getHomeData,
            initHomeData,
            jumpToHomeDetail,
            isShow,
            getCurrentIndex,
            indexStatus,
            readerEvent,
            judgeReaderStatus,
            jumpCalendarEvent,
            getCurrentUserMessage,
            userName,
            isCanBlack
        }
    }
})
</script>
<style lang="scss" scoped>
.home-view {
    box-sizing: border-box;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: linear-gradient(rgba(222, 251, 251, 0.3), rgba(188, 248, 248, 0.6), #14f1f192);
}

.home-swiper-title {
    display: flex;
    align-items: center;
    height: 130px;
    padding-left: 40px;

    .swiper-title-page {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 36px;
        color: #aaa;
    }

    .swiper-title-date {
        color: #aaa;

        .title-date-week {
            display: flex;
            font-size: 13px;

            .data-week-r {
                margin-left: 10px;
                position: relative;
                width: 130px;
                text-align: right;
                color: rgb(218, 166, 103);

                &::before {
                    position: absolute;
                    content: '';
                    left: 10px;
                    top: 0px;
                    bottom: 0px;
                    margin: auto 0px;
                    width: 6px;
                    height: 6px;
                    border-radius: 9999px;
                    background: rgb(218, 166, 103);
                }

                &::after {
                    position: absolute;
                    content: '';
                    left: 16px;
                    top: 0px;
                    bottom: 0px;
                    margin: auto 0px;
                    width: 26px;
                    height: 1px;
                    background: rgb(218, 166, 103);
                }

            }

        }

        .title-date-detail {
            font-size: 13px;
            font-size: 13px;
        }
    }
}

.home-swiper-item {
    position: relative;
    width: 100%;

    .swiper {
        height: 560px;

        .slide {
            padding: 0px 20px;

            .slide-card {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: calc(100% - 5px);
                height: 100%;
                border-radius: 20px;
                background: rgba(255, 255, 255, 0.5);

                .card-main-title {
                    padding-top: 30px;
                    padding-right: 30px;
                    display: flex;
                    align-items: flex-end;
                    width: 100%;
                    writing-mode: vertical-lr;
                    letter-spacing: 10px;
                    font-size: 30px;
                }

                .card-main-content {
                    position: relative;
                    box-sizing: border-box;
                    width: 100%;
                    height: 180px;
                    line-height: 30px;
                    padding: 0px 20px;
                    font-size: 17px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 6;
                    text-overflow: ellipsis;
                    overflow: hidden;

                    &::after {
                        position: absolute;
                        content: '';
                        top: 0px;
                        bottom: 0px;
                        left: 0px;
                        right: 0px;
                        background: linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, 0.6));

                    }

                }

                .card-main-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 60px;
                    padding: 0px 20px;
                    margin: 10px 0px;

                    .card-main-left {
                        font-size: 14px;
                        color: #777;
                    }

                    .card-main-right {
                        padding: 5px 20px;
                        background: #c49f68;
                        border-radius: 999px;
                        color: #fff;
                    }

                    .cardActive {
                        background: #ccc !important;
                        color: #eee !important;
                    }
                }

            }
        }
    }
}

.data-loading {
    position: absolute;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
}

.dark-mode{
    background:black;
}
</style>