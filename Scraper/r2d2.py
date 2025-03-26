import requests

places = [
    {
        "name": "House",
        "address": "Day 5",
        "imageLink": "",
        "wheelchairAccess": 0,
        "wheelchairAccessDescription": "",
        "inductionLoop": 0,
        "inductionLoopDescription": "",
        "description": "",
        "customerRating": 2,
        "priceRange": 3,
        "contactNumber": "",
        "latitude": 52.7,
        "longitude": 47.2
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