## My first python application

### Creating basic python app
- Create app.py
- Create python env with: python3 -m venv env-name
- Activate env with: source dev-env/bin/activate
- Run application with: python3 app.py
  This will run the application on http://127.0.0.1:5001

### Installing libraries on env
- To see current installed libraries: pip3 freeze
- To install libraries: pip3 install -U Flask

  Libraries on pip freeze:
    aniso8601==9.0.1
    blinker==1.6.2
    certifi==2023.7.22
    click==8.1.7
    Flask==2.3.3
    Flask-Cors==4.0.0
    Flask-RESTful==0.3.10
    greenlet==2.0.2
    itsdangerous==2.1.2
    Jinja2==3.1.2
    MarkupSafe==2.1.3
    Pygments @ file:///private/tmp/pygments-20230806-6212-1f05eiq/Pygments-2.16.1
    pytz==2023.3
    six==1.16.0
    SQLAlchemy==2.0.20
    typing_extensions==4.7.1
    Werkzeug==2.3.7

  ### Adding a SQLAlchemy database

  - pip3 install flask-sqlalchemy
  - python3
    - from BookModel import app , db
    - db.createAll() // app.app_context().push() >>> db.create_all()
    - exit()
  - To test the database
    - from BookModel import *
    - Book.add_book("book name", 1.99, 123455)
    
  ### In order to do some fronten dev we should enable cors
  - Add to settings.py: app.config['CORS_HEADERS'] = 'Content-Type'
  - app.py --> from flask_cors import cross_origin and @cross_origin()
  
  ### Run app with 
  - python3 app.py
  - Open http://127.0.0.1:5001
