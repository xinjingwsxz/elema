let g_orderList = []; //订单列表(购物车)
let g_currentList=[]; //临时订单
let currentShop;	  //当前商店



//当前用户
let g_user = {
	address:"东软睿道java6班",
	user:"我很帅",
	tel:"12345678910"
}


//订单构造器
function Order(){
	this.shop={};
	this.user={};
	this.productList=[];
}