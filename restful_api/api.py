from flask import Flask, request
from flask_restful import Resource, Api, reqparse, marshal_with
from requests import put, get

app = Flask(__name__)
api = Api(app)
todos = {}
resource_fields = {
    'task': fields.String,
    'uri': fields.Url('todo_ep')
}

parser = reqparse.RequestParser()
parser.add_argument('rate', type=int)

class HelloWorld(Resource):
    def get(sepf):
        return {'hello' : 'world'}

class TodoSimple(Resource):
    def get(self, todo_id):
        return {todo_id: todos[todo_id]}

    def put(self, todo_id):
        args = parser.parse_args()
        print(args)
        todos[todo_id] = args
        # todos[todo_id] = request.form['data']
        return {todo_id: todos[todo_id]}
       
api.add_resource(HelloWorld, '/')
api.add_resource(TodoSimple, '/<string:todo_id>')

if __name__ == '__main__':
    app.run(debug=True)
    # print(type(HelloWorld))
    
    