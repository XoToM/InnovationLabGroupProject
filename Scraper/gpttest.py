import json

# Load JSON from file
with open("response12.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Extract relevant details
filtered_results = []
for place in data.get("places", []):
    filtered_results.append({
        # KEY INFORMATION (Main Details)
        "name": place.get("displayName", {}).get("text", "No Name"),
        "formattedAddress": place.get("formattedAddress", "No Address"),
        "nationalPhoneNumber": place.get("nationalPhoneNumber", "No Phone"),
        "rating": place.get("rating", "No Rating"),
        "userRatingCount": place.get("userRatingCount", "No User Ratings"),
        "googleMapsUri": place.get("googleMapsUri", "No Link"),
        "websiteUri": place.get("websiteUri", "No Website"),
        "priceLevel": place.get("priceLevel", "No Price Level"),
        "priceRange": place.get("priceRange", "No Price Range"),
        "businessStatus": place.get("businessStatus", "No Status"),

        # ADDITIONAL DETAILS (Services & Amenities)
        "regularOpeningHours": place.get("regularOpeningHours", {}).get("weekdayDescriptions", "No Hours"),
        "currentOpeningHours": place.get("currentOpeningHours", {}).get("weekdayDescriptions", "No Current Hours"),
        "servesBreakfast": place.get("servesBreakfast", False),
        "servesLunch": place.get("servesLunch", False),
        "servesDinner": place.get("servesDinner", False),
        "servesBrunch": place.get("servesBrunch", False),
        "servesDessert": place.get("servesDessert", False),
        "servesCoffee": place.get("servesCoffee", False),
        "servesCocktails": place.get("servesCocktails", False),
        "servesBeer": place.get("servesBeer", False),
        "servesWine": place.get("servesWine", False),
        "takeout": place.get("takeout", False),
        "delivery": place.get("delivery", False),
        "dineIn": place.get("dineIn", False),
        "outdoorSeating": place.get("outdoorSeating", False),
        "liveMusic": place.get("liveMusic", False),
        "allowsDogs": place.get("allowsDogs", False),
        "goodForChildren": place.get("goodForChildren", False),
        "goodForGroups": place.get("goodForGroups", False),
        "goodForWatchingSports": place.get("goodForWatchingSports", False),
        "restroom": place.get("restroom", False),
        "reservable": place.get("reservable", False),
        "curbsidePickup": place.get("curbsidePickup", False),
        "menuForChildren": place.get("menuForChildren", False),
        "paymentOptions": place.get("paymentOptions", []),
        "parkingOptions": place.get("parkingOptions", []),
        "accessibilityOptions": place.get("accessibilityOptions", {}),

        # 🔍 METADATA & EXTRA INFO
        
    })

# Print the clean output
print(json.dumps(filtered_results, indent=2))



#         "id": place.get("id", "No ID"),
#         "types": place.get("types", []),
#         "primaryType": place.get("primaryType", "No Primary Type"),
#         "primaryTypeDisplayName": place.get("primaryTypeDisplayName", "No Type Display Name"),
#         "shortFormattedAddress": place.get("shortFormattedAddress", "No Short Address"),
#         "addressComponents": place.get("addressComponents", []),
#         "plusCode": place.get("plusCode", {}),
#         "location": place.get("location", {}),
#         "viewport": place.get("viewport", {}),
#         "utcOffsetMinutes": place.get("utcOffsetMinutes", "No UTC Offset"),
#         "adrFormatAddress": place.get("adrFormatAddress", "No ADR Address"),
#         "iconMaskBaseUri": place.get("iconMaskBaseUri", "No Icon"),
#         "iconBackgroundColor": place.get("iconBackgroundColor", "No Color"),
#         "editorialSummary": place.get("editorialSummary", {}).get("text", "No Summary"),
#         "googleMapsLinks": place.get("googleMapsLinks", {}),
#         "addressDescriptor": place.get("addressDescriptor", "No Address Descriptor"),
#         "timeZone": place.get("timeZone", "No Time Zone"),
#         "reviews": place.get("reviews", []),
#         "photos": place.get("photos", [])
