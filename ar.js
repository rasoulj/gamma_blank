const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const axios = require('axios');
const decompress = require('decompress');
const {modelName} = require('./variables.json');

async function isElementPresent(componentName) {
  try {
    await exec(`node_modules/typescript/bin/tsc src/data/model.ts`);
  } catch {}

  const {model} = require('./src/data/model');

  function isElementInModel(name) {
    return model?.screens?.some(screen =>
      screen?.metaData?.components?.some(component => isSame(component, name)),
    );
  }

  function isSame(component, name) {
    return component === name;
  }

  return isElementInModel(componentName);
}

async function clean() {
  fs.unlinkSync('src/data/model.js');
  fs.unlinkSync('src/data/type.js');
}

// Function to add dependency to package.json
function addDependency(packagePath, dependencyName, version) {
  const packageJSON = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  packageJSON.dependencies[dependencyName] = version;
  fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2));
}

// Function to update Android configurations
function updateAndroidConfigurations() {
  const stringsXmlPath = 'android/app/src/main/res/values/strings.xml';
  const gradlePath = 'android/build.gradle';
  const gradlePropertiesPath = 'android/gradle.properties';
  const settingsGradlePath = 'android/settings.gradle';

  // Update strings.xml
  const stringsXmlContent = fs.readFileSync(stringsXmlPath, 'utf-8');
  if (
    !stringsXmlContent.includes(
      '<string name="game_view_content_description">Game view</string>',
    )
  ) {
    const updatedStringsXmlContent = stringsXmlContent.replace(
      '</resources>',
      `   <string name="game_view_content_description">Game view</string>
</resources>`,
    );
    fs.writeFileSync(stringsXmlPath, updatedStringsXmlContent);
  }

  // Update gradle file
  const gradleContent = fs.readFileSync(gradlePath, 'utf-8');
  if (!gradleContent.includes('unityLibrary')) {
    fs.writeFileSync(
      gradlePath,
      gradleContent.replace(
        'allprojects {\n    repositories {',
        'allprojects {\n    repositories {\n         flatDir {\n    dirs "${project(":unityLibrary").projectDir}/libs" \n        }',
      ),
    );
  }

  // Update gradle.properties
  const gradlePropertiesContent = fs.readFileSync(
    gradlePropertiesPath,
    'utf-8',
  );
  if (!gradlePropertiesContent.includes('unityStreamingAssets')) {
    fs.writeFileSync(
      gradlePropertiesPath,
      gradlePropertiesContent + '\nunityStreamingAssets=.unity3d',
    );
  }

  // Update settings.gradle
  const settingsGradleContent = fs.readFileSync(settingsGradlePath, 'utf-8');
  const unityLibraryLine = `include ':unityLibrary'\nproject(':unityLibrary').projectDir = new File(settingsDir, '../unity/builds/android/unityLibrary')`;
  if (!settingsGradleContent.includes(unityLibraryLine)) {
    fs.writeFileSync(
      settingsGradlePath,
      settingsGradleContent + '\n' + unityLibraryLine,
    );
  }
}

// Function to update iOS configurations
function updateIOSConfigurations() {
  const xcworkspacePath = `ios/${modelName}.xcworkspace/contents.xcworkspacedata`;
  const pbxprojPath = `ios/${modelName}.xcodeproj/project.pbxproj`;
  const iosUnityPath = '../unity/builds/ios';

  // Update xcworkspace
  const iosXcworkspaceContent = fs.readFileSync(xcworkspacePath, 'utf-8');
  const xcworkspaceEntry = `<FileRef location="group:${iosUnityPath}/Unity-iPhone.xcodeproj"></FileRef>`;
  if (!iosXcworkspaceContent.includes(xcworkspaceEntry)) {
    const updatedXcworkspaceContent = iosXcworkspaceContent.replace(
      '</Workspace>',
      `${xcworkspaceEntry}\n</Workspace>`,
    );
    fs.writeFileSync(xcworkspacePath, updatedXcworkspaceContent);
  }

  // Update pbxproj
  const pbxprojContent = fs.readFileSync(pbxprojPath, 'utf-8');
  const pbxCopyFilesBuildSection = '/* End PBXContainerItemProxy section */';
  const embedFrameworksSection = '13B07F871A680F5B00A75B9A /* Sources */,';

  const pbxBuildFileSection =
    '		13B07FC11A68108700A75B9A /* main.m in Sources */ = {isa = PBXBuildFile; fileRef = 13B07FB71A68108700A75B9A /* main.m */; };';
  const pbxCopyFilesBuildPhaseSection =
    '/* End PBXContainerItemProxy section */';
  const pbxFileReferenceSection = '/* Begin PBXFileReference section */';
  const pbxGroupSection =
    '		ED297162215061F000B7C4FE /* JavaScriptCore.framework */,';
  const pbxGroupLine =
    '		17697AA12B7C9C3200B4664B /* UnityFramework.framework */,';
  const embedFrameworksLine =
    '				17697AA42B7C9C3200B4664B /* Embed Frameworks */,';

  const pbxCopyFilesBuildLine =
    '17697AA42B7C9C3200B4664B /* Embed Frameworks */ = {  isa = PBXCopyFilesBuildPhase;  buildActionMask = 2147483647;  dstPath = "";  dstSubfolderSpec = 10;  files = ( \n 17697AA32B7C9C3200B4664B /* UnityFramework.framework in Embed Frameworks */,  );  name = "Embed Frameworks";  runOnlyForDeploymentPostprocessing = 0;  };';
  const pbxBuildFileInsertionLine =
    '		17697AA32B7C9C3200B4664B /* UnityFramework.framework in Embed Frameworks */ = {isa = PBXBuildFile; fileRef = 17697AA12B7C9C3200B4664B /* UnityFramework.framework */; settings = {ATTRIBUTES = (CodeSignOnCopy, RemoveHeadersOnCopy, ); }; };';
  const pbxCopyFilesBuildPhaseInsertionLine = `/* Begin PBXCopyFilesBuildPhase section */
  17697AA42B7C9C3200B4664B /* Embed Frameworks */ = {
    isa = PBXCopyFilesBuildPhase;
    buildActionMask = 2147483647;
    dstPath = "";
    dstSubfolderSpec = 10;
    files = (
      17697AA32B7C9C3200B4664B /* UnityFramework.framework in Embed Frameworks */,
    );
    name = "Embed Frameworks";
    runOnlyForDeploymentPostprocessing = 0;
  };
  /* End PBXCopyFilesBuildPhase section */`;
  const pbxFileReferenceInsertionLine = `		17697AA12B7C9C3200B4664B /* UnityFramework.framework */ = {isa = PBXFileReference; explicitFileType = wrapper.framework; path = UnityFramework.framework; sourceTree = BUILT_PRODUCTS_DIR; };`;
  const ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES = `ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES = YES;`;
  const DEFINES_MODULE = `ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES = YES;`;
  const IPHONEOS_DEPLOYMENT_TARGET = `IPHONEOS_DEPLOYMENT_TARGET = 16.0;`;

  const updatedPbxprojContentD1 = pbxprojContent.replace(
    ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES,
    ``,
  );
  const updatedPbxprojContentD2 = updatedPbxprojContentD1.replace(
    DEFINES_MODULE,
    ``,
  );
  const updatedPbxprojContentD3 = updatedPbxprojContentD2.replace(
    IPHONEOS_DEPLOYMENT_TARGET,
    ``,
  );

  const updatedPbxprojContent2 = updatedPbxprojContentD3.replace(
    embedFrameworksSection,
    pbxprojContent.includes(embedFrameworksLine)
      ? `${embedFrameworksSection}`
      : `${embedFrameworksSection}\n${embedFrameworksLine}`,
  );

  const updatedPbxprojContent4 = updatedPbxprojContent2.replace(
    pbxCopyFilesBuildLine,
    pbxprojContent.includes(pbxCopyFilesBuildLine)
      ? `${pbxCopyFilesBuildLine}`
      : `${pbxCopyFilesBuildLine}\n${pbxCopyFilesBuildSection}`,
  );

  const updatedPbxprojContent5 = updatedPbxprojContent4.replace(
    pbxBuildFileSection,
    pbxprojContent.includes(pbxCopyFilesBuildLine)
      ? `${pbxBuildFileSection}`
      : `${pbxBuildFileSection}\n${pbxBuildFileInsertionLine}`,
  );

  const updatedPbxprojContent6 = updatedPbxprojContent5.replace(
    pbxCopyFilesBuildPhaseSection,
    pbxprojContent.includes(pbxCopyFilesBuildPhaseInsertionLine)
      ? `${pbxCopyFilesBuildPhaseSection}`
      : `${pbxCopyFilesBuildPhaseSection}\n${pbxCopyFilesBuildPhaseInsertionLine}`,
  );

  const updatedPbxprojContent7 = updatedPbxprojContent6.replace(
    pbxGroupSection,
    pbxprojContent.includes(pbxGroupLine)
      ? `${pbxGroupSection}`
      : `${pbxGroupLine}\n${pbxGroupSection}`,
  );

  const updatedPbxprojContent = updatedPbxprojContent7.replace(
    pbxFileReferenceSection,
    pbxprojContent.includes(pbxFileReferenceInsertionLine)
      ? `${pbxFileReferenceSection}`
      : `${pbxFileReferenceSection}\n${pbxFileReferenceInsertionLine}`,
  );
  fs.writeFileSync(pbxprojPath, updatedPbxprojContent);
}

async function downloadSource(url, destination) {
  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'stream',
  });

  const writer = fs.createWriteStream(destination);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function unzipFile(sourcePath, destinationPath) {
  try {
    await decompress(sourcePath, destinationPath);
    console.log('Unity file successfully uncompressed.');
  } catch (error) {
    console.error('Error unzipping Unity file:', error);
  }
}

async function createAFolder(destination) {
  try {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
  } catch (err) {
    console.error(err);
  }
}


// Main
async function automateIntegration() {
  const isUnityPresent = await isElementPresent('Unity');
  await setTimeout(clean, 500);
  if (isUnityPresent) {
    // Add react-native-unity dependency
    await addDependency(
      './package.json',
      '@azesmway/react-native-unity',
      '^0.4.0',
    );

    // Update Android configurations
    await updateAndroidConfigurations();

    // Update iOS configurations
    await updateIOSConfigurations();

    try {
      const sourceUrl =
        'https://apsybiblomodelstorage.blob.core.windows.net/assets/unity.zip';

      const folderUnity = './unity'
      await createAFolder(folderUnity)

      const destinationPath = './unity/unity.zip';
      await downloadSource(sourceUrl, destinationPath);
      console.log('Source downloaded successfully.');

      const UnityFileTsxUrl =
        'https://apsybiblomodelstorage.blob.core.windows.net/assets/index.tsx';

      const destinationUnityTsxFilePath =
        './src/components/molecules/Unity/index.tsx';

      const folderTsxUnity = './src/components/molecules/Unity'
      await createAFolder(folderTsxUnity)
      
      await downloadSource(UnityFileTsxUrl, destinationUnityTsxFilePath);
      // Unzip the downloaded file
      const destinationDirectory = './';
      await unzipFile(destinationPath, destinationDirectory);
      console.log('Source unzipped successfully.');
    } catch (error) {
      console.error('Error downloading or unzipping source:', error);
    }

    console.log(
      'Integration of azasemway/react-native-unity into React Native project has been automated successfully.',
    );
  } else {
    console.log('Skipping all actions.');
  }
}

automateIntegration();
