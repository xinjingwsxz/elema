// //订单组件
let paytemp = {
	template: "#paytemp",
	data: function() {
		return {
			orderId: -1, //订单号
			paytypeId: 2, //支付类型编号
			payTypeList: "", //支付方式信息
			orderList:[]
		}
	},

	mounted() {
		this.orderList = g_currentList;
		console.log("pay-orderList");
		console.log(this.orderList);
		this.$http.get("./json/paytype.json").then(
			function(res) {
				this.payTypeList = res.body.dataZone.list;
			}, getDataFailed);
	},
	methods: {
		changeShow(event) {
			let c = $(event.target.parentElement.parentElement.nextElementSibling);
			if (c.css("display") == 'none') {
				c.css("display", "flex");
			} else {
				c.css("display", "none");
			}
		},
		pay() {
			this.orderId = this.orderinfo.id;
		

		},
		back() {
		
			this.$emit("back", "1");
		}

	}
};
// let paycpn = Vue.component('paycpn', paytemp);
