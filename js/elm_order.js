// //订单组件
let ordertemp = Vue.extend({
	template: "#ordertemp",
	data:function (){
		return{
			isShowOrder:true,
			d_orderinfo:{},
			payTypeList:[],
			isShowPay:false
		}
	},
	props:{
		orderinfo:""//定义一个数据接收上级传来的数据
	},                   
	methods:{
		pay(){
			console.log("pay");
			console.log(this.orderinfo);
			this.d_orderinfo = this.orderinfo;
			this.isShowOrder=false;
			this.isShowPay=true;
			this.$http.get("./json/paytype.json").then(
				function (res){
					this.payTypeList = res.body.dataZone.list;
				}
			,getDataFailed);
		},
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