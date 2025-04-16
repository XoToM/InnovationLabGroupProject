import requests
from bs4 import BeautifulSoup
import json

def scrape_facilities(urls):
    # Define the specific facilities we want
    desired_facilities = [
        "Accessible to Wheelchair Users",
        "Assistance Dogs",
        "Guide dogs permitted",
        "Children's menu",
        "Highchair",
        "Accept coach parties",
        "Groups accepted",
        "Non smoking areas",
        "Parking Off Site"
    ]

    
    
    # Initialize results dictionary for each URL
    results = {url: {facility: "N/A" for facility in desired_facilities} for url in urls}
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    
    for url in urls:
        try:
            # Send a GET request to the website
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error if request fails
            
            # Parse the HTML content
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all li elements and check for desired facilities
            li_elements = soup.find_all('li')
            for li in li_elements:
                text = li.get_text(strip=True)
                if text in desired_facilities:
                    results[url][text] = "Yes"
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
    
    return results

def main():
    # Example list of URLs (add more as needed)
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
    
    print(">>> scrape_facilities(urls)")
    facilities_data = scrape_facilities(urls)
    
   # for url, facilities in facilities_data.items():
   #     print(f"\nFacilities for {url}:")
   #     for facility, status in facilities.items():
   #         print(f"- {facility}: {status}")


# Convert dictionary to JSON format with indentation
    json_output = json.dumps(facilities_data, indent=4)

    # Print or save to a file
    print(json_output)

# Optionally, save to a file
    with open("facilities_data.json", "w") as json_file:
        json_file.write(json_output)
 
        
if __name__ == "__main__":
    main()