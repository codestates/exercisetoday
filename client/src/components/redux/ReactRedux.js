const redux = require("redux");
const ADD_CHALLENGE = "ADD_CHALLENGE";
const createStore = redux.createStore;
// actions
const addChallenge = () => {
  return {
    type: ADD_CHALLENGE,
  };
};
// reducers
const initialState = {
  challenge: ["출퇴근챌린지", "30분 러닝 챌린지"],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHALLENGE:
      return {
        ...state,
        challenge: [action],
      };
    default:
      return state;
  }
};
// store
//스토어 생성해서 리듀서 적용
const store = createStore(reducer);

// subscribe - view - dispatch

console.log(store);
