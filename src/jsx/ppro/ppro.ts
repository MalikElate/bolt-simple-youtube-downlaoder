export const example = (path: string, fileName: string) => {
  let n = `${path}/${fileName}.mp4`;

    alert("hello")
    let tesdt = app.project.importFiles([n], false, app.project.rootItem, false);
    alert(`tesdt: ${tesdt}`)

    let insertIntoTrack = 0;
    let seq = app.project.activeSequence;
    let availibleClips = app.project.rootItem.children;

    // Loop through the array to find the first object with name === "test"
    const findFistProjectItem = (clips: ProjectItemCollection) => {
      for (let i = 0; i < clips.numItems - 1; i++) {
        alert(availibleClips[i].name)
        const currentObject = availibleClips[i];
        if (currentObject?.name === `${fileName}.mp4`) {
          return currentObject
        }
      }
    }
    
    let clipToInsert: any = findFistProjectItem(app.project.rootItem.children); 
    let videoTrack = seq.videoTracks[insertIntoTrack];

    videoTrack.insertClip(clipToInsert, 0)
};
