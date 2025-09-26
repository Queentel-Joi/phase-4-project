from config import app, db
from models import User, Book, Review
from faker import Faker
import random

fake = Faker()

def seed_users():
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        users.append(user)
    return users

def seed_books():
    books = []
    for _ in range(10):
        book = Book(
            title=fake.sentence(nb_words=4),
            author=fake.name(),
            description=fake.text()
        )
        books.append(book)
    return books

def seed_reviews(users, books):
    reviews = []
    for _ in range(20):
        review = Review(
            rating=random.randint(1, 5),
            comment=fake.text(),
            user_id=random.choice(users).id,
            book_id=random.choice(books).id
        )
        reviews.append(review)
    return reviews

if __name__ == '__main__':
    with app.app_context():
        print("Seeding users...")
        users = seed_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding books...")
        books = seed_books()
        db.session.add_all(books)
        db.session.commit()

        print("Seeding reviews...")
        reviews = seed_reviews(users, books)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete!")