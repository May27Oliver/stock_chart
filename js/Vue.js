var child = {
    data:function(){
        return {
            date:[],
            tsmc_price:[],
            stock_title:'',
            start_date:'',
            stock_no:'',
            chartNum:'',
            call_stock:function(stock_no,num){
                let vm = this;
                vm.chartNum = `chart${num}`;
                console.log('vm.chartNum',vm.chartNum)
                // var cors='https://cors-anywhere.herokuapp.com/'
                // var url="https://www.twse.com.tw/exchangeReport/STOCK_DAY_AVG?response=json&date=20200717&stockNo=2330&_=1594955758180";
                vm.service_get_stock(stock_no).then(function(data){
                    let title = data.title.split(' ');
                    vm.stock_title = title[1];
                    data.data.forEach(function(stock_item){
                        // vm.date.push(stock_item[0]);
                        vm.tsmc_price.push(stock_item[1]);
                    });
                    /* 1.D3處理JSON檔的JSON()函式：
                    d3.json(data,function(json){//d3處理json資料有d3.json()這個方法，json()裡投入兩個參數，第一個是json資料，第二個是callback function
                        console.log('d3.json',json);
                    }) */
                    console.log('d3.select(".stock-table")',d3.select(".stock-table"))
                    /* 2.用D3新增html div為標籤的長條圖：*/
                    d3.select(`.stock-table.${vm.chartNum}`).selectAll("div")
                    .data(vm.tsmc_price)
                    .enter() //建立新的和資料綁定再一起的元素，此函式會檢視目前的DOM選擇器，以及傳遞到這個函式的資料。如果所接收到的資料執筆相對應的DOM元素多，enter()就會建立一個新的佔存元素
                    .append("div")//此函式會使用enter()建立的佔存元素，並在DOM後方加上一個p元素，然後把剛建立的這個p元素的參考變數傳遞到鏈結中的下一步。
                    .transition()
                    .duration(1500)
                    .attr("class","value-bar")
                    .style("height",function(value){
                        console.log('執行高度')
                        return +value +"px";
                    });//拿到剛建立的p元素的參考變數傳遞到鏈結中的下一步。
                    
                    /* 3.用D3新增SVG長條圖
                    let height = 0;
                    let width = vm.tsmc_price.length*20
                    vm.tsmc_price.forEach(function(value){
                        if(+height < +value){
                            height = +value + 50;
                        }
                    })
                    let svg = d3.select(".stock-table").append("svg").attr("height",height-100).attr("width",width);
                    svg.selectAll("rect")
                    .data(vm.tsmc_price)
                    .enter()
                    .append("rect")
                    .attr("x",function(price,key){
                        return key*20
                    })
                    .attr("y",function(value){
                        return height - value;//如果要長條圖由下往上長，此處就要歸零。
                    })
                    .attr("width",18)
                    .attr("height",function(value){
                        return +value+"px";
                    })
                    .attr("fill",function(value){
                        return `rgb(10,90,${value / 4})`
                    })*/

                    /* 尺度 
                    let scale_dataset=[];
                    for(let i = 0; i < vm.tsmc_price.length; i++){
                        scale_dataset.push(i);
                    }
                    let newScale = d3.scale.linear()
                                        .range([0,scale_dataset[scale_dataset.length-1]])
                                        .domain([scale_dataset[0],scale_dataset[scale_dataset.length-1]]);
                    console.log('scale_dataset',newScale(20));)*/
                // d3.json(cors+url).then(function(data){
                //     let title = data.title.split(' ');
                //     vm.stock_title = title[1];
                //     data.data.forEach(function(stock_item){
                //         vm.date.push(stock_item[0]);
                //         vm.tsmc_price.push(stock_item[1]);
                //     });
                //     /* 1.D3處理JSON檔的JSON()函式：
                //     d3.json(data,function(json){//d3處理json資料有d3.json()這個方法，json()裡投入兩個參數，第一個是json資料，第二個是callback function
                //         console.log('d3.json',json);
                //     }) */

                //     /* 2.用D3新增html div為標籤的長條圖：*/
                //     d3.select(".stock-table").selectAll("div")
                //     .data(vm.tsmc_price)
                //     .enter() //建立新的和資料綁定再一起的元素，此函式會檢視目前的DOM選擇器，以及傳遞到這個函式的資料。如果所接收到的資料執筆相對應的DOM元素多，enter()就會建立一個新的佔存元素
                //     .append("div")//此函式會使用enter()建立的佔存元素，並在DOM後方加上一個p元素，然後把剛建立的這個p元素的參考變數傳遞到鏈結中的下一步。
                //     .transition()
                //     .duration(1500)
                //     .attr("class","value-bar")
                //     .style("height",function(value){
                //         return +value +"px";
                //     });//拿到剛建立的p元素的參考變數傳遞到鏈結中的下一步。
                    
                    /* 3.用D3新增SVG長條圖
                    let height = 0;
                    let width = vm.tsmc_price.length*20
                    vm.tsmc_price.forEach(function(value){
                        if(+height < +value){
                            height = +value + 50;
                        }
                    })
                    let svg = d3.select(".stock-table").append("svg").attr("height",height-100).attr("width",width);
                    svg.selectAll("rect")
                    .data(vm.tsmc_price)
                    .enter()
                    .append("rect")
                    .attr("x",function(price,key){
                        return key*20
                    })
                    .attr("y",function(value){
                        return height - value;//如果要長條圖由下往上長，此處就要歸零。
                    })
                    .attr("width",18)
                    .attr("height",function(value){
                        return +value+"px";
                    })
                    .attr("fill",function(value){
                        return `rgb(10,90,${value / 4})`
                    })*/

                    /* 尺度 
                    let scale_dataset=[];
                    for(let i = 0; i < vm.tsmc_price.length; i++){
                        scale_dataset.push(i);
                    }
                    let newScale = d3.scale.linear()
                                        .range([0,scale_dataset[scale_dataset.length-1]])
                                        .domain([scale_dataset[0],scale_dataset[scale_dataset.length-1]]);
                    console.log('scale_dataset',newScale(20));*/
                });
            },
            service_get_stock:function(num,callback){
                // let xhr = new XMLHttpRequest();
                // xhr.onreadystatechange=function(){
                //     if(xhr.readyState == 4){
                //         if(xhr.status== 200){
                //             if(callback){callback(xhr.response);}
                //         }else{
                //             alert( xhr.status );
                //         }
                //     }
                // }
                // xhr.open("Get",cors + api,true);
                // xhr.send( null );
                let url=`https://www.twse.com.tw/exchangeReport/STOCK_DAY_AVG?response=json&date=20200717&stockNo=${num}&_=1594955758180`
                let cors='https://cors-anywhere.herokuapp.com/';
                return d3.json(cors+url)
            }
        }
    },
    mounted(){
        // this.call_tsmc();
    },
    props:['stockNo'],
    template:'#stock-box'
}

new Vue({
    el:"#app",
    data:{
        stock_no:'',
        tik_tok:0,
        search_stock:function(){
            let vm = this;
            vm.stock_list.unshift(vm.stock_no);
            Vue.nextTick(function(){
                vm.$refs.profo[vm.tik_tok].call_stock(vm.stock_no,vm.tik_tok);//this.$refs可調用component裡的function與變數
                vm.tik_tok++;
            })
        },
        stock_list:[],
    },
    components:{
        "stock-box": child
    }
})
