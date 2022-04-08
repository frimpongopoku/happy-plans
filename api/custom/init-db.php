<?php

/**
 * @author: Frimpong Opoku Agyemang
 * Run this file, and  your mysql will be all setup for the messaging form
 */
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "noGamesMyGee";

// ------------------- CREATE THE DB ITSELF ------------------
try {
  echo'<div style="background:#faf1e3; height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;">';
  $conn = new PDO("mysql:host=$servername", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "CREATE DATABASE $dbname";
  $conn->exec($sql);
  echo "<h1>Your database was created successfully!</h1>";
} catch (PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}
$conn = null;

// ----------------- NOW CREATE TABLE IN THE DB ----------------------
$tablename = "messaging";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "<h2>The <i>'$tablename'</i> table was also created Successfully!</h2>";
} catch (PDOException $e) {
  echo "Sorry, we could not create the table '$tablename' -> " . $e->getMessage();
}
$query = $conn->prepare("CREATE TABLE $tablename (id int(6) NOT NULL auto_increment, email varchar(30) NOT NULL,msg varchar(500) NOT NULL,sub varchar(500) NOT NULL,PRIMARY KEY (id),UNIQUE id (id),KEY id_2 (id))");
$query->execute();


echo '</div>'

?>