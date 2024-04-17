from flask import Flask, redirect, g, render_template, request, session, jsonify, flash, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from helpers import login_required, is_valid_userName, is_valid_email
import sqlite3
import datetime
import os
import time

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
    images = []
    conn = get_db()
    db = conn.cursor()
    db.execute('SELECT * FROM images')
    images = db.fetchall()
    conn.close()
    if request.method == "GET":
        return render_template("admin-dashboard.html", images=images)
    
@app.route('/admin/upload', methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['image']
    category = request.form.get('category')

    # Save the file to a folder or process it in some way
    # For example, save it to a folder named "uploads"
    file.save('./static/uploads/' + file.filename)
    
    # Store file information and category in the database
    conn = get_db()
    db = conn.cursor()
    db.execute('INSERT INTO images (filename, filepath, category, uploaded_at) VALUES (?, ?, ?, ?)',
              (file.filename, '/static/uploads/' + file.filename, category, datetime.datetime.now()))


    conn.commit()
    conn.close()

    time.sleep(1)
    return redirect("/admin")


#   Delete images from gallery
@app.route('/admin/delete/<int:image_id>', methods=["POST", "DELETE"])
def delete_image(image_id):
    if request.method == "POST" and request.form.get('_method') == "DELETE":
        conn = get_db()
        db = conn.cursor()

        # Get the filepath of the image to be deleted
        db.execute('SELECT * FROM images WHERE id = ?', (image_id,))
        image = db.fetchone()
        if image:
            filepath = os.path.join('.', image['filepath'])
            if os.path.exists(filepath):
                os.remove(filepath)
            db.execute('DELETE FROM images WHERE id = ?', (image_id,))
            conn.commit()
            conn.close()
            return jsonify({'message': 'Image deleted successfully'}), 200
        else:
            return jsonify({'message': 'Image not found'}), 404
    else:
        return jsonify({'message': 'Method not allowed'}), 405



@app.route('/admin/images')
def get_images():
    conn = get_db()
    db = conn.cursor()
    db.execute('SELECT * FROM images')
    images = db.fetchall()
    conn.close()

    # Convert the images to a list of dictionaries
    images_list = []
    for image in images:
        images_list.append({
            'id': image['id'],
            'filename': image['filename'],
            'filepath': image['filepath'],
            'category': image['category'],
            'uploaded_at': image['uploaded_at']
        })

    return jsonify({'images': images_list})


#   Start the server
if __name__ == "__main__":
    app.run(debug=True)