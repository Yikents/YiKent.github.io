<template>
	<view>
		<view class="collect-item" v-for="(item,index) in collectList" :key="item.id"  @click="gotoGoodsDetails(item.id)">
		  <view>{{item.name}}</view>	
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState(['collectList'])
		},
		
		data() {
			return {
			
			}
		},
		methods: {
			//跳转到商品详情
			gotoGoodsDetails(goodsid) {
				console.log('goodsid ==>',goodsid);
				uni.navigateTo({
					url: `/pages/GoodsDetails/GoodsDetails?detailsid=${goodsid}`
				})
			},
		}
	}
</script>

<style lang="scss">
	
	.collect-item {
		margin-top: 10px;
		
		&:last-child{
			margin-bottom: 20px;   
		}
	}

</style>
