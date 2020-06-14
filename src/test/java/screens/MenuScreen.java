package screens;

import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.By;
import utils.ProductsConfig;


public class MenuScreen {
    private final IOSDriver<MobileElement> driver;
    // Locators
    private final By randomProduct = By.name(getProduct());
    private final By issueOrderButton = MobileBy.iOSNsPredicateString("type == 'XCUIElementTypeOther' AND name BEGINSWITH 'Issue'");

    // Constructor
    public MenuScreen(IOSDriver<MobileElement> driver) {
        this.driver = driver;
    }


    // Methods
    public String getProduct() {  // Gets random product name from properties file
        ProductsConfig productsConfig = new ProductsConfig();
        return productsConfig.getProduct();
    }

    public void scrollAndClick() {
        driver.findElement(randomProduct).click();
    }

    public void issueOrder() {
        driver.findElement(issueOrderButton).click();
    }


}