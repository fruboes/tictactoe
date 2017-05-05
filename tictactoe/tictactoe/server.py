import os
from random import shuffle

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
    marked_fields = {}
    for k, v in request.args.items():
        field_no = int(k.split("_")[1])
        val = int(v)
        print k, v, val
        marked_fields[field_no] = val

    remaining_fields = list(set(xrange(9))-set(marked_fields.keys()))
    shuffle(remaining_fields)
    if remaining_fields:
        ret = remaining_fields[0]
    else:
        ret = -1

    return jsonify(result=ret)

