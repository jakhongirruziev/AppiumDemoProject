package tests;

import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import screens.LoginScreen;

@Listeners(listeners.Listeners.class)
public class LoginTest extends BaseClass {

    // Constructors
    public LoginTest() {
    }

    public LoginTest(IOSDriver<MobileElement> driver) {
        BaseClass.driver = driver;
    }

    @Test
    public void loginTest() throws InterruptedException {
        // Login
        test = extent.createTest("Sign in test");
        LoginScreen loginPage = new LoginScreen(driver);
        loginPage.setPhoneNumber("+998998428232");
        test.pass("Set phone number");
        loginPage.tap();
        loginPage.hitSignInButton();
        test.pass("Hit sign in button");
        loginPage.setConfirmationCode("7777");
        test.pass("set confirmation code");
        loginPage.tap();
        loginPage.hitVerifyButton();
        test.pass("Hit verify button");
    }
}
