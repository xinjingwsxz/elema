
//商品信息组件
let productInfotemp = Vue.extend({
	template: "#productInfotemp",
	props:{
		productinfo:{}
	},
	mounted(){
	},
	methods:{
		show(){
			console.log(this.productinfo);
		}
	}
	
});
let productInfocpn = Vue.component('productinfocpn', productInfotemp);


