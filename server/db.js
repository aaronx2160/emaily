const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'contact',
})

module.exports = function (sql, placeHolder) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, placeHolder, function (e, rows, fields) {
          //释放连接
          conn.release()
          //传递Promise回调对象
          resolve({ err: e, rows: rows, fields: fields })
        })
      }
    })
  })
}
