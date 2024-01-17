from flask import Flask, render_template, request, redirect, url_for, flash
from flask_cors import CORS, cross_origin
import json
import sqlite3
import threading


class DBclass:
    def __init__(self, path):
        self.path = path
        self.db = sqlite3.connect(self.path)
        self.cur = self.db.cursor()
    def execute(self, query):
        self.cur.execute(query)
        return self.cur.fetchall()
    def commit(self):
        self.db.commit()
    def close(self):
        self.db.close()


db = DBclass('student.db')

db_thread_local = threading.local()

def get_db():
    if not hasattr(db_thread_local, 'db'):
        db_thread_local.db = DBclass('student.db')
    return db_thread_local.db

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/app/student-entry', methods=['POST'])
def entry():
    data=request.json
    db=get_db()
    db.execute("INSERT INTO student (Roll_No, Name, Email, Phone, Degree, Gender, Branch) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(data['roll_no'],data['name'],data['email'],data['phone'],data['degree'],data['gender'],data['branch']))
    db.commit()
    return 'ok'

@app.route('/app/faculty-entry', methods=['POST'])
def entry1():
    data=request.json
    db=get_db()
    db.execute("INSERT INTO Faculty (Name, Email, Education, Designation, Research_Area, Research_Lab, Phone, Gender) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(data['Name'],data['Email'],data['Education'],data['Designation'],data['Research_Area'],data['Research_Lab'],data['Phone'],data['Gender']))
    db.commit()
    return 'ok'

@app.route('/app/student-list', methods=['GET'])
def list():
    db=get_db()
    data=db.execute("SELECT * FROM student")
    headers = [i[0] for i in db.cur.description]
    data = [dict(zip(headers, i)) for i in data]
    return json.dumps(data)

@app.route('/app/faculty-list', methods=['GET'])
def list1():
    db=get_db()
    data=db.execute("SELECT * FROM Faculty")
    headers = [i[0] for i in db.cur.description]
    data = [dict(zip(headers, i)) for i in data]
    return json.dumps(data)

@app.route('/app/student-search-name', methods=['GET', 'POST'])
def search_name():
    data=request.json
    db=get_db()
    data=db.execute("SELECT * FROM student WHERE Name LIKE '%{}%'".format(data['Name']))
    headers = [i[0] for i in db.cur.description]
    data = [dict(zip(headers, i)) for i in data]
    return json.dumps(data)

@app.route('/app/faculty-search-name', methods=['GET', 'POST'])
def search_name1():
    data=request.json
    db=get_db()
    data=db.execute("SELECT * FROM Faculty WHERE Name LIKE '%{}%'".format(data['Name']))
    headers = [i[0] for i in db.cur.description]
    data = [dict(zip(headers, i)) for i in data]
    return json.dumps(data)

@app.route('/app/student-delete', methods=['POST'])
def delete():
    data=request.json
    db=get_db()
    db.execute("DELETE FROM student WHERE Roll_No='{}'".format(data['roll_no']))
    db.commit()
    return 'ok'

@app.route('/app/faculty-delete', methods=['POST'])
def delete1():
    data=request.json
    db=get_db()
    db.execute("DELETE FROM Faculty WHERE Name='{}'".format(data['Name']))
    db.commit()
    return 'ok'

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)