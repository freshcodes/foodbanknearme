#!/bin/bash

locationFiles=''
currentStateSlug=''

while getopts ":f" opt; do
	case ${opt} in
		f ) # process all locations, cities, states
			find ./content/locations -mindepth 2 -maxdepth 2 -name _index.md -exec rm {} \;
			locationFiles=`grep '^fax:' -rl ./content/locations | sort`
			;;
		\? )
			echo "Usage: cmd [-f]"
			exit 1
			;;
	esac
done

if [ "$locationFiles" = '' ]; then
	locationFiles=`grep '^city:' -rL ./content/locations | xargs grep '^fax:' -rl | sort`
fi

printf "processing `echo "$locationFiles" | grep -c ".md"` location files."

for f in $locationFiles; do
	stateDir=`dirname "$f"`
	stateSlug=`basename "$stateDir"`
	newStateFilePath="$stateDir/_index.md"

	if [ "$currentStateSlug" != "$stateSlug" ]; then
		currentStateSlug="$stateSlug"
		printf "\n$currentStateSlug"
	fi

	if [[ ! -e "$newStateFilePath" ]]; then
		state=`cat "$f" | sed -n 's/^.*\(state: \)//p' | sed -n 's/$//p'`
		stateName=`grep -m1 "^$state\:" ./data/states.yml | sed "s/^$state: //"`
		if [ "$stateName" = '' ]; then
			stateName="$state"
		fi
		cat <<-EOF > "$newStateFilePath"
			---
			title: $stateName
			state: $state
			layout: list_for_state
			---
		EOF
	fi

	printf '.'
done
printf "\ndone.\n"
