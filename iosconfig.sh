#/bin/sh
# iOS workaround for react-native-config issue with GeneratedDotEnv.m not being available
# https://github.com/luggit/react-native-config/issues/187#issuecomment-353156419

TARGET_ENV=".env"
RNCDIR="./node_modules/react-native-config/ios"

echo "***************** ios config.sh *****************"
if [ ! -z "$SYMROOT" ]; then
  echo "Ensure directories exist before copying files"
  mkdir -p $SYMROOT
  mkdir -p $BUILD_DIR

  echo "Build dotenv"
  cd $RNCDIR
  ./ReactNativeConfig/BuildDotenvConfig.ruby
  cd -

  echo "Copy generated dotenv files to node_modules directory"
  cp "$BUILD_DIR/GeneratedInfoPlistDotEnv.h" "$RNCDIR/ReactNativeConfig/GeneratedInfoPlistDotEnv.h"
  cp "$SYMROOT/GeneratedDotEnv.m" "$RNCDIR/ReactNativeConfig/GeneratedDotEnv.m"
fi
echo "***************** ios config done *****************"