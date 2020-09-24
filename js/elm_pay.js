// //订单组件
let paytemp = Vue.extend({
	template: "#paytemp",
	data:function (){
		return{
				orderId:-1,//订单号
				paytypeId:2,//支付类型编号
				isShowProductList:false
				
		}
	},
	props:{
		orderinfo:"", //订单信息
		paytypelist:"",//支付方式信息
	},                   
	methods:{
		pay(){
			this.orderId = this.orderinfo.id;
			console.log("paytypeId = " + this.paytypeId);
			console.log("orderId = " + this.orderId);
			
		},
		back(){
			console.log("pay.back");
			this.$emit("back","1");
		}
		
	}
});
let paycpn = Vue.component('paycpn', paytemp);