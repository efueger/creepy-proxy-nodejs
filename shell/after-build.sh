#!/usr/bin/env bash

domainspath="/var/www"
domains=(
"albamoda"
"conleys"
"faibels"
"gingar"
"impressionen"
"klingel"
"madeleine"
"mia-moda"
"miavilla"
"peterhahn"
"schneider"
"zalando"
)
dirs=("pid" "log")
owner="jenkins"

NC='\033[0m' # No Color
Black='\033[0;30m'
DarkGray='\033[1;30m'
Red='\033[0;31m'
LightRed='\033[1;31m'
Green='\033[0;32m'
LightGreen='\033[1;32m'
BrownOrange='\033[0;33m'
Yellow='\033[1;33m'
Blue='\033[0;34m'
LightBlue='\033[1;34m'
Purple='\033[0;35m'
LightPurple='\033[1;35m'
Cyan='\033[0;36m'
LightCyan='\033[1;36m'
LightGray='\033[0;37m'
White='\033[1;37m'

echo "checking for required folders..."
for domain in "${domains[@]}"
do
	cd $domainspath

	echo -ne ${LightCyan}$domain${NC}\\n
	cd $domain/data

	echo -ne "	creating symbolic link..."
	ln -s $domainspath/$domain/data/init /etc/init.d/$domain > /dev/null 2>&1
	echo -ne ${Green}"		done"${NC}\\n

	for item in "${dirs[@]}"
	do
		echo -ne "	creating dir: $item"
		mkdir -p $item
		echo -ne ", owner: $owner..."
		chown $owner:$owner $item
		echo -ne ${Green}"	done"${NC}\\n
	done

	cd $domainspath
done

echo -ne \\n"total domains checked: "${LightCyan}${#domains[@]}${NC}
echo -ne \\n"${Green}done${NC}"\\n\\n

#bash $domainspath/restart_domains.sh