import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styles from './styles.module.css';
import {Button, Modal, Spin} from 'antd';
import classNames from "classnames";
import AddSceneContainer from './AddSceneContainer';
import {renderOutput} from './NewVideoDashboard.actions';
import {dummy} from './NewVideoDashboard.constants.js';

class NewVideoDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVideo: null,
            videoOutputRenderUrl: null
        }
    }
    onVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.videoOutput) !== JSON.stringify(nextProps.videoOutput))
            this.setState({videoOutput: nextProps.videoOutput});
        }

    renderOutput = () => {
        console.log("selectedVideos", this.selectedVideos);
        const {selectedVideoList} = this.state;
		let clips=[];
        selectedVideoList && selectedVideoList.forEach((video,index) => {
            clips.push({
                "asset": {
                    "type": "video",
					"src": video.sources[0],
					"trim": 2
				},
				"start": (clips[index-1] && clips[index-1].length) || 0,
				"length": 2
            });
		})
		let data = {
            timeline: {
                tracks: [
                    {
                        clips
                    }
                ]
            },
            "output": {
                "format": "mp4",
                "resolution": "sd"
            }
		}
        this
            .props
			.dispatch(renderOutput({data}));
		this.setState({
			videoOutput: {
				showVideoModal: true
			}
		})
    }

    showModal = () => {
        this.setState({videoOutput: true});
    };

    handleOk = e => {
        console.log(e);
        this.setState({videoOutput: null});
    };

    handleCancel = e => {
        console.log(e);
        this.setState({videoOutput: null});
    };

    setSelectedVideos = (videos, duration) => {
        videos.map((item, i) => {
            item['duration'] = duration[i]
        })
        this.setState({selectedVideoList: videos})
    }

    render() {
        const {selectedVideo, videoOutput} = this.state;
        return (
            <div className={styles.pageContainer}>
                <div className={styles.dashboard}>
                    <div className={classNames(styles.videoContainerRow, 'clearfix')}>
                        <div className={styles.videoBox}>
                            <video
                                id="video"
                                width="100%"
                                height="400"
                                controls
                                poster={selectedVideo && selectedVideo.thumb}>
                                {selectedVideo && selectedVideo.sources && selectedVideo
                                    .sources
                                    .map(source => <source src={source} type="video/mp4"/>)}
                            </video>
                        </div>
                        <div className={styles.videoProperties}>
                            <Button
                                type="primary"
                                className={classNames(styles.createVideoBtn, 'fLeft')}
                                onClick={this.renderOutput}>Render Output</Button>
                        </div>
                    </div>
                    {/* Add Scene */}
                    <AddSceneContainer
                        onVideoSelect={(video) => this.onVideoSelect(video)}
                        selectedVideos={(selectedVideos, duration) => this.setSelectedVideos(selectedVideos, duration)}/>
					{videoOutput && videoOutput.showVideoModal && <Modal
                        title="Video Output"
                        visible={videoOutput.showVideoModal}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        {videoOutput.videoUrl ? <video width="300" height="200" controls autoPlay>
                            <source src={videoOutput.videoUrl} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>: <div className={styles.spinner}><Spin/></div>}
                    </Modal>}

                </div>
            </div>
        )
    }
}

export const mapStateToProps = state => ({
    videoOutput: state.asynchronousNewVideoDashboard && state.asynchronousNewVideoDashboard.videoOutput
});

export default withRouter(connect(mapStateToProps)(NewVideoDashboard));
