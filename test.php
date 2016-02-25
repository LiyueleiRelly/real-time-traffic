<?php

/*
 * 把省份边界值利用高德地图API接口取出存入数据库*/
require 'mysqli.php';
/*


  $conn = mysqlconnect();
  $sql = "INSERT INTO provincebounds(provinceid,lng,lat) VALUES (1,1,1)";


if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}*/
$data=$_REQUEST['data'];
$p=$_POST['polygon'];
$id=$_POST['id'];
$conn = mysqlconnect();
foreach($data as $temp) {
    $sql = "INSERT INTO provincebounds(provinceid,polygonid,lng,lat) VALUES (" .$id.",".$p.",".$temp["lng"].",".$temp["lat"].")";
    mysqli_query($conn, $sql);
}
echo $id;
/*foreach($dataa as $temp){
    $sql = "INSERT INTO provincebound(provinceid,lng,lat) VALUES (".$id.",".$temp[0].",".$temp[1].")";
    if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

*/
/*$json="";
$json=json_encode($dataa);*/
//var_dump($dataa);
