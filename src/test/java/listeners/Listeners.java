package listeners;

import com.aventstack.extentreports.MediaEntityBuilder;
import org.testng.ITestListener;
import org.testng.ITestResult;
import tests.BaseClass;
import utils.Screenshot;

import java.io.IOException;

public class Listeners extends BaseClass implements ITestListener {

    @Override   // On Test Failure Takes a screenshot
    public void onTestFailure(ITestResult result) {
        System.out.println("*********************** TEST FAILED ******************************");
        test.fail("Failed");
        try {
            Screenshot take = new Screenshot();
            String screenshot = take.screenshot(driver);
            test.fail(result.getThrowable().getMessage(), MediaEntityBuilder.createScreenCaptureFromPath(screenshot).build());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
