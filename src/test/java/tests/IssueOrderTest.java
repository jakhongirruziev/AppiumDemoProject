package tests;

import org.openqa.selenium.By;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import screens.CreateOrderScreen;
import screens.MenuScreen;

@Listeners(listeners.Listeners.class)
public class IssueOrderTest extends BaseClass {

    // Methods
    @Test
    public void issueOrder() throws InterruptedException {
        // Add products to cart
        AddToCartTest addToCart = new AddToCartTest(driver);
        addToCart.addToCartTest(2);
        test = extent.createTest("Issue order test");
        // Go to checkout
        MenuScreen menuPage = new MenuScreen(driver);
        menuPage.issueOrder();
        test.pass("Go to checkout page");

        // Create order
        CreateOrderScreen createOrderPage = new CreateOrderScreen(driver);
        createOrderPage.hitDeliveryAddressButton();
        test.pass("Hit delivery address");
        createOrderPage.setAddress("Sergeli");
        test.pass("Set address");
        createOrderPage.setReferencePlace("Korzinka");
        test.pass("Set reference place");
        createOrderPage.hitShowOnMapButton();
        if (driver.findElementByName("Allow While Using App").isDisplayed()) {
            driver.findElementByName("Allow While Using App").click();
            test.pass("Hit allow permission");
        }
        createOrderPage.setLocation();
        test.pass("Set location");
        createOrderPage.paymentType();
        test.pass("Hit payment");
        createOrderPage.setPaymentType();
        test.pass("Set payment");
        createOrderPage.createOrder();
        // Assert if order is created and returned to Menu
        driver.findElement(By.xpath("(//XCUIElementTypeOther[@name=\"Menu\"])[2]")).isDisplayed();
        test.pass("Order is issued");
        Thread.sleep(3000);
    }
}
