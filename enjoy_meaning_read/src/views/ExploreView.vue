<template>
    <div class="explore-view" :class="{ 'dark-mode': isCanBlack }">

        <div class="explore-container">
            <div class="explore-container-swiper">
                <swiper :modules="[EffectCards]" effect="cards" @slideChange="onSlideChange" v-if="!isShowTime">
                    <swiper-slide class="slide" :class="{ 'back-style': isCanBlack }" v-for="item, index in initRenderData"
                        :key="item.id" @click="jumpRouterEvent(item)" ref="item">
                        <div class="container-swiper-slide">
                            <div class="container-swiper-header">
                                <div class="swiper-header-left">
                                    <div class="header-left-img"
                                        :style="{ backgroundImage: `url(${item.user.avatar})` }">
                                    </div>
                                    <div class="header-left-text">
                                        {{ item.user.nickname }}
                                    </div>
                                </div>
                                <div class="swiper-header-right" @click.stop="showShare = true">
                                    <span class="iconfont icon-share"></span>
                                </div>
                            </div>
                            <div class="container-swiper-body">
                                <div class="swiper-body-main">
                                    {{ item.content }}
                                </div>
                                <div class="swiper-body-date">
                                    <div class="body-date-left" :class="{'text-color':isCanBlack}">
                                        <div class="date-left-top">
                                            {{ item.time.oldTime[0] }}
                                        </div>
                                        <div class="date-left-bottom">
                                            <div class="d-l-b">
                                                {{ item.time.oldTime[1] }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="body-date-right" :class="{'text-color':isCanBlack}">
                                        <div class="date-right-top">{{ item.title }}</div>
                                        <div class="date-right-bottom" :class="{'text-color':isCanBlack}">{{ item.provenance }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-swiper-footer" >
                                <div class="swiper-footer-left" :class="{'text-color':isCanBlack}">
                                    {{ item.time.year != 0 ? item.time.year + '年前' : item.time.month != 0 ?
                                            item.time.month + '月前' : item.time.day ? item.time.day +'天前': item.time.oldTime[1] +
                                                '天前'
                                    }}
                                </div>
                                <div class="swiper-footer-right" :class="{'text-color':isCanBlack}">
                                    <div class="swiper-footer-comment"><span>{{ item.sub_comment_count+Number(commentCount[item.id]?commentCount[item.id].length:0)}} 评论</span>
                                    </div>
                                    <div class="swiper-footer-thumbs" @click.stop="thumbsEvent">
                                        <div class="praise">
                                            <span class="iconfont icon-like" v-show="!addNum[showId]"></span>
                                            <span class="iconfont icon-like_fill" v-show="addNum[showId]"></span>
                                        </div>
                                        <div :class="{'text-color':isCanBlack}">{{ addNum[showId] === "undefined" ? item.like_count : addNum[showId] ?
                                                item.like_count : item.like_count - 1
                                        }}人</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <van-loading type="spinner" color="#1989fa" v-if="isShow" class="data-loading" />
                <div class="empty-container" v-if="isShowTime">
                    <div class="empty-container-cricle"></div>
                    <div class="empty-container-content">
                        <div class="empty-container-title">今日卡片已读完</div>
                        <div class="empty-container-reload">
                            <div class="container-reload-text">距卡片刷新还有</div>
                            <div class="container-updata-time">{{ setTime }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="explore-container-list">
                <div class="container-list-back" @click="backPrePage"><span class="iconfont icon-Update"></span></div>
                <div class="container-list-delete" @click="deletePreCard" v-if="!isShowTime"><span
                        class="iconfont icon-delete"></span>
                </div>
                <div class="container-list-collect" @click="thumbsEvent" v-if="!isShowTime">
                    <span class="iconfont icon-like1" v-show="!addNum[showId]"></span>
                    <span class="iconfont icon-like_fill" v-show="addNum[showId]"></span>
                </div>
            </div>
        </div>
        <van-share-sheet v-model:show="showShare" title="" :options="options" @select="onSelect" cancel-text=''
            :round='false' position='top' />
        <Transition name="move">
            <ExploreShowView v-if="isShowPage" @closePubEvent="closePubEvent" :currentData="singleObject" />
        </Transition>
    </div>
</template>
<script lang="ts">
import swiper, { EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperVaild } from 'swiper'
import { toRaw, onBeforeMount, onBeforeUnmount, ref, reactive, type Ref } from 'vue'

import 'swiper/css';
import 'swiper/css/effect-cards';
import { Api } from '@/apis/index';
import { commonData } from '@/publicData';
import { useDetailStore } from '@/stores/details'
import { Toast, type ToastOptions } from 'vant';
import ExploreShowView from '@/components/ExploreShowView.vue'
import type { exploreChildren, exploreObject, exploreVaild, judgeVaild } from '@/typings';
import { useRouter } from 'vue-router';

import { switchDarkMode } from '@/stores/darkTheme'

export default {
    components: {
        Swiper,
        SwiperSlide,
        ExploreShowView
    },
    setup() {
        const { isCanBlack } = switchDarkMode();
        const timer = ref();
        const setTime = ref();
        const $router = useRouter();
        const isShowTime = ref<boolean>(false);
        const showId: Ref<string> = ref('');
        const onSlideChange = async (Swiper: SwiperVaild) => {
            data.pageIndex = toRaw(Swiper).activeIndex;
            showId.value = initRenderData.value[data.pageIndex].id;
        };
        const data = reactive({
            backPreData: '',
            pageIndex: 0,

        });
        let initRenderData: Ref<exploreVaild> = ref([]);
        let addNum: Ref<any> = ref({});
        const isShow = ref<boolean>(true);
        const store = useDetailStore();
        const { commentData } = store;
        const userName: Ref<string | undefined> = ref();
        const backPrePage = () => {
            location.reload();
        };
        const deletePreCard = () => {
            let userN = userName.value || '';
            if (userN) {
                if (initRenderData.value.length != 1) {

                    let currentId = initRenderData.value[data.pageIndex].id;
                    // let ind = data.pageIndex;
                    if (addNum.value[currentId] != 'undefined') {

                        let obj = {};
                        let recordIndex = 0;
                        initRenderData.value = initRenderData.value.filter((it: { id: string; }) => {

                            return it.id != currentId;
                        });

                        for (let key in addNum.value) {
                            if (currentId != key) {
                                let o: judgeVaild = {};
                                o[key] = addNum.value[key]
                                obj = { ...obj, ...o }
                            }
                        }
                        showId.value = initRenderData.value[data.pageIndex].id;

                        addNum.value = { ...obj };

                    } else {

                        addNum.value = { ...addNum.value };
                    }
                } else {
                    setTimeData();
                    isShowTime.value = true;

                }
            } else {
                $router.push({
                    path: '/login'
                })
            }
        }

        const getExploreData = async () => {
            let arr: exploreVaild = []
            for (let i = 0; i < commentData.length; i++) {
                let item = commentData[i];
                let cur = await Api.getLessonData(item.lesson_id)
                let time: { year: number, month: number, day: number, oldTime: Array<number> } = commonData.dealTime(toRaw(cur.date_by_day));
                arr.push({ ...item, ...cur || '', time } as unknown as exploreChildren)

            }
            initRenderData.value = [...arr];
            showId.value = arr[data.pageIndex]?.id;
            isShow.value = false;

        };

        const showShare = ref(false);
        const options = [
            { name: '微信', icon: 'wechat' },
            { name: '微博', icon: 'weibo' },
            { name: '复制链接', icon: 'link' }
        ];

        const onSelect = (option: { name: string | ToastOptions | undefined; }) => {
            Toast(option.name == '复制链接' ? '复制成功' : '转发中...');
            showShare.value = false;
        };

        const singleObject = ref<Object>();
        const isShowPage = ref(false);
        const jumpRouterEvent = (item: object) => {
            isShowPage.value = true;
            singleObject.value = { ...item }
        }
        const commentCount:Ref<exploreObject>=ref({});
        const closePubEvent = (obj:exploreObject) => {
            isShowPage.value = !isShowPage.value;
            commentCount.value=obj;
        }

        const setTimeData = () => {
            let initedate = new Date();
            let curyear = initedate.getFullYear();
            let curmonth = initedate.getMonth() + 1;
            let curday = initedate.getDate();
            let str = curyear + '-' + curmonth + '-' + curday + ' ' + '23:59:59'
            let initetime = +new Date(str);
            timer.value = setInterval(() => {
                let curtime = +new Date();
                let compTime: number = parseInt(String((initetime - curtime) / 1000));
                let hour = parseInt(String(compTime / 60 / 60 % 60));
                let minutes = parseInt(String(compTime / 60 % 60));
                let second = parseInt(String(compTime % 60));
                hour = Number(hour < 10 ? '0' + hour : hour);
                minutes = Number(minutes < 10 ? '0' + minutes : minutes);
                second = Number(second < 10 ? '0' + second : second);
                setTime.value = `${hour} 时 ${minutes} 分 ${second} 秒`
            }, 1000)
        }

        const thumbsEvent = () => {
            let isCanRun = data.pageIndex;
            let NeedStore = initRenderData.value[isCanRun];
            let cardId = NeedStore.id;
            let finds = addNum.value[cardId];
            let userN = userName.value || '';
            if (userN) {
                if (finds != "undefined") {
                    let obj: judgeVaild = {}
                    obj[cardId] = !finds
                    addNum.value = { ...addNum.value, ...obj }
                    if (!finds) {
                        if (localStorage[userN]) {
                            let currentStorage = JSON.parse(localStorage[userN]);
                            let testStatus = currentStorage.find((item: { id: string; }) => item.id == NeedStore.id);
                            if (!testStatus) {
                                currentStorage.push(NeedStore);
                                localStorage[userN] = JSON.stringify(currentStorage);
                            }
                        } else {
                            localStorage[userN] = JSON.stringify([NeedStore]);
                        }
                    } else {
                        if (localStorage[userN]) {
                            let currentStorage = JSON.parse(localStorage[userN]);
                            currentStorage = currentStorage.filter((item: { id: string; }) => {
                                return item.id != NeedStore.id;
                            })
                            localStorage[userN] = JSON.stringify(currentStorage);
                        }
                    }
                } else {
                    let obj: judgeVaild = {}
                    obj[cardId] = true
                    addNum.value = { ...addNum.value, ...obj };
                    localStorage[userN] = JSON.stringify([NeedStore]);
                }
            } else {
                $router.push({
                    path: '/login'
                })
            }
            if (localStorage['thumbs']) {
                let thumbsData = JSON.parse(localStorage['thumbs']);
                let userN = userName.value || '';
                thumbsData[userN] = addNum.value;
                localStorage.thumbs = JSON.stringify(thumbsData)
            } else {
                let obj: judgeVaild = {};
                obj[userN] == addNum.value
                localStorage.thumbs = JSON.stringify(obj)
            }
        }
        
        const StorageMessage = () => {
            let Uname = '';
            for (let key in localStorage) {
                let reg = /[0-9]{11}/;
                let res = reg.test(key);
                if (res) {
                    let ct = JSON.parse(localStorage[key]);
                    if (ct.loginRun) {
                        userName.value = ct.uName;
                        Uname = ct.uName;
                    }

                }
            }

            if (localStorage.thumbs) {
                let storage = JSON.parse(localStorage.thumbs);
                if (storage[Uname]) {
                    addNum.value = storage[Uname];
                }
            }
            if (localStorage.exportComment) {
                let storageC = JSON.parse(localStorage.exportComment);
                if (storageC[Uname]) {
                    if (storageC[Uname]) {
                        commentCount.value = storageC[Uname]
                    }
                }
            }

        }
        StorageMessage();
        onBeforeMount(() => {
            getExploreData();
        })
        onBeforeUnmount(() => {
            clearInterval(timer.value);
        },)

        return {
            EffectCards,
            onSlideChange,
            backPrePage,
            data,
            initRenderData,
            isShow,
            showShare,
            onSelect,
            options,
            isShowPage,
            jumpRouterEvent,
            closePubEvent,
            singleObject,
            deletePreCard,
            setTimeData,
            setTime,
            isShowTime,
            thumbsEvent,
            addNum,
            userName,
            showId,
            isCanBlack,
            commentCount

        };
    },
};
</script>
<style lang="scss" scoped>
.explore-view {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding-bottom: 55px;
    background: linear-gradient(rgb(250, 246, 246), rgb(154, 217, 241), rgba(28, 188, 188, 0.271));

    .explore-container {
        box-sizing: border-box;
        width: 100%;
        padding: 0px 30px;

        .explore-container-swiper {
            position: relative;
            width: 260px;
            height: 360px;
            margin: 0px auto;

            .empty-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 260px;
                height: 360px;

                .empty-container-cricle {
                    position: relative;
                    width: 130px;
                    height: 130px;
                    border: 1px solid #777;
                    border-radius: 999px;
                    animation: animationMove 9s infinite linear;

                    &::after {
                        position: absolute;
                        content: '';
                        left: 0px;
                        right: 0px;
                        margin: 0px auto;
                        bottom: -4px;
                        width: 7px;
                        height: 7px;
                        border-radius: 999px;
                        background: #777;
                    }
                }

                @keyframes animationMove {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }

                .empty-container-content {
                    margin-top: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .empty-container-title {
                        font-size: 18px;
                        color: #777;
                        margin-bottom: 10px;
                    }

                    .container-reload-text {
                        font-size: 13px;
                        color: #888;
                    }

                    .container-updata-time {
                        font-size: 13px;
                        color: #888;
                    }
                }
            }
        }

        .slide {
            border-radius: 10px;
            height: 360px;
            background: linear-gradient(#fcfcfc, skyblue, rgb(24, 71, 90));

            .container-swiper-slide {
                box-sizing: border-box;
                width: 260px;
                height: 100vh;
                padding: 10px;

                .container-swiper-header {
                    box-sizing: border-box;
                    width: 240px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .swiper-header-left {
                        display: flex;
                        align-items: center;

                        .header-left-img {
                            width: 36px;
                            height: 36px;
                            margin-right: 10px;
                            border-radius: 999px;
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center center;
                        }

                        .header-left-text {
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }

                    .swiper-header-right {
                        width: 26px;
                        height: 26px;
                        line-height: 26px;
                        text-align: center;

                        .icon-share {
                            font-size: 26px;
                        }
                    }
                }

                .container-swiper-body {
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    height: 260px;

                    .swiper-body-main {
                        box-sizing: border-box;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 5;
                        padding: 10px 0px;
                        height: 160px;
                        font-size: 17px;
                        line-height: 30px;
                        overflow: hidden;
                    }

                    .swiper-body-date {
                        display: flex;
                        width: 100%;
                        height: 60px;
                        border: 1px solid skyblue;
                        color: black;

                        .body-date-left {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            width: 60px;
                            height: 60px;
                            transform: rotate(-45deg);

                            .date-left-top {
                                font-size: 15px;
                                transform: rotate(45deg);
                            }

                            .date-left-bottom {
                                font-size: 15px;
                                width: 40px;
                                text-align: center;
                                border-top: 1px solid skyblue;

                                .d-l-b {
                                    transform: rotate(45deg);

                                }
                            }
                        }

                        .body-date-right {
                            border-left: 1px solid skyblue;
                            height: 59px;
                            padding: 0px 10px;

                            .date-right-top {
                                height: 30px;
                                line-height: 30px;
                                font-size: 14px;
                            }

                            .date-right-bottom {
                                line-height: 20px;
                                font-size: 14px;
                                color: rgb(25, 24, 24);
                                width: 163px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }

                .container-swiper-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 60px;

                    .swiper-footer-left {
                        font-size: 14px;
                        color: rgb(244, 178, 54);

                    }

                    .swiper-footer-right {
                        display: flex;
                        align-items: center;
                        color: rgb(244, 178, 54);
                    }

                    .swiper-footer-comment {
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        margin-right: 10px;
                        font-size: 14px;
                    }

                    .swiper-footer-thumbs {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: rgb(244, 178, 54);

                        .praise {
                            width: 20px;
                            height: 30px;
                            line-height: 30px;
                            margin-right: 5px;

                            .icon-like {
                                font-size: 20px;
                            }

                            .icon-like_fill {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }

        .explore-container-list {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 60px;

            .container-list-back,
            .container-list-collect {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 999px;
                background: radial-gradient(circle, #fff, skyblue);
                box-shadow: 0px 0px 4px 0px #fff;
            }

            .icon-Update,
            .icon-like1 {
                font-size: 20px;
                font-weight: bold;
                color: rgb(207, 129, 207);
            }

            .icon-like_fill {
                font-size: 20px;
                color: rgb(208, 19, 19);
            }

            .container-list-delete {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 999px;
                background: #fff;
                background: radial-gradient(circle, #fff, skyblue);
                box-shadow: 0px 0px 4px 0px #fff;
            }

            .icon-delete {
                font-size: 23px;
                font-weight: bold;
                color: rgb(207, 129, 207);
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

.dark-mode {
    background: black;
}

.back-style {
    background: rgb(53, 52, 52) !important;
    ;
    color:#efefef;
}
.text-color{
    color:#efefef !important;
}

.move-enter,
.move-leave-to {
    transform: scale(0);
}

.move-enter-active,
.move-leave-active {
    transition: all 0.6s linear;
}

.move-enter-to,
.move-leave {
    transform: scale(1);
}
</style>