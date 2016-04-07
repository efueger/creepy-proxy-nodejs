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

date

for i in "${array[@]}"
	do
		echo -ne "Now restarting: $i"\\n
		/usr/bin/pkill -f $i > /dev/null 2>&1
		sleep 2
		/usr/sbin/service $i start > /dev/null 2>&1
	done
