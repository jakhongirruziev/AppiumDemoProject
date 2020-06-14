package screens;

import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginScreen {
    // Locators
    public final By phoneNumber = By.xpath("//XCUIElementTypeOther[@name=\"Enter phone number\"]/XCUIElementTypeTextField");
    private final IOSDriver<MobileElement> driver;
    private final By confirmationCode = By.xpath("//XCUIElementTypeOther[@name=\"Enter verification code\"]/XCUIElementTypeTextField");
    private final By signInButton = By.name("Sign in");
    private final By verifyButton = By.name("Verify");

    // Constructor
    public LoginScreen(IOSDriver<MobileElement> driver) {
        this.driver = driver;
    }


    // Methods
    public void setPhoneNumber(String phone) {
        driver.findElement(phoneNumber).sendKeys(phone);
    }

    public void setConfirmationCode(String code) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(confirmationCode));
        element.sendKeys(code);
    }

    public void hitSignInButton() {
        driver.findElement(signInButton).click();
    }

    public void hitVerifyButton() {
        driver.findElement(verifyButton).click();
    }

    public void tap() {
        (new TouchAction(driver)).tap(PointOption.point(342, 200)).perform();
    }
}
