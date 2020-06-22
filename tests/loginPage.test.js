load('pages/LoginPage.js');
load('../../support/init.js');

importClass(org.openqa.selenium.interactions.Actions);
importClass(org.openqa.selenium.By);
importClass(org.openqa.selenium.support.ui.ExpectedConditions);
importClass(org.openqa.selenium.support.ui.WebDriverWait);

desktopTest('Login logout page  redirection functionality', function(driver, device) {
  logged('Redirection to login page', function() {
    driver.get('http://localhost');
    logged('Checking the   Customised Page', function() {
      var loginPage = new LoginPage(driver).waitForIt();
      checkLayout(driver, BASE_PATH + '/specs/login.gspec', device.tags);
    });
  });
});

mobileTest('Login logout page  redirection functionality', function(driver, device) {
  logged('Redirection to login page', function() {
    driver.get('http://localhost');
    logged('Checking the   Customised Page', function() {
      var b2cLoginPage = new LoginPage(driver).waitForIt();
      checkLayout(driver, BASE_PATH + '/specs/login.gspec', device.tags);
    });
  });
});
