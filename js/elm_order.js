// //订单组件
let ordertemp = Vue.extend({
	template: "#ordertemp",
	data:function (){
		return{
			orderList:[]
		}
	},
	mounted(){
		this.orderList=g_currentList;
	},
	///计算总价
	//获取设置的amount的值
	//获取配送费
	//计算总价
	computed:{
		total(){
			var totalAmount=0;
			for(order of this.orderList){
				order.shop.amount=0;
				let flag =0;
				for(product of order.productList){
					flag += product.count;
					order.shop.amount += product.price * product.count;
				}
				if(!flag){
					continue;
				}
				totalAmount += order.shop.deliveryCost + order.shop.amount;
			}
			return totalAmount;
		}
		
		
	},
	methods:{

		reback(){
			console.log("kkk");
			this.isShowOrder=true;
			this.isShowPay=false;
		},
		back(){
			console.log("order.back");
			this.$emit("back","1");
		}
	}
});
let ordercpn = Vue.component('ordercpn', ordertemp);