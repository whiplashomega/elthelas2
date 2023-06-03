#!/bin/bash
node buildjson
cd elthelasapp
vite build
cd ..
git add . -A
git status