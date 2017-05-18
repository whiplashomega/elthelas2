<?php
  $dsn = 'mysql:host=0.0.0.0; dbname=c9; charset=utf8';
  $db_connect = new PDO($dsn, whiplashomega, null);
  
  if($db_connect) {
    print "connected to the db " . "<br />";
  }
?>