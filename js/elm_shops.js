let shops = {
	template: "#shopstemp",
	data:function(){
		return{
			shoplist:""
		}
	},
	mounted() {
		this.getShops();
	},
	
	methods:{
		getShops(){
			console.log("getShops");
			this.$http.get("./json/" + "shoplist" + ".json").then(function(res) {
				this.shoplist = res.body.dataZone.list;
			}, getDataFailed);
		}
	}
}


let buytemp = {
	template: "#buytemp",
	data:function(){
		return{
			shop:"",
			productList:[],
			orderList: [],
			alreadyPayList: [],
			noPayList: [],
			isOrderShow:false,
			isOrderListShow:true,
			orderInfo:{}
			
		}
	},
	mounted() {
		this.getProductList();
		this.getShops();
	},
	computed:{
		amount(){
			this.shop.amount = 0;
			for(let i = 0 ; i < this.productList.length; i++){
				this.shop.amount+= this.productList[i].count * this.productList[i].price
			}
			return this.shop.amount;
		}
	},
	
	
	//通过商店编号获取商品信息
	//生成order 
	//
	
	methods:{
		getShops(){
			this.$http.get("./json/" + "shoplist" + ".json").then(function(res) {
				this.shop = res.body.dataZone.list[currentShop];
				this.getProductList(this.shop.id);
			}, getDataFailed);
		},
		//获取该商家的商品信息
		getProductList(shopId){
			this.$http.get("./json/" + "productlist" + ".json").then(function(res) {
				for(product of res.body.dataZone.list){
					if(shopId == product.shop){
						this.productList.push(product);
					}
				}
			}, getDataFailed);
		},
		reback(){//从上个页面返回事件
			console.log("orderlist.reback");
			this.isOrderShow=false;
			this.isOrderListShow=true;
		},
		
		
		//点击结算到结算页面
		//
		goPay(){//跳转到支付页面  拿到索引 
		
			// //将数据传输到子组件中
			// this.orderInfo= this.noPayList[ind];
			// //设置数据的订单页显示和隐藏
			// this.isOrderShow=true;
			// this.isOrderListShow=false;
			// console.log(this.isOrderShow);
			this.makeOrder();
			g_currentList.push(currentOrder);
		},
		
		
		//生成订单
		//当商品数量大于1获取商品将商品信息加入订单列表
		//将商店信息写入订单
		//将收获信息写入订单
		makeOrder(){
			for(procduct of this.productList){
				if(procduct.count>0){
					currentOrder.productList.push(procduct);
				}
				currentOrder.shop=this.shop;
				currentOrder.user=g_user;
			}
			console.log(currentOrder);
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
						this.noPayList.push(t);
					}
				}
			}, getDataFailed);
		}
	},

}
