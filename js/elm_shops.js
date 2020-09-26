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
			orderLength:0
		}
	},
	mounted() {
		this.getProductList();
		this.getShop();
		
	},
	computed:{
		amount(){
			this.shop.amount = 0;
			for(let i = 0 ; i < this.productList.length; i++){
				this.shop.amount+= this.productList[i].count * this.productList[i].price
			}
			return this.shop.amount;
		},

	},
	
	
	//通过商店编号获取商品信息
	//生成order 
	//
	
	methods:{
		addOrderList(){
			console.log("addOrderList");
			g_orderList.push(this.makeOrder());
			this.orderLength++;
			console.log(g_orderList.length);
			console.log(g_orderList);
		},
		getShop(){
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

		
		
		//点击结算到结算页面
		//
		goPay(){//跳转到支付页面  拿到索引 
			g_currentList[0]=this.makeOrder();
		},
		//生成订单
		//当商品数量大于1获取商品将商品信息加入订单列表
		//将商店信息写入订单
		//将收获信息写入订单
		makeOrder(){
			let tempOrder = new Order();
			for(procduct of this.productList){
				if(procduct.count>0){
					tempOrder.productList.push(procduct);
				}
				tempOrder.shop=this.shop;
				tempOrder.user=g_user;
			}
			return tempOrder;
		},
	},

}
