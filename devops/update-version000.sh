#!/bin/bash

export WORKING_DIR=../

PACKAGES=$(yarn workspaces list --json)

echo $PACKAGES

# WORKSPACE_NAME=$(node -p -e "Object.keys($PACKAGES).map(k => Object($PACKAGES[k]).location)" )

# echo $WORKSPACE_NAME
# path=$(pwd)/../

# # git add $path/package.json

# for package in $WORKSPACE_NAME; do
#   echo "`jq '.version="'$nextVersion'"' $path/$package/package.json`" > $path/$package/package.json
#   # git add $path/$package/package.json
#   echo $nextVersion-$(node -p -e "'$package'.substring('$package'.lastIndexOf('/') + 1, '$package'.length)")
# done

# git commit -m "feat(release): update monerepo version: '${nextVersion}'" -n