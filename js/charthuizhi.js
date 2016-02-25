/**
 * Created by Relly on 2016/1/18.
 */
var pieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "严重拥堵"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "畅通"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "拥堵"
    },
    {
        value: 40,
        color: "#999",
        highlight: "#666",
        label: "缓行"
    },

];



window.onload = function() {
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData);
};