import R from '../../Utility/R';

export default function Reducer(state = {shortlistVideo: []}, action) {
  const {type, payload} = action;

  const {
    Common: {ShortlistVideo, UnShortlistVideo},
  } = R.Constants.Actions;

  let newList = [];

  switch (type) {
    case ShortlistVideo:
      const {video} = payload;
      newList = [...state.shortlistVideo];
      newList.push(video);
      return {shortlistVideo: newList};

    case UnShortlistVideo:
      const {id} = payload;

      const previousVideos = state.shortlistVideo;
      newList = previousVideos.filter((value) => {
        return value.imdbId !== id;
      });

      return {shortlistVideo: newList};

    default:
      return state;
  }
}
