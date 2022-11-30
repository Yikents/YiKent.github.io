import { defineStore } from "pinia";
import {ref} from 'vue'

export const switchDarkMode=defineStore('darkTheme',()=>{
    const isCanBlack=ref<boolean>(false);
    const switchDark=(value:boolean)=>{
        isCanBlack.value=value;
    }
    return {
        isCanBlack,
        switchDark
    }
})