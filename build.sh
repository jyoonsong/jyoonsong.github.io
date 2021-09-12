#!/bin/bash

# only proceed script when started not by pull request (PR)
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

# enable error reporting to the console
set -e

# update bundler 
gem install bundler
bundle update --bundler

# build site with jekyll, by default to `_site' folder
bundle exec jekyll build

# Checkout `master` and remove everything.
git clone https://${GH_TOKEN}@github.com/jyoonsong/jyoonsong.github.io.git ../jyoonsong.github.io.master
cd ../jyoonsong.github.io.master
git checkout master
rm -rf *

# Copy generated HTML site from source branch in original repository
cp -R ../jyoonsong.github.io/_site/* .

# Make sure we have the updated .travis.yml file so tests won't run on master.
cp ../jyoonsong.github.io/.travis.yml .
git config user.email "jaeyoons@mit.edu"
git config user.name "jyoonsong"

# Commit and push generated content to `master` branch.
git status
git add -A .
git status
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --force origin master
