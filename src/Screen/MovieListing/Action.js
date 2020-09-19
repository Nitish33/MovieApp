import R from '../../Utility/R';

export const searchMovies = (text) => (dispatch) => {
  const {
    MovieListing: {ClearMovieList},
    Common: {EndLoading, StartLoading},
  } = R.Constants.Actions;

  dispatch({type: ClearMovieList});
  dispatch({type: StartLoading});

  fetchMovie(text, 1)
    .then(({Search, totalResults}) => {
      dispatch(onDataLoad(Search, totalResults, 1));
    })
    .catch((error) => {
      dispatch({
        type: Error,
        payload: {
          error: error.message,
        },
      });
    })
    .finally(dispatch({type: EndLoading}));
};

export const loadMore = (text, page) => (dispatch) => {
  const {
    Common: {EndLoading, StartLoading},
  } = R.Constants.Actions;

  dispatch({type: StartLoading});

  fetchMovie(text, page)
    .then(({Search, totalResults}) => {
      dispatch(onDataLoad(Search, totalResults, page));
    })
    .catch((error) => {
      dispatch({
        type: Error,
        payload: {
          error: error.message,
        },
      });
    })
    .finally(dispatch({type: EndLoading}));
};

const fetchMovie = async (text, page) => {
  try {
    const apiResponse = await fetch(
      `http://www.omdbapi.com/?s=${text}&apikey=4b1d318f&page=${page}&type=movie`,
    );

    const moviesResponse = await apiResponse.json();
    const {Search, totalResults} = moviesResponse;

    return {Search, totalResults};
  } catch (error) {
    throw error;
  }
};

export const onDataLoad = (Search, totalResults, page) => {
  const {
    Constants: {
      Actions: {
        MovieListing: {MovieLoaded},
      },
    },
  } = R;

  return {
    type: MovieLoaded,
    payload: {
      Search,
      totalResults,
      page,
    },
  };
};

export const shortlistVideo = (video) => {
  const {
    Constants: {
      Actions: {
        Common: {ShortlistVideo},
      },
    },
  } = R;

  return {
    type: ShortlistVideo,
    payload: {
      video,
    },
  };
};

export const unshortlistVideo = (id) => {
  const {
    Constants: {
      Actions: {
        Common: {UnShortlistVideo},
      },
    },
  } = R;

  return {
    type: UnShortlistVideo,
    payload: {
      id,
    },
  };
};
