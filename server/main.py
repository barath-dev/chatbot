from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import chatbot
origins = [
        "http://localhost:5173"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    print(request)
    message = data['message']
    result = chatbot(message)
    return {"response": result}