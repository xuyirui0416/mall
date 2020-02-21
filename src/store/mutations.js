const mutations = {
  addCounter(state,payload) {
    state.count++
  },
  addToCart(state,payload){
    state.cartList.push(payload)
  }
}

export default mutations

