const whichBrowser = () => {
  let browser;
  let userAgentString = navigator.userAgent;
  if (userAgentString.indexOf('OP') > -1) {
    browser = 'Opera';
  } else if (userAgentString.indexOf('Safari') > -1) {
    browser = 'Safari';
  } else if (userAgentString.indexOf('MSIE') > -1 || userAgentString.indexOf('rv:') > -1) {
    browser = 'IE';
  } else if (userAgentString.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (userAgentString.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  }
  return browser;
};

export default whichBrowser;

