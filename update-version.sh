#!/bin/bash

nextVersion=$(npm --no-git-tag-version version patch)

PACKAGES=$(cat package.json | jq -r '.workspaces.packages | join(" ")')

path=$(pwd)

git add $path/package.json

for package in $PACKAGES; do
  echo "`jq '.version="'$nextVersion'"' $path/$package/package.json`" > $path/$package/package.json
  git add $path/$package/package.json
  echo $nextVersion-$(node -p -e "'$package'.substring('$package'.lastIndexOf('/') + 1, '$package'.length)")
done

git commit -m "feat(release): update monerepo version: '${nextVersion}'" -n