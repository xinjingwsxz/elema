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
		console.log(g_currentList);
	},
	methods:{
		pay(){
			console.log("pay");
			// console.log(this.orderinfo);
			// this.productlist = this.orderinfo.productlist;
			// this.isShowOrder=false;
			// this.isShowPay=true;
			// this.$http.get("./json/paytype.json").then(
			// 	function (res){
			// 		this.payTypeList = res.body.dataZone.list;
			// 	}
			// ,getDataFailed);
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