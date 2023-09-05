from flask import Flask
from flask import jsonify
from flask import request
from flask import Response
import json
from BookModel import *
from settings import *
from flask_cors import cross_origin

# GET /books


@app.route('/books')
@cross_origin()
def get_books():
    return jsonify(Book.get_all_books())


@app.route('/books/<int:isbn>')
@cross_origin()
def get_book_by_isbn(isbn):
    return jsonify(Book.get_book(isbn))


def validBookObject(bookObject):
    if ("name" in bookObject and "price" in bookObject and "isbn" in bookObject):
        return True
    else:
        return False


@app.route('/books', methods=['POST'])
@cross_origin()
def add_book():
    request_data = request.get_json()
    if (validBookObject(request_data)):
        Book.add_book(request_data['name'],
                      request_data['price'], request_data['isbn'])
        response = Response("", 201, mimetype='application/json')
        response.headers['Location'] = "/books/"+str(request_data['isbn'])
        return response
    else:
        invalidBookObjectErrorMsg = {
            "error": "Invalid book was passed in request",
            "helpString": "A book should have name, price and isbn"
        }
        response = Response(json.dumps(invalidBookObjectErrorMsg),
                            status=400, mimetype='application/json')
        return response


@app.route('/books/<int:isbn>', methods=['PUT'])
@cross_origin()
def replace_book(isbn):
    request_data = request.get_json()
    Book.replace_book(request_data['name'], request_data['price'], isbn)
    response = Response("", status=204)
    return response


@app.route('/books/<int:isbn>', methods=['PATCH'])
@cross_origin()
def update_book(isbn):
    request_data = request.get_json()
    if ("name" in request_data):
        Book.update_book_name(isbn, request_data['name'])
    if ("price" in request_data):
        Book.update_book_price(isbn, request_data['price'])
    response = Response("", status=204)
    response.headers['Location'] = "/books/"+str(isbn)
    return response


@app.route('/books/<int:isbn>', methods=['DELETE'])
@cross_origin()
def delete_book(isbn):
    if (Book.delete_book(isbn)):
        return Response("", status=200, mimetype="application/json")
    else:
        errorMessage = {"error": "The book with isbn " +
                        str(isbn)+" was not found"}
        return Response(json.dumps(errorMessage), status=404, mimetype="application/json")


app.run(port=5001)


# NON DB VERSION OF FILE

# from flask import Flask;
# from flask import jsonify;
# from flask import request;
# from flask import Response;
# import json;
# from BookModel import *;
# from settings import *;

# books = [
#     {
#         'name': 'book 1',
#         'price': 7.99,
#         'isbn': 12346579
#     },
#     {
#         'name': 'book 2',
#         'price': 6.99,
#         'isbn': 12346578
#     },
# ]

# #GET /books
# @app.route('/books')
# def get_books():
#     return jsonify({'books': books})

# @app.route('/books/<int:isbn>')
# def get_book_by_isbn(isbn):
#     return_value = {}
#     for book in books:
#         if book["isbn"] == isbn:
#             return_value = {
#                 'name': book["name"],
#                 'price': book["price"]
#             }
#     return jsonify(return_value)

# def validBookObject(bookObject):
#     if ( "name" in bookObject and "price" in bookObject and "isbn" in bookObject):
#         return True
#     else:
#         return False

# @app.route('/books', methods=['POST'])
# def add_book():
#     request_data = request.get_json()
#     if(validBookObject(request_data)):
#         new_book = {
#             "name": request_data["name"],
#             "price": request_data["price"],
#             "isbn": request_data["isbn"]
#         }
#         books.insert(0, new_book)
#         response = Response("", 201, mimetype='application/json')
#         response.headers['Location'] = "/books/"+str(new_book['isbn'])
#         return response
#     else:
#         invalidBookObjectErrorMsg = {
#             "error": "Invalid book was passed in request",
#             "helpString": "A book should have name, price and isbn"
#         }
#         response = Response(json.dumps(invalidBookObjectErrorMsg), status=400, mimetype='application/json')
#         return response;


# @app.route('/books/<int:isbn>', methods=['PUT'])
# def replace_book(isbn):
#     request_data = request.get_json()
#     new_book = {
#         'name': request_data['name'],
#         'price': request_data['price'],
#         'isbn': isbn
#     }
#     i = 0
#     for book in books:
#         currentIsbn = book['isbn']
#         if(currentIsbn == isbn):
#             books[i] = new_book
#         i += 1
#     response = Response("", status=204)
#     return response

# @app.route('/books/<int:isbn>', methods=['PATCH'])
# def update_book(isbn):
#     request_data = request.get_json()
#     updated_book = {}
#     if("name" in request_data):
#         update_book['name'] = request_data['name']
#     if("price" in request_data):
#         update_book['price'] = request_data['price']
#     for book in books:
#         if book['isbn'] == isbn:
#             book.update(updated_book)
#     response = Response("", status=204)
#     response.headers['Location'] = "/books/"+str(isbn)
#     return response

# @app.route('/books/<int:isbn>', methods=['DELETE'])
# def delete_book(isbn):
#     i = 0
#     for book in books:
#         if(book['isbn'] == isbn):
#             books.pop(i)
#             response = Response("", mimetype="application/json")
#             return response
#         i+=1
#     invalidBookErrorObjectMsg = {
#         "error": "Book with the iSBN number that was sent could not be found"
#     }
#     response = Response(jsonify(invalidBookErrorObjectMsg), status=404, mimetype="application/json")
#     return response


# app.run(port=5001)
