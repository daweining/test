import { FIRSET_TEST_VALUE } from './constant';

export const firstTest = () => (dispatch) => {
  dispatch({
    type: FIRSET_TEST_VALUE,
    value: '照片',
  });
};
