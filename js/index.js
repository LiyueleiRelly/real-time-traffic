/**
 * Created by Relly on 2016/1/18.
 */
//地图初始化
initialization(16);

map.on('dragging',function(){canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    onRender()});
//地图比例尺变化
map.on('zoomchange',function(){canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    onRender()});

function onRender(){

    callAjax(url(),"POST",bounds(),callback);
}

$(".province-name").click(function(){
    //alert($(this).html());
    map.clearMap()
    provincebounds($(this).html());

});

function provincebounds(province) {
    var opts = {
        subdistrict: 1,   //返回下一级行政区
        extensions: 'all',  //返回行政区边界坐标组等具体信息
        level: 'province'  //查询行政级别为 市
    };
        //实例化DistrictSearch
        district = new AMap.DistrictSearch(opts);
        district.setLevel('district');
        //行政区查询
        district.search(province, function(status, result) {
            var bounds = result.districtList[0].boundaries;
            var polygons = [];
            if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    var polygon = new AMap.Polygon({
                        map: map,
                        strokeWeight:2,
                        path: bounds[i],
                        fillOpacity: 0,
                        //fillColor: '#CCF3FF',
                        strokeColor: '#CC66CC'
                    });
                    polygons.push(polygon);
                }
                map.setFitView();//地图自适应
            }
        });

}

