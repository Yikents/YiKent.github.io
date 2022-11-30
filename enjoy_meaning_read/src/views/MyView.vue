<template>
    <div class="my-view" :class="{'dark-mode':isRunMode}">
        <div class="my-nav">
            <div class="my-nav-left" @click="toogleMode"><span class="iconfont icon-moon"></span></div>
            <div class="my-nav-right"><span class="iconfont icon-sey-letter-a"></span></div>
        </div>
        <div class="my-header" @click.stop="loginEvent">
            <div class="my-header-logo">{{ userN ? userN : "请登录" }}</div>
            <div class="my-header-img"><span class="iconfont icon-user"></span>
                <label>
                    <div class="my-hd-layer" ref="img" v-if="userN">
                        <input type="file" id="file-img" ref="file"  accept="image/png, image/jpeg, image/jpg" @change.stop="upLoadImage" />
                    </div>
                </label>
            </div>
        </div>
        <div class="my-body">
            <div class="my-body-container">

                <div class="container-item" v-for="item in data.renderText" :key="item.type"
                    @click="jumpPageEvent(item.type)">
                    <div class="container-item-icon">
                        <span class="iconfont" :class="item.icon"></span>
                    </div>
                    <div class="container-item-text" :class="{'change-color':isRunMode}">{{ item.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginStore } from "@/stores/login";
import {switchDarkMode} from "@/stores/darkTheme";
const isRunMode=ref(false);
const {isCanBlack,switchDark}=switchDarkMode();
const toogleMode=()=>{
    isRunMode.value=!isRunMode.value;
    switchDark(isRunMode.value);
}
isRunMode.value=isCanBlack;


const data = reactive({
    renderText: [
        {
            type: 'main',
            text: '我的主页',
            icon: 'icon-home-line'
        },
        {
            type: 'read',
            text: '阅读日历',
            icon: 'icon-rili'
        },
        {
            type: 'way',
            text: '喜欢的想法',
            icon: 'icon-like'
        },
        {
            type: 'remind',
            text: '每日提醒',
            icon: 'icon-lingdang-xianxing'
        },
        {
            type: 'setting',
            text: '设置',
            icon: 'icon-setting'
        },
    ]
})
const $router = useRouter();
const islogin = ref(true);
const store = loginStore();
const { changeCurrentData,getCurrentLoginData } = store;
const jumpPageEvent = (it: string) => {
    if (it == 'setting') {

        changeCurrentData(isShowButtom.value, phoneValue.value);
        $router.push({
            path: '/my-setting'
        })
    }

    if(it=='way'){
        if(!islogin.value){
            $router.push({
            path: '/my-mind'
        })
        }else{
            $router.push({
            path: '/login'
        })
        }
    }

    if (it == 'remind') {
        $router.push({
            path: '/every-day-remind'
        })
    }
    if(it=='read'){
        $router.push({
            path:'/calendar/read',
        })
    }
    if(it=='main'){
        if(!islogin.value){
            $router.push({
            path: '/my-record'
        })
        }else{
            $router.push({
            path: '/login'
        })
        }
    }
}
const loginEvent = () => {
    if (islogin.value) {
        $router.push({
            path: '/login'
        })
    }
}
const userN: Ref<string | undefined> = ref();
const file = ref();
const phoneValue = ref();
const img = ref();
const logoUrl = ref();
const isShowButtom = ref(false);
const upLoadImage = () => {
    let fram = new FileReader();
    let fr = file.value.files[0];
    fram.readAsDataURL(fr);
    let cur = JSON.parse(localStorage[phoneValue.value]);
    fram.onload = function () {
        img.value.style.backgroundImage = `url(${this.result})`;
        localStorage[phoneValue.value] = JSON.stringify({ ...cur, logoUrl: this.result });
    };
}
const loginDataEvent = () => {
    for (let key in localStorage) {
        let reg = /[0-9]{11}/;
        let res = reg.test(key);
        if (res) {
            let ct = JSON.parse(localStorage[key]);
            if (ct.loginRun) {
                userN.value = ct.uName;
                phoneValue.value = ct.telephone;
                logoUrl.value = ct.logoUrl;
                break;
            }
        }
    }
    if (userN.value) {
        islogin.value = false;
        isShowButtom.value = true;
        nextTick(() => {

            img.value.style.backgroundImage = `url(${logoUrl.value})`;
        })
    } else {
        islogin.value = true;
        isShowButtom.value = false;
    }
    getCurrentLoginData(userN.value,phoneValue.value);
}
loginDataEvent();
</script>
<style lang="scss" scoped>
.my-view {
    position: fixed;
    box-sizing: border-box;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 20px;
    background: linear-gradient(rgb(148, 210, 234), rgb(88, 230, 230), rgb(229, 186, 229));

    .my-nav {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .my-nav-left,
        .my-nav-right {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 999px;
            border: 1px solid rgb(55, 183, 233);

            .icon-sey-letter-a {
                font-size: 20px;
                font-weight: bold;
            }
        }
    }

    .my-header {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        height: 60px;

        .my-header-logo {
            font-size: 20px;
            margin-left: 10px;
        }

        .my-header-img {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 999px;
            overflow: hidden;
            background-color: rgba(255, 255, 255, 0.5);

            .icon-user {
                font-size: 30px;
            }

            label {
                position: absolute;
                top: 0px;
                left: 0px;
            }

            .my-hd-layer {
                position: absolute;
                width: 60px;
                height: 60px;
                border-radius: 999px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                overflow: hidden;
                z-index: 999;

                #file-img {
                    display: none;
                }
            }
        }
    }

    .my-body {
        margin-top: 40px;

        .my-body-container {
            box-sizing: border-box;
            padding: 20px 10px;
            width: 100%;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.5);

            .container-item {
                display: flex;
                align-items: center;
                height: 60px;

                .container-item-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    margin-right: 20px;

                    .iconfont {
                        font-size: 23px;
                        font-weight: bold;
                    }

                    .icon-home-line,
                    .icon-setting {
                        font-size: 25px;
                    }
                }

                .container-item-text {
                    font-size: 17px;
                    color: #1d1c1c;

                }
            }
        }
    }
}

.dark-mode{
    background:black;
    color:#efefef;
}
.change-color{
    color:#efefef !important;
}
</style>