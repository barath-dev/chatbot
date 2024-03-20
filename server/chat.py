import random
import json
import torch
import requests
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize, pos_tag_sentence

def get_response(user_input):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    with open('intents.json', 'r') as json_data:
        intents = json.load(json_data)

    FILE = "data.pth"
    data = torch.load(FILE)

    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    all_words = data['all_words']
    tags = data['tags']
    model_state = data["model_state"]

    model = NeuralNet(input_size, hidden_size, output_size).to(device)
    model.load_state_dict(model_state)
    model.eval()

    bot_name = "Sam"
    
    sentence = tokenize(user_input)
    tagged_sentence = pos_tag_sentence(user_input)
    print(tagged_sentence)

    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]
    if(tag=="temperature"):
        return get_temperature(tagged_sentence[0])
    if(tag=="weather"):
        return get_weather_response(tagged_sentence[0])

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return({
                    "type" : "text",
                    "message" : random.choice(intent['responses'])
                })
    else:
        return({
            "type" : "text",
            "message" : "I do not understand..."
        })


def get_weather_response(location):
    URL = "https://api.openweathermap.org/data/2.5/weather"+"?q="+location+"&appid=20cca01123a6d083758b8fabc4eb9089"
    response = requests.get(URL)
    data = response.json()
    weather = data['weather'][0]['description']
    return({
        "type":"weather",
        "message" : f"The weather in {location} is",
        "weather" : weather,
        "icon" : "https://openweathermap.org/img/wn/"+data['weather'][0]['icon']+".png"
    })

def get_temperature(location):
    URL = "https://api.openweathermap.org/data/2.5/weather"+"?q="+location+"&appid=20cca01123a6d083758b8fabc4eb9089"
    response = requests.get(URL)
    data = response.json()
    temperature = data['main']['temp']
    return ({
        "type":"temperature",
        "message" : f"The temperature in {location} is",
        "temperature" : round(temperature-273.15,2)
    })
