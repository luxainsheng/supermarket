<template>
 <div class="base-info" v-if="Object.keys(goods).length !==0">
     <div class="goods-title">{{goods.title}}</div>

     <div class="goods-price">
        <span class="new-price">{{goods.newPrice}}</span>
        <span class="old-price">{{goods.oldPrice}}</span>
        <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
     </div>

     <div class="info-other">
         <span>{{goods.columns[0]}}</span>
         <span>{{goods.columns[1]}}</span>
         <span>{{name}}</span>
     </div>
     <!-- <div class="info-services">
         <span class="info-service-item" v-for="index in goods.services.length-1" :key='index'>
             <img :src="goods.services[index-1].icon" alt="">
             <span>{{goods.services[index-1].name}}</span>
         </span>
     </div> -->
 </div>
</template>

<script>
export default {
    name:'DetailBaseInfo',
    props:{
    goods:{
        type:Object,
        default(){
            return {}
        }
    },
    name:{
        type:String,
        default(){
            return ''
        }
    }
}
}
</script>

<style scoped>
.base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}
.goods-title{
    color: #222;
    font-size: 15px;
    
}
.goods-price{
    margin-top: 10px;
}
.goods-price .new-price{
    font-size: 24px;
    color: var(--color-high-text);
}
.goods-price .old-price{
    font-size: 13px;
    margin-left: 5px;
    /* 删除线 */
    text-decoration: line-through;
}
.discount{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background: var(--color-high-text);
    border-radius: 8px;
    margin-left: 4px;
}
.info-other{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    justify-content: space-between;
}
</style>