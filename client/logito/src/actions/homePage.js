import AuthService from "../services/api";

export const HomePageType = {
  ONHOMEPAGE:'ONHOMEPAGE'
}


export const onHomePage = () => (dispatch) => {

  AuthService.keepHomePageState();
  dispatch({
    type: HomePageType.ONHOMEPAGE,
  });

};