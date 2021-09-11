
import { request } from "./request"

//请求详情
export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}


//商品基本信息
// export class Goods {
//     constructor(itemInfo, columns, shopInfo) {
//         this.title = itemInfo.title;
//         this.price = itemInfo.price;
//         this.oldPrice = itemInfo.oldPrice;
//         this.lowNowPrice = itemInfo.lowNowPrice;
//         this.discountDesc = itemInfo.discountDesc;
//         this.columns = columns;
//         this.services = shopInfo.services;
//     }
// }