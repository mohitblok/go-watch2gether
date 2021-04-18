import React from "react"
import ReactPlayer from 'react-player'
import {connect} from 'react-redux'
import {play, pause,updateSeek, updateQueue, handleFinish} from '../../../store/room/room.actions'
import { Empty, Card } from "antd"

class VideoPlayer extends React.Component {
    state = {
        url: null,
        pip: false,
        playing: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }


    componentWillReceiveProps(props) {
        let nextProps = props.video
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.seek.progress_percent !== this.state.played) {
            console.log("STATE_CHANGE",nextProps )
          this.setState({ played: nextProps.seek });
          if (this.player !== undefined) {
            this.player.seekTo(parseFloat(nextProps.seek))
          }
        }
      }

    componentDidMount() {
        let _this = this
        setTimeout(function(){
            if (_this.player !== undefined && _this.player !== null){
                _this.player.seekTo(parseFloat(_this.props.seek)) 
            }
        }, 200);
        
    }

    handlePlay = () => {
        if(!this.props.user.playing){
            play();
        }
        
    }

    handlePause = () => {
        if(this.props.user.playing){
            pause();
        }
    }

    handleEnded = () => {
        updateSeek(1,0)
        handleFinish()
    }

    handleProgress = state => {
        // console.log('onProgress', state)
        // console.log("PLAYER!", this.player)
        this.setState({ seek: state.playedSeconds })
        updateSeek(state.played, state.playedSeconds )
        
    }

    onProgressUpdate = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    
    ref = player => { this.player = player }

    render(){
            const {url } = this.props.video
            const {playing} = this.props.user
            return(
            <Card className="videoPlayer" style={{ "height":"100%", "width":"100%"}}>  
            {url !== "" ? 
               <ReactPlayer 
                ref={this.ref}
                width="100%" height="100%"  
                url={url} 
                controls={true}
                playing={playing}
                onPause={this.handlePause}
                onPlay={this.handlePlay}
                onProgress={this.handleProgress}
                onEnded={this.handleEnded}
                />  
            : <Empty  style={{ "height":"600px", "width":"100%", "paddingTop":"180px"}}/>}
          </Card>  
        )
    }
}
const mapStateToProps  = (state) =>{
    return state
  } 
export default connect(mapStateToProps, {updateQueue, handleFinish, updateSeek})(VideoPlayer)
  