const signUpApi: string = "/api/Authenticate/signup"; //post
const checkIsEmailAvailablApi = "/api/Authenticate/email";
const signInApi: string = "/api/Authenticate/signin"; // post
const oAuthApi: string = "/api/Authenticate/googleOauth"; // post
const profileApi: string = "/api/Authenticate/profile"; // put and get
const forgotPasswordApi: string = "/api/Authenticate/forgot-password"; // post
const resetPasswordApi: string = "/api/Authenticate/reset-password"; // post
const searchCityAPi: string = "/api/cities"; //get
const searchTitleAPi: string = "/api/titles"; //get
const addTicketAPi: string = "/api/tickets"; //post
const getHomePageRecommendationsApi = "/api/home"; //get
const getUserHistoryApi = "/api/Authenticate/history"; //get
const deleteTicketApi = "/api/ticket/"; //delete
const editTicketApi = "api/ticket/"; //put , change it into patch later (marakamey)
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
  addTicketAPi,
  getHomePageRecommendationsApi,
  getUserHistoryApi,
  deleteTicketApi,
  editTicketApi,
};
