import json

def get_json_from_file(filename):
    with open(filename) as json_file:
        data = json.load(json_file)
        return data