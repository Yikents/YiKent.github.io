import { defineStore } from "pinia";
import {ref} from 'vue'

export const loginStore=defineStore('login',()=>{
    const ShowButtomState=ref<boolean>();
    const phoneNumber=ref();
    const changeCurrentData=(showElement:boolean,phoneN:string)=>{
        ShowButtomState.value=showElement;
        phoneNumber.value=phoneN
    };
    const userName=ref<string>();
    const telephonenumber=ref<string>();
    const getCurrentLoginData=(name:string|undefined,phone:string)=>{
        userName.value=name;
        telephonenumber.value=phone;
    }
    return {
        ShowButtomState,
        phoneNumber,
        changeCurrentData,
        userName,
        telephonenumber,
        getCurrentLoginData
    }
})