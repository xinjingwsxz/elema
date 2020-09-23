

let order = {
   template:"#order",
   data:function(){
       return{
		   orderList:[],
		   showList:[]
	   }
   },
   methods:{
        getOrder(){//获取数据
            getData.call(this , "order");
        },
        showOrder(type){//根据传入的类型个orderList选取不同的值
            console.log(type);
            this.showList=[];
            for(let t of this.orderList){
                if(t.stause == type){
                    this.showList.push(t);
                    console.log(t);
                }
            }
        }
    }
};



//根据不同功能模块block 从json文件中获取数据 将获取的 数据提取出来
function getData(block){

    this.$http.get("./json/"+block + ".json").then(function(res){
        this.orderList = res.body.dataZone.list;
    },getDataFailed);
}

//链接失败
function getDataFailed(){
    console.log("failed");
    //显示失败信息
}
