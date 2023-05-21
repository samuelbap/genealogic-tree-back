import requests
import json

# Open the JSON file and load it into a Python dictionary


# Specify the URL of the API endpoint
url = 'http://localhost:3001/api/documents/new-full'

# Make a POST request to the API
with open('1.json', 'r') as f:
    data = json.load(f)
    response = requests.post(url, json=data)

# Print the response
print('Response Code:', response.status_code)
print('Response Content:', response.text)
