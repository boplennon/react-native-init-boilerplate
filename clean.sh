#/bin/sh
echo "******** CLEAN: Remove TypeScript build ********"
rm -rf build
echo "******** Remove iOS build" 
cd ios
rm -rf build
cd -
echo "******** Remove Android build"
cd android
rm -rf build
cd -

echo "******** Clean Wachman"
watchman watch-del-all