import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { commentVaild, homeChildren } from '@/typings'

export const useDetailStore = defineStore('details', () => {
    const detailData: Ref<Array<homeChildren>> = ref([])
    const currentIndex = ref<number>();
    const commentData = ref<Array<commentVaild>>([]);
    function deliveryData(allData: Array<homeChildren>, index: number) {
        detailData.value = [...allData];
        currentIndex.value = index;
    }

    function getCommentArea(commentArr: Array<commentVaild>) {
        commentData.value = [...commentArr]
    }


    const likeCount=ref(0);
    function deliveryLikeCount(count:number){
        likeCount.value=count;
    }


    return { detailData, deliveryData, currentIndex, commentData, getCommentArea,likeCount, deliveryLikeCount }
})
