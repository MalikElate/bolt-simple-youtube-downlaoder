const ytdl = require('ytdl-core');
const fs = require('fs');
import { useState } from 'react';
import {
    evalTS,
} from "../lib/utils/bolt";

const Main = () => {
    const [isAudio, setIsAudio] = useState(false);
    const [folderPath, setFolderPath] = useState("/Users/malik/Desktop");
    const [fileNameState, setFileNameState] = useState("");
    const [folderPathVisible, setFolderPathVisible] = useState("none");
    const [loaderVisisble, setloaderVisisble] = useState("none");
    const handleDownload = () => {
        const id = "sJAr8az0ypU";
        const url = `https://www.youtube.com/watch\?v\=${id}`;
        setloaderVisisble("block");
        ytdl.getInfo(id).then((info: any) => {
            const fileName = info.videoDetails.title
                .split('')
                .filter((char: any) => ![' ', '/', '\\'].includes(char))
                .join('');
            setFileNameState(fileName)
            if (isAudio) {
                //     //   let start = Date.now();
                //     //   ffmpeg(ytdl(id, {
                //     //     quality: 'highestaudio',
                //     //   }))
                //     //     .audioBitrate(256)
                //     //     .save(`./${info.videoDetails.title}.mp3`)
                //     //     .on('progress', p => {
                //     //       readline.cursorTo(process.stdout, 0);
                //     //       process.stdout.write(`${p.targetSize}kb downloaded`);
                //     //     })
                //     //     .on('end', () => {s
                //     //       console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
                //     //     });
            } else {
                (function (next) {
                    ytdl(url, { format: "audioandvideo" }).pipe(fs.createWriteStream(`${folderPath}/${fileName}.mp4`))
                    next()
                  }(function () {
                      evalTS("example", folderPath, fileName)
                  }));
            }
        }).then(() => {
            setloaderVisisble("none");
        });
    }
    const handleAddtoTrack = () => { 
        // evalTS("addToTrack", folderPath, fileNameState)
    }

    return (
        <div className='body'>
            <h1>Simple Youtube Downloader Bolt cep</h1>
            <label>Desination folder</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {
                    folderPathVisible === "none" ?
                        <p style={{ margin: "0" }}>{folderPath}</p> :
                        <input value={folderPath} onChange={(event) => setFolderPath(event.target.value)}/>
                }
                {
                    folderPathVisible === "none" ? 
                    <button className="changeFolderBtn" onClick={() => { setFolderPathVisible("inline") }}>Change</button> :
                    <button className="changeFolderBtn" onClick={() => { setFolderPathVisible("none") }}>Save</button> 
                }
            </div>
            <label>URL</label>
            <input id="url-input" />
            <div style={{ display: "flex", gap: "2px" }}>
                <label>MP3</label>
                <input id="mp3-checkbox" type="checkbox" />
            </div>
            <button className="downloadBtn" onClick={() => handleDownload()}>Download</button>
            {/* <button style={styles.downloadBtn} onClick={() => handleAddtoTrack()}>Save</button> */}
            <a style={{ color: "#2C8CEA" }} href="javascript:history.go(0)">Refresh panel</a>
            <div style={{display: loaderVisisble}}>
                <p className="text" style={{textAlign: "center"}}>
                    <span className="letter letter1">L</span>
                    <span className="letter letter2">o</span>
                    <span className="letter letter3">a</span>
                    <span className="letter letter4">d</span>
                    <span className="letter letter5">i</span>
                    <span className="letter letter6">n</span>
                    <span className="letter letter7">g</span>
                    <span className="letter letter8">.</span>
                    <span className="letter letter9">.</span>
                    <span className="letter letter10">.</span>
                </p>
            </div>
            <p style={{ fontSize: "small", position: "absolute", bottom: 0 }}>Email support: 8am - 11pm CST:
                woodskullcontent@gmail.com</p>
        </div>
    );
};
export default Main;