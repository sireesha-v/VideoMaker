import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';

class NewVideoDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }
    componentDidMount() {
        const input = document.getElementById('file-input');
        const video = document.getElementById('video');
        const videoSource = document.createElement('source');

        input.addEventListener('change', function () {
            const files = this.files || [];

            if (!files.length)
                return;

            const reader = new FileReader();

            reader.onload = function (e) {
                videoSource.setAttribute('src', e.target.result);
                video.appendChild(videoSource);
                video.load();
                video.play();
            };

            reader.onprogress = function (e) {
                console.log('progress: ', Math.round((e.loaded * 100) / e.total));
            };

            reader.readAsDataURL(files[0]);
        });
    }

    makeRenderApiCall = () => {
        const data = {
            timeline: {
                tracks: [
                    {
                        clips: [
                            {
                                "asset": {
                                    "type": "image",
                                    "src": "https://i.ibb.co/85SHxtv/drums.jpg"
                                },
                                "start": 0,
                                "length": 4
                            }, {
                                "asset": {
                                    "type": "video",
                                    "src": "http://techslides.com/demos/sample-videos/small.mp4",
                                    "trim": 2
                                },
                                "start": 4,
                                "length": 6
                            }, {
                                "asset": {
                                    "type": "audio",
                                    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                                },
                                "start": 6,
                                "length": 10
                            }
                        ]
                    }
                ]
            },
            "output": {
                "format": "mp4",
                "resolution": "sd"
            }
        }

        fetch('https://api.shotstack.io/stage/render', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'Shjh8OIdiJ8SizNi6fY9M54RUYbEB0NB4vCIK0I5'
            },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.makeVideoUrlApiCall(data && data.response.id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    makeVideoUrlApiCall = (id) => {
        fetch(`https://api.shotstack.io/stage/render/${id}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'Shjh8OIdiJ8SizNi6fY9M54RUYbEB0NB4vCIK0I5'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success URL:', data.response.url);
                if (data.response.status !== 'done')
                    this.makeVideoUrlApiCall(id)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    renderOutput = () => {
        this.makeApiCall();
    }
    render() {
        return (
            <div>
                <input id="file-input" type="file" accept="video/*"/>

                <video id="video" width="300" height="300" controls/>
                <input id="audio-input" type="file" accept="audio/*"/>
                <audio id="audio" width="300" controls/>

                <br/>
                <br/>
                <Button onClick={() => this.makeRenderApiCall()}>Render Output</Button>
            </div>
        )
    }
}

export const mapStateToProps = state => ({sidebarStaticData: {}});

export default withRouter(connect(mapStateToProps)(NewVideoDashboard));
