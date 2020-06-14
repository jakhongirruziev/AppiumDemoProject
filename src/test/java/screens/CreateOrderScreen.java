package screens;

import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.By;

public class CreateOrderScreen {
    // Locators
    private final By deliveryAddressButton = By.name("\uE0C8 Delivery address");
    private final By address = By.xpath("(//XCUIElementTypeOther[@name=\"Address\"])[2]/XCUIElementTypeTextField");
    private final By referencePlace = By.xpath("(//XCUIElementTypeOther[@name=\"Reference Place\"])[2]/XCUIElementTypeTextField");
    private final By showOnMapButton = By.name("Show on map");
    private final By setLocationButton = By.name("Set location");
    private final By paymentTypeButton = By.name("\uE227 Payment type");
    private final By byCash = By.name("Cash");
    private final By byCard = By.name("Card");
    private final By createOrderButton = MobileBy.iOSNsPredicateString("type == 'XCUIElementTypeOther' AND name BEGINSWITH 'Issue'");
    private final IOSDriver<MobileElement> driver;


    // Constructor
    public CreateOrderScreen(IOSDriver<MobileElement> driver) {
        this.driver = driver;
    }


    // Methods
    public void hitDeliveryAddressButton() {
        driver.findElement(deliveryAddressButton).click();
    }

    public void hitShowOnMapButton() {
        driver.findElement(showOnMapButton).click();
    }

    public void setLocation() {
        driver.findElement(setLocationButton).click();
    }

    public void paymentType() {
        driver.findElement(paymentTypeButton).click();
    }

    public void setPaymentType() {  // Randomly chooses between two payment types
        int random = (int) (1 + (Math.random() * (2 - 1)));
        if (random == 1)
            driver.findElement(byCash).click();
        if (random == 2)
            driver.findElement(byCard).click();
    }

    public void createOrder() {
        driver.findElement(createOrderButton).click();
    }

    public void setAddress(String Address) {
        driver.findElement(address).sendKeys(Address);
    }

    public void setReferencePlace(String reference) {
        driver.findElement(referencePlace).sendKeys(reference);
    }
}
