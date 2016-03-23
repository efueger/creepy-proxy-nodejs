#!/bin/bash

array=(
albamoda
madeleine
klingel
peterhahn
impressionen
conleys
gingar
faibels
miavilla
schneider
zalando
)

for i in "${array[@]}"
do
        echo -ne "Now restarting: $i"\\n
        /usr/sbin/service $i stop > /dev/null
        sleep 0.5
        /usr/sbin/service $i start > /dev/null
        #echo -ne "             - done!"\\n
done
