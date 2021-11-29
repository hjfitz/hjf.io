#!/usr/bin/env bash

SOURCE_ROOT="./src/mdx"
SKEL_ROOT="$SOURCE_ROOT/_skel"

now=$(date +"%Y-%m-%dT%H:%M:%S%z")
title=$1

skel_file="$(cat $SKEL_ROOT/index.mdx)"
file_dir=$( [ -z "$2" ]  && echo "$SOURCE_ROOT/_blog" || echo "$SOURCE_ROOT/_hacks" )

if [[ -z "$title" ]]; then
  echo "Usage: $0 <title>"
  exit 1
fi

filename=$(echo $title | tr '[:upper:]' '[:lower:]' |  tr ' ' '-')
slug=$filename


function latestNumber() { # $1 = dir
  latest=$(ls -1 $1 | cut -d '-' -f 1 | sort -n | tail -n 1)
  # hack to cast 0X to X (decimal, not oct)
  latest_dec=$(seq $latest $latest)
  echo $((latest_dec + 1))
}

next_version=$(latestNumber $file_dir)
next_foldername="$file_dir/$next_version-$filename"

echo "👑 Creating post: $title"
echo "⏱  Date: $now"
echo "📝 Written to: $next_foldername"
echo "🔗 Slug: $slug"

read -p "Create post? [y/N] " create

if [[ -z $create || "$create" =~ 'n' ]]; then
	echo "Aborted for now"
	exit 0
fi

new_contents=$(echo "$skel_file" | sed "s/{{title}}/$title/g" | sed "s/{{date}}/$now/g" | sed "s/slug/$slug/g")
mkdir $next_foldername
echo "$new_contents" > "$next_foldername/index.mdx"
cp $SKEL_ROOT/feature.jpeg $next_foldername/feature.jpeg

echo "🎉  Done!"

