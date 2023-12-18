import sqlite3

def database_seed():
    db = sqlite3.connect("database.db")
    cursor = db.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, status TEXT)")

    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()

    if len(books) == 0:
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("Introduction to Algorithms", "to-read"))
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("Clean Code", "in-progress"))
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("Design Patterns: Elements of Reusable Object-Oriented Software", "completed"))
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("You Don't Know JS", "to-read"))
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("The Pragmatic Programmer", "in-progress"))

    db.commit()
    db.close()