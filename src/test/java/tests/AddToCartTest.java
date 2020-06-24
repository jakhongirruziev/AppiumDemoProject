package tests;

import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.By;
import org.testng.annotations.Listeners;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import screens.MenuScreen;
import screens.ProductDetailScreen;

@Listeners(listeners.Listeners.class)
public class AddToCartTest extends BaseClass {

    // Constructors
    public AddToCartTest() {
    }

    public AddToCartTest(IOSDriver<MobileElement> driver) {
        BaseClass.driver = driver;
    }


    // Methods
    @Test
    @Parameters("productCount")
    public void addToCartTest(@Optional("2") int productCount) throws InterruptedException {
        // Login
        LoginTest login = new LoginTest(driver);
        login.loginTest();

        test = extent.createTest("Add products to cart test");
        for (int i = 1; i <= productCount; i++) {
            // Choose product
            driver.findElement(By.xpath("(//XCUIElementTypeOther[@name=\"Menu\"])[2]")).isDisplayed();
            MenuScreen menuPage = new MenuScreen(driver);
            menuPage.scrollAndClick();
            test.pass("Select product");

            // Add product to cart
            ProductDetailScreen productDetailPage = new ProductDetailScreen(driver);
            productDetailPage.addToCart();
            test.pass("Add number " + i + " product to cart");
        }

    }
}
