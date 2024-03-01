#!/usr/bin/env bash


for file in src/app/p/**/index.mdx; do
		echo $file | sed 's/index.mdx$/page.mdx/' | xargs -I {} mv $file {}
done
