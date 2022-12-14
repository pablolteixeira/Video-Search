import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSeach from "youtube-api-search";
import _ from "lodash";

import VideoDetail from "./components/video_detail";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";

const API_KEY = "YOUTUBE-API_KEY_HERE";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSeach({key: API_KEY, term: term}, videos => {
            this.setState( { 
                videos: videos,
                selectedVideo: videos[0] 
            } );
        })
    }

    render() {
        const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);

        return(  
        <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
                onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
                videos={this.state.videos} />
        </div>
        )
    }
    
}

ReactDOM.render(<App />, document.querySelector(".container"));
