import { FIRSET_TEST_VALUE } from './constant';

const testReducer = (state = {}, action) => {
  switch (action.type) {
    case FIRSET_TEST_VALUE:
      return {
        ...state,
        testValue: action.value,
      };
    default:
      return state;
  }
};

export default testReducer;
