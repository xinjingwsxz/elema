let orderList = {
   template:"#orderlistcpn",
   data:function(){
       return{
		   orderList:[],
		   alreadyPayList:[],
		   noPayList:[]
	   }
   },
   methods:{
        getOrder(){//获取数据
			this.$http.get("./json/"+"orderlist" + ".json").then(function(res){
				this.orderList = res.body.dataZone.list;
				 this.alreadyPayList=[];
				 this.noPayList=[];
				for(let t of this.orderList){
				    if(t.stause == 1){
				        this.alreadyPayList.push(t);
				        console.log(t);
				    }else if(t.stause == 2){
						this.noPayList.push(t);
					}
				}
			},getDataFailed);
         
      
        }
    }
};





//链接失败
function getDataFailed(){
    console.log("failed");
    //显示失败信息
}