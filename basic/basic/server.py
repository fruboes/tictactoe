import datetime

from flask import Flask, send_from_directory, jsonify

app = Flask(__name__) 
app.config.from_object(__name__)

@app.route('/')
def index():
    return send_from_directory("templates", "index.html")

@app.route('/<string:name>')
def static_files(name):
    return send_from_directory("templates", name)

@app.route('/hello')
def hello():
    result="Hey, I saw that! You clicked at {}".format(datetime.datetime.now())
    return jsonify(result=result)

