<template>
    <div class="home-detail" :class="{'dark-mode':isCanBlack}">
        <div class="home-detail-header" :class="{ 'active-background': isHidden }">
            <div class="detail-header-back" @click="backPrePage"><span class="iconfont icon-arrowleft"></span></div>
            <div class="detail-header-right" v-show="isHidden">
                <div class="header-right-title">{{ detailData[active].title }}</div>
                <div class="header-right-time">{{ month }}月{{ day }}</div>
            </div>
        </div>
        <div class="home-detail-body">
            <van-swipe class="my-swipe" :show-indicators="data.isRun" :initial-swipe="active" :loop="false"
                @change="onChange">
                <van-swipe-item v-for="(item, index) in renderData" :key="item.id">
                    <div class="detail-body-container" @scroll.stop="scrollEvent($event)">
                        <div class="body-container-header">
                            <div class="container-header-title">
                                <div class="container-header-t1">{{ month }}月{{ day }}</div>
                                <div class="container-header-t2">{{ item.title }}</div>
                            </div>
                        </div>
                        <div class="body-container-main">
                            <div class="container-article-area">{{ item.article }}</div>
                            <div class="container-article-footer">
                                <div class="article-footer-title">{{ `《${item.provenance}》` }}</div>
                                <div class="article-footer-name">{{ item.author.name }}</div>
                            </div>
                            <div class="punch-card" :class="{'card-back':isCanBlack}">
                                <div class="punch-card-left" :class="{activeWord: isActiveWord}">{{ isActiveWord? "今天已完成打卡" : '阅读已完成,即刻完成打卡'
                                }}</div>
                                <div class="punch-card-right" @click="completedRead"><span class="iconfont icon-gouxuan"
                                        :class="{ activeWord: isActiveWord }"></span></div>
                            </div>


                        </div>
                        <div class="body-container-comment">
                            <div class="container-comment-title">想法</div>
                            <div class="container-comment-user">
                                <label>
                                    <div class="comment-user-img"><span class="iconfont icon-user"></span></div>
                                    <input class="comment-user-input" placeholder="写点什么吧..." />
                                </label>

                            </div>

                            <div class="container-comment-main">
                                <div class="comment-main-user">
                                    <div class="comment-main-item" v-for="it in item.comment" :key="it.id">
                                        <div class="comment-main-header">
                                            <div class="main-header-img"
                                                :style="{ backgroundImage: `url(${it.user.avatar})` }"></div>
                                            <div class="main-header-name">{{ it.user.nickname }}</div>
                                        </div>
                                        <div class="comment-main-body">{{ it.content }}
                                        </div>
                                    </div>
                                </div>
                                <div class="comment-main-show">全部{{ item.comment.length }}条想法</div>
                            </div>

                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="home-detail-footer" :class="{ 'footer-active': isAdd,'back-style':isCanBlack }" v-if="isShow">
            <div class="detail-footer-left">
                <div class="footer-left-like"><span class="iconfont icon-like"></span><span>123</span></div>
                <div class="footer-left-show"><span class="iconfont icon-liulan"></span><span>84</span></div>
            </div>
            <div class="detail-footer-right">
                <div class="footer-right-share">
                    <span class="iconfont icon-share"></span>
                </div>
            </div>
        </div>

        <van-loading type="spinner" color="#1989fa" v-if="isShowLoad" class="data-loading" />
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, ref, toRaw, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDetailStore } from '@/stores/details'
import { storeToRefs } from 'pinia'
import { WordTime } from '@/publicData'
import { Api } from '@/apis'
import type { renderVail, storageVaild } from "@/typings"
import {switchDarkMode}from "@/stores/darkTheme";
const {isCanBlack}=switchDarkMode();
const data = reactive({
    isRun: false
})
const isActiveWord = ref(false);
const active = ref();
const month = ref();
const day = ref();
const isHidden = ref(false);
const isShow = ref(false);
const isAdd = ref(false);
const store = useDetailStore();
const { detailData, currentIndex } = storeToRefs(store);
const isShowLoad = ref(true);
onBeforeMount(() => {
    active.value = toRaw(currentIndex).value;
    dealCurrentData(active.value);
    dealRenderData();

})
const dealCurrentData = (val: string | number) => {
    let cur = toRaw((detailData as any)._rawValue)[val].time.oldTime;
    const monthIndex: number = cur[0];
    const dayIndex: number = cur[1]
    month.value = WordTime[monthIndex];
    day.value = WordTime[dayIndex];
}
const $router = useRouter();
const backPrePage = () => {
    $router.go(-1);
}
const onChange = (e: string) => {
    dealCurrentData(e);
}

const scrollEvent = (e: any) => {
    if (e.target.scrollTop > 260) {
        isHidden.value = true;
    } else {
        isHidden.value = false;
    }

    let toHeight = e.target.scrollHeight - (e.target.children[2].scrollHeight + window.innerHeight);
    if (e.target.scrollTop > toHeight) {
        isShow.value = true;
        if (e.target.scrollTop <= toHeight + e.target.children[2].scrollHeight) {
            isAdd.value = true;
        } else {
            isAdd.value = false;
        }
    } else {
        isShow.value = false;
    }
}

const renderData = ref<renderVail | object>()
const dealRenderData = async () => {
    let arr = [];
    for (let i = 0; i < detailData.value.length; i++) {
        let item = detailData.value[i].id;
        let ct = await Api.getUserCommentData(item)
        arr.push({ ...detailData.value[i], comment: ct.data })

    }
    renderData.value = [...arr];
    isShowLoad.value = false;

}
const userName: Ref<string> = ref('');
const completedRead = () => {
    if (!isActiveWord.value) {
        isActiveWord.value = !isActiveWord.value;
        let date = new Date();
        let month = date.getMonth()+1;
        let day = date.getDate();
        if (localStorage.completedCard) {
            let storage = JSON.parse(localStorage.completedCard);
            if(storage[userName.value]){
                let count=storage[userName.value].count+1;
                let obj:storageVaild= {};
                obj[userName.value] = {time:`${month}${day}`,count};
                localStorage.completedCard = JSON.stringify({ ...storage, ...obj });

            }else{
                let obj:storageVaild= {};
                obj[userName.value] = {time:`${month}${day}`,count:1};
                localStorage.completedCard = JSON.stringify({ ...storage, ...obj });
            }
        } else {
            let obj: storageVaild = {};
            obj[userName.value] = {time:`${month}${day}`,count:1};
            localStorage.completedCard = JSON.stringify(obj)
        }
    }

}

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

    if(localStorage.completedCard){
        let localData=JSON.parse(localStorage.completedCard);
        if(localData[Uname]){
            let time=localData[Uname].time;
            let date=new Date();
            let str=String(date.getMonth()+1)+String(date.getDate());
            if(time!=str){
                isActiveWord.value=false;
            }else{
                isActiveWord.value=true;
            }
        }
    }

}
getCurrentUserMessage();

</script>
<style lang="scss" scoped>
.home-detail {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #fff;
    z-index: 3;

    .home-detail-header {
        box-sizing: border-box;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 55px;
        padding: 0px 10px;
        z-index: 6;

        &.active-background {
            background: rgba(255, 255, 255, 0.6);
        }

        .detail-header-back {
            width: 20px;
            height: 30px;
            line-height: 30px;
            text-align: center;

            .icon-arrowleft {
                font-size: 20px;
                font-weight: bold;
            }
        }

        .detail-header-right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 55px;
            margin-right: 10px;

            .header-right-title {
                font-size: 14px;
            }

            .header-right-time {
                font-size: 12px;
                color: #777;
            }
        }
    }

    .home-detail-body {
        width: 100vw;
        height: 100vh;

        .my-swipe {
            width: 100vw;
            height: 100vh;

            .van-swipe-item {
                width: 100vw;
                height: 100vh;

                .detail-body-container {
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    padding: 60px 15px 0px;
                    overflow: scroll;

                    &::-webkit-scrollbar {
                        width: 0px;
                        height: 0px;
                    }

                    .body-container-header {
                        display: flex;
                        justify-content: flex-end;
                        height: 200px;

                        .container-header-title {
                            display: flex;
                            align-items: center;
                            height: 130px;
                            justify-content: center;

                            .container-header-t1,
                            .container-header-t2 {
                                writing-mode: vertical-lr;
                            }

                            .container-header-t1 {
                                font-size: 15px;
                                letter-spacing: 2px;
                            }

                            .container-header-t2 {
                                font-size: 18px;
                                font-weight: bold;
                                letter-spacing: 5px;
                            }
                        }


                    }

                    .body-container-main {
                        border-bottom: 1px solid rgba(228, 228, 228, 0.5);

                        .container-article-area {
                            line-height: 30px;
                        }

                        .container-article-footer {
                            margin-top: 30px;
                            color: #777;

                            .article-footer-name {
                                font-size: 15px;
                            }
                        }

                        .punch-card {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            height: 60px;
                            margin: 20px 0px;
                            background: #faedd6;

                            .punch-card-left {
                                flex: 1;
                                border-left: 2px solid #c19f6f;
                                display: flex;
                                align-items: center;
                                padding-left: 10px;
                                font-size: 14px;

                            }

                            .activeWord {
                                color: #c19f6f !important;
                            }

                            .punch-card-active {
                                color: #c19f6f;
                            }

                            .punch-card-right {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 60px;
                                height: 60px;
                                border-left: 1px dashed #ccc;

                                .icon-gouxuan {
                                    font-size: 26px;
                                    color: #ccc;
                                }
                            }
                        }

                    }

                    .body-container-comment {
                        width: 100%;
                        margin-top: 20px;
                        margin-bottom: 55px;

                        .container-comment-title {
                            height: 26px;
                            line-height: 26px;
                            font-weight: bold;
                        }

                        .container-comment-user>label {
                            display: flex;
                            align-items: center;

                            .comment-user-img {
                                width: 33px;
                                height: 33px;
                                line-height: 33px;
                                text-align: center;
                                margin-right: 10px;
                                border-radius: 999px;
                                border: 1px solid #999;
                            }

                            .comment-user-input {
                                border: none;
                                background: none;
                                font-size: 15px;

                                &::placeholder {
                                    font-size: 13px;
                                }
                            }
                        }

                        .container-comment-main {
                            margin-top: 10px;
                            width: 100%;
                            height: 300px;

                            .comment-main-user {
                                width: 100%;
                                height: 260px;
                                overflow: scroll;

                                &::-webkit-scrollbar {
                                    width: 0px;
                                    height: 0px;
                                }

                                .comment-main-item {
                                    padding-top: 10px;

                                    .comment-main-header {
                                        display: flex;
                                        align-items: center;

                                        .main-header-img {
                                            width: 36px;
                                            height: 36px;
                                            margin-right: 10px;
                                            border-radius: 999px;
                                            overflow: hidden;
                                            background-size: cover;
                                            background-repeat: no-repeat;
                                            background-position: center center;
                                        }

                                        .main-header-name {
                                            font-size: 15px;
                                            color: #777;
                                        }
                                    }

                                    .comment-main-body {
                                        margin-top: 10px;
                                        font-weight: bold;
                                        height: 77px;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }


                            .comment-main-show {
                                margin-top: 10px;
                                height: 30px;
                                line-height: 30px;
                                font-size: 15px;
                                color: #c19f6f;
                            }
                        }
                    }
                }
            }
        }
    }

    .home-detail-footer {
        position: fixed;
        display: flex;
        justify-content: space-between;
        bottom: 0px;
        width: 100%;
        height: 55px;
        background: #fff;


        .detail-footer-left {
            display: flex;
            align-items: center;

            .footer-left-like {
                display: flex;
                align-items: center;
                margin: 0px 10px;
                font-size: 13px;

                .icon-like {
                    font-size: 23px;
                }
            }

            .footer-left-show {
                display: flex;
                align-items: center;
                font-size: 13px;

                .icon-liulan {
                    font-size: 23px;
                }
            }
        }

        .footer-right-share {
            width: 55px;
            height: 55px;
            line-height: 55px;
            text-align: center;

            .icon-share {
                font-size: 24px;
            }
        }
    }

    .footer-active {
        box-shadow: 0px 1px 6px 0px gray;
    }

    .data-loading {
        position: fixed;
        width: 30px;
        height: 30px;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        z-index: 99;
    }
}

.dark-mode{
    background:black;
    color:#efefef;
}
.back-style{
    background: black !important;
}
.card-back{
    background: #d4bb98 !important;
}
</style>