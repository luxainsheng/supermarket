<template>
<div class="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" />

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
        <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import {
    getHomeMultidata,
    getHomeGoods
} from "@/network/home";
import {
    debounce
} from "common/utils";

export default {
    name: "Home",
    components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                pop: {
                    page: 0,
                    list: []
                },
                new: {
                    page: 0,
                    list: []
                },
                sell: {
                    page: 0,
                    list: []
                },
            },
            currentType: "pop",
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        };
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list;
        },
    },
    destroyed() {
        console.log('home destroyed');
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        // console.log(this.saveY);

    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata();

        // 2.请求商品数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
    },
    mounted() {
        // 1. 图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        this.$bus.$on("itemImageLoad", () => {
            refresh();
        });
    },

    // 方法
    methods: {
        /**
         * 事件监听相关方法
         */
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = "pop";
                    break;
                case 1:
                    this.currentType = "new";
                    break;
                case 2:
                    this.currentType = "sell";
                    break;
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        contentScroll(positon) {
            // 1.判断BackTop是否显示
            this.isShowBackTop = -positon.y > 1000;

            // 2.决定tabControl是否吸顶（position: fixed）
            this.isTabFixed = -positon.y > this.tabOffsetTop;
        },
        loadMore() {
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad() {
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },

        /**
         * 网络请求相关方法
         */
        getHomeMultidata() {
            getHomeMultidata().then((res) => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            });
        },
        getHomeGoods(type) {
            //让page从0变为1
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then((res) => {
                //数组push数组前面加...
                this.goods[type].list.push(...res.data.list);
                // 再调用此函数让page+1
                this.goods[type].page += 1;

                // 完成上拉加载更多
                this.$refs.scroll.finishPullUp();
            });
        },
    },
};
</script>

<style scoped>
.home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
}

.home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}

.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
}

.content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
