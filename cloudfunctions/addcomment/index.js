// 云函数入口文件
const cloud = require('wangkaijie-c2f3e1')

cloud.init()

// 云函数入口函数

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('discussion').doc(event.id).update({
      data: {
        childComment: _.push(event.comments)
      }
    })
    }
  catch (e) {
    console.error(e)
  }
}
