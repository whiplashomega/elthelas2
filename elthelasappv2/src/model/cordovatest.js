var ctest = {
  isCordova: !!window.cordova,
  baseUrl: "/"
};
if (ctest.isCordova) {
  ctest.baseUrl = 'https://elthelas.com/';
}
export default ctest;
