<template>
    <div class="my-setting" :class="{'dark-mode':isCanBlack}">
        <div class="my-setting-header">
            <div class="my-setting-left" @click="jumpBackInite"><span class="iconfont icon-arrowleft"></span></div>
            <div class="my-setting-title">设置</div>
        </div>
        <div class="my-setting-body">
            <div class="setting-body-container">
                <div class="setting-body-list">
                    <div class="body-list-item" v-for="item,index in textData" :key="item.type">
                        <div class="list-item-left">{{item.text}}</div>
                        <div class="list-item-right"><span class="iconfont" :class="item.arrow"></span></div>
                    </div>
                </div>
            </div>
            <div class="setting-footer-logo" v-show="ShowState" @click="loginOutEvent">退出登录</div>
            <div class="setting-footer-logo" v-show="!ShowState" @click="loginEvent">点击登录</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Toast } from 'vant';
import {reactive, ref, type Ref} from 'vue';
import { useRouter } from 'vue-router';
import {textData} from '../publicData';
import {loginStore} from '../stores/login';
import {switchDarkMode}from '@/stores/darkTheme'

const {isCanBlack}=switchDarkMode();
const $router=useRouter();
const jumpBackInite=()=>{
    $router.go(-1);
}
const loginEvent=()=>{
    $router.push({
        path:'/login'
    })
}
const store=loginStore();
const {ShowButtomState,phoneNumber,changeCurrentData}=store;
const ShowState:Ref<boolean|undefined>=ref();
    ShowState.value=ShowButtomState;

const loginOutEvent=()=>{
    let curUser=JSON.parse(localStorage[phoneNumber]);
      localStorage[phoneNumber]=JSON.stringify({...curUser,loginRun:false});
      ShowState.value=false;
      changeCurrentData(true,phoneNumber);
      Toast.success("账号已退出");
}
</script>
<style lang="scss" scoped>
.my-setting{
    position:fixed;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    z-index: 3;
    background:#fff;

    .my-setting-header{
        display: flex;
        align-items: center;
        height:55px;

        .my-setting-left{
            width:40px;
            height:55px;
            line-height: 55px;
            text-align: center;
            font-size:20px;
            font-weight: bold;
        }
        .my-setting-title{
            flex:1;
            text-align: center;
            margin-right:20px;
        }
    }

    .setting-body-list{
        box-sizing: border-box;
        padding:0px 30px;
        .body-list-item{
            display: flex;
            height:50px;
            justify-content: space-between;
            align-items: center;
        }
    }

    .setting-footer-logo{
        margin-top:50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
}

.dark-mode{
    background:black;
    color:#efefef;
}
</style>