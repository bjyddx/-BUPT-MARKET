// 云函数入口文件
const cloud = require('wangkaijie-c2f3e1')
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('userData').where({
      id: event.id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}