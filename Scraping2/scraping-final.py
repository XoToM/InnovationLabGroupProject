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

# List of URLs to scrape
urls = [
   " https://visitbath.co.uk/food-and-drink/green-park-brasserie-p27921",
   " https://visitbath.co.uk/food-and-drink/eat-a-pitta-p3503883",
   " https://visitbath.co.uk/food-and-drink/the-elder-restaurant-p3213063",
   " https://visitbath.co.uk/food-and-drink/chew-valley-distillery-p3195363",
   " https://visitbath.co.uk/food-and-drink/olio-restaurant-p3004333",
   " https://visitbath.co.uk/food-and-drink/leon-restaurant-p3271423",
   " https://visitbath.co.uk/food-and-drink/bath-pizza-co-p2135693",
   " https://visitbath.co.uk/food-and-drink/the-pump-room-restaurant-p30351",
   " https://visitbath.co.uk/food-and-drink/flourish-kitchen-p3195503",
   " https://visitbath.co.uk/food-and-drink/afternoon-tea-at-the-gainsborough-bath-spa-p3567423",
   " https://visitbath.co.uk/food-and-drink/the-stable-bath-p3290383",
   " https://visitbath.co.uk/food-and-drink/the-bath-townhouse-coppa-club-p3195373",
   " https://visitbath.co.uk/food-and-drink/afternoon-tea-at-homewood-p3256963",
   " https://visitbath.co.uk/food-and-drink/bandook-indian-kitchen-p2993453",
   " https://visitbath.co.uk/food-and-drink/the-bath-cider-house-p3138083",
   " https://visitbath.co.uk/food-and-drink/the-clubhouse-bar-at-bowood-hotel-spa-and-golf-resort-p3028173",
   " https://visitbath.co.uk/food-and-drink/socialize-at-the-gainsborough-bath-spa-p3004263",
   " https://visitbath.co.uk/food-and-drink/flourish-at-farleigh-road-kitchen-p3643363",
   " https://visitbath.co.uk/food-and-drink/the-cork-p900303",
   " https://visitbath.co.uk/food-and-drink/olive-tree-restaurant-p28871",
   " https://visitbath.co.uk/food-and-drink/woodchester-valley-vineyard-p3343143",
   " https://visitbath.co.uk/food-and-drink/afternoon-tea-at-apex-city-of-bath-hotel-p3155483",
   " https://visitbath.co.uk/food-and-drink/corkage-p3155343",
   " https://visitbath.co.uk/food-and-drink/the-beefy-boys-p3664283",
   " https://visitbath.co.uk/food-and-drink/cote-brasserie-bath-p1230723",
   " https://visitbath.co.uk/food-and-drink/brasserie-beau-bath-p3530413",
   " https://visitbath.co.uk/food-and-drink/the-langford-p3128613",
   " https://visitbath.co.uk/food-and-drink/the-railway-inn-p3225793",
   " https://visitbath.co.uk/food-and-drink/the-bath-brew-house-p1705743",
   " https://visitbath.co.uk/food-and-drink/newton-farm-shop-and-cafe-p1935013",
]

for url in urls:
    driver.get(url)
    
    # Wait for JavaScript to load content
    time.sleep(5)  # Adjust this if needed

    # Look for a specific div by class name
    specific_div_class = "productDetailHeaderLeft"
    try:
        specific_div = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CLASS_NAME, specific_div_class))
        )
        
        # Extract location name
        try:
            name_element = specific_div.find_element(By.TAG_NAME, "h1")
            name = name_element.text.strip() if name_element else "N/A"
        except Exception as e:
            print(f"Error extracting name: {e}")
            name = "N/A"

        # Extract address
        try:
            address_element = specific_div.find_element(By.CLASS_NAME, "node.address")
            address = address_element.text.strip() if address_element else "N/A"
        except Exception as e:
            print(f"Error extracting address: {e}")
            address = "N/A"
        
        print(f"URL: {url}")
        print(f"Name: {name}")
        print(f"Address: {address}")
        print("-" * 40)

    except Exception as e:
        print(f"Error on {url}: {e}")
        print("Specific div not found. The webpage structure might have changed.")

# Close the browser
driver.quit()
