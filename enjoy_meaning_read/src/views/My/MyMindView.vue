<template>
    <div class="my-mind"  :class="{'dark-mode':isCanBlack}">
        <div class="my-mind-header">
            <div class="my-mind-left" @click="jumpBackMainEvent()"><span class="iconfont icon-arrowleft"></span></div>
            <div class="my-mind-title">
                <div class="mind-theme">喜欢的想法</div>
                <div class="mind-tips">{{ AllCount }}个想法</div>
            </div>
        </div>
        <div class="my-mind-body">
            <div class="my-mind-list" v-if="AllCount!=0">
                <div class="my-mind-item" v-for="item in MindData" :key="item.id">


                    <div class="container-swiper-slide">
                        <div class="container-swiper-header">
                            <div class="swiper-header-left">
                                <div class="header-left-img" :style="{ backgroundImage: `url(${item.user.avatar})` }">
                                </div>
                                <div class="header-left-text"> {{ item.user.nickname }}

                                </div>
                            </div>
                        </div>
                        <div class="container-swiper-body">
                            <div class="swiper-body-main">
                                {{ item.content }}
                            </div>
                            <div class="swiper-body-date" :class="{'text-color':isCanBlack}">
                                <div class="body-date-left">
                                    <div class="date-left-top">
                                        {{ item.time.oldTime[0] }}
                                    </div>
                                    <div class="date-left-bottom">
                                        <div class="d-l-b">
                                            {{ item.time.oldTime[1] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="body-date-right">
                                    <div class="date-right-top">{{ item.title }}</div>
                                    <div class="date-right-bottom" :class="{'text-color':isCanBlack}">{{ item.provenance }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="container-swiper-footer">
                            <div class="swiper-footer-left" :class="{'text-color':isCanBlack}"> {{ item.time.year != 0 ? item.time.year + '年前' :
                                    item.time.month != 0 ?
                                        item.time.month + '月前' : item.item?.day ? item.time.day : item.time.oldTime[1] +
                                            '天前'
                            }}

                            </div>
                            <div class="swiper-footer-right" :class="{'text-color':isCanBlack}">
                                <div class="swiper-footer-comment"><span>{{ item.sub_comment_count }} 评论</span>
                                </div>
                                <div class="swiper-footer-thumbs" @click="thumbsEvent(item.id)">
                                    <div class="praise">
                                        <span class="iconfont icon-like" v-show="!thumbStatus[item.id]"></span>
                                        <span class="iconfont icon-like_fill" v-show="thumbStatus[item.id]"></span>
                                    </div>
                                    <div>{{ item.like_count
                                        }}人</div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            
            <div class="my-mind-emty-page" v-if="AllCount==0">
                还没有喜欢的想法!
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import type { exploreVaild, judgeVaild, objectVaild } from '@/typings';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import {switchDarkMode} from '@/stores/darkTheme'

const {isCanBlack}=switchDarkMode();
const $router = useRouter();
const jumpBackMainEvent = () => {
    $router.push({
        path: '/my'
    });
};
const MindData: Ref<exploreVaild> = ref([])
const AllCount: Ref<number> = ref(0);
const thumbStatus:Ref<judgeVaild>=ref({});
const userName=ref('');
const getCurrentStorgeData = () => {
    let Uname = '';
    for (let key in localStorage) {
        let reg = /[0-9]{11}/;
        let res = reg.test(key);
        if (res) {
            let ct = JSON.parse(localStorage[key]);
            if (ct.loginRun) {
                Uname = ct.uName;
                userName.value=ct.uName;
            }

        }
    }
    if (localStorage[Uname]) {
        let data = JSON.parse(localStorage[Uname]);
        MindData.value = [...data];
        AllCount.value = MindData.value.length;
    }

    if(localStorage.thumbs){
        let currentThumbs=JSON.parse(localStorage.thumbs);
        if(currentThumbs[Uname]){
            thumbStatus.value=currentThumbs[Uname]
        }
    }
}
getCurrentStorgeData();

const thumbsEvent = (id:string) => {
    let object:judgeVaild=thumbStatus.value
   for(let key in thumbStatus.value){
    if(key==id){
        let o:judgeVaild={};
        o[key]=!thumbStatus.value[key];
        object={...object,...o};
        MindData.value=MindData.value.filter(item=>{
            return item.id!=key;
        });
        AllCount.value = MindData.value.length;
    }
   }
   let currentStorage=JSON.parse(localStorage.thumbs);
   let obj:objectVaild={};
   obj[userName.value]=object;
   currentStorage={...currentStorage,...obj};
   localStorage.thumbs=JSON.stringify(currentStorage);
   localStorage[userName.value]=JSON.stringify(MindData.value);
}
</script>

<style lang="scss" scoped>
.my-mind {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 66;
    background: linear-gradient(rgba(222, 251, 251, 0.3), rgba(188, 248, 248, 0.8), #14f1f1fc);

    .my-mind-header {
        position: fixed;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        z-index: 3;

        &::after {
            position: absolute;
            content: '';
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            z-index: -1;
            backdrop-filter: blur(30px);
        }

        .my-mind-left {
            width: 40px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }

        .my-mind-title {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 20px;

            .mind-theme {
                font-size: 14px;
            }

            .mind-tips {
                font-size: 12px;
                color: #aaa;
            }
        }
    }

    .my-mind-body {
        width: 100%;
        height: 100vh;
        padding-top: 60px;
        overflow: scroll;

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        .my-mind-list {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;

            .my-mind-item {
                width: calc(100% - 40px);
                margin: 10px 20px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 10px;


                .container-swiper-slide {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 10px;

                    .container-swiper-header {
                        box-sizing: border-box;
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
                                font-weight: bold
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
                            border: 1px solid #ccc;
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
                                    border-top: 1px solid #ccc;

                                    .d-l-b {
                                        transform: rotate(45deg);

                                    }
                                }
                            }

                            .body-date-right {
                                border-left: 1px solid #ccc;
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
                            color: #777;

                        }

                        .swiper-footer-right {
                            display: flex;
                            align-items: center;
                            color: #777;
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
                                    color: red;
                                }
                            }
                        }
                    }
                }
            }




        }
    }

}

.my-mind-emty-page{
    width:100vw;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dark-mode{
    background:black;
    color:#efefef;
}
.text-color{
    color:#efefef !important;
}
</style>