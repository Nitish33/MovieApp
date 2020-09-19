import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import R from '../../Utility/R';
import {VideoList, Searchbar} from '../../Component';

class SavedMovies extends Component {
  render() {
    const {shortlistVideo} = this.props;

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
          movies={shortlistVideo}
          emptyStateMessage={'No shortlist video right now'}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const savedVideo = state.SavedMovie;
  const {shortlistVideo} = savedVideo;

  return {shortlistVideo};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMovies);
