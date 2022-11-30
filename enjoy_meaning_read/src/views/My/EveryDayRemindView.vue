<template>
    <div class="every-day-remind" :class="{'dark-mode':isCanBlack}">
        <div class="every-remind-header">
            <div class="every-remind-left" @click="jumpBackInite"><span class="iconfont icon-arrowleft"></span></div>
            <div class="every-remind-title">每日提醒</div>
        </div>
        <div class="every-remind-body">
            <div class="remind-body-tool">
                <div class="remind-icon">
                    <div class="jump-icon" :class="{animateMove:isRunRemind}"> <span class="iconfont icon-naozhong"></span></div>
                </div>
                <div class="remind-text">坚持每天花一小时阅读一下</div>
            </div>
            <div class="remind-body-control">
                <div class="remind-body-item">
                    <div class="body-item-text">
                        <div class="item-text-left">每日提醒</div>
                        <div class="item-text-right">
                            <van-switch @change="startSetTime" v-model="checked" size="16px" active-color="black"
                                inactive-color="#ccc" />
                        </div>
                    </div>
                    <div class="body-item-time" @click="selectTimeEvent">
                        <div class="item-time-txt">提醒时间</div>
                        <div class="item-item-right">
                            <span>{{ getCurrentTime }}</span><span class="iconfont icon-arrowright"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Transition name="move">
            <van-datetime-picker v-show="isShow" class="date-layer" v-model="currentTime" type="time" title=""
                :min-hour="0" :max-hour="24" item-height="30px" @confirm="confirmEvent" @cancel="cancelEvent"/>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import {switchDarkMode} from "@/stores/darkTheme"

const {isCanBlack}=switchDarkMode();
const $router = useRouter();
const checked = ref(false);
const getCurrentTime = ref();
const isShow: Ref<boolean> = ref(false);
const currentTime = ref('12:00');
const isRunRemind=ref(false);
const jumpBackInite = () => {
    $router.go(-1);
}
const confirmEvent = (e: String) => {
    getCurrentTime.value = e;
    isShow.value = false;
    localStorage.setItem('time', String(checked.value));
    localStorage.setItem('endtime', currentTime.value)
    setTimeEvent();
}
const cancelEvent=()=>{
    isShow.value = false;
}
const selectTimeEvent = () => {
    isShow.value = !isShow.value;
}
const timer = ref();
const startSetTime = () => {
    if (checked.value && getCurrentTime.value != undefined) {
        setTimeEvent();
        localStorage.setItem('time', String(checked.value));
        localStorage.setItem('endtime', currentTime.value)
    } else {
        clearInterval(timer.value);
        localStorage.setItem('time', '');
        localStorage.setItem('endtime', '');
        isRunRemind.value=false;
    }
}
const setTimeEvent = () => {
    let endTime = currentTime.value;
    let endHour = parseInt(endTime.slice(0, 2));
    let endMinute = parseInt(endTime.slice(3, 5));
    let endSecond = endHour * 60 * 60 + endMinute * 60;
    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let currentSecond = currentHour * 60 * 60 + currentMinute * 60;
    let surplusTime = (24 - currentHour) * 60 * 60 + (60 - currentMinute) * 60;
    let allTime = 0;
    if (currentSecond < endSecond) {
        allTime = endSecond - currentSecond;
    } else {
        allTime = endSecond + surplusTime
    }

    if (checked.value) {
        timer.value = setInterval(() => {
            if (allTime > 0) {
                allTime--;
            } else {
                isRunRemind.value=true;
                clearInterval(timer.value);
            }
        }, 1000)
    } else {
        clearInterval(timer.value);
    }
}
let isCan = localStorage.getItem('time');
if (isCan != null) {
    checked.value = Boolean(isCan);
    currentTime.value = String(localStorage.getItem('endtime'));
}
if (checked.value) {
    setTimeEvent();
}
onBeforeUnmount(() => {
    clearInterval(timer.value);
})
</script>

<style lang="scss" scoped>
.every-day-remind {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #fff;
    z-index: 33;

    .every-remind-header {
        display: flex;
        align-items: center;
        height: 55px;

        .every-remind-left {
            width: 40px;
            height: 55px;
            line-height: 55px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }

        .every-remind-title {
            flex: 1;
            text-align: center;
            margin-right: 20px;
        }
    }

    .every-remind-body {
        padding: 0px 30px;

        .remind-body-tool {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 300px;

            .remind-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120px;
                height: 120px;

                .icon-naozhong {
                    font-size: 60px;
                }
            }

        }

        .body-item-text,
        .body-item-time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
        }


        .item-item-right {
            .icon-arrowright {
                width: 30px;
                height: 30px;
                margin-left: 10px;
            }
        }
    }

    .date-layer {
        position: absolute;
        width: 100%;
        bottom: 0px;
        box-shadow: 0px 1px 6px 0px #ccc;
    }
}


.dark-mode{
    background:black;
    color:#efefef;
}

.animateMove{
    animation: iconEvent .6s infinite linear;
}
@keyframes iconEvent {
    0%{
        transform: rotate(0deg);
    }
    25%{
        transform: rotate(20deg);
    }
    50%{
        transform: rotate(30deg);
    }
    75%{
        transform: rotate(-20deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.move-enter,
.move-leave-to {
    transform: translateY(224px);
}

.move-enter-active,
.move-leave-active {
    transition: all .3s linear;
}

.move-enter-to,
.move-leave {
    transform: translateY(0px);
}
</style>