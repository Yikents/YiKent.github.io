<template>
    <div class="explore-show" :class="{ 'dark-mode': isCanBlack }">
        <div class="container-swiper-slide">
            <div class="container-swiper-header">
                <div class="swiper-header-left">
                    <div class="header-left-img" :style="{ backgroundImage: `url(${currentData?.user.avatar})` }">
                    </div>
                    <div class="header-left-text">
                        <div class="left-text-top">{{ currentData?.user.nickname }}</div>
                        <div class="left-text-bottom"> {{ currentData?.time.year != 0 ? currentData?.time.year + '年前' :
                                currentData?.time.month != 0 ?
                                    currentData?.time.month + '月前' : currentData?.currentData?.day ? currentData?.time.day :
                                        currentData?.time.oldTime[1] +
                                        '天前'
                        }}</div>
                    </div>
                </div>
                <div class="swiper-header-right">
                    <span class="iconfont icon-dot"></span>
                </div>
            </div>
            <div class="container-swiper-body">
                <div class="swiper-body-main">
                    {{ currentData?.content }}
                </div>
                <div class="swiper-body-date" :class="{ 'text-color': isCanBlack }">
                    <div class="body-date-left">
                        <div class="date-left-top">
                            {{ currentData?.time.oldTime[0] }}
                        </div>
                        <div class="date-left-bottom">
                            <div class="d-l-b">
                                {{ currentData?.time.oldTime[1] }}
                            </div>
                        </div>
                    </div>
                    <div class="body-date-right">
                        <div class="date-right-top">{{ currentData?.title }}</div>
                        <div class="date-right-bottom" :class="{ 'text-color': isCanBlack }">{{ currentData?.provenance
                        }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-swiper-footer">
                <div class="swiper-footer-left">
                    <div class="swiper-footer-comment" :class="{ 'text-color': isCanBlack }"><span
                            class="iconfont icon-liulan"></span> <span> {{
                                    currentData?.sub_comment_count
                            }}人</span></div>
                    <div class="swiper-footer-thumbs" :class="{ 'text-color': isCanBlack }">
                        <div class="praise"><span class="iconfont icon-like"></span></div>
                        <div>{{ currentData?.like_count }}人</div>
                    </div>
                </div>
                <div class="swiper-footer-right" @click.stop="showShare = true" :class="{ 'text-color': isCanBlack }">
                    <span class="iconfont icon-share"></span>
                </div>
            </div>
        </div>
        <div class="container-comment-area">
            <div class="comment-area-header">
                <span>{{ currentData?.sub_comment_count + announceDate.length }}</span><span>评论</span>
            </div>
            <div class="comment-area-body" v-if="(currentData?.sub_comment_count != 0 || announceDate.length != 0)">
                <div class="area-body-item" v-for="item, index in announceDate" :key="index">
                    <div class="area-body-logo" :style="{ backgroundImage: `url(${item.logoUrl})` }"></div>
                    <div class="area-body-content">
                        <div class="body-content-top">
                            <div class="content-top-title">{{ item.name }}</div>
                            <div class="content-top-text">{{ item.text }}</div>
                        </div>
                        <div class="body-content-bottom">
                            <div class="content-bottom-left">{{ item.time.year != 0 ? item.time.year + '年前' :
                                    item.time.month != 0 ?
                                        item.time.month + '月前' : item.time.day != 0 ? item.time.day + '天前' : '今天'
                            }}</div>
                            <div class="content-bottom-right"><span class="iconfont icon-z-like"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment-area-footer">
            <div class="area-footer-logo">
                <span class="iconfont icon-user" v-if="logoUrl == ''"></span>
                <img :src="logoUrl" class="auto-img">
            </div>
            <div class="area-footer-center">
                <input type="text" id="user-input" v-model="TextMessage" @keydown.enter.exact="UserInputText">
            </div>
            <div class="area-footer-prise">
                <span class="iconfont icon-like"></span>
            </div>
        </div>
        <div class="close-page" @click="closeCurrentPage">x</div>
        <van-share-sheet v-model:show="showShare" title="" :options="options" @select="onSelect" cancel-text=''
            :round='false' position='top' />
    </div>
</template>
<script lang="ts" setup>
import { type ToastOptions, Toast } from 'vant';
import { defineProps, ref, type Ref } from 'vue';
import { switchDarkMode } from '@/stores/darkTheme';
import { commonData, beforehandDealTime } from '@/publicData'
import type { exploreAnnounce, exploreAnnounceVaild, exploreComment, exploreObject } from '@/typings';
import { useRouter } from 'vue-router';
const { isCanBlack } = switchDarkMode();
const props = defineProps({
    currentData: Object
})
const $emit = defineEmits(['closePubEvent']);
const $router = useRouter();
const SendData:Ref<exploreObject>=ref({})
const closeCurrentPage = () => {
    $emit('closePubEvent',SendData.value);
}


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
const TextMessage = ref('');
const userName = ref('');
const logoUrl = ref('');
const announceDate: Ref<exploreAnnounceVaild> = ref([])
const UserInputText = () => {
    let text = TextMessage.value;
    let arr = announceDate.value;
    if (text != '' && userName.value != '') {
        let str = beforehandDealTime();
        arr.push({
            name: userName.value,
            logoUrl: logoUrl.value,
            text: TextMessage.value,
            time: commonData.dealTime(str)
        })
        announceDate.value = [...arr]
        let temperObj: exploreObject = {};
        let obj: exploreComment = {};
        obj[props.currentData?.id] = announceDate.value
        if (localStorage.exportComment) {
            let storageC = JSON.parse(localStorage.exportComment);
            temperObj[userName.value] = { ...storageC[userName.value],...obj };
            SendData.value={ ...storageC[userName.value],...obj}
            localStorage.exportComment = JSON.stringify({ ...storageC, ...temperObj })
        } else {
            localStorage.exportComment = JSON.stringify(temperObj)
        }
    } else {
        if (userName.value == '') {
            $router.push({
                path: '/login'
            })
        } else {
            Toast.fail('输入框不能为空!')
        }
    }
    TextMessage.value = ''
}
const getCurrentStorgeData = () => {
    for (let key in localStorage) {
        let reg = /[0-9]{11}/;
        let res = reg.test(key);
        if (res) {
            let ct = JSON.parse(localStorage[key]);
            if (ct.loginRun) {
                userName.value = ct.uName;
                logoUrl.value = ct.logoUrl
            }

        }
    }

    if (localStorage.exportComment) {
        let storageC = JSON.parse(localStorage.exportComment);
        if (storageC[userName.value]) {
            if (storageC[userName.value][props.currentData?.id]) {
                announceDate.value = storageC[userName.value][props.currentData?.id];
                SendData.value=storageC[userName.value]
            }
        }
    }
}
getCurrentStorgeData();

</script>
<style lang="scss" scoped>
.explore-show {
    box-sizing: border-box;
    position: fixed;
    left: 20px;
    right: 20px;
    top: 50px;
    bottom: 70px;
    background: linear-gradient(#fcfcfc, skyblue, rgb(24, 71, 90));
    border-radius: 15px;
    overflow: scroll;
    z-index: 33;
    box-shadow: 0px 0px 13px 0px #fff;

    &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
}

.text-color {
    color: #efefef !important;
}

.container-swiper-slide {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;

    .container-swiper-header {
        box-sizing: border-box;
        width: 100%;
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

                .left-text-top {
                    font-weight: bold;
                }

                .left-text-bottom {
                    font-size: 12px;
                    color: #999;
                }
            }
        }

        .swiper-header-right {
            width: 26px;
            height: 26px;
            line-height: 16px;

            .icon-dot {
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

        .swiper-body-main {
            box-sizing: border-box;
            padding: 20px 0px;
            font-size: 17px;
            line-height: 30px;
        }

        .swiper-body-date {
            display: flex;
            width: 100%;
            height: 60px;
            border: 1px solid rgb(80, 80, 240);
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
                    border-top: 1px solid rgb(80, 80, 240);

                    .d-l-b {
                        transform: rotate(45deg);

                    }
                }
            }

            .body-date-right {
                border-left: 1px solid rgb(80, 80, 240);
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
        height: 40px;


        .swiper-footer-left {
            display: flex;
            align-items: center;
            color: black;

        }

        .swiper-footer-right {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
            color: black;

            .icon-share {
                font-size: 24px;
            }
        }

        .swiper-footer-comment {
            display: flex;
            align-items: center;
            height: 30px;
            text-align: center;
            margin-right: 10px;
            font-size: 14px;

            .icon-liulan {
                font-size: 20px;
                margin-right: 5px;
            }
        }

        .swiper-footer-thumbs {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: black;

            .praise {
                width: 20px;
                height: 30px;
                line-height: 30px;
                margin-right: 5px;

                .icon-like {
                    font-size: 20px;
                }
            }
        }
    }
}

.container-comment-area {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px;

    .comment-area-header {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #777;
    }

    .comment-area-body {
        height: 300px;
        overflow: scroll;

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        .area-body-item {
            display: flex;
            width: 100%;
            margin-top: 10px;

            .area-body-logo {
                width: 36px;
                height: 36px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                border-radius: 999px;
                overflow: hidden;
                margin-right: 10px;
            }

            .area-body-content {
                flex: 1;

                .body-content-top {
                    box-sizing: border-box;
                    border-radius: 5px;
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.5);

                    .content-top-title {
                        font-size: 14px;
                        font-weight: bold;
                    }

                    .content-top-text {
                        font-size: 14px;
                    }
                }

                .body-content-bottom {
                    display: flex;
                    height: 30px;
                    font-size: 12px;
                    justify-content: space-between;
                    align-items: center;
                    color: #666;

                    .content-bottom-left {
                        margin-left: 10px;
                    }

                    .content-bottom-right {
                        margin-right: 10px;

                        .icon-z-like {
                            font-size: 18px;
                        }

                    }
                }
            }
        }

    }

}

.comment-area-footer {
    box-sizing: border-box;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 0px 10px;

    .area-footer-logo {
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 999px;
        overflow: hidden;
        font-size: 23px;
        border: 1px solid #888;

        .icon-user {
            color: rgba(0, 0, 0, 0.527);
        }
    }

    .area-footer-center {
        flex: 1;
        margin: 0px 10px;
        border: 1px solid #777;
        border-radius: 999px;

        &>#user-input {
            box-sizing: border-box;
            display: block;
            border: none;
            width: 100%;
            background: none;
            padding-left: 10px;
            color: black;
            caret-color: #777;
        }
    }

    .area-footer-prise {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 999px;
        border: 1px solid gray;

        .icon-like {
            color: gray;
            font-size: 20px;
        }
    }
}

.close-page {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    font-size: 20px;
    width: 20px;
    height: 20px;
    color: gray;
    text-shadow: 0px 0px 12px gray;
}

.auto-img {
    display: block;
    height: 36px;
}

.dark-mode {
    background: black;
    color: #efefef;
}
</style>