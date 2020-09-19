import React, {Component} from 'react';
import {View, SafeAreaView, Button, TextInput} from 'react-native';
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
    const {loadMore, page, loading, movies, totalResults} = this.props;
    const {searchText} = this.state;

    if (!loading && movies.length > 0 && totalResults > movies.length) {
      loadMore(searchText, page + 1);
    }
  };

  onSearchClick = (searchText) => {
    const {searchMovie} = this.props;

    this.setState({searchText});

    searchMovie(searchText);
  };

  render() {
    const {error, loading, movies, totalResults} = this.props;

    return (
      <View style={R.CommonStyle.containerStyle}>
        <SafeAreaView style={[{backgroundColor: 'blue'}]} />
        <Searchbar
          onSearchText={null}
          title="Movie List"
          searchTitle="Search"
          onSearchClick={this.onSearchClick}
        />

        <View style={R.CommonStyle.containerStyle}>
          <VideoList
            movies={movies}
            onVideoStatusChange={this.onVideoStatusChange}
            onLoadMore={this.onLoadMore}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const movieData = state.MovieListing;
  const common = state.Common;

  const {movies, totalResults, error, page} = movieData;
  const {loading} = common;

  return {movies, totalResults, error, loading, page};
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchMovie: (text) => dispatch(searchMovies(text)),
    loadMore: (text, page) => dispatch(loadMore(text, page)),
    shortlistVideo: (video) => dispatch(shortlistVideo(video)),
    unshortlistVideo: (video) => dispatch(unshortlistVideo(video)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListing);
