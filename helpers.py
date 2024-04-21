from functools import wraps
from flask import redirect, render_template, request, session
from werkzeug.security import generate_password_hash, check_password_hash

import re

def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/1.1.x/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/")
        return f(*args, **kwargs)
    return decorated_function

def is_valid_userName(username):
    username_regex = re.compile(r"^[a-zA-Z0-9]{4,}$")
    return bool(username_regex.match(username))

def is_valid_email(email):
    email_regex = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    return bool(email_regex.match(email))

def app():
    password_hash = generate_password_hash("JaboInteriors@2024")
    match = check_password_hash("scrypt:32768:8:1$bCvltLZtcMdyX6ak$726965031c6c6e2ea2d9c11e5cff6a2fa6fd2cebd7e4ac65e296c71e3aa428bcf51af95f669260f6fe95ac0730c6e17d8751e586de193110522a66d0014c98e8", "JaboInteriors@2024")
    print(f"Password hash for 'JaboInteriors@2024': {password_hash}")
    print(f"Check password hash: {match}")


app()