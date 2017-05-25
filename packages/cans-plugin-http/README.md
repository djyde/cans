# cans-plugin-http

[![npm](https://img.shields.io/npm/v/cans-plugin-http.svg)](https://www.npmjs.com/package/cans-plugin-http)
[![circle](https://circleci.com/gh/djyde/cans-plugin-http.svg?style=shield)](https://circleci.com/gh/djyde/cans-plugin-http)

HTTP (axios) plugin for cans

## Install

```bash
$ yarn add cans-plugin-http
```

## Usage

### httpPlugin

#### Example

```js
import cans from 'cans'
import { observable, action } from 'cans/mobx'
import { httpPlugin } from 'cans-plugin-http'

const app = cans()

app.use(httpPlugin)

app.model({
  observable: app => {
    return observable({
      list: [],

      fetchList: action.bound(async function () {
        const list = (await app.http.get('/api/v1/lists')).data
        // modify `list`
      })
    })
  }
})
```

#### options

- axiosConfig: AxiosConfig. If provided, `app.http` will return `axios.create(axiosConfig)`

### restPlugin

`restPlugin` is useful when your backend exposed frontend a standard RESTful interface. `restPlugin` will help you generate RESTful cans model that return a observable, which contains RESTful action and loading status:

Method | Path            | action
-------|-----------------|----------------
GET    | /posts          | app.models.rest.posts.index
GET    | /posts/:id      | app.models.rest.posts.show
POST   | /posts          | app.models.rest.posts.create
PUT    | /posts/:id      | app.models.rest.posts.update
DELETE | /posts/:id      | app.models.rest.posts.delete

*(Inspired by [Egg](https://eggjs.org/zh-cn/basics/router.html))*

#### Example

```js
import cans from 'cans'
import { observable, action } from 'cans/mobx'
import { restPlugin } from 'cans-plugin-http'

const app = cans()

const URL = 'http://jsonplaceholder.typicode.com'

app.use(restPlugin, { 
  resources: [
    { name: 'posts', url: URL }
  ]
})

const PostList = ({ posts }) => (
  <div>
    {posts.map(post => (
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    ))}
  </div>
)

const PostApp = inject(({ models }) => (
  <div>
    <button disable={models.rest.posts.loading.index} onClick={models.rest.posts.index}>Fetch</button>
    <PostList posts={models.rest.posts.data.index} />
  </div>
))
```

#### options

- resources

  - name: resource name
  - url: endpoint URL
  - total: (AxiosResponse) => string | number - Compute total count from response
  - defaultData: { index: any, show: any } - Data fetched from `rest[name].index` will be set in `rest[name].data.index`. `show` is the same. `index` is `[]` by default. `show` is `{}` by default.

#### What in `app.models.rest[name]`

restPlugin create observables for every resource:

```ts
observable({
  // data fetched from RESTful interface
  data: {
    index: defaultData.index || [],
    show: defaultData.show || {}
  },
  // loading status
  loading: {
    index: boolean,
    show: boolean,
    create: boolean,
    update: boolean,
    delete: boolean
  },

  // action
  async index(),
  async show(id),
  async create(data),
  async update(id, data),
  async delete(id)
})
```

## License

MIT License
