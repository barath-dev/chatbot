from fastapi import FastAPI, Request
from chat import get_response
from fastapi.middleware.cors import CORSMiddleware
origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
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
    message = data['message']
    result = get_response(message)
    return {"response": result}