import logging
from cassandra import ConsistencyLevel
from cassandra.cluster import Cluster, BatchStatement
from cassandra.query import SimpleStatement, BatchType


class PythonCassandraSample:

    def __init__(self):
      self.session = None
      self.cluster = None
      self.keyspace = None
      self.log = None

    def createSession(self):
        self.cluster = Cluster(['localhost'])
        self.session = self.cluster.connect(self.keyspace)

    def getSession(self):
        return self.session

    def setLogger(self):
        log = logging.getLogger()
        log.setLevel("INFO")
        handler = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(name)s : %(message)s')
        handler.setFormatter(formatter)
        log.addHandler(handler)
        self.log = log


    def create_keyspace(self, keyspace):
        all_keyspaces = self.session.execute('select keyspace_name from system_schema.keyspaces;')
        print(all_keyspaces)
        if keyspace in [key[0] for key in all_keyspaces]:
            self.log.info("starting dropping key: {0}".format(keyspace,))
            self.session.execute('Drop keyspace %s ;' % keyspace)

        self.log.info("starting creating key: {0}".format(keyspace))
        self.session.execute('''create keyspace %s with replication = {'class': 'SimpleStrategy', 'replication_factor' : 2 }''' % keyspace)

        self.log.info("switch to {0} ".format(keyspace))
        self.session.set_keyspace(keyspace)

    def create_table(self):
        self.session.execute("""CREATE TABLE IF NOT EXISTS employee (emp_id int PRIMARY KEY,
                                              ename varchar,
                                              sal double,
                                              city varchar);""")

        self.log.info("create table employee")
    
    def insert_data(self):
        insert_sql = self.session.prepare("INSERT INTO  employee (emp_id, ename , sal,city) VALUES (?,?,?,?)")
        batch = BatchStatement(batch_type=BatchType.UNLOGGED)
        batch.add(insert_sql,(1, 'LyubovK', 2555, 'Dubai'))
        self.log.info('insert data: {0} - {1}'.format(("emp_id", "ename", "sal", "city"), (1, 'LyubovK', 2555, 'Dubai')))
        batch.add(insert_sql,(2, 'JiriK', 5660, 'Toronto'))
        self.log.info('insert data: {0} - {1}'.format(("emp_id", "ename", "sal", "city"), (2, 'JiriK', 5660, 'Toronto')))
        batch.add(insert_sql,(3, 'IvanH', 2547, 'Mumbai'))
        self.log.info('insert data: {0} - {1}'.format(("emp_id", "ename", "sal", "city"), (3, 'IvanH', 2547, 'Mumbai')))
        batch.add(insert_sql,(4, 'YuliaT', 2547, 'Seattle'))
        self.log.info('insert data: {0} - {1}'.format(("emp_id", "ename", "sal", "city"), (4, 'YuliaT', 2547, 'Seattle')))
        self.session.execute(batch)
        self.log.info('completed insert data')

    def print_data(self):
        all_employee = self.session.execute('select * from employee')
        for employee in all_employee:
            print(employee.emp_id, employee.ename)

if __name__ == "__main__":
    _cluster = PythonCassandraSample()
    _cluster.createSession()
    _cluster.setLogger()
    _cluster.create_keyspace('firstkeyspace')
    _cluster.create_table()
    _cluster.insert_data()
    _cluster.print_data()