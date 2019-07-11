
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('serverbeat.db');


// db.serialize(function() {
//     db.run("CREATE TABLE  single_signal (id INT, dt TEXT)");
  
//     var stmt = db.prepare("INSERT INTO single_signal VALUES (?,?)");
//     for (var i = 0; i < 10; i++) {
    
//     var d = new Date();
//     var n = d.toLocaleTimeString();
//     stmt.run(i, n);
//     }
//     stmt.finalize();
  
//     db.each("SELECT id, dt FROM single_signal", function(err, row) {
//         console.log("User id : "+row.id, row.dt);
//     });
//   });

  db.serialize(function() {
    db.run(`
  CREATE TABLE IF NOT EXISTS time_series_signal(
      project_id STRING,
      sender STRING,
      serverbeat_tag STRING,
      serverbeat_subtag STRING,
      signal_data TEXT,
      signal_timestamp NUMBER,
      PRIMARY KEY (project_id, sender, serverbeat_tag, serverbeat_subtag, signal_timestamp)
      )
  `);

db.run(`
  CREATE TABLE IF NOT EXISTS single_signal(
      project_id STRING,
      sender STRING,
      serverbeat_tag STRING,
      serverbeat_subtag STRING,
      signal_timestamp NUMBER,
      actual_status STRING,
      actual_message STRING,
      actual_timestamp NUMBER,
      numeric_value NUMBER,
      PRIMARY KEY (project_id, sender, serverbeat_tag, serverbeat_subtag, signal_timestamp, actual_timestamp)
      )
  `);

  });



db.close();
