import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import R from '../../Utility/R';
import {VideoList, Searchbar} from '../../Component';
import {shortlistVideo, unshortlistVideo} from './Action';

class SavedMovies extends Component {
  onVideoStatusChange = (video) => {
    const {
      shortlistVideo: shortlist,
      unshortlistVideo: unsortlist,
    } = this.props;

    if (video.isShortListed) {
      shortlist(video);
    } else {
      unsortlist(video.imdbId);
    }
  };

  render() {
    const {shortlistedVideo} = this.props;

    return (
      <View style={R.CommonStyle.containerStyle}>
        <SafeAreaView style={[{backgroundColor: '#0462EA'}]} />

        <Searchbar
          onSearchText={null}
          title="Movie List"
          searchTitle="Search"
          onSearchClick={this.onSearchClick}
        />

        <VideoList
          movies={shortlistedVideo}
          onVideoStatusChange={this.onVideoStatusChange}
          emptyStateMessage={'No shortlist video right now'}
          extraData={['Nitish']}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const savedVideo = state.SavedMovie;
  const {shortlistVideo: shortlistedVideo} = savedVideo;

  return {shortlistedVideo};
};

const mapDispatchToProps = (dispatch) => {
  return {
    shortlistVideo: (video) => dispatch(shortlistVideo(video)),
    unshortlistVideo: (video) => dispatch(unshortlistVideo(video)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMovies);
