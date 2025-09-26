from flask import request, session
from config import app, db, api
from models import User, Book, Review, UserSchema, BookSchema, ReviewSchema
from flask_restful import Resource

user_schema = UserSchema()
users_schema = UserSchema(many=True)
book_schema = BookSchema()
books_schema = BookSchema(many=True)
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

class Books(Resource):
    def get(self):
        books = Book.query.all()
        return books_schema.dump(books), 200

    def post(self):
        data = request.get_json()
        book = Book(
            title=data['title'],
            author=data['author'],
            description=data.get('description', '')
        )
        db.session.add(book)
        db.session.commit()
        return book_schema.dump(book), 201

class Users(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200

    def post(self):
        data = request.get_json()
        user = User(
            username=data['username'],
            email=data['email']
        )
        db.session.add(user)
        db.session.commit()
        return user_schema.dump(user), 201

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        return reviews_schema.dump(reviews), 200

    def post(self):
        data = request.get_json()
        review = Review(
            rating=data['rating'],
            comment=data.get('comment', ''),
            user_id=data['user_id'],
            book_id=data['book_id']
        )
        db.session.add(review)
        db.session.commit()
        return review_schema.dump(review), 201

api.add_resource(Books, '/books')
api.add_resource(Users, '/users')
api.add_resource(Reviews, '/reviews')

@app.route('/')
def home():
    return {'message': 'Book Club API'}, 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)
