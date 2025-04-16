import json
import requests

# Load the original checkpoint JSON
with open("after take 2.json", "r", encoding="utf-8") as file:
    data = json.load(file)

url = "https://katestudent.pythonanywhere.com:443/places"
headers = {"Content-Type": "application/json"}

for place in data["places"]:
    try:
        response = requests.post(url, json=place, headers=headers)

        if response.status_code in [200, 201]:
            print(f"Successfully restored {place['name']}")
        else:
            print(f"Failed to restore {place['name']}. Status code: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error restoring {place.get('name', 'Unknown')}: {str(e)}")

print("Finished restoring all places.")
