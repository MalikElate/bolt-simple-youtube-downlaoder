export const example = (path: string, fileName: string, isAudio: boolean) => {
  // const filePath = isAudio?  `${path}/${fileName}.mp3` : `${path}/${fileName}.mp4`;
  const filePath = `${path}/${fileName}.mp4`;
  app.project.importFiles(
    [filePath], false, app.project.rootItem
  )
  const numChildren = app.project.rootItem.children.numItems;
  const lastItem = app.project.rootItem.children[numChildren - 1];
  app.project.activeSequence.videoTracks[0].insertClip(lastItem, 0)
};
