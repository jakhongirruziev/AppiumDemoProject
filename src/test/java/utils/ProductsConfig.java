package utils;

import org.testng.annotations.Test;

import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class ProductsConfig {
    String projectPath = System.getProperty("user.dir");
    Properties properties = new Properties();

    @Test
    public void test() {
        System.out.println(getProduct());
    }

    @Test
    public String getProduct() {
        String value = null;
        try {
            FileInputStream inputStream = new FileInputStream(projectPath + "/config/products.properties");
            properties.load(inputStream);

            // Gets random number from product count range
            int random = (int) (1 + (Math.random() * (27 - 1)));
            String myString = properties.getProperty("product" + random);

            // Setting UTF-8 encoding correctly
            byte[] bytes = myString.getBytes(StandardCharsets.ISO_8859_1);
            value = new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
        }
        return value;
    }


}
