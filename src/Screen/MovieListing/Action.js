import R from '../../Utility/R';

export const startLoading = (text, page = 1) => (dispatch, getState) => {
  const {
    Constants: {
      Actions: {
        Common: {StartLoading, EndLoading},
        MovieListing: {Error},
      },
    },
  } = R;

  dispatch({type: StartLoading});

  fetch(
    `http://www.omdbapi.com/?s=${text}&apikey=4b1d318f&page=${page}&type=movie`,
  )
    .then((response) => response.json())
    .then((movies) => {
      const {Search, totalResults} = movies;

      console.log('movie data is', Search);

      dispatch(onDataLoad(Search, totalResults));
    })
    .catch((error) => {
      console.log('error is', error);

      dispatch({
        type: Error,
        payload: {
          error: error.message,
        },
      });
    });

  setTimeout(() => {
    dispatch({type: EndLoading});
  }, 1000);
};

export const onDataLoad = (Search, totalResults) => {
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
    },
  };
};
