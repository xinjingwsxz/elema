//货币过滤器
Vue.filter('moneyFmt', function(value) {
	if (parseFloat(value)) {
		return "￥" + parseFloat(value).toFixed(2);
	}
});

Vue.filter('timeFmt', function(value) {
	if (parseFloat(value)) {
		return parseFloat(value) + "分钟";
	}
});

Vue.filter('distanceFmt', function(value) {
	if (parseFloat(value)) {
		return parseFloat(value).toFixed(2) + "km";
	}
});

//路由buytmep ordertemp paytemp
let routers = [
	{
			path: "/pay",
			component: paytemp
		},
	{
		path: "/order",
		component: ordertemp
	},
	{
		path: "/orderlist",
		component: orderList
	},
	{
		path: "/buy",
		component: buytemp
	},
	{
		path: "/shops",
		component: shops
	},
	{
		path: "/discover",
		component: discovertemp
	},
	{
		path: "/main",
		component: maintemp
	},
	{
		path: "/mine",
		component: minetemp
	},
	{
		path: "/*",
		component: maintemp
	}
]
let elemaRouter = new VueRouter({
	routes: routers
});

//主导航组件
let mainNavCpn = Vue.extend({
	template: "#mainnavcpn"
});
let mainnav = Vue.component('mainnav', mainNavCpn);



//顶部组件
let toptemp = Vue.extend({
	template: "#toptemp",
	methods: {
		back() {
			console.log("back");
			this.$emit("back", "1");
		}
	}
});
let topcpn = Vue.component('topcpn', toptemp);


//回顶
let goTopTemp = Vue.extend({
	template: "#goTopTemp",
	data: function() {
		return {
			topDistance: 0
		}
	},
	mounted() {
		window.addEventListener("scroll", this.getTopDistance);
	},
	methods: {
		getTopDistance() {
			this.topDistance = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
			if (this.topDistance > 66) {
				$("#fixed").addClass("fixed-top");
			} else {
				$("#fixed").removeClass("fixed-top");
			}
		},
		//实现回到顶部
		goTop() {
			let id = setInterval(function() {
				let y = $(window).scrollTop();
				console.log(y);
				if (y > 0) {
					y = y - 10;
					$(window).scrollTop(y);
				} else {
					clearInterval(id);
				}
			}, 5);
		}
	}
});
let gotopcpn = Vue.component('gotopcpn', goTopTemp);




//主组件
const index = new Vue({
	el: "#index",
	data: {

	},
	methods: {

	},
	router: elemaRouter
});
