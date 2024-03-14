import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.tree import Tree
from nltk import pos_tag, ne_chunk
stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

def tokenize(sentence):
    return word_tokenize(sentence)

def pos_tag_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    pos_tags = pos_tag(sentence_words)
    named_entities = ne_chunk(pos_tags) 
    entities = []
    for subtree in named_entities:
        if isinstance(subtree, Tree) and subtree.label() == 'GPE':
            entities.append(" ".join([word for word, _ in subtree]))

    return  entities

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, words):
    sentence_words = [stem(word) for word in tokenized_sentence]
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words:
            bag[idx] = 1
    return bag
