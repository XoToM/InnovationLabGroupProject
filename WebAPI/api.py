from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_cors import CORS, cross_origin
import mysql.connector
from mysql.connector import Error
import json
import os

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, 'config.json')

# Read the config from JSON file
with open(CONFIG_PATH, 'r') as config_file:
    config = json.load(config_file)
    db_config = config['db_config']

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def create_parser(required_fields=False):
    parser = reqparse.RequestParser()
    fields = [
        ('name', str, 'Name cannot be blank'),
        ('formattedAddress', str, 'Formatted address cannot be blank'),
        ('photo', str, None),
        ('wheelchairAccessibleParking', int, None),
        ('wheelchairAccessibleEntrance', int, None),
        ('wheelchairAccessibleRestroom', int, None),
        ('wheelchairAccessDescription', str, None),
        ('inductionLoop', int, None),
        ('inductionLoopDescription', str, None),
        ('description', str, None),
        ('rating', int, None),
        ('priceLevel', int, None),
        ('nationalPhoneNumber', str, None),
        ('latitude', float, 'Latitude cannot be blank'),
        ('longitude', float, 'Longitude cannot be blank'),
        ('regularOpeningHours', str, None),
        ('delivery', int, None),
        ('takeout', int, None),
        ('dineIn', int, None),
        ('outdoorSeating', int, None),
        ('liveMusic', int, None),
        ('allowsDogs', int, None),
        ('goodForChildren', int, None),
        ('goodForGroups', int, None),
        ('goodForWatchingSports', int, None),
        ('restroom', int, None),
        ('reservable', int, None),
        ('curbsidePickup', int, None),
        ('menuForChildren', int, None),
        ('acceptsCreditCards', int, None),
        ('acceptsDebitCards', int, None),
        ('acceptsCashOnly', int, None),
        ('acceptsNfc', int, None),
    ]

    for field_name, field_type, help_text in fields:
        #for POST name, formattedAddress, latitude, and longitude should be required
        is_required = required_fields and field_name in ['name', 'formattedAddress', 'latitude', 'longitude']
        parser.add_argument(
            field_name,
            type=field_type,
            required=is_required,
            help=help_text if is_required else None
        )
    
    return parser

place_parser = create_parser(required_fields=True)  # For POST requests
patch_parser = create_parser(required_fields=False)  # For PATCH requests

# Place Resource
class PlaceResource(Resource):
    @cross_origin()
    def get(self):
        args = request.args
        connection = get_db_connection()
        if not connection:
            abort(500, message="Database connection failed")

        try:
            filter_fields = {key: value for key, value in args.items() if value is not None}
            filter_clause = ""
            values = ()
            if filter_fields:
                filters = [f"{field} = %s" for field in filter_fields.keys()]
                filter_clause = " WHERE " + " AND ".join(filters)
                values = tuple(filter_fields.values())

            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Place" + filter_clause, values)
            places = cursor.fetchall()
            return {"places": places}, 200
            
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
                """
                INSERT INTO Place (
                    name, formattedAddress, photo, wheelchairAccessibleParking, wheelchairAccessibleEntrance,
                    wheelchairAccessibleRestroom, wheelchairAccessDescription, inductionLoop, inductionLoopDescription,
                    description, rating, priceLevel, nationalPhoneNumber, latitude, longitude, regularOpeningHours,
                    delivery, takeout, dineIn, outdoorSeating, liveMusic, allowsDogs, goodForChildren, goodForGroups,
                    goodForWatchingSports, restroom, reservable, curbsidePickup, menuForChildren, acceptsCreditCards,
                    acceptsDebitCards, acceptsCashOnly, acceptsNfc
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    args['name'], args['formattedAddress'], args['photo'],
                    args['wheelchairAccessibleParking'], args['wheelchairAccessibleEntrance'],
                    args['wheelchairAccessibleRestroom'], args['wheelchairAccessDescription'],
                    args['inductionLoop'], args['inductionLoopDescription'], args['description'],
                    args['rating'], args['priceLevel'], args['nationalPhoneNumber'],
                    args['latitude'], args['longitude'], args['regularOpeningHours'],
                    args['delivery'], args['takeout'], args['dineIn'], args['outdoorSeating'],
                    args['liveMusic'], args['allowsDogs'], args['goodForChildren'], args['goodForGroups'],
                    args['goodForWatchingSports'], args['restroom'], args['reservable'], args['curbsidePickup'],
                    args['menuForChildren'], args['acceptsCreditCards'], args['acceptsDebitCards'],
                    args['acceptsCashOnly'], args['acceptsNfc']
                )
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

    def patch(self, idPlace):
        args = patch_parser.parse_args()
        connection = get_db_connection()
        if not connection:
            abort(500, message="Database connection failed")

        try:
            # Remove None values from args since we only want to update provided fields
            update_fields = {key: value for key, value in args.items() if value is not None}
            if not update_fields:
                abort(400, message="No valid fields provided for update")

            cursor = connection.cursor()
            cursor.execute("SELECT * FROM Place WHERE idPlace = %s", (idPlace,))
            if not cursor.fetchone():
                abort(404, message=f"Place with id {idPlace} not found")

            set_clause = ", ".join([f"{field} = %s" for field in update_fields.keys()])
            values = tuple(update_fields.values())
            query = f"UPDATE Place SET {set_clause} WHERE idPlace = %s"
            cursor.execute(query, values + (idPlace,))
            connection.commit()
            return {"message": f"Place {idPlace} updated successfully"}, 200

        except Error as e:
            abort(500, message=f"Database error: {str(e)}")
        finally:
            cursor.close()
            connection.close()

api.add_resource(PlaceResource, '/places', '/places/<int:idPlace>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)