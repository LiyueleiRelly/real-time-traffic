<?php
/*
根据比例尺把路段4^n初步聚合的测试
*/
require 'mysqli.php';
/*$maxlng=109.478691;
$maxlat=18.584274;
$minlng=108.437049;
$minlat=18.342641;
$zoom=14;*/


$maxlng=$_POST['maxlng'];
$maxlat=$_POST['maxlat'];
$minlng=$_POST['minlng'];
$minlat=$_POST['minlat'];
$zoom=$_POST['zoom'];
$p=array(10024,10024,10024,10024,10024,1024,512,64000,16000,4096,1024,256,64,16,4,1,1,1,1,1);//14->2
$k=$p[$zoom];
$conn = mysqlconnect();

$sql = "SELECT a.*,b.trafficRank FROM roadsection a, roadchain b WHERE a.SPLat BETWEEN ".$minlat." AND ".$maxlat." and SPLong BETWEEN ".$minlng." AND ".$maxlng." and a.RoadLinkID=b.RoadLinkID";

$result = mysqlquery($sql,$conn);

$json="";
$data=array();
$dataa=array();

class link{
    public $roadlink;
    public $splat;
    public $splong;
    public $tplat;
    public $tplong;
    public $color;
}

while($row=$result->fetch_assoc())
{
    $data[]=$row;
}

for($i=0;$i<count($data)-$k;$i+=$k){
    $link=new link();
    $link->splat=$data[$i]['SPLat'];
    $link->splong=$data[$i]['SPLong'];
    $link->tplat=$data[$i+$k-1]['TPLat'];
    $link->tplong=$data[$i+$k-1]['TPLong'];
    $dataa[]=$link;
}

$json=json_encode($dataa);
echo $json;

