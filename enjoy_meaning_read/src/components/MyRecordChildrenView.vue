<template>
    <div class="my-record-children">
        <div class="record-children-empty" v-if=" !renderData">{{ emptyText[currentEmptyText as keyof typeof emptyText] }}
        </div>
        <div class="record-children-container" v-if=" renderData">
            <div class="children-container-list">
                <div class="container-list-item" :class="{'back-color':isCanBlack}" v-for="item in renderData" @click="jumpToDetail(item)">
                    <div class="list-item-author">{{item.author.name}}</div>
                    <div class="list-item-title">{{item.provenance}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { emptyTextVaild, exploreChildren, homeChildren } from '@/typings'
import { useRouter } from 'vue-router';
import {useDetailStore} from '@/stores/details'
import { toRaw } from 'vue';
import {switchDarkMode} from '@/stores/darkTheme'
const {isCanBlack}=switchDarkMode();
const props = defineProps({
    currentEmptyText: String,
    renderData:{
        type:Array<exploreChildren>
    }
})
const emptyText: emptyTextVaild = {
    way: '这是一个惜字如今的人',
    like: '这是一个克制的婉约派',
    record: '他的摘录空空如也'
}
const store=useDetailStore();
const {deliveryData}=store;
const $router=useRouter();
const jumpToDetail=(item:homeChildren )=>{
    deliveryData(toRaw([item]), 0);
    $router.push({
        path: '/home-detail'
    })
}


</script>
<style lang="scss" scoped>
.my-record-children {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .record-children-empty {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        padding-top: 160px;
        color: #777;
        text-align: center;

    }

    .record-children-container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        padding: 20px;
        // overflow: scroll;

        
        .children-container-list {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
            height:calc(100% - 300px);
            overflow: scroll;
            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            .container-list-item {
                box-sizing: border-box;
                display: flex;
                width: 47%;
                height: 200px;
                padding: 15px;
                margin: 10px 0px;
                background-color: #fff;

                .list-item-author,
                .list-item-title {
                    writing-mode: vertical-rl;
                    text-orientation: upright;
                    letter-spacing: 5px;
                    word-wrap: wrap;
                }

                .list-item-author {
                    width: 30px;
                    height: 100%;
                    text-align: end;
                    font-size: 13px;
                    color: #aaa;
                }

                .list-item-title {
                    width: calc(100% - 15px);
                    height: 170px;
                    font-size: 17px;
                    font-weight: bold;
                    overflow: hidden;
                    word-break: break-word;
                }
            }
        }
    }
}

.back-color{
    background:#efefef !important;
    color:rgb(20, 20, 20);
}
</style>