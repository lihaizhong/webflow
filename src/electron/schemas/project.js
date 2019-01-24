import createSchema, { SchemaType } from './index'

export default createSchema('Project', {
  description: 'project数据结构',
  type: SchemaType.Object,
  required: [],
  properties: {
    // @prop
    title: {
      type: SchemaType.String,
      title: '标题'
    },
    // @prop
    path: {
      type: SchemaType.String,
      title: '项目路径'
    },
    // @prop
    projectTasks: {
      type: SchemaType.Array,
      items: {
        description: 'task数据结构',
        type: SchemaType.Object,
        properties: {
          // @prop
          name: {
            type: SchemaType.String,
            title: '任务名称'
          },
          // @prop
          command: {
            type: SchemaType.String,
            title: '任务命令'
          }
        }
      }
    },
    // @prop
    customTasks: {
      type: SchemaType.Array,
      items: {
        description: 'task数据结构',
        type: SchemaType.Object,
        properties: {
          // @prop
          name: {
            type: SchemaType.String,
            title: '任务名称'
          },
          // @prop
          command: {
            type: SchemaType.String,
            title: '任务命令'
          }
        }
      }
    }
  }
})
