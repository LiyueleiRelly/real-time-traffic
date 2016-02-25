//

var colors=["#17BF00","#FF9F19","#F23030","BB0000"]

/**
 * Created by Relly on 2016/1/18.
 */
//地图初始化
initialization(14);


//路况绘制
refresh();
//地图拖动事件
map.on('dragend',function(){refresh();});
//地图比例尺变化
map.on('zoomend',function(){refresh();});


function initialization(zoom){
    map = new AMap.Map('map', {
        resizeEnable: true,
        zoom:zoom,
        center: [108.95787,18.4635000],
        doubleClickZoom:false,
        mapStyle:"fresh",
        features:["bg","road"],
        //zooms:[6,18],
    });


    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
    })
}

function url(){
    return "1.php";
}

//callajax
function callAjax(Ajaxurl,Ajaxtype,Ajaxdata,callback){

    $.ajax({url:Ajaxurl,type:Ajaxtype,dataType:"json",async:true,data:Ajaxdata, success:callback,});
}

//ajax回调函数
function callback(data) {

    var obj = eval(data);
    console.log(data.length);
    for(var i=0;i<data.length;i++)
    {
        roaddraw(obj[i]);
    }
}

//获取边界
function bounds(){
    var maxlng=map.getBounds().northeast.lng;
    var maxlat=map.getBounds().northeast.lat;
    var minlng=map.getBounds().southwest.lng;
    var minlat=map.getBounds().southwest.lat;
    var zoom=map.getZoom();

    var json={maxlng:maxlng,maxlat:maxlat,minlng:minlng,minlat:minlat,zoom:zoom}
    console.log(json);
    console.log(map.getSize().height);
    console.log(map.getSize().width);

    return json;


}

//callajax
function refresh(){
    map.clearMap();
    callAjax(url(),"POST",bounds(),callback);
}

//绘图函数
function roaddraw(section){

    var weight=arguments[2] ? arguments[2] :1;
    var lineArr=[
        [section.splong,section.splat],
        [section.tplong,section.tplat],
    ];
    var polyline = new AMap.Polyline({
        path: lineArr,          //设置线覆盖物路径
        //strokeColor: colors[section.color], //线颜色
        strokeColor:"#17BF00",
        strokeOpacity: 1,       //线透明度
        strokeWeight:weight,        //线宽
        strokeStyle: "solid",   //线样式
        strokeDasharray: [10, 5] //补充线样式
    });
    polyline.setMap(map);
}


