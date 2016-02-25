<?php
/*将地图范围内数据取出传到前台*/
require 'mysqli.php';
$maxlng=$_POST['maxlng'];
$maxlat=$_POST['maxlat'];
$minlng=$_POST['minlng'];
$minlat=$_POST['minlat'];
$zoom=$_POST['zoom'];
$p=array(0,0,0,0,0,512,256,128,64,32,16,8,4,2,1,1,1,1,1);
$conn = mysqlconnect();

$sql = "SELECT a.*,b.trafficRank FROM roadsection a, roadchain b WHERE a.SPLat BETWEEN ".$minlat." AND ".$maxlat." and SPLong BETWEEN ".$minlng." AND ".$maxlng." and a.RoadLinkID=b.RoadLinkID";

$result = mysqlquery($sql,$conn);

$json="";
$data=array();

class link{
    public $roadlink;
    public $splat;
    public $splong;
    public $tplat;
    public $tplong;
    public $color;
}

$i=0;
while($row = $result->fetch_assoc())
{
    //$link[]=$o;   //所有数据取出；

    $link=new link();
    $link->roadlink=$row["RoadLinkID"];
    $link->splat=$row["SPLat"];
    $link->splong=$row["SPLong"];
    $link->tplat=$row["TPLat"];
    $link->tplong=$row["TPLong"];

    if($row["trafficRank"]<3){
        $link->color=0;
    } elseif($row["trafficRank"]<6){
        $link->color=1;
    } elseif($row["trafficRank"]<8){
        $link->color=2;
    } else{
    $link->color=3;}

    $data[]=$link;

}

$json=json_encode($data);
echo $json;
