/**
 * Created by Relly on 2016/1/13.
 */
var map = new BMap.Map("map");          // 创建地图实例
var ggPoint = new BMap.Point(108.95787,18.4635000);  // 创建点坐标
map.centerAndZoom(ggPoint, 15);
map.setMapStyle({style:'googlelite'});//地图风格

//控件添加
var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}
map.addControl(new BMap.NavigationControl(opts));
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());// 略缩地图控件



//转换函数
function translation(xx,yy){
    var z=Math.sqrt(xx*xx+yy*yy)+0.00002*Math.sin(yy*Math.PI);
    var theta=Math.atan2(yy,xx)+0.000003*Math.cos(xx*Math.PI);
    var bd_lon = z*Math.cos(theta)+0.0065;
    var bd_lat = z*Math.sin(theta)+0.006;
    var point={"lon":bd_lon,"lat":bd_lat};
    return point;

}

var npoint=translation(18.4635000,108.95787);
var s=new BMap.Point(npoint["lat"],npoint["lon"]);
var marker = new BMap.Marker(s);
map.addOverlay(marker);
var label = new BMap.Label("函数转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
marker.setLabel(label); //添加百度label

//坐标转换




var markergg = new BMap.Marker(ggPoint);
map.addOverlay(markergg); //添加GPS marker
var labelgg = new BMap.Label("未转换的gcj02坐标（错误）",{offset:new BMap.Size(20,-10)});
markergg.setLabel(labelgg); //添加GPS label

//坐标转换完之后的回调函数

translateCallback = function (data){
    if(data.status === 0) {
        var marker = new BMap.Marker(data.points[0]);
        map.addOverlay(marker);
        var label = new BMap.Label("百度API转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
        marker.setLabel(label); //添加百度label
    }
}

setTimeout(function(){
    var convertor = new BMap.Convertor();
    var pointArr = [];
    pointArr.push(ggPoint);
    convertor.translate(pointArr, 3, 5, translateCallback)
}, 1000);



/* //标注
 var marker = new BMap.Marker(point);        // 创建标注
 map.addOverlay(marker);     // 将标注添加到地图中*/

//绘制线段





callAjax(url(),"get",null,callback);
function callback(data){
    console.log(data.length);
    var obj=eval(data);
    /*var points=[];
    for(var i=0;i<4;i++) {
        var j = i * 2;
        points[j] = new BMap.Point(obj[i].splong, obj[i].splat);
        points[j + 1] = new BMap.Point(obj[i].tplong, obj[i].tplat);
    }

        setTimeout(function(){
            var convertor = new BMap.Convertor();
            convertor.translate(points, 1, 5, translateCallback)
        }, 1);
        translateCallback = function (data) {
            console.log(data);
            if (data.status === 0) {

                for (var i = 0; i < 8; i += 2) {
                    console.log(data.points[i].lng);
                    var poly = new BMap.Polyline([
                            new BMap.Point(data.points[i].lng,data.points[i].lat),
                            new BMap.Point(data.points[i+1].lng,data.points[i+1].lat),
                        ],
                        {strokeColor: "red", strokeWeight: 3, strokeOpacity: 0.5}
                    );
                    map.addOverlay(poly);
                }
            }

        }*/


      //直接绘图不转换
        for(var i=0;i<data.length;i++)
        {
            var s=translation(obj[i].splong,obj[i].splat);
            var t=translation(obj[i].tplong,obj[i].tplat);
            var poly = new BMap.Polyline([
                    new BMap.Point(s["lon"],s["lat"]),
                    new BMap.Point(t["lon"],t["lat"])
                ],
                {strokeColor:"green", strokeWeight:30, strokeOpacity:1}
            );
            map.addOverlay(poly);
        }


}
