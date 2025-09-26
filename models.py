from config import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    reviews = db.relationship('Review', backref='user', lazy=True)

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    reviews = db.relationship('Review', backref='book', lazy=True)

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
    reviews = fields.Nested('ReviewSchema', many=True, exclude=('user',))

class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
    reviews = fields.Nested('ReviewSchema', many=True, exclude=('book',))

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
    user = fields.Nested('UserSchema', exclude=('reviews',))
    book = fields.Nested('BookSchema', exclude=('reviews',))