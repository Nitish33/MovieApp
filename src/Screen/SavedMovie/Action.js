import R from '../../Utility/R';

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
