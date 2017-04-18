import os
from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, send_from_directory, jsonify

app = Flask(__name__) # create the application instance :)
app.config.from_object(__name__)

@app.route('/')
def index():
    return send_from_directory("templates", "index.html")

@app.route('/<string:name>')
def static_files(name):
    print "XXX", name
    return send_from_directory("templates", name)

@app.route('/next_move')
def next_move():
    for k, v in request.args.items():
        val = int(v)
        print k, v, val

    return jsonify(result=42)

