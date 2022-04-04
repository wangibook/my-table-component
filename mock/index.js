import Mock from 'mockjs'

const data = Mock.mock({
  'items|30-50': [
    {
      id: '@id',
      img: Mock.Random.image('200x100'),
      name: '@cname',
      'sex|1':  [1,2],
      'role|1': [1,2,3],
      phone: /\d{5,10}/,
      time: '@datetime',
      'status|1': ['1','0']
    }
  ]
})

Mock.mock(new RegExp('api-dev/table/list'),'post',(options) => {
  let params = JSON.parse(options.body)
  let { pageNum,pageSize } = params
  const items = data.items

  let len = items.length / pageSize
  let pageTotals = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
  let newDataList = items.slice((pageNum - 1) * pageSize, pageNum * pageSize)

  return {
    code: 20000,
    data: {
      items: newDataList,
      total: items.length,
      pageNum,
      pageSize,
      pageTotals
    }
  }
})