

let shoplisttemp = Vue.extend({
	template: "#shoplisttemp",
	methods:{
		setCurrentShop(index){
			
			currentShop = index;
			console.log("currentShop = " + currentShop);
		}
	},
	props:{
		shoplist:"",
	}
	
});
let shoplistcpn = Vue.component('shoplistcpn', shoplisttemp);