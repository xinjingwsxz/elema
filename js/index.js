


let routers = [
	{
		path:"/orderlist",
		component:orderList
	},
	{
		path:"/*",
		component:orderList
	}
]
let elemaRouter = new VueRouter({
	routes:routers
});


//主导航组件
let mainNavCpn =Vue.extend({
	template:"#mainnavcpn"
});
let mainnav = Vue.component('mainnav',mainNavCpn);

const index = new Vue({
	el:"#index",
	data:{
		orderList:[]
	},
	methods:{

	},
	router:elemaRouter
});
