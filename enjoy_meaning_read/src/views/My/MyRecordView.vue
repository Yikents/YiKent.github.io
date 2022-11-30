<template>
    <div class="my-record"  :class="{'dark-mode':isCanBlack}">
        <div class="my-record-header">
            <div class="my-record-left" @click="jumpPrePage"><span class="iconfont icon-arrowleft"></span></div>
            <div class="my-record-title">编辑</div>
        </div>
        <div class="my-record-body">
            <div class="record-body-main">
                <div class="body-main-username">{{userName?userName:''}}</div>

                <div class="record-body-detail">
                    <div class="body-detail-text1">写了 0 字 获得 0 喜欢</div>
                    <div class="body-detail-text2">读了 {{readeredCount}} 篇文章 累计打卡 {{recordCard}} 天</div>
                </div>
            </div>
            <van-tabs v-model:active="active" swipeable animated background="none" line-height="0px" title-inactive-color="#aaa">
                <van-tab v-for="item in textType" :title="item.text +' '+ AllCount[item.type as keyof typeof AllCount]">
                   <MyRecordChildrenView :currentEmptyText="item.type" :renderData="dataList[item.type as keyof typeof dataList]"/>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script lang="ts" setup>
import MyRecordChildrenView from '../../components/MyRecordChildrenView.vue'
import { reactive, ref, type Ref } from 'vue';
import {loginStore} from '@/stores/login'
import { useRouter } from 'vue-router';
import {useDetailStore} from '@/stores/details'
import type { RecordList } from '@/typings';
import {switchDarkMode} from '@/stores/darkTheme'

const {isCanBlack}=switchDarkMode();
const active:Ref<number|undefined>=ref();
const store=loginStore();
const {userName}=store;
const $router=useRouter();
const temperCount=useDetailStore();
const {deliveryLikeCount}=temperCount;
const textType:Array<{type:string,text:string}>=[
    {
        type:'way',
        text:'想法'
    },
    {
        type:'like',
        text:'喜欢'
    },
    {
        type:'record',
        text:'摘录'
    }
]
const dataList: Ref<RecordList> = ref({
    way:[],
    like:[],
    record:[]
})
const readeredCount=ref(0);
const recordCard=ref(0);
const getCurrentStorgeData = () => {
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
    if(localStorage[Uname]){
        let data=JSON.parse(localStorage[Uname]);
        dataList.value={
            like:[...data]
        }
        AllCount.like=dataList.value.like.length;
        deliveryLikeCount(dataList.value.like.length)
    }

    if(localStorage.readered){
        let currentRead=JSON.parse(localStorage.readered);
        if(currentRead[Uname]){
            readeredCount.value=Object.keys(currentRead[Uname]).length;
        }
    }

    if(localStorage.completedCard){
        let currentCard=JSON.parse(localStorage.completedCard);
        if(currentCard[Uname]){
            recordCard.value=currentCard[Uname].count;
        }
    }
}

const AllCount=reactive({
    way:0,
    like:0,
    record:0
});  
getCurrentStorgeData();
const jumpPrePage=()=>{
    $router.go(-1);
}
</script>
<style lang="scss" scoped>
.my-record {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 6;
    background: linear-gradient(rgba(222, 251, 251, 0.3), rgba(188, 248, 248, 0.8), #14f1f1fc);

    .my-record-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 55px;

        .my-record-left {
            width: 40px;
            height: 55px;
            line-height: 55px;
            text-align: center;

            .icon-arrowleft {
                font-size: 20px;
            }
        }

        .my-record-title {
            margin-right: 20px;
        }
    }

    .my-record-body {
        width: 100%;

        .record-body-main {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 200px;
            padding: 0px 40px;
            border-bottom: 1px solid #ccc;

            .body-main-username {
                height: 60px;
                line-height: 60px;
                font-size: 26px;
            }

            .record-body-detail {
                color: #aaa;
                margin-bottom: 20px;

                .body-detail-text1,
                .body-detail-text2 {
                    font-size: 14px;
                    height: 26px;
                    line-height: 30px;
                }
            }
        }
    }
}


.dark-mode{
    background:black;
    color: #efefef !important;
}
</style>