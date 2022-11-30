<template>
    <div class="login-box">
        <div class="login-close">
            <div class="close-button" @click="backEvent"><span class="iconfont icon-close"></span></div>
        </div>
        <div class="login-body">
            <div class="login-title">请登录</div>
            <div class="login-form">
                <input type="number" placeholder="手机号" v-model="TepValue" @input="limitEvent" />
                <div class="login-password">
                    <input type="password" placeholder="密码" v-model="passwordValue" />
                    <div class="valid-error" v-show="isVaild">*密码或账号不正确*</div>
                </div>
                <div class="login-button" @click="loginMessage">登录</div>
            </div>
            <div class="register-button" @click="registerPageEvent">
                注册
            </div>
        </div>

        <transition name="move">
            <RegisterPageView v-if="isShowRegister" @backData="backData" />
        </transition>
    </div>
</template>

<script lang="ts" setup>
import type { loginVaild } from '@/typings';
import { Toast } from 'vant';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterPageView from '../components/RegisterPageView.vue'

const isVaild = ref<boolean>(false);
const isShowRegister = ref<boolean>(false);
const TepValue = ref();
const $router = useRouter();
const passwordValue = ref();
const backEvent = () => {
    $router.go(-1);
};
const limitEvent = () => {
    let len = String(TepValue.value);
    if (len.length > 11) {
        TepValue.value = Number(len.slice(0, 11));
    }
}

const loginMessage = () => {
    let tel = TepValue.value;
    let pass = passwordValue.value;
    let currentUser: Ref<loginVaild> = ref({});
    if (localStorage[tel]) {
        currentUser.value = JSON.parse(localStorage[tel]);
        if (String(tel) == currentUser.value.telephone && pass == String(currentUser.value.passwords)) {
            backEvent()
            Toast.success('登录成功')
            localStorage[tel] = JSON.stringify({ ...currentUser.value, loginRun: true })
            isVaild.value = false;
        } else {
            isVaild.value = true;
        }
    } else {
        isVaild.value = true;
    }
}
const backData = (val: boolean) => {
    isShowRegister.value = val;
}
const registerPageEvent = () => {
    isShowRegister.value = !isShowRegister.value
}
</script>

<style lang="scss" scoped>
.login-box {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: linear-gradient(rgba(222, 251, 251, 0.3), rgba(188, 248, 248, 0.6), #14f1f1);
    z-index: 999;

    .login-close {
        box-sizing: border-box;
        position: fixed;
        display: flex;
        top: 0px;
        left: 0px;
        align-items: center;
        height: 40px;

        .close-button {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-left: 10px;

            .icon-close {
                font-size: 23px;
            }
        }
    }

    .login-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 65%;

        .login-title {
            height: 30px;
            font-size: 17px;
        }

        .login-form {
            width: 100%;
            padding: 20px 47px 0px 47px;
            display: flex;
            flex-direction: column;

            input {
                display: inline-block;
                width: 100%;
                height: 20px;
                background: none;
                margin-bottom: 20px;
                outline: none;
                border: 0px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            }

            .login-password {
                position: relative;
                width: 100%;
                height: 30px;
                margin-bottom: 30px;

                .valid-error {
                    position: absolute;
                    bottom: -20px;
                    right: 0px;
                    margin: auto 0px;
                    height: 20px;
                    line-height: 20px;
                    color: #e4393c;
                    font-size: 12px;
                }
            }

            .login-button {
                width: 100%;
                height: 36px;
                line-height: 36px;
                border-radius: 36px;
                text-align: center;
                font-size: 14px;
                background: #fff;
                box-shadow: 0px 0px 2px 0px #ccc;
            }
        }
    }

    .register-button {
        padding: 10px 30px;
        margin-bottom: 20px;
        border-radius: 5px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        background: rgb(255, 68, 0);
    }
}

.move-enter,
.move-leave-to {
    transform: translateX(100%);
}

.move-enter-active,
.move-leave-active {
    transition: all 0.2s linear;
}

.move-enter-to,
.move-leave {
    transform: translateX(0px);
}
</style>