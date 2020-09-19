import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import R from '../../Utility/R';
import {VideoList} from '../../Component';

class SavedMovies extends Component {
  render() {
    const {shortlistVideo} = this.props;

    return (
      <SafeAreaView style={R.CommonStyle.containerStyle}>
        <View style={R.CommonStyle.containerStyle}>
          <VideoList movies={shortlistVideo} />
        </View>
      </SafeAreaView>
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
