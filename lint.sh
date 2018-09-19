#!/bin/bash
echo "**** Formating Code *******"
echo "****** Prettier - TS ******"
prettier **/*.ts --write
prettier **/*.tsx --write
echo "****** Prettier - JSON ******"
prettier **/*.json --write
# enable if there's yml 
#prettier **/*.yml --write
prettier **/*.md --write
# enable if there's graphql 
#prettier **/*.graphql --write

echo "****** TSLINT ******"
tslint -p ./tsconfig.json --fix