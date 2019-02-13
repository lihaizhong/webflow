# JSON Schema

## 简介

JSON Schema 是一种基于 JSON 格式定义 JSON 数据结构的孤帆。

## 用途

- 描述现有数据格式
- 干净的人类和机器可读文档
- 完整的结构验证，有利于自动化测试，可用于验证客户端提交的数据

## 基本类型

| 类型    | 描述                                              |
| ------- | ------------------------------------------------- |
| boolean | a JSON boolean                                    |
| integer | a JSON number without a fraction or exponent part |
| number  | any JSON number. Number includes integer          |
| string  | a JSON string                                     |
| object  | a JSON object                                     |
| array   | a JSON array                                      |
| null    | the JSON null value                               |

## JSON定义

| JSON的定义 | JSON Schema的定义                                                                 |
| ---------- | --------------------------------------------------------------------------------- |
| object     | `type`为`object`的JSON Schema实例，使用**properties**属性声明`key`值与`value`类型 |
| array      | `type`为`array`的JSON Schema实例，使用**items**属性声明value类型                  |
| value      | 任意JSON Schema实例                                                               |

## 进阶

### 元数据关键字

| 关键字      | 描述   | Schema有效值 | 用途               |
| ----------- | ------ | ------------ | ------------------ |
| title       | 标题   | 字符串       | 描述信息           |
| description | 描述   | 字符串       | 更加详尽的描述信息 |
| default     | 默认值 | 无限制       | 定义默认值         |

### 通用验证关键字

| 关键字      | 描述       | Schema有效值                                                                | JSON数据验证                                   |
| ----------- | ---------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| enum        | 数据枚举   | 必须是数组，而且数组里面的元素至少必须有一个而且不能有重复值                | 当JSON实例的值存在于ENUM列表中时，用过验证     |
| type        | 定义类型   | 可以是字符串或者字符串数组，取值必须在Schema基本类型范围内                  | -                                              |
| allOf       | 数据验证   | 必须是Object Schema实例数组，而且数组里面的元素至少必须有一个而且不能有重复 | JSON实例满足其中所有的Schema时，通过验证       |
| anyOf       | 数据验证   | 同allOf                                                                     | JSON实例满足其中某一个Schema时，通过验证       |
| oneOf       | 数据验证   | 同allOf                                                                     | JSON实例刚好只满足其中某一个Schema时，通过验证 |
| not         | 数据验证   | 必须是一个Object，而且是一个有效的JSON Schema                               | 如果不满足JSON Schema的定义，则通过验证        |
| definitions | 定义子模式 | 必须是一个Object，Object下所有属性的值都必须是有效的JSON Schema             | 用于定义子模式                                 |

### 跟类型相关的关键字

#### 数字

| 关键字           | 描述       | Schema有效值              | JSON数据验证                                |
| ---------------- | ---------- | ------------------------- | ------------------------------------------- |
| multipleOf       | 整数倍     | 大于0的JSON数             | 当JSON实例的值是其整数倍时，通过验证        |
| maximum          | 最大值     | 一个JSON数                | 当JSON实例的值小于等于maximum时，通过验证   |
| exclusiveMaximum | 包含最大值 | 布尔值，必须与maximum同用 | 当其值为true时，JSON实例不能等于maximum的值 |
| minimum          | 最小值     | 最小值                    | 一个JSON数                                  | 当JSON实例的值大于minimum时，通过验证 |
| exclusiveMinimum | 包含最小值 | 布尔值，必须与minimum同用 | 当其值为true时，JSON实例不能等于minimum的值 |

---- 适用于 integer、Number

#### 字符串

| 关键字    | 描述     | Schema有效值                   | JSON数据验证                       |
| --------- | -------- | ------------------------------ | ---------------------------------- |
| maxLength | 最大长度 | 大于等于0的整数                | 字符串的长度小于等于该值           |
| minLength | 最小长度 | 大于等于0的整数                | 字符串的长度必须大于等于该值       |
| pattern   | 模式     | 字符串，必须是有效的正则表达式 | 当字符串符合正则表达式时，通过验证 |

---- 适用于 string

#### 数组

| 关键字          | 描述     | Schema有效值                                                         | JSON数据验证                                                                 |
| --------------- | -------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| items           | 定义元素 | 必须是Object或者Array的Schema实例，如果是Array则其元素也必须是Object | 用于定义Array中的元素类型                                                    |
| additionalItems | 长度限制 | 布尔值或者类型为Object的Schema实例                                   | 当items为Array， additionalItems为false时，JSON数据长度必须小于等于items长度 |
| maxItems        | 长度限制 | 大于等于0的整数                                                      | Array实例的长度必须小于等于maxItems的值                                      |
| minItems        | 长度限制 | 大于等于0的整数                                                      | Array实例的长度必须大于等于minItems的值                                      |
| uniqueItems     | 唯一值   | 布尔值，默认为false                                                  | 当uniqueItems为true时，Array实例不能有重复值                                 |

---- 适用于 array

#### 对象

| 关键字        | 描述         | Schema有效值                                   | JSON数据验证                                      |
| ------------- | ------------ | ---------------------------------------------- | ------------------------------------------------- |
| properties    | 属性         | Object，属性的值必须都是有效的Schema实例       | 用于定义属性列表                                  |
| maxProperties | 最大属性个数 | 大于等于0的整数                                | Object实例的属性个数必须小于等于maxProperties的值 |
| minProperties | 最小属性个数 | 大于等于0的整数                                | Object实例的属性个数必须大于等于minProperties的值 |
| required      | 必须属性     | 字符串数组，至少有一个元素，数组内不能有重复值 | Object实例必须有所有required定义的属性            |
| dependencies  | 定义依赖     | Object，属性对应的值必须是Object或者字符串数组 | -                                                 |

---- 适用于 object

## 参考

[JSON Schema 参考书](https://imweb.io/topic/57b5f69373ac222929653f23)

[JSON Schema ORG](https://json-schema.org/)
