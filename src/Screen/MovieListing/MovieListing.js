import React, {Component} from 'react';
import {View, SafeAreaView, Text, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {
  searchMovies,
  loadMore,
  shortlistVideo,
  unshortlistVideo,
} from './Action';
import R from '../../Utility/R';
import Styles from './styles';
import {VideoList, Searchbar} from '../../Component';
import {TouchableOpacity} from 'react-native-gesture-handler';

class MovieListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

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

  onLoadMore = () => {
    const {
      loadMore,
      page,
      loading,
      movies,
      totalResults,
      savedVideo,
    } = this.props;
    const {searchText} = this.state;

    if (!loading && movies.length > 0 && totalResults > movies.length) {
      loadMore(searchText, page + 1, savedVideo);
    }
  };

  onSearchClick = (searchText) => {
    const {searchMovie, savedVideo} = this.props;

    if (searchText.trim().length < 3) {
      Alert.alert('Error', 'Please enter atleast 3 character to search');
      return;
    }

    this.setState({searchText});

    console.log('saved video', savedVideo);

    searchMovie(searchText, savedVideo);
  };

  onRetryButtonClick = () => {
    const {searchMovie, savedVideo} = this.props;
    const {searchText} = this.state;
    searchMovie(searchText, savedVideo);
  };

  render() {
    const {error, loading, movies, shortlistedVideo, totalResults} = this.props;

    const loadingCondition = loading && movies.length < 1;
    const errorCondition = !loading && error && movies.length < 1;
    const moviesListCondition = !loadingCondition && !errorCondition;

    return (
      <View style={R.CommonStyle.containerStyle}>
        <SafeAreaView style={R.CommonStyle.appBackgroundColor} />

        <Searchbar
          onSearchText={null}
          title="Movie List"
          searchTitle="Search"
          onSearchClick={this.onSearchClick}
          placeholder="Search movie by title"
        />

        <View style={R.CommonStyle.containerStyle}>
          {loadingCondition && (
            <View
              style={[
                R.CommonStyle.containerStyle,
                R.CommonStyle.centerContent,
              ]}>
              <Text>Loading</Text>
            </View>
          )}

          {errorCondition && (
            <View
              style={[
                R.CommonStyle.containerStyle,
                R.CommonStyle.centerContent,
              ]}>
              <Text>{error}</Text>

              <TouchableOpacity
                style={Styles.retryContainerStyle}
                onPress={this.onRetryButtonClick}>
                <Text style={Styles.retryTextStyle}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {moviesListCondition && (
            <VideoList
              movies={movies}
              onVideoStatusChange={this.onVideoStatusChange}
              onLoadMore={this.onLoadMore}
              emptyStateMessage={'Search video to see results.'}
              extraData={shortlistedVideo}
              ListFooterComponent={() => {
                if (
                  loading &&
                  movies.length > 0 &&
                  movies.length < totalResults
                ) {
                  return <ActivityIndicator size="small" color="black" />;
                } else {
                  return null;
                }
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const movieData = state.MovieListing;
  const common = state.Common;
  const savedVideo = state.SavedMovie;

  const {shortlistVideo: shortlistedVideo} = savedVideo;
  const {movies, totalResults, error, page} = movieData;
  const {loading} = common;

  return {
    movies,
    totalResults,
    error,
    loading,
    page,
    shortlistedVideo,
    savedVideo: shortlistedVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shortlistVideo: (video) => dispatch(shortlistVideo(video)),
    unshortlistVideo: (video) => dispatch(unshortlistVideo(video)),

    searchMovie: (text, currentlySavedMovies) =>
      dispatch(searchMovies(text, currentlySavedMovies)),

    loadMore: (text, page, currentlySavedMovies) =>
      dispatch(loadMore(text, page, currentlySavedMovies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListing);
