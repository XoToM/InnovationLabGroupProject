import requests
from bs4 import BeautifulSoup
import xlsxwriter
import time

# Define URL
url = "https://www.euansguide.com/venues/three-abbey-green-bath-7674"

# Send GET request to fetch HTML content
headers = {"User-Agent": "Mozilla/5.0"}  # Helps avoid blocks by mimicking a real browser
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.content, "html.parser")

# Create a new Excel file
workbook = xlsxwriter.Workbook("bath_accessibility.xlsx")
worksheet = workbook.add_worksheet()

# Set column headers
headers = ["Title", "Address", "Reviews", "Accessibility Features"]
for col, header in enumerate(headers):
    worksheet.write(0, col, header)

# Find all venue listings
venues = soup.find_all("div", class_="v2-venue-header")  # Update class if needed

print(f"Found {len(venues)} venues")  # Check if any venues are found

row = 1
for venue in venues:
    try:
        # Check individual element existence
       # venue = soup.find("div", class_="v2-venue-header")   Find the div with the specified class
        title = venue.find("li", class_="current").text.strip() if venue.find("li", class_="current") else "N/A"
        address = venue.find("span", class_="address").text.strip() if venue.find("span", class_="address") else "N/A"
        reviews = venue.find("span", class_="v2-rating-label").text.strip() if venue.find("span", class_="v2-rating-label") else "N/A"
        
        # Find accessibility features
        features = venue.find_all("span", class_="venue-card__tags")
        accessibility_features = ", ".join([feature.text.strip() for feature in features]) if features else "N/A"
        
        # Debug print each element to see if the data exists
        print(f"Title: {title}")
        print(f"Address: {address}")
        print(f"Reviews: {reviews}")
        print(f"Accessibility Features: {accessibility_features}")
        
        # Write to Excel
        worksheet.write(row, 0, title)
        worksheet.write(row, 1, address)
        worksheet.write(row, 2, reviews)
        worksheet.write(row, 3, accessibility_features)
        
        row += 1  # Move to next row
    except AttributeError:
        continue  # Skip if any element is missing

# Save and close workbook
workbook.close()
print("✅ Scraping complete! Data saved to 'bath_accessibility.xlsx'.")
#print(soup.prettify())


