const fs = require('fs')

// Fix issues with Android resources like duplicate files
// CI: run install with --unsafe-perm option
// https://stackoverflow.com/questions/47084810/react-native-android-duplicate-file-error-when-generating-apk
try {
        var curDir = __dirname
        var rootDir = process.cwd()

        var file = `${rootDir}/node_modules/react-native/react.gradle`
        var dataFix = fs.readFileSync(`${curDir}/android-react-gradle-fix`, 'utf8')
        var data = fs.readFileSync(file, 'utf8')

        var doLast = "doLast \{"
        if (data.indexOf(doLast) !== -1) {
            throw "Already fixed."
        }

        var result = data.replace(/                \/\/ Set up inputs and outputs so gradle can cache the result/g, dataFix);
        fs.writeFileSync(file, result, 'utf8')
        console.log('Done')
    } catch (error) {
        console.error(error)
    }