import React from 'react';
import fs from 'fs';
import Header from '../../components/Header';
import './index.less';
const WaveSurfer = require('../../assets/WaveSurfer.js');

let wavesurfer: any = null;
class IndexPage extends React.Component {
  state = {
    currentTime: 0,
    subtitleTxt: '',
  };

  componentDidMount() {
    const video: any = this.refs.videoPlayer;
    video.addEventListener('timeupdate', (e: any) => {
      // console.log('now at', video.currentTime)
      this.setState({
        currentTime: video.currentTime,
      });
      wavesurfer.setCurrentTime(video.currentTime);
    });
  }

  handleImportVideo = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const file: any = URL.createObjectURL(event.target.files[0]);
      this.refs.videoPlayer.src = file;
      // console.log('file', file)
      this.initWaveSurfer(file);
    }
  };

  initWaveSurfer = (file: any) => {
    // console.log(file, URL.createObjectURL(file))
    wavesurfer = WaveSurfer.create({
      container: this.refs.waveSurferContainer,
      autoCenter: true,
      height: 80,
      hideScrollbar: true,
      mediaType: 'video',
      waveColor: '#999999',
      cursorColor: '#ff0000',
      progressColor: '#0000ff',
    });
    wavesurfer.load(file);
  };

  handleReadTxtFile = () => {
    // 载入多行字幕文件
    const inputObj: any = document.createElement('input');
    inputObj.setAttribute('id', 'txtFile');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute('style', 'visibility: hidden');
    document.body.appendChild(inputObj);
    inputObj.addEventListener('change', this.readTxtFile);
    inputObj.click();
  };

  readTxtFile = () => {
    const ef: any = document.getElementById('txtFile');
    var files: any = ef.files;
    console.log('files', files);
    const reader = new FileReader();
    reader.onload = ((theFile) => {
      return (e: any = theFile) => {
        console.log('e.target.result', e.target.result);
        this.setState({
          subtitleTxt: e.target.result,
        });
      };
    })(files[0]);
    reader.readAsText(files[0]);
    // fs.readFile(path, (err: any, data: any) => {
    //   console.log('callback', err, data)
    //   if (!err) {
    //     const text: string = data.toString()
    //     console.log('text', text)
    //   }
    // })
    // this.subtitle.text = txt
  };

  render() {
    return (
      <div className="page">
        <Header></Header>
        <div className="page-width container">
          <div className="video-player">
            <video ref="videoPlayer" className="player" controls></video>
            <div className="wave-surfer-container">
              <div className="wave-surfer" ref="waveSurferContainer"></div>
              <div className="cover"></div>
            </div>
          </div>
          <div className="subtitle">
            <input
              type="file"
              accept="video/*"
              onChange={this.handleImportVideo}
            />
            字幕
            <button onClick={this.handleReadTxtFile}>aaaa</button>
            {this.state.subtitleTxt}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
