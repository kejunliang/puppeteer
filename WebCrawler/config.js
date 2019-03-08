const baseUrlArray = [
    {
        url: '',
        langcode: '',
    },
];
const baseUrl = baseUrlArray[0].url;

const getUrl = (index) => {
   const baseUrl = baseUrlArray[index].url;
   return {
       hubConnection: `${baseUrl}/example`,
   };
}

const getLangCode = (index) => {
   return baseUrlArray[index].langcode;
}

module.exports = {
   secondWait: 1000,
   stepWait: 5000,
   username: '',
   password: '',
   credentials: {
       username: '',
       password: '',
   },
   baseUrl: baseUrl,
   baseUrlArray: baseUrlArray,
   urls: getUrl(0),
   getUrl: getUrl,
   getLangCode: getLangCode,
}