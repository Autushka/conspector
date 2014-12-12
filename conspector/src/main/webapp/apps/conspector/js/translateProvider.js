app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
  	  //signIn
  	  signIn_userName: 'Username',
  	  signIn_password: 'Password',
  	  signIn_logIn: 'Log In',
  	  signIn_languageCode: 'EN',
  	  signIn_forgotPassword: 'Forgot your password?'



//    TITLE: 'Hello',
//    FOO: 'This is a paragraph.',
//    BUTTON_LANG_EN: 'english',
//    BUTTON_LANG_DE: 'german'
  });
  
  $translateProvider.translations('fr', {
   	  //signIn
  	  signIn_userName: 'Utiisateur',
  	  signIn_password: 'Mot de pass',
  	  signIn_logIn: 'Connection',
  	  signIn_languageCode: 'FR',
  	  signIn_forgotPassword: 'Mot de passe oubli\u00E9?' 	
//    TITLE: 'Hallo',
//    FOO: 'Dies ist ein Paragraph.',
//    BUTTON_LANG_EN: 'englisch',
//    BUTTON_LANG_DE: 'deutsch'
  });
  
//  
//  $scope.setLang = function(langKey) {
//	    // You can change the language during runtime
//	    $translate.use(langKey);
//	  }; 
  
  $translateProvider.preferredLanguage('en');
  $translateProvider.useCookieStorage(); 
});