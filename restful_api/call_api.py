from requests import put, get

url = 'http://localhost:5000/'

if __name__ == "__main__":
    put(url + 'todo1', data={'data':'row1'}).json()
    t1 = get(url + 'todo1').json()
    print(t1)
    put(url + 'todo2', data={'data':'row2'}).json()
    t2 = get(url + 'todo2').json()
    print(t2)
