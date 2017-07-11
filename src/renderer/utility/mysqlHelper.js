import mysql from 'mysql'

let sqlPool = mysql.createPool({
  connectionLimit: 10,
  host: '121.42.8.188',
  port: 3306,
  user: 'sito',
  password: 'tianhuzuji@91.112',
  database: '365electricguard'
})

export const DB = (function () {
  function _query (sql, callback) {
    sqlPool.getConnection(function (error, connection) {
      if (error) {
        connection.release()
        callback(null, error)
        throw error
      }

      connection.query(sql, function (error, rows, fields) {
        connection.release()
        if (error) {
          callback(error, null, null)
        } else {
          callback(null, rows, fields)
        }
      })

      connection.on('error', function (error) {
        connection.release()
        callback(error, null, null)
        throw error
      })
    })
  }
  return {
    query: _query
  }
})()
