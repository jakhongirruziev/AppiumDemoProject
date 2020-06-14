package screens;

import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.By;


public class ProductDetailScreen {
    // Locators
    private final By addToCartButton = MobileBy.iOSNsPredicateString("type == 'XCUIElementTypeOther' AND name BEGINSWITH 'Issue'");
    IOSDriver<MobileElement> driver;


    // Constructor
    public ProductDetailScreen(IOSDriver<MobileElement> driver) {
        this.driver = driver;
    }

    // Methods
    public void addToCart() {
        driver.findElement(addToCartButton).click();
    }
}
