#!/bin/bash
echo "Formating Code"

tslint -p ./backend  --fix
tslint -p ./generation --fix
tslint -p ./mobile --fix
prettier **/*.ts --write
prettier **/*.tsx --write
prettier **/*.json --write
prettier **/*.yml --write
prettier **/*.md --write
# enable if there's graphql 
#prettier **/*.graphql --write
