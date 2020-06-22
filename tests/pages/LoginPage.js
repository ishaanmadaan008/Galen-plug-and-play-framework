importClass(org.openqa.selenium.interactions.Actions);
importClass(org.openqa.selenium.support.ui.Wait);
importClass(org.openqa.selenium.support.ui.ExpectedConditions);
importClass(org.openqa.selenium.By);
importClass(org.openqa.selenium.support.ui.WebDriverWait);

this.LoginPage = $page('Login Page', {
  Content: '.show-content',
  password: '#password',
  signIn: '#next'
});
