import random
import requests
import unittest
import json

# Define a Book class for testing
class Book:
    def __init__(self, title):
        self.title = title
        self.status = "to-read"

# Define a test class for the API
class APITest(unittest.TestCase):
    
    def setUp(self) -> None:
        self.url = "http://127.0.0.1:8000/books"

    # Test the GET all books endpoint
    def test_get_all_books(self):
        
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 200)

        res = response.json()
        self.assertIn("title", res[0])

    # Test the POST new book endpoint
    def test_post_book(self):
        # Define a unique book title
        unique_title = "Intro to DSA" + str(random.randint(1, 1000))

        data = {"title": unique_title}
        data = json.dumps(data)

        response = requests.post(self.url, data=data)
        self.assertEqual(response.status_code, 200)

        res = response.json()

        self.assertEqual(res['title'], unique_title)

# Run the tests
if __name__ == "__main__":
    unittest.main() # run all tests