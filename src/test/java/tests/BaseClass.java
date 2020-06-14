package tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class BaseClass {
    public static IOSDriver<MobileElement> driver;
    // Reporter
    public static ExtentReports extent = new ExtentReports();
    public static ExtentSparkReporter sparkReporter;
    public static ExtentTest test;


    @BeforeClass
    public void setup() throws MalformedURLException {
        // Set capabilities
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "IOS");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "13.5");
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 11");
        capabilities.setCapability(MobileCapabilityType.UDID, "D3CE0318-FC21-4EFD-9C80-B6BCF1C6A24C");

        capabilities.setCapability(MobileCapabilityType.APP, "/Users/jakhongirruziev/Library/Developer/Xcode/DerivedData/DeleverClient-ffsvwkgjvzvomqbmcpiicdqtfohf/Build/Products/Release-iphonesimulator/DeleverClient.app");
        capabilities.setCapability("permissions", "{\"io.cloudgrey.the-app\": {\"location\": \"inuse\"}}");
        URL url = new URL("http://127.0.0.1:4723/wd/hub");
        driver = new IOSDriver<MobileElement>(url, capabilities);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        // Extent reporter
        sparkReporter = new ExtentSparkReporter(System.getProperty("user.dir") + "/report");
        extent.attachReporter(sparkReporter);
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
        extent.flush();
    }
}



