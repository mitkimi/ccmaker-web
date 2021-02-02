import React from 'react';
import Header from '../../components/Header';
import './index.less';
const WaveSurfer = require('../../assets/WaveSurfer.js');

let wavesurfer: any = null;
class IndexPage extends React.Component {
  state = {
    currentTime: 0,
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
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
