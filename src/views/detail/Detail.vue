<template>
<div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-shop-info :detail-info="detailInfo" />
    </scroll>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'

import Scroll from 'components/common/scroll/Scroll'

import {
    getDetailData,
    Goods,
    Shop,
} from "network/detail.js";
// import Scroll from '../../components/common/scroll/Scroll.vue';
export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        Scroll
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo:{}
        };
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid;

        // 2.根据iid请求详情数据
        getDetailData(this.iid).then((res) => {
            // 1.获取顶部图片轮播图区域
            console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages;

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3.创建店铺信息
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo
        });
    },
};
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}

.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}

.content {
    height: calc(100% - 44px);
}
</style>
