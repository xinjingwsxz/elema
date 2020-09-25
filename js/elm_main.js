//主页广告组件
let mainadvertisingtemp = Vue.extend({
	template: "#mainadvertisingtemp",
	props: {
		mainadvertising:""
	}
});
let mainadvertisingcpn = Vue.component('mainadvertisingcpn', mainadvertisingtemp);


//主页分类组件
let maintypetemp = Vue.extend({
	template: "#maintypetemp",
	props:{
		maintypelist:""
	}
});
let maintypecpn = Vue.component('maintypecpn', maintypetemp);



let maintemp = {
	template: "#maintemp",
	data:function(){
		return{
			shoplist:"",
			maintypelist:"",
			mainadvertising:""
		}
	},
	methods: {

		getData() {
			console.log("getData");
			this.$http.get("./json/" + "shoplist" + ".json").then(function(res) {
				this.shoplist = res.body.dataZone.list;
			}, getDataFailed);
			this.$http.get("./json/" + "maintypelist" + ".json").then(function(res) {
				this.maintypelist = res.body.dataZone.list;
				console.log(this.maintypelist);
			}, getDataFailed);
			this.$http.get("./json/" + "mainadvertising" + ".json").then(function(res) {
				for(temp of res.body.dataZone.list){
					temp.img ="background-image: url(" + temp.img + ")";
				}
				this.mainadvertising = res.body.dataZone.list;
				console.log(this.mainadvertising);
			}, getDataFailed);
		}
	},
	mounted() {
		this.getData();
	},
}


