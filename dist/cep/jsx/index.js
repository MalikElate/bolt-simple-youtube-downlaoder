(function (thisObj) {

var config = {
  version: version,
  id: "com.pp-yt-cep.cep",
  displayName: "Simple Youtube Downloader",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: "PPRO",
    version: "[0.0,99.9]"
  }],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 500,
  height: 550,
  panels: [{
    mainPath: "./main/index.html",
    name: "main",
    panelDisplayName: "Simple Youtube Downloader",
    autoVisible: true,
    width: 600,
    height: 650
  }],
  build: {
    jsxBin: "off",
    sourceMap: true
  },
  zxp: {
    country: "US",
    province: "CA",
    org: "MyCompany",
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off"
  },
  installModules: [],
  copyAssets: [],
  copyZipAssets: []
};

var ns = config.id;

var example = function example(path, fileName) {
  var n = "".concat(path, "/").concat(fileName, ".mp4");
  alert("hello");
  var tesdt = app.project.importFiles([n], false, app.project.rootItem, false);
  alert("tesdt: ".concat(tesdt));
  var insertIntoTrack = 0;
  var seq = app.project.activeSequence;
  var availibleClips = app.project.rootItem.children;

  // Loop through the array to find the first object with name === "test"
  var findFistProjectItem = function findFistProjectItem(clips) {
    for (var i = 0; i < clips.numItems - 1; i++) {
      alert(availibleClips[i].name);
      var currentObject = availibleClips[i];
      if ((currentObject === null || currentObject === void 0 ? void 0 : currentObject.name) === "".concat(fileName, ".mp4")) {
        return currentObject;
      }
    }
  };
  var clipToInsert = findFistProjectItem(app.project.rootItem.children);
  var videoTrack = seq.videoTracks[insertIntoTrack];
  videoTrack.insertClip(clipToInsert, 0);
};

var ppro = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example
});

var host = typeof $ !== "undefined" ? $ : window;
switch (BridgeTalk.appName) {
  case "premierepro":
  case "premiereprobeta":
    host[ns] = ppro;
    break;
}

// https://extendscript.docsforadobe.dev/interapplication-communication/bridgetalk-class.html?highlight=bridgetalk#appname
