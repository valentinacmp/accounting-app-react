const config = {
  database: 'accounting_db',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  },
  port: 3001,
  secret: 'ultraS3KreT'
};

module.exports = config;


//---------------

//$ mysql --user=your-user-name --password=your-password
//$ mysql -u your-user-name -p'Your-password' -h your-hostname

// const config = {
//   dbUrl: 'jdbc:mysql://localhost:3306/dbname',
//   port: 3000,
//   secret: 'ultraS3KreT'
// }

// module.exports = config;
