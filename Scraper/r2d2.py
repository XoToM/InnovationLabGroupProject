import requests

places = [
    {
        "idPlace": 9,
        "name": "Newton Park",
        "formattedAddress": "Angel 1, London, UK",
        "photo": "https://example.com/newton-park.jpg",
        "wheelchairAccessibleParking": 1,
        "wheelchairAccessibleEntrance": 1,
        "wheelchairAccessibleRestroom": 0,
        "wheelchairAccessDescription": "Wheelchair ramp at main entrance",
        "inductionLoop": 0,
        "inductionLoopDescription": "",
        "description": "A scenic park with walking trails and picnic areas",
        "rating": 2,
        "priceLevel": 0,
        "nationalPhoneNumber": "+442012345678",
        "latitude": 52.7,
        "longitude": 47.2,
        "regularOpeningHours": "Mon-Sun 08:00-18:00",
        "delivery": 0,
        "takeout": 0,
        "dineIn": 0,
        "outdoorSeating": 1,
        "liveMusic": 0,
        "allowsDogs": 1,
        "goodForChildren": 1,
        "goodForGroups": 1,
        "goodForWatchingSports": 0,
        "restroom": 1,
        "reservable": 0,
        "curbsidePickup": 0,
        "menuForChildren": 0,
        "acceptsCreditCards": 0,
        "acceptsDebitCards": 0,
        "acceptsCashOnly": 1,
        "acceptsNfc": 0
    },
]

url = "https://katestudent.pythonanywhere.com:443/places"

headers = {
    "Content-Type": "application/json"
}

for place in places:
    try:
        response = requests.post(url, json=place, headers=headers)
        
        if response.status_code == 201:
            print(f"Successfully added {place['name']}")
        else:
            print(f"Failed to add {place['name']}. Status code: {response.status_code}")
            print(f"Response: {response.text}")
        
        #time.sleep(0.1)
        
    except requests.exceptions.RequestException as e:
        print(f"Error sending {place['name']}: {str(e)}")

print("Finished sending all places")