load('basics.js');
importClass(org.openqa.selenium.chrome.ChromeOptions);
importClass(org.openqa.selenium.chrome.ChromeDriver);

const BASE_PATH = '.';

var $galen = {};
$galen.website = function() {
  const baseUrl = 'http://localhost';
  return baseUrl;
};

$galen.devices = {
  mobile: {
    deviceName: 'mobile emulation',
    size: '330,600',
    tags: ['mobile']
  },
  tablet: {
    deviceName: 'tablet emulation',
    size: '768,900',
    tags: ['tablet']
  },
  desktop: {
    deviceName: 'desktop emulation',
    size: '1034,800',
    tags: ['desktop']
  }
};

afterTest(test => {
  var driver = session.get('driver');
  if (driver != null) {
    if (test.isFailed()) {
      try {
        session
          .report()
          .info('Screenshot & Page source')
          .withAttachment('screenshot.png', takeScreenshot(driver))
          .withTextAttachment('page-source.txt', driver.getPageSource())
          .withExtrasLink('Location', driver.getCurrentUrl());
      } catch (ex) {
        session.report().warn("Couldn't retrieve page information: " + ex);
      }
    }
    driver.quit();
  }
});

function waitforLoaderToDisappear(driver) {
  var wait = new org.openqa.selenium.support.ui.WebDriverWait(driver, 20);
  wait.until(
    org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated(
      org.openqa.selenium.By.xpath('(//div[contains(@class, "loader-fleet")])')
    )
  );
}

function moveToElement(element, driver) {
  driver.executeScript('arguments[0].scrollIntoView(true);', element);
}

function clickOnElement(selector, driver) {
  var wait = new org.openqa.selenium.support.ui.FluentWait(driver)
    .withTimeout(20, java.util.concurrent.TimeUnit.SECONDS)
    .pollingEvery(200, java.util.concurrent.TimeUnit.MILLISECONDS);
  wait.until(org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated(selector));
  wait.until(org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable(selector)).click();
}

function _test(testNamePrefix, callback) {
  test(testNamePrefix + ' on ${deviceName} device for ' , function(device) {
    const options = new ChromeOptions();
    options.addArguments('--no-sandbox', '--headless', '--disable-dev-shm-usage');
    options.addArguments('--window-size=' + device.size);
    const driver = new ChromeDriver(options);
    driver.navigate().to($galen.website());
    driver
      .manage()
      .timeouts()
      .implicitlyWait(5, java.util.concurrent.TimeUnit.SECONDS);
    session.put('driver', driver);
    callback.call(this, driver, device);
  });
}

function testOnAllDevices(testNamePrefix, callback) {
  forAll($galen.devices, function() {
    _test(testNamePrefix, callback);
  });
}

function testOnDevice(device, testNamePrefix, callback) {
  forOnly(device, function() {
    _test(testNamePrefix, callback);
  });
}

function testOnDevices(devicesArray, testNamePrefix, callback) {
  forArray(devicesArray, function(device) {
    forOnly(device, function() {
      if (device !== undefined) _test(testNamePrefix, callback);
    });
  });
}

function desktopTest(testNamePrefix, test) {
  return testOnDevice($galen.devices.desktop, testNamePrefix, test);
}

function tabletTest(testNamePrefix, test) {
  return testOnDevice($galen.devices.tablet, testNamePrefix, test);
}

function mobileTest(testNamePrefix, test) {
  return testOnDevice($galen.devices.mobile, testNamePrefix, test);
}

function tabletAndDesktopTest(testNamePrefix, test) {
  return testOnDevices([$galen.devices.tablet, $galen.devices.desktop], testNamePrefix, test);
}

function tabletAndDesktopTest(testNamePrefix, test) {
  return testOnDevices([$galen.devices.tablet, $galen.devices.desktop], testNamePrefix, test);
}

function allDevicesTest(testNamePrefix, test) {
  return testOnAllDevices(testNamePrefix, test);
}
