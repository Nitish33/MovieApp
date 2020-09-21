import R from '../../Utility/R';

export const searchMovies = (text, savedVideo) => (dispatch) => {
  const {
    MovieListing: {ClearMovieList, Error},
    Common: {EndLoading, StartLoading},
  } = R.Constants.Actions;

  dispatch({type: ClearMovieList});
  dispatch({type: StartLoading});
  dispatch({
    type: Error,
    payload: {
      error: null,
    },
  });

  fetchMovie(text, 1, dispatch)
    .then(({Search, totalResults}) => {
      dispatch(onDataLoad(Search, totalResults, 1, savedVideo));
    })
    .catch((error) => {
      dispatch({
        type: Error,
        payload: {
          error: error.message,
        },
      });
    })
    .finally(() => {
      dispatch({type: EndLoading});
    });
};

export const loadMore = (text, page, savedVideo) => (dispatch) => {
  const {
    Common: {EndLoading, StartLoading},
  } = R.Constants.Actions;

  dispatch({type: StartLoading});

  fetchMovie(text, page, dispatch)
    .then(({Search, totalResults}) => {
      dispatch(onDataLoad(Search, totalResults, page, savedVideo));
    })
    .catch((error) => {
      dispatch({
        type: Error,
        payload: {
          error: error.message,
        },
      });
    })
    .finally(() => {
      dispatch({type: EndLoading});
    });
};

const fetchMovie = async (text, page) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://www.omdbapi.com/?s=${text}&apikey=4b1d318f&page=${page}&type=movie`,
    )
      .then((apiResponse) => apiResponse.json())
      .then((moviesResponse) => {
        const {Response, Error: error, Search, totalResults} = moviesResponse;

        if (Response === 'False') {
          reject(new Error(error));
          return;
        }

        if (totalResults !== '0') {
          resolve({Search, totalResults});
        } else {
          reject(new Error(`No result found for ${text}`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const onDataLoad = (Search, totalResults, page, savedVideo) => {
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
      savedVideo,
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
