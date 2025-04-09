import requests
from bs4 import BeautifulSoup

# Target URL
url = "https://visitbath.co.uk/food-and-drink/food-and-drink-by-interest/accessible"

# Headers to mimic a real browser request
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
}

# Request webpage content
response = requests.get(url, headers=headers)
response.raise_for_status()  # Ensure request was successful

# Parse with BeautifulSoup
soup = BeautifulSoup(response.text, "html.parser")

# Find the main product list container
product_list = soup.find("ol", class_="productList productListStandalone wtsEnableGridView defaultGridView")
print(soup.prettify())
# Extract individual locations
if product_list:
    locations = product_list.find_all("ol", class_="productList productListStandalone wtsEnableGridView defaultGridView")  # Adjust if needed

    for location in locations:
        # Extract location name
        name_tag = location.find("a", class_="ProductName")
        name = name_tag.get_text(strip=True) if name_tag else "N/A"

        # Extract address
        address_tag = location.find("p", class_="loc")
        address = address_tag.get_text(strip=True) if address_tag else "N/A"

        # Extract facilities (if available)
        #facilities_tag = location.find("ul", class_="product-facilities")
       # facilities = [li.get_text(strip=True) for li in facilities_tag.find_all("li")] if facilities_tag else []

        # Print results
        print(f"Name: {name}")
        print(f"Address: {address}")
       # print(f"Facilities: {', '.join(facilities) if facilities else 'Not listed'}")
        print("-" * 40)
else:
    print("No locations found. The webpage structure might have changed."),

    


