import nltk
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, ne_chunk
from nltk.tokenize import word_tokenize
from nltk.tree import Tree
import numpy as np
import random
import pickle
import json
import requests
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

from tensorflow.keras.models import load_model

lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('model.keras')

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]

    # Perform Part-of-Speech tagging and Named Entity Recognition
    pos_tags = pos_tag(sentence_words)
    named_entities = ne_chunk(pos_tags)

    # Extract named entities (locations) from the tree
    entities = []
    for subtree in named_entities:
        if isinstance(subtree, Tree) and subtree.label() == 'GPE':
            entities.append(" ".join([word for word, _ in subtree]))

    return sentence_words, entities

def bag_of_words(sentence):
    sentence_words, _ = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents_json, entities):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    if tag == 'weather' and entities:
        location = entities[0]  
        weather_response = get_weather_response(location)
        return weather_response
    if tag == 'temperature' and entities:
        location = entities[0]
        temperature_response = get_temperature(location)
        return temperature_response


    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break

    return(
        {
            "type":"text",
            "message" : result
        }
    )

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
        "temperature" : (temperature-273.15)
    })

def chatbot(message):
    sentence_words, entities = clean_up_sentence(message)
    ints = predict_class(message)
    res = get_response(ints, intents, entities)
    return (res)
print(chatbot("temperature in Phagwara"))
