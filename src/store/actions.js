const actions = {
  addCart(context, info) {
    // console.log(info);

    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      const oldInfo = context.state.cartList.find(item => item.iid === info.iid)

      // 2.+1或者新添加
      if (oldInfo) {
        // oldInfo.count += 1
        context.commit('addCounter',oldInfo)
        resolve('当前商品数量+1')
      } else {
        info.count = 1
        info.checked = true
        // context.state.cartList.push(info)
        context.commit('addToCart',info)
        resolve('添加了新的商品')
      }
    })
  }
}

export default actions

