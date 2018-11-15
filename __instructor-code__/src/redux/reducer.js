const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

const initialState = {
  isAuthenticated: false,
  user: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      // return Object.assign({}, state, { isAuthenticated: true, user: action.payload})
      return { ...state, isAuthenticated: true , user: action.payload }
    case USER_LOGGED_OUT:
      return { ...state, isAuthenticated: false, user: null }
    
    default:
      return state;
  }
}

export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function userLoggedOut() {
  return {
    type: USER_LOGGED_OUT
  }
}

