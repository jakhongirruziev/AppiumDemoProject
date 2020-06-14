package utils;

import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.File;
import java.io.IOException;

public class Screenshot {
    private final String reportPath = System.getProperty("user.dir") + "/report/";

    public String screenshot(IOSDriver<MobileElement> driver) throws IOException {
        String screenshotName = System.currentTimeMillis() + ".png";

        File screenshotFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(screenshotFile, new File(reportPath + screenshotName));

        return screenshotName;
    }
}
