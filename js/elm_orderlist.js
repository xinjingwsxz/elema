let orderList = {
	template: "#orderlistcpn",
	data: function() {
		return {
			orderList: [],
			alreadyPayList: [],
			noPayList: [],
			isOrderShow:false,
			isOrderListShow:true,
			isShowProductList:[],
			orderInfo:{},
			change:false,
			num:0
		}
	},
	mounted() {
		this.getOrderList();
	},


	methods: {
		changeShow(index){
			this.num=this.noPayList[index].showP ++;
			console.log(this.noPayList[index].showP);
		},
		reback(){//从上个页面返回事件
			console.log("orderlist.reback");
			this.isOrderShow=false;
			this.isOrderListShow=true;
		},
		goPay(ind){//跳转到支付页面  拿到索引 
			console.log(this.noPayList[ind]);//获取索引中的数据
			//将数据传输到子组件中
			this.orderInfo= this.noPayList[ind];
			//设置数据的订单页显示和隐藏
			this.isOrderShow=true;
			this.isOrderListShow=false;
			console.log(this.isOrderShow);
		},
		getOrderList() { //获取数据
			console.log("getorderlist");
			this.$http.get("./json/" + "orderlist" + ".json").then(function(res) {
				this.orderList = res.body.dataZone.list;
				this.alreadyPayList = [];
				this.noPayList = [];
				for (let t of this.orderList) {
					if (t.stause == 1) {
						console.log(t.productlist);
						t.amount = computeAmount(t.productlist) + t.deliveryCost;
						this.alreadyPayList.push(t);
					} else if (t.stause == 2) {
						t.amount = computeAmount(t.productlist) + t.deliveryCost;
						t.showP=0;
						this.noPayList.push(t);
					}
				}
			}, getDataFailed);
		}
	},
};
//链接失败
function getDataFailed() {
	console.log("failed");
	//显示失败信息
}

//计算总价
function computeAmount(list){
	sum = 0;
	for (let item of list) {
		sum += item.price * item.count;
	}
	return sum;
}
