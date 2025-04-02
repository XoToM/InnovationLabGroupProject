from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up Selenium with headless mode
options = Options()
options.add_argument("--headless")  # Run in background
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# Initialize WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# Open the URL
url = "https://visitbath.co.uk/food-and-drink/food-and-drink-by-interest/accessible"
driver.get(url)

# Wait for JavaScript to load content
time.sleep(5)  # Adjust this if needed

# Find the main product list container (ol element)
try:
    product_list = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "ProductListMain"))
    )
    product_list = driver.find_element(By.CLASS_NAME, "ProductListMain")  # The <ol> container
    locations = product_list.find_elements(By.TAG_NAME, "li")  # All <li> items inside

    for location in locations:
        # Extract location name
        try:
            div1 = location.find_element(By.CLASS_NAME, "prodListItemWrapper")
            div2 = div1.find_element(By.CLASS_NAME, "centerBlock")
            name_div = div2.find_element(By.CLASS_NAME, "ProductName")
            name = location.find_element(By.CLASS_NAME, "ProductName")
            name = name_div.text.strip() if name_div else "N/A"
        except Exception as e:
            print(f"Error extracting name: {e}")
            name = "N/A"

        # Extract address
        try:
            address = location.find_element(By.CLASS_NAME, "loc").text.strip()
        except Exception as e:
            print(f"Error extracting address: {e}")
            address = "N/A"

        print(f"Name: {name}")
        print(f"Address: {address}")
        print("-" * 40)

except Exception as e:
    print(f"Error: {e}")
    print("No locations found. The webpage structure might have changed.")

# Close the browser
driver.quit()
