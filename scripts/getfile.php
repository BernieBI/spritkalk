<?php
  $start = $_GET["start"];
  $stop = $_GET["stop"];
  $counter = 0;



    $fil = fopen("../resources/produkter.csv","r");

    while($linje = fgets($fil)) {
      if(($counter <= $stop && $counter >= $start) || $counter == 0){
        echo $linje;
      }
      $counter++;
    }

?>
