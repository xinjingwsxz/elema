


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



const index = new Vue({
	el:"#index",
	data:{
		
	},
	methods:{
		
	},
	router:elemaRouter
});
