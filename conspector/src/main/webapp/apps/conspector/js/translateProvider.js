app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
//    TITLE: 'Hello',
//    FOO: 'This is a paragraph.',
//    BUTTON_LANG_EN: 'english',
//    BUTTON_LANG_DE: 'german'
  });
  
  $translateProvider.translations('fr', {
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