<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <!-- 1.无论是否设置click:false，button都可以点击 -->
      <!-- <button @click="btnClick">按钮</button> -->
      <!-- 2.必须设置click:true，那么div才能监听点击 -->
      <!-- <div @click="divClick">呵呵</div> -->
      <ul class="content">
        <button @click="btnClick">按钮</button>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
        <li>12311</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  created() {},
  mounted() {
    this.scroll = new BScroll(this.$refs.aaaa, {
      // probeType: 3,
      // pullUpLoad: true,
    });

    this.scroll.on("scroll", (position) => {
      console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
  methods: {
    btnClick() {
      console.log("btn");
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 50px;
  background: red;
}
</style>
