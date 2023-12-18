const ytdl = require('ytdl-core');
const fs = require('fs');
import { useState } from 'react';
import {
    evalTS,
} from "../lib/utils/bolt";
import getVideoId from 'get-video-id';

const Main = () => {
    const [isAudio, setIsAudio] = useState(false);
    const [folderPath, setFolderPath] = useState("/Users/malik/Desktop");
    const [folderPathVisible, setFolderPathVisible] = useState("none");
    const [loaderVisisble, setloaderVisisble] = useState("none");
    
    const [url, setUrl] = useState("");
    const fs = require('fs');


    const handleDownload = () => {
        alert(url)
        const { id } = getVideoId(url);
        alert(id)
        const fixedUrl = `https://www.youtube.com/watch\?v\=${id}`;
        setloaderVisisble("block");
        ytdl.getInfo(id).then((info: any) => {
            // Specify the file path
            // Create a writable stream for the file
            const writableStream = fs.createWriteStream(`${folderPath}/output4.json`);

            // Example data to be written to the file
            const data = JSON.stringify(info.formats);

            // Pipe the data into the writable stream
            writableStream.write(data);

            // Close the writable stream
            writableStream.end();
            const fileName: string = info.videoDetails.title.split('').filter((char: any) => ![' ', "'", '/', '\\'].includes(char)).join('');
            let itag: number = 0; 
            // loop throught the formats and check if the format.itag is 137 or 22 if it is set itag to that format.itag
            for (let i = 0; i < info.formats.length; i++) {
                if (info.formats[i].itag === 137 || info.formats[i].itag === 22) {
                    itag = info.formats[i].itag;
                }
            }
            alert(itag);
            // if (isAudio) {
            //     (function (next) {
            //         alert("audio")
            //         const download = ytdl(fixedUrl, { filter: 'audioonly', quality: "lowestaudio" });
            //         const writeStream = fs.createWriteStream(`${folderPath}/${fileName}.wav`);
            //         download.pipe(writeStream);
            //         next()
            //     }(function () {
            //         evalTS("example", folderPath, fileName, isAudio)
            //     }));
            // } else {
            (function (next) {
                // ytdl(fixedUrl, { format: "videoandaudio" }).pipe(fs.createWriteStream(`${folderPath}/${fileName}.mp4`))
                // ytdl(fixedUrl, {filter: (format: any) => format.mimeType.includes("video/mp4; codecs=\"avc1.42001E\"") }).pipe(fs.createWriteStream(`${folderPath}/${fileName}.mp4`))
                if(itag === 0) {
                    alert("no itag")
                    return;
                } else {
                    ytdl(fixedUrl, {filter: (format: any) => format.itag === itag}).pipe(fs.createWriteStream(`${folderPath}/${fileName}.mp4`))
                }
                next()
            }(function () {
                evalTS("example", folderPath, fileName, isAudio)
            }));
            // }
        }).then(() => {
            setloaderVisisble("none");
        });
    }

    return (
        <div className='body'>
            <h1>Simple Youtube Downloader</h1>
            <label>Desination folder</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {
                    folderPathVisible === "none" ?
                        <p style={{ margin: "0" }}>{folderPath}</p> :
                        <input value={folderPath} onChange={(event) => setFolderPath(event.target.value)} />
                }
                {
                    folderPathVisible === "none" ?
                        <button className="changeFolderBtn" onClick={() => { setFolderPathVisible("inline") }}>Change</button> :
                        <button className="changeFolderBtn" onClick={() => { setFolderPathVisible("none") }}>Save</button>
                }
            </div>
            <label>URL</label>
            <input value={url} onChange={(event) => { setUrl(event.target.value) }} />
            <div style={{ display: "flex", gap: "2px" }}>
                {/* <label>MP3</label> */}
                {/* <input onChange={() => setIsAudio(!isAudio)} type="checkbox" checked={isAudio}/> */}
            </div>
            <button className="downloadBtn" onClick={() => handleDownload()}>Download</button>
            {/* <button style={styles.downloadBtn} onClick={() => handleAddtoTrack()}>Save</button> */}
            <a style={{ color: "#2C8CEA" }} href="javascript:history.go(0)">Refresh panel</a>
            <div style={{ display: loaderVisisble }}>
                <p className="text" style={{ textAlign: "center" }}>
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