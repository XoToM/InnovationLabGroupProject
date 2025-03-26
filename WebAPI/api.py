from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
import mysql.connector
from mysql.connector import Error
import json

app = Flask(__name__)
api = Api(app)

# Read the config from JSON file
with open('config.json', 'r') as config_file:
    config = json.load(config_file)
    db_config = config['db_config']

# Function to create database connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Request parser for POST requests
place_parser = reqparse.RequestParser()
place_parser.add_argument('name', type=str, required=True, help='Name cannot be blank')
place_parser.add_argument('address', type=str, required=True, help='Address cannot be blank')
place_parser.add_argument('imageLink', type=str, required=False)
place_parser.add_argument('wheelchairAccess', type=int, required=False)
place_parser.add_argument('wheelchairAccessDescription', type=str, required=False)
place_parser.add_argument('inductionLoop', type=int, required=False)
place_parser.add_argument('inductionLoopDescription', type=str, required=False)
place_parser.add_argument('description', type=str, required=False)
place_parser.add_argument('customerRating', type=int, required=False)
place_parser.add_argument('priceRange', type=int, required=False)
place_parser.add_argument('contactNumber', type=str, required=False)
place_parser.add_argument('latitude', type=float, required=True, help='Latitude cannot be blank')
place_parser.add_argument('longitude', type=float, required=True, help='Longitude cannot be blank')

# Place Resource
class PlaceResource(Resource):
    def get(self, idPlace=None):
        connection = get_db_connection()
        if not connection:
            abort(500, message="Database connection failed")
        
        try:
            cursor = connection.cursor(dictionary=True)
            if idPlace is None:
                cursor.execute("SELECT * FROM Place")
                places = cursor.fetchall()
                return {"places":places}, 200
            else:
                cursor.execute("SELECT * FROM Place WHERE idPlace = %s", (idPlace,)) #check cyber security
                place = cursor.fetchone()
            
                if not place:
                    abort(404, message=f"Place with id {idPlace} not found")
                
                return place, 200
        except Error as e:
            abort(500, message=f"Database error: {str(e)}")
        finally:
            cursor.close()
            connection.close()

    def post(self):
        args = place_parser.parse_args()
        connection = get_db_connection()
        if not connection:
            abort(500, message="Database connection failed")
        
        try:
            cursor = connection.cursor()
            cursor.execute(
                "INSERT INTO Place (name, address, imageLink, wheelchairAccess, wheelchairAccessDescription, "
                + "inductionLoop, inductionLoopDescription, description, customerRating, priceRange, "
                + "contactNumber, latitude, longitude) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (args['name'], args['address'], args['imageLink'], args['wheelchairAccess'], args['wheelchairAccessDescription'], 
                 args['inductionLoop'], args['inductionLoopDescription'], args['description'], args['customerRating'], args['priceRange'], 
                 args['contactNumber'], args['latitude'], args['longitude'],)
            )

            connection.commit()
            idPlace = cursor.lastrowid
            return {'id': idPlace, 'name': args['name']}, 201
        except Error as e:
            abort(500, message=f"Database error: {str(e)}")
        finally:
            cursor.close()
            connection.close()

    def delete(self, idPlace):
        connection = get_db_connection()
        if not connection:
            abort(500, message="Database connection failed")
        
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM Place WHERE idPlace = %s", (idPlace,))
            if not cursor.fetchone():
                abort(404, message=f"Place with id {idPlace} not found")
            
            cursor.execute("DELETE FROM Place WHERE idPlace = %s", (idPlace,))
            connection.commit()
            return {'message': f'Place {idPlace} deleted'}, 200
        except Error as e:
            abort(500, message=f"Database error: {str(e)}")
        finally:
            cursor.close()
            connection.close()

# Add resource to API
api.add_resource(PlaceResource, '/places', '/places/<int:idPlace>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port = 5000)