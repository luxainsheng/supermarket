<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
        <detail-param-info ref="params" :paramInfo="paramInfo" />
        <detail-comment-info ref="comment" :commentInfo="commentInfo" />
        <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <h2>详情页：{{iid}}</h2>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList.vue';

import {
    getDetailData,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
} from "network/detail.js";

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
        };
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid;

        // 2.根据iid请求详情数据
        getDetailData(this.iid).then((res) => {
            // 1.获取顶部图片轮播图区域
            // console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages;

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3.创建店铺信息
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo

            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            // 7.获取评论信息
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }

            this.$nextTick(() => {
                this.themeTopYs = []

                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            })

        });

        // 3.请求详情页面推荐数据
        getRecommend(this.iid).then(res => {
            // console.log(res);
            this.recommends = res.data.list
        })

    },
    mounted() {
        //    console.log('mounted');
    },
    updated() {

    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
        },
        titleClick(index) {
            // console.log(index);
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        }
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
