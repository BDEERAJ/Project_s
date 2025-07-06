from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
main = Flask(__name__)
main.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
main.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(main)
CORS(main)
class Value(db.Model):  
    id = db.Column(db.Integer, primary_key=True)  
    prime = db.Column(db.Integer)
    non_prime = db.Column(db.Integer)

with main.app_context():
    db.create_all()

def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

@main.route('/num', methods=['POST'])
def numSetter():
    data = request.get_json()
    for val in data['data']:
        val=int(val)
        if is_prime(val):
            row = Value(prime=val, non_prime=0)
        else:
            row = Value(prime=0, non_prime=val)
        db.session.add(row)
    db.session.commit()
    return jsonify({"message": [val for val in data['data'] if is_prime(val)]}), 201

if __name__ == '__main__':
    main.run(debug=True)
