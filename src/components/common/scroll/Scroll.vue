<template>
<!-- ref/children  -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            observeDOM:true,
            //控制div元素是否可点击
            click:true,
            //根据数字决定position的显示类型
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
        })

        // 2.监听滚动的位置
        this.scroll.on('scroll',(positon)=>{
            // console.log(positon);
            this.$emit('scroll',positon)
        })

        // 3.监听上拉事件
       if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
             // 监听后通过子穿父￥emit发射事件给父组件
            this.$emit("pullingUp")
        })
       }

    },
    methods: {
        scrollTo(x,y,time=400){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        }
    },
}
</script>

<style>

</style>