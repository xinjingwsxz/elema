let orderList = {
	template: "#orderlistcpn",
	data: function() {
		return {
			alreadyPayList: [],
			noPayList: [],
			orderInfo: {},
		}
	},
	mounted() {
		this.getOrderList();
	},
	computed: {
		allOrdersAmount() {
			let amount = 0;
			for (order of this.noPayList) {
				order.shop.amount = 0;
				order.shop.amount += computeAmount(order.productList) + order.shop.deliveryCost;
				console.log(order.shop.amount);
				amount += order.shop.amount;
			}
			return amount;
		}
	},
	methods: {
		payAll() {
			console.log("nopayList");
			console.log( this.noPayList);
			g_currentList = this.noPayList;
		},
		//下拉类表显隐
		changeShow(event){
			let p = $(event.target);
			let c = $(event.target.nextElementSibling);
			if (c.css("display") == 'none') {
				c.css("display", "block");
				p.addClass("fa-toggle-up");
				p.removeClass("fa-toggle-down");
			} else {
				c.css("display", "none");
				p.addClass("fa-toggle-down");
				p.removeClass("fa-toggle-up");
			}
		},


		// reback() { //从上个页面返回事件
		// 	console.log("orderlist.reback");
		// 	this.isOrderShow = false;
		// 	this.isOrderListShow = true;
		// },

		//跳转到支付页面  拿到索引 
		goPay(index) {
			console.log("goPay");
			console.log(this.noPayList[index]); //获取索引中的数据
			g_currentList[0] = this.noPayList[index];
			//将数据传输到子组件中
			// this.orderInfo = this.noPayList[ind];
			//设置数据的订单页显示和隐藏
			// this.isOrderShow = true;
			// this.isOrderListShow = false;
			// console.log(this.isOrderShow);
		},


		//获取订单数据
		getOrderList() {
			//获取未支付订单
			this.noPayList = g_orderList; //新建订单从g_orderList中获取

			//获取已支付订单
			this.$http.get("./json/" + "orderlist" + ".json").then(function(res) {
				this.orderList = res.body.dataZone.list;
				this.alreadyPayList = [];
				for (let t of this.orderList) {
					t.amount = computeAmount(t.productlist) + t.deliveryCost;
					this.alreadyPayList.push(t);
				}
			}, getDataFailed);
		}
	},
};

//计算总价
function computeAmount(list) {
	sum = 0;
	for (let item of list) {
		sum += item.price * item.count;
	}
	return sum;
}
