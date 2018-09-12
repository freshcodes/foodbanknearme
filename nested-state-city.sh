#!/bin/bash

locationFiles=''
currentStateSlug=''

while getopts ":f" opt; do
  case ${opt} in
    f ) # process all locations, cities, states
      rm -r ./content/cities
      locationFiles=`find ./content/locations -depth 3 -type f | sort`
      ;;
    \? )
      echo "Usage: cmd [-f]"
      exit 1
      ;;
  esac
done

if [ "$locationFiles" = '' ]; then
  locationFiles=`grep '^cityIndexKey =' -rL content/locations | sort`
fi

printf "processing `echo "$locationFiles" | grep -c ".md"` location files."

for f in $locationFiles; do
  cityDir=`dirname "$f"`
  stateDir=`dirname "$cityDir"`
  stateSlug=`basename "$stateDir"`
  stateIndexKey="state-$stateSlug"
  newStateFilePath="./content/states/$stateSlug.md"
  newStateDir=`dirname "$newStateFilePath"`
  citySlug=`basename "$cityDir"`
  cityIndexKey="city-$stateSlug-$citySlug"
  newCityFilePath="./content/cities/$stateSlug/$citySlug.md"
  newCityDir=`dirname "$newCityFilePath"`

  if [ "$currentStateSlug" != "$stateSlug" ]; then
    currentStateSlug="$stateSlug"
    printf "\n$currentStateSlug"
  fi

  if [[ ! -e "$newStateFilePath" ]]; then
    mkdir -p $newStateDir
    state=`cat "$f" | sed -n 's/^.*\(state = "\)//p' | sed -n 's/"$//p'`
    echo "---\ntitle: $state\nstateIndexKey: $stateIndexKey\n---" > "$newStateFilePath"
  fi

  if [[ ! -e "$newCityFilePath" ]]; then
    mkdir -p $newCityDir
    state=`cat "$f" | sed -n 's/^.*\(state = "\)//p' | sed -n 's/"$//p'`
    city=`cat "$f" | sed -n 's/^.*\(city = "\)//p' | sed -n 's/"$//p'`
    echo "---\ntitle: $city, $state\nstateIndexKey: $stateIndexKey\ncityIndexKey: $cityIndexKey\n---" > "$newCityFilePath"
  fi

  if grep -q '^cityIndexKey = ' $f; then
    perl -pi -e "s/cityIndexKey =.*/cityIndexKey = \"$cityIndexKey\"/" "$f"
  else
    perl -pi -e "s/(city =.*)/cityIndexKey = \"$cityIndexKey\"\n\1/" "$f"
  fi
  printf '.'
done
printf "\ndone.\n"
