import React, {Component} from 'react';
import styles from './styles.module.css';
import {Button, Modal} from 'antd';
import {videosJson} from './Videos.constants';
import classNames from "classnames";


class addSceneContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
			selectedVideos: [],
			highlightedVideo: null
		}
		this.selectedVideoRefs={};
    }

    showModal = () => {
        this.setState({visible: true});
    };

    handleOk = e => {
        console.log(e);
        this.setState({visible: false});
    };

    handleCancel = e => {
        console.log(e);
        this.setState({visible: false});
    };

    addVideosToScenesList = (video) => {
        const selectedVideos = [
            ...this.state.selectedVideos,
            video
        ]
		this.setState({visible: false, selectedVideos});
    }

	removeVideoFromList = (item,i) => {
		const {selectedVideos} = this.state;
		const arr = selectedVideos.filter(function( obj ) {
			return obj.thumb !== item.thumb;
		  });
		this.setState({
			selectedVideos: arr
		})
		selectedVideos[i-1] &&
		this
		.props
		.onVideoSelect(selectedVideos[i-1]);
	}

    onVideoSelect = (video) => {
        this
            .props
			.onVideoSelect(video);
		this.setState({
			highlightedVideo: video.thumb
		});
	}
	componentDidUpdate(prevProps,prevState){
		const {selectedVideos} = this.state;
		if(JSON.stringify(selectedVideos) !== JSON.stringify(prevState.selectedVideos))
		this.props.selectedVideos(selectedVideos, Object.keys(this.selectedVideoRefs).map(video => (this.selectedVideoRefs[video] && this.selectedVideoRefs[video].duration)));
	}
    render() {
        const {selectedVideos,highlightedVideo} = this.state;
        return (
            <div className={styles.addSceneContainer}>
                <h5>Choose Videos</h5>
                <div className={classNames(styles.videoLayer,'clearfix')}>
                    <div className={'fLeft'}>
                        {selectedVideos && selectedVideos.map((item,i) => {
                            return <span className={classNames({[styles.highlight]: highlightedVideo === item.thumb},styles.videoSingleBox)} key={`video${i}`} >
										<span className={styles.removeVideo} onClick={(e)=> {this.removeVideoFromList(item,i);e.stopPropagation();}}></span>
								<video
                                width="100"
								height="100"
								onClick={() => this.onVideoSelect(item)}
								ref={(instance)=>{this.selectedVideoRefs[i] = instance;}}
                                poster={item.thumb}>
                                {item.sources && item
                                    .sources
                                    .map(source => <source src={source} type="video/mp4"/>)}
                                Your browser does not support the video tag.
                            </video>
							</span>
                        })}
                    </div>
                    <Button type="primary" className={classNames(styles.addSceneBtn,'fLeft')} onClick={this.showModal}>Add Scene</Button>
                </div>
                <Modal
                    title="Video Library"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    {videosJson && videosJson.map(item => {
                        return <video
                            width="100"
                            height="100"
                            onClick={() => this.addVideosToScenesList(item)}
                            poster={item.thumb}>
                            {item.sources && item
                                .sources
                                .map(source => <source src={source} type="video/mp4"/>)}
                            Your browser does not support the video tag.
                        </video>
                    })}
                </Modal>
            </div>
        )
    }
}

export const mapStateToProps = state => ({sidebarStaticData: {}});

export default addSceneContainer;
