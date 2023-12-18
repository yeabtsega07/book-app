from fastapi import FastAPI
from model.book import Book
from repository.book_repository import BookRepository
from fastapi.middleware.cors import CORSMiddleware
from seed.seed import database_seed

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


repo = BookRepository()
database_seed()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/books/")
def read_all_books():
    return repo.get_all()

@app.get("/books/{book_id}")
def read_book(book_id: str):
    return repo.get(book_id)

@app.post("/books/")
def create_book(book: Book):
    return repo.create(book)

@app.put("/books/{book_id}/{status}")
def update_book(book_id: str, status: str):
    return repo.update(book_id, status)

@app.delete("/books/{book_id}")
def delete_book(book_id: str):
    return repo.delete(book_id)