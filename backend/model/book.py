from dataclasses import dataclass

@dataclass
class Book:
    title: str
    status: str = "to-read"