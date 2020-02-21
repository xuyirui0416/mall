<template>
  <div id="cart">
<!--    导航部分-->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车（{{cartCount}}）
      </div>
    </nav-bar>

<!--    商品列表-->
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>

<!--底部功能栏-->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      cartList() {
        return this.$store.getters.cartList
      },
      cartCount() {
        return this.$store.getters.cartCount
      }
    }
  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    position: relative;
    z-index: 9;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
