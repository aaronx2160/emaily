const router = require('express').Router()
const conn = require('./db')

router.get('/contacts', async (req, res) => {
  const sql = 'select * from contacts'
  const result = await conn(sql, [])
  handleDbRes(res, result, 'Failed to load contacts')
})

router.get('/contact/:id', async (req, res) => {
  const { id } = req.params
  const sql = 'select * from contacts where id =?'
  const result = await conn(sql, [id])
  handleDbRes(res, result, 'Failed to load contact')
})

router.post('/contact', async (req, res) => {
  const { id, first_name, last_name, email, phone } = req.body.data

  const sqlAddNew = 'insert into contacts values (?,?,?,?,?,?)'
  const sqlEdit =
    'UPDATE contacts SET first_name = ?, last_name = ?, email=?, phone=? where id=?;'
  let result = null
  if (id) {
    result = await conn(sqlEdit, [first_name, last_name, email, phone, id])
  } else {
    result = await conn(sqlAddNew, [
      null,
      first_name,
      last_name,
      email,
      phone,
      'imageUrl',
    ])
  }
  handleDbRes(res, result, 'Failed to add new contact')
})

router.delete('/contact/:id', async (req, res) => {
  const { id } = req.params
  const sql = 'delete from contacts where id =?'
  const result = await conn(sql, [id])
  handleDbRes(res, result, 'Failed to delete contact')
})

module.exports = router

const handleDbRes = (res, result, msg) => {
  if (!result.err) {
    res.send({ status: 1, msg: 'ok', data: result.rows })
  } else {
    console.log(result.err)
    res.send({ status: 0, msg: msg, data: null })
  }
}
