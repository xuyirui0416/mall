<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <div>{{$store.state.cartList}}</div>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <detail-bottom-bar @addCart="addCart"/>

    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  import Toast from 'components/common/toast/Toast'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailBottomBar,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      BackTop,
      Toast
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        isShowBackTop: false,
        message: '',
        show: false
      }
    },
    created() {
      //获取详情页的id
      this.iid = this.$route.params.iid

      //获取详情页的轮播图信息
      getDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages
        console.log(res);

        //获取详情页的商品信息
        const data = res.result

        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //获取详情页的商店信息
        this.shop = new Shop(data.shopInfo)

        //获取详情页的商品详情信息
        this.detailInfo = data.detailInfo

        //获取详情页的商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //获取详情页的商品评论信息
        if (data.rate.crate !==0)
        this.commentInfo = data.rate.list[0]
      })

      //获取详情页推荐的信息
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list
      })
    },
    updated(){
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        for (let i = 0; i < this.themeTopYs.length; i++){
          const positionY = -position.y
          if (i < this.themeTopYs.length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
            || i === this.themeTopYs.length-1 && positionY >= this.themeTopYs[i]){
            this.$refs.nav.currentIndex = i
          }
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //判断返回顶部的按钮是否出现
        this.isShowBackTop = (-position.y)>1000
      },
      addCart(){
        console.log('-----');
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;

        //获取对象
        // this.$store.commit('addCart',obj).then(res => {
        //   console.log(res);
        // })

        this.$store.dispatch('addCart',obj).then(res => {
          this.show = true;
          this.message = res;

          setTimeout(() => {
            this.show = false
            this.message = ''
          },1500)

          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
