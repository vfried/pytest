from flask import Flask
import os
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

file_path = os.path.abspath(os.getcwd())+"/database.db"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

# To create db file in project:
# from BookModel import app,db
# app.app_context().push()
# db.create_all()
# exit()