<template>
	<view>
		
		<view class="order-list">

			<view class="order-item" v-for="(item,index) in orderList" :key="item.id">
				<view class="img">
					<img :src="item.src">
				</view>

				<view class="desc">{{item.name}}</view>

				<view class="num-price">
					<view class="price">￥{{item.price}}</view>
					<view class="num">X{{item.num}}</view>
				</view>

			</view>

		</view>
 
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},

		computed: {
			...mapState(['orderList'])
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.order-list {
		padding: 30rpx;

		.order-item {
			padding: 15rpx;
			display: flex;
			margin-top: 20rpx;
			border: 1px solid #eee;
			border-radius: 15rpx;	
			height: 150rpx;
			justify-content: space-between;
			align-items: center;
			height: 15vh;

			.img {
				width: 130rpx;
				height: 130rpx;
				border-radius: 10rpx;
				overflow: hidden;

				img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.desc {
				width: 70%;
				font-size: 12px;
				color: #9f9f9f; 
				margin: 0 20rpx	;
			}

			.num-price {
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.price {
					color: #c72f1e;
				}

				.num {
					margin-top: 30rpx;
					color: #000;
				}
			}




		}


	}
</style>
