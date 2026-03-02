import initSqlJs from 'sql.js';

async function test() {
  try {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    db.run('CREATE TABLE test (id INT, name TEXT);');
    db.run("INSERT INTO test VALUES (1, 'Lynx');");
    const res = db.exec('SELECT * FROM test');
    console.log('SQL.js test success:', res[0].values);
  } catch (e) {
    console.error('SQL.js test failed:', e);
  }
}

test();
