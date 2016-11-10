<?php
  $counter = 0;



    $fil = fopen("../resources/produkter.csv","r");

    while($linje = fgets($fil)) {
        echo $linje;
      }
    }

?>
