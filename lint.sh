#!/bin/bash
echo "Formating Code"

tslint -p ./tsconfig.json --fix
prettier **/*.ts --write
prettier **/*.tsx --write
prettier **/*.json --write
# enable if there's yml 
#prettier **/*.yml --write
prettier **/*.md --write
# enable if there's graphql 
#prettier **/*.graphql --write
