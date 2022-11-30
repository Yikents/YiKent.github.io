<template>
  <div class="home-new-album">
    <div class="home-new-album-swiper">
      <swiper class="swiper" :options="swiperOption" @touchMove.stop>
        <swiper-slide class="home-new-album-swiper-item" v-for="item in list" :key="item.id"
          :style="{ backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" >
            <div class="album-swiper-content" @click="setarea(item.area,item.name)" >
              <div class="album-swiper-song-Name">{{ item.name }}</div>
            </div>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: '华语',
          url: require('../../assets/image/ay/Z_H.jpg'),
          area: 'Z_H'
        },
        {
          id: 2,
          name: '欧美',
          url: require('../../assets/image/ay/E_A.jpg'),
          area: 'E_A'
        },
        {
          id: 3,
          name: '韩国',
          url: require('../../assets/image/ay/KR.jpg'),
          area: 'KR'
        },
        {
          id: 4,
          name: '日本',
          url: require('../../assets/image/ay/JP.jpg'),
          area: 'JP'
        },
      ],
      swiperOption: {
        slidesPerView: 2.5,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },

  methods:{
    setarea(area,name) {
      this.$router.push({
        path:'/area-album/'+ [area,name]
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.home-new-album {
  padding: 0 10px;

  .home-new-album-swiper {
    height: 75px;
    align-items: center;


    .home-new-album-swiper-item {
      display: flex;
      align-items: flex-end;
      height: 75px;
      border-radius: 3px;
      // background: red;


      .album-swiper-content {
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: center;

        .album-swiper-song-Name {
          width: 130px;
          height: 20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 20px;
        }

        .album-swiper-song-Name {

          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }

      }
    }
  }
}
</style>