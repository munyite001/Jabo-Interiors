from flask import Flask, redirect, g, render_template, request, session, jsonify, flash, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from helpers import login_required, is_valid_userName, is_valid_email
import sqlite3
import datetime
import os

# Configure application
app = Flask(__name__)
DATABASE = "app.db"

app.secret_key = os.urandom(24)

# Configure the database
def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = make_dicts
        return db
    

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()

#   Row factory function
def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value) for idx, value in enumerate(row))


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route('/about', methods=["GET"])
def about():
    return render_template("about.html")

@app.route('/contact', methods=["GET"])
def contact():
    return render_template("contact.html")

@app.route('/portfolio', methods=["GET"])
def portfolio():
    return render_template("portfolio.html")

@app.route('/admin', methods=["GET", "POST"])
def admin():
    if request.method == "GET":
        return render_template("admin-dashboard.html")
    
@app.route('/admin/upload', methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['image']

    # Save the file to a folder or process it in some way
    # For example, save it to a folder named "uploads"
    file.save('./static/uploads/' + file.filename)


    return jsonify({'message': 'File uploaded successfully'}), 200

#   Start the server
if __name__ == "__main__":
    app.run(debug=True)