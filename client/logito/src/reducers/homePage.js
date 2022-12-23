import { HomePageType } from '../actions/homePage';

const initialState = {
    onHomePage:false
}

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
   
    case HomePageType.ONHOMEPAGE:
      return {
        onHomePage: true
      };
    default:
      return state;
  }
}