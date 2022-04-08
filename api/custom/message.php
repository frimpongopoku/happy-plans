<?php
define("DB_USER", "root");
define("DB_PASS", "");
$servername = "localhost";
$dbname = "frimpongDB";
$sub = $_POST["subject"];
$email = $_POST["email"];
$message = $_POST["message"];
// ----- Connect to the database ---------
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", DB_USER, DB_PASS);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

// ------------- Now insert form content into the database -----------------
try {
  $query = $conn->prepare("INSERT INTO messaging (email, sub,msg) VALUES ('$email','$sub','$message')");
  $query->execute();
  echo '<div style="width:100%; height:100%; background:#faf1e3; display:flex; flex-direction:column; align-items:center; justify-content:center;"><h1>Your message was successfully sent. Thanks! </h1><a href="/happy-plans/pages/forms/contact.html" style="margin-top:10px; font-weight:bold; font-size:24px; color:#c77c0d;">Go Back</a></div>';
} catch (PDOException $e) {
  echo "Sorry, could not save your message: " . $e->getMessage();
}


$conn = null;
