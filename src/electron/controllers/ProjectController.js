import { createLocalStore } from '../db'
import projectValidator from '../schemas/project'

export default class ProjectController {
  constructor() {
    const collection = 'project'
    this.db = createLocalStore(collection)[collection]
  }

  getProjectList() {
    return new Promise((resolve, reject) => {
      this.db.find((err, docs) => {
        if (err) {
          reject(err)
          return false
        }

        resolve(docs)
      })
    })
  }

  getProjectDetailById(_id) {
    return new Promise((resolve, reject) => {
      if (!_id) {
        reject(new Error('获取详情失败，_id不存在'))
        return false
      }

      this.db.findOne({ _id }, (err, docs) => {
        if (err) {
          reject(err)
          return false
        }

        resolve(docs)
      })
    })
  }

  postProject(payload) {
    return new Promise((resolve, reject) => {
      const valid = projectValidator(payload)
      if (!valid) {
        reject(new Error(projectValidator.errors.join(',')))
        return false
      }

      this.db.insert(payload, (err, docs) => {
        if (err) {
          reject(err)
          return false
        }

        resolve(docs)
      })
    })
  }

  updateProjectById(payload) {
    return new Promise((resolve, reject) => {
      if (!payload._id) {
        reject(new Error('更新失败，_id不存在'))
        return false
      }

      const valid = projectValidator(payload)
      if (!valid) {
        reject(new Error(projectValidator.errors.join(',')))
        return false
      }

      this.db.update({ _id: payload._id }, payload, (err, num) => {
        if (err) {
          reject(err)
          return false
        }

        resolve(`更新成功，已更新${num}条信息`)
      })
    })
  }

  deleteProjectById(_id) {
    return new Promise((resolve, reject) => {
      if (!_id) {
        reject(new Error('删除失败，_id不存在'))
        return false
      }

      this.db.remove({ _id }, (err, num) => {
        if (err) {
          reject(err)
          return false
        }

        resolve(`删除成功，已删除${num}条信息`)
      })
    })
  }
}
