
//商品信息组件
let productInfotemp = Vue.extend({
	template: "#productInfotemp",
	props:{
		productlist:""
	},
	methods:{
		change(c,index){
			if(c){
				this.productlist[index].count++;
			}else{
				this.productlist[index].count--;
			}
		}
	},
	
});
let productInfocpn = Vue.component('productinfocpn', productInfotemp);


