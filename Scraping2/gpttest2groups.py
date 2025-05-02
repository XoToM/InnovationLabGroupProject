import json
import requests


with open("response18.json", "r", encoding="utf-8") as file:

    data = json.load(file)
    print("Loaded JSON successfully. Keys:", list(data.keys()))
     
url = "https://katestudent.pythonanywhere.com:443/places"
headers = {"Content-Type": "application/json"}

def extract_place(place):
    return {
        "name": place.get("displayName", {}).get("text", ""),
        "formattedAddress": place.get("formattedAddress", ""),
        "photo": place.get("photos", [{}])[0].get("googleMapsUri", None),
        "wheelchairAccessibleParking": int(place.get("accessibilityOptions", {}).get("wheelchairAccessibleParking", False)),
        "wheelchairAccessibleEntrance": int(place.get("accessibilityOptions", {}).get("wheelchairAccessibleEntrance", False)),
        "wheelchairAccessibleRestroom": int(place.get("restroom", False)),  # assumed this implies accessible restroom
        "wheelchairAccessDescription": None,  # no such description found in file
        "inductionLoop": 0,  # not present in JSON
        "inductionLoopDescription": "",  # not present in JSON
        "description": place.get("editorialSummary", {}).get("text", None),
        "rating": round(place.get("rating", 0)) if "rating" in place else None,
        "priceLevel": place.get("priceLevel", None),  # e.g., "PRICE_LEVEL_MODERATE"
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
        "curbsidePickup": 0,  # not present in JSON
        "menuForChildren": int(place.get("menuForChildren", False)),
        "acceptsCreditCards": int(place.get("paymentOptions", {}).get("acceptsCreditCards", False)),
        "acceptsDebitCards": int(place.get("paymentOptions", {}).get("acceptsDebitCards", False)),
        "acceptsCashOnly": int(place.get("paymentOptions", {}).get("acceptsCashOnly", False)),
        "acceptsNfc": int(place.get("paymentOptions", {}).get("acceptsNfc", False)),
    }

for place in data["places"]:
    try:
        place_payload = extract_place(place)
        response = requests.post(url, json=place_payload, headers=headers)
        
        if response.status_code == 201:
            print(f"Successfully added {place_payload['name']}")
        else:
            print(f"Failed to add {place_payload['name']}. Status code: {response.status_code}")
            print(f"Response: {response.text}")
    
    except Exception as e:
        print(f"Error processing place: {place.get('name', 'Unknown')}, error: {str(e)}")

print("Finished sending all places.")
