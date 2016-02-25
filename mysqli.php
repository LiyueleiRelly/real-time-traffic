<?php
/**
 * Created by PhpStorm.
 * User: Relly
 * Date: 2016/1/20
 * Time: 8:29
 */

/*链接到数据库*/
function mysqlconnect(){
    $conn =new mysqli("10.2.9.42","housir","123456","realtimetraffic-test");
    if ($conn->connect_error)
    {
        die('Could not connect: ' . $conn->connect_error);
    }
    return $conn;
}

/*链接到具体的表*/
function mysqlquery($sql,$conn){
    return $conn->query($sql);
}
