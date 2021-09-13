<template>
  <div class="shop-info">
      <div class="shop-top">
          <img :src="shop.logo" alt="">
          <span class="title">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
          <div class="shop-middle-item left">
              <div class="info-sells">
                  <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
                  <div class="total">总销量</div>
              </div>
              <div class="all">
                  <div>{{shop.goodsCount}}</div>
                  <div>全部宝贝</div>
              </div>
          </div>
          <div class="shop-right shop-middle-item">
          <table>
              <tr v-for="(item,index) in shop.score" :key="index">
                  <td >{{item.name}}</td>
                  <td class="score" :class="{'score-more':item.isBetter}">{{item.score}}</td>
                  <td class="better" :class="{'better-more':item.isBetter}">{{item.isBetter?'高':'低'}}</td>
              </tr>
          </table>
      </div>
      </div>
       <div class="shop-bottom">进店逛逛</div>
  </div>
</template>

<script>
export default {
    filters:{
        sellCountFilter(value){
            let result =value;
            if(result>10000){
                // toFixed保留一位小数
               return result= (result/10000).toFixed(1)+'万'
            }
        }
    },
 props:{
     shop:{
         type:Object,
         default(){
             return {}
         }
     }
 }
}
</script>

<style scoped>
.shop-info{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
}
.shop-top{
    line-height: 45px;
    display: flex;
    /* 垂直居中对齐 */
    align-items: center;
}
.shop-top img{
    width: 45px;
    height: 45px;
}
.shop-top .title{
   margin-left: 10px;
   vertical-align: middle;
}
.shop-middle{
    margin-top: 25px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 520;
    display: flex;
    align-items: center;
}
.shop-middle-item{
    flex: 1;
}
.left{
    display: flex;
    text-align: center;
    justify-content: space-evenly;
    text-align: center;
    border-right: 2px solid gray;
}
/* .all{
    line-height: 40px;
    border-right: 3px solid gray;
} */
.shop-right table{
    width: 120px;
    margin-left: 30px;
}
.score{
    color: green;
}
.better{
    background: green;
    border-radius: 5px;
    color: white;
}
.score-more{
    color: tomato;
}
.better-more{
    background: tomato;
}
.shop-bottom{
    margin: 0 auto;
    text-align: center;
    line-height: 30px;
    background: gainsboro;
    width: 50%;
    border-radius: 6px;
}
</style>