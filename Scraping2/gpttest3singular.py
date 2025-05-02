import json
import requests

# Load the single-place JSON
#with open("Bandook Indian Kitchen.json", "r", encoding="utf-8") as file:
#with open("Afternoon Tea At Apex City Of Bath Hotel.json", "r", encoding="utf-8") as file:
#with open("bath-pizza-co.json", "r", encoding="utf-8") as file:
#with open("Brasserie Beau Bath.json", "r", encoding="utf-8") as file:
#with open("Chew Valley Distillery.json", "r", encoding="utf-8") as file:
#with open("Corkage.json", "r", encoding="utf-8") as file:
#with open("Cote Brasserie Bath.json", "r", encoding="utf-8") as file:
#with open("eat a pitta.JSON", "r", encoding="utf-8") as file:
#with open("Flourish At Farleigh Road Kitchen.json", "r", encoding="utf-8") as file:
#with open("flourish-kitchen.json", "r", encoding="utf-8") as file:
#with open("Green Park Brasserie.JSON", "r", encoding="utf-8") as file:
#with open("leon-restaurant.json", "r", encoding="utf-8") as file:
#with open("Newton Farm Shop And Cafe.json", "r", encoding="utf-8") as file:
#with open("Olio Restaurant and Terrace.json", "r", encoding="utf-8") as file:
#with open("Olive Tree Restaurant.json", "r", encoding="utf-8") as file:
#with open("Socialize At The Gainsborough Bath Spa.json", "r", encoding="utf-8") as file:
#with open("The Bath Brew House.json", "r", encoding="utf-8") as file:
#with open("The Bath Cider House.json", "r", encoding="utf-8") as file:
#with open("The Bath Townhouse Coppa Club.json", "r", encoding="utf-8") as file:
#with open("The Beefy Boys.json", "r", encoding="utf-8") as file:
#with open("The Clubhouse Bar At Bowood Hotel Spa And Golf Resort.json", "r", encoding="utf-8") as file:
#with open("The Langford.json", "r", encoding="utf-8") as file:
#with open("The Stable Bath.json", "r", encoding="utf-8") as file:
#with open("the-elder-restaurant.json", "r", encoding="utf-8") as file:
#with open("the-pump-room-restaurant.json", "r", encoding="utf-8") as file:
#with open("Woodchester Valley Vineyard.json", "r", encoding="utf-8") as file:
with open("The Cork.json", "r", encoding="utf-8") as file:
    data = json.load(file)

url = "https://katestudent.pythonanywhere.com:443/places"
headers = {"Content-Type": "application/json"}

def extract_place(place):
    return {
        "name": place.get("displayName", {}).get("text", ""),
        "formattedAddress": place.get("formattedAddress", ""),
        "photo": place.get("photos", [{}])[0].get("googleMapsUri", None),
        "wheelchairAccessibleParking": int(place.get("accessibilityOptions", {}).get("wheelchairAccessibleParking", False)),
        "wheelchairAccessibleEntrance": int(place.get("accessibilityOptions", {}).get("wheelchairAccessibleEntrance", False)),
        "wheelchairAccessibleRestroom": int(place.get("accessibilityOptions", {}).get("wheelchairAccessibleRestroom", False)),
        "wheelchairAccessDescription": None,
        "inductionLoop": 0,
        "inductionLoopDescription": "",
        "description": place.get("editorialSummary", {}).get("text", None),
        "rating": round(place.get("rating", 0)) if "rating" in place else None,
        "priceLevel": place.get("priceLevel", None),
        "nationalPhoneNumber": place.get("nationalPhoneNumber", None),
        "latitude": place.get("location", {}).get("latitude", None),
        "longitude": place.get("location", {}).get("longitude", None),
        "regularOpeningHours": "; ".join(place.get("regularOpeningHours", {}).get("weekdayDescriptions", [])),
        "delivery": int(place.get("delivery", False)),
        "takeout": int(place.get("takeout", False)),
        "dineIn": int(place.get("dineIn", False)),
        "outdoorSeating": int(place.get("outdoorSeating", False)),
        "liveMusic": int(place.get("liveMusic", False)),
        "allowsDogs": int(place.get("allowsDogs", False)),
        "goodForChildren": int(place.get("goodForChildren", False)),
        "goodForGroups": int(place.get("goodForGroups", False)),
        "goodForWatchingSports": int(place.get("goodForWatchingSports", False)),
        "restroom": int(place.get("restroom", False)),
        "reservable": int(place.get("reservable", False)),
        "curbsidePickup": 0,
        "menuForChildren": int(place.get("menuForChildren", False)),
        "acceptsCreditCards": int(place.get("paymentOptions", {}).get("acceptsCreditCards", False)),
        "acceptsDebitCards": int(place.get("paymentOptions", {}).get("acceptsDebitCards", False)),
        "acceptsCashOnly": int(place.get("paymentOptions", {}).get("acceptsCashOnly", False)),
        "acceptsNfc": int(place.get("paymentOptions", {}).get("acceptsNfc", False)),
    }

# Use the first and only place in the list
try:
    place = data["places"][0]
    place_payload = extract_place(place)
    response = requests.post(url, json=place_payload, headers=headers)

    if response.status_code == 201:
        print(f"Successfully added {place_payload['name']}")
    else:
        print(f"Failed to add {place_payload['name']}. Status code: {response.status_code}")
        print(f"Response: {response.text}")

except Exception as e:
    print(f"Error processing place: {str(e)}")

print("Finished sending the place.")
