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
		this.readG_orderListLength();
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
	methods:{
		//获取readG_orderListLength(购物车)中的订单数量
		readG_orderListLength(){
			this.orderLength = g_orderList.length;
		},
		
		
		//加入购物车
			//比对g_orderList中的shop.id 和当前order.shop.id 如果一样合并产品列表
		addOrderList(){
			console.log("addOrderList");
			currentOrder = this.makeOrder();
			console.log(currentOrder);
			let flag =false;
			for(order of g_orderList){
				console.log("id");
				console.log(order.shop.id);
				console.log(currentOrder.shop.id);
				if(order.shop.id == currentOrder.shop.id){
					order.productList = order.productList.concat(currentOrder.productList);
					flag = true;
				}
			}
			if(!flag){
				g_orderList.push(currentOrder);
				this.orderLength++;
			}
			
			console.log(g_orderList.length);
			console.log(g_orderList);
		},
		
		//获取商店信息
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
