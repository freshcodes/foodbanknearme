#!/bin/bash

locationFiles=''
currentStateSlug=''

while getopts ":f" opt; do
  case ${opt} in
    f ) # process all locations, cities, states
      find ./content/locations -maxdepth 3 -name _index.md -exec rm {} \;
      find ./layouts/locations -type d -mindepth 1 -maxdepth 1 -exec rm -r {} \;
      locationFiles=`find ./content/locations -depth 3 -type f -not -name _index.md | sort`
      ;;
    \? )
      echo "Usage: cmd [-f]"
      exit 1
      ;;
  esac
done

if [ "$locationFiles" = '' ]; then
  locationFiles=`grep '^cityIndexKey =' -rL content/locations | grep -v '_index.md$' | sort`
fi

printf "processing `echo "$locationFiles" | grep -c ".md"` location files."

for f in $locationFiles; do
  cityDir=`dirname "$f"`
  stateDir=`dirname "$cityDir"`
  stateSlug=`basename "$stateDir"`
  stateIndexKey="state-$stateSlug"
  newStateFilePath="$stateDir/_index.md"
  citySlug=`basename "$cityDir"`
  cityIndexKey="city-$stateSlug-$citySlug"
  newCityFilePath="./$cityDir/_index.md"

  if [ "$currentStateSlug" != "$stateSlug" ]; then
    currentStateSlug="$stateSlug"
    printf "\n$currentStateSlug"
  fi

  if [[ ! -e "$newStateFilePath" ]]; then
    state=`cat "$f" | sed -n 's/^.*\(state = "\)//p' | sed -n 's/"$//p'`
    stateName=`grep -m1 "^$state:" ./data/states.yml | sed "s/^$state: //"`
    if [ "$stateName" = '' ]; then
      stateName="$state"
    fi
    cat << EOF > "$newStateFilePath"
---
title: $stateName
stateIndexKey: $stateIndexKey
layout: list_all_cities
---
EOF
  fi

  if [[ ! -e "$newCityFilePath" ]]; then
    state=`cat "$f" | sed -n 's/^.*\(state = "\)//p' | sed -n 's/"$//p'`
    city=`cat "$f" | sed -n 's/^.*\(city = "\)//p' | sed -n 's/"$//p'`
    cat << EOF > "$newCityFilePath"
---
title: $city, $state
stateIndexKey: $stateIndexKey
cityIndexKey: $cityIndexKey
layout: list_all_locations
---
EOF
  fi

  if grep -q '^cityIndexKey = ' $f; then
    perl -pi -e "s/cityIndexKey =.*/cityIndexKey = \"$cityIndexKey\"/" "$f"
  else
    perl -pi -e "s/(city =.*)/cityIndexKey = \"$cityIndexKey\"\n\1/" "$f"
  fi
  printf '.'
done
printf "\ndone.\n"
