const signUpApi: string = "/api/Authenticate/signup"; //post
const checkIsEmailAvailablApi = "/api/Authenticate/email";
const signInApi: string = "/api/Authenticate/signin"; // post
const oAuthApi: string = "/api/Authenticate/googleOauth"; // post
const profileApi: string = "/api/Authenticate/profile"; // put and get
const forgotPasswordApi: string = "/api/Authenticate/forgot-password"; // post
const resetPasswordApi: string = "/api/Authenticate/reset-password"; // post
const searchCityAPi: string = "/api/search/cities"; //get
const searchTitleAPi: string = "/api/search/titles"; //get
export {
  signUpApi,
  checkIsEmailAvailablApi,
  signInApi,
  oAuthApi,
  profileApi,
  forgotPasswordApi,
  resetPasswordApi,
  searchCityAPi,
  searchTitleAPi,
};
