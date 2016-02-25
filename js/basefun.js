/**
 * Created by Relly on 2016/1/17.
 */
//颜色
var colors=["#17BF00","#FF9F19","#F23030","BB0000"]

//初始化地图
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

//添加控件：画布，
   map.plugin(['AMap.CustomLayer','AMap.ToolBar','AMap.Scale','AMap.DistrictSearch'],function(){
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
       canvas = document.createElement('canvas');
       canvas.width = map.getSize().width;
       canvas.height = map.getSize().height;
       var cus = new AMap.CustomLayer(canvas, {
           zooms: [3, 18],
           zIndex: 12,
       });
       //cus.render = onRender;
       cus.setMap(map);
       onRender();
    })
}
//php页面的url
function url(){
    return "1.php";
}

//callajax
function callAjax(Ajaxurl,Ajaxtype,Ajaxdata,callback){

    $.ajax({url:Ajaxurl,type:Ajaxtype,dataType:"json",async:true,data:Ajaxdata, success:callback,});
}
//callajax函数的回调函数，包含php传来数据的处理和调用绘图函数
function  callback(data){
    /* var context=canvas.getContext("2d");
     context.clearRect(0, 0, canvas.width, canvas.height);*/
    var obj = eval(data);
    console.log(data.length);
    var b=bounds();
    var scalex=canvas.width/(b.maxlng- b.minlng);
    var scaley=canvas.height/(b.maxlat- b.minlat);

   /* var context=canvas.getContext("2d");
    var sx=( obj[0].splong- b.minlng)*scalex;
    var sy=(b.maxlat- obj[0].splat)*scaley
    context.beginPath();
    context.strokeStyle="#17BF00";
    context.moveTo(sx,sy);
    for(var i=0;i<data.length;i++)
    {
        context.lineTo(( obj[i].tplong- b.minlng)*scalex,(b.maxlat- obj[i].tplat)*scaley);
    }

    context.stroke();*/



    for(var i=0;i<data.length;i++)
    {
        draw(obj[i],b,scalex,scaley);
    }
}

//绘图函数，包含将坐标转换为像素坐标的公式。
function  draw(line,b,scalex,scaley){
    var context=canvas.getContext("2d");
    /*将坐标点转换为像素坐标*/

    var sx=( line.splong- b.minlng)*scalex;
    var sy=(b.maxlat- line.splat)*scaley;
    var tx=( line.tplong- b.minlng)*scalex;
    var ty=(b.maxlat- line.tplat)*scaley;


    context.beginPath();
    context.moveTo(sx,sy);
    context.lineTo(tx,ty);
    context.strokeStyle="#17BF00";
    context.stroke();
}





//获取边界
function bounds(){
    var maxlng=map.getBounds().northeast.lng;
    var maxlat=map.getBounds().northeast.lat;
    var minlng=map.getBounds().southwest.lng;
    var minlat=map.getBounds().southwest.lat;
    var zoom=map.getZoom();

    var json={maxlng:maxlng,maxlat:maxlat,minlng:minlng,minlat:minlat,zoom:zoom}

    return json;


}

//callajax
function refresh(){
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

function addprovince(){
    map.plugin(['AMap.DistrictSearch'],function(){
        var opts = {
            subdistrict: 1,   //返回下一级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'province'  //查询行政级别为 市
        };
        //实例化DistrictSearch
        district = new AMap.DistrictSearch(opts);
        district.setLevel('province');
        //行政区查询
        district.search('山西省', function(status, result) {
            var bounds = result.districtList[0].boundaries;
            var polygons = [];
            if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    var polygon = new AMap.Polygon({
                        map: map,
                        strokeWeight: 1,
                        path: bounds[i],
                        fillOpacity: 0.7,
                        fillColor: '#CCF3FF',
                        strokeColor: '#CC66CC'
                    });
                    polygons.push(polygon);
                }
                map.setFitView();//地图自适应
            }


        })
    })
}