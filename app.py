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
    conn = get_db()
    db = conn.cursor()
    db.execute('SELECT * FROM images')
    images = db.fetchall()
    db.execute(' SELECT * FROM messages')
    messages = db.fetchall()
    sorted_messages = sorted(messages, key=lambda x: datetime.datetime.strptime(x['sent_at'], '%Y-%m-%d %H:%M:%S.%f'), reverse=True)

    conn.close()

    formatted_messages = []
    formatted_images = []

    for image in images:
        name = image['filename'][0:6]
        formatted_name = f"{name}..."
        formatted_images.append({**image, 'filename': formatted_name})
        

    for message in sorted_messages:
        sent_at = datetime.datetime.strptime(message['sent_at'], '%Y-%m-%d %H:%M:%S.%f')
        formatted_date = sent_at.strftime('%B %d, %Y %I:%M %p')
        formatted_messages.append({
            'sender_name': message['sender_name'],
            'sender_email': message['sender_email'],
            'message_body': message['message_body'],
            'sent_at': formatted_date
        })


    if request.method == "GET":
        return render_template("admin-dashboard.html", images=formatted_images, messages=formatted_messages)
    
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

    return jsonify({'message': 'File uploaded successfully'}), 200


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
            return jsonify({'message': 'Image deleted successfully'})
        else:
            return jsonify({'message': 'Image not found'})
    else:
        return jsonify({'message': 'Method not allowed'})



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


@app.route("/messages", methods=["POST"])
def messages():

    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")
    date = datetime.datetime.now()
    if not name or not email or not message:
        flash("All fields Must be filled")

    #   Connect to the database
    conn = get_db()
    db = conn.cursor()

    db.execute("INSERT INTO messages (sender_name, sender_email, message_body, sent_at) VALUES (?, ?, ?, ?)", 
                (name, email, message, date))

    conn.commit()
    conn.close()

    return jsonify({'message': 'Message successfully Sent'})
        


#   Start the server
if __name__ == "__main__":
    app.run(debug=True)