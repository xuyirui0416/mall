<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    components: {
      BScroll
    },
    props:{
      probeType: {
        type:Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置，并返回顶部
      this.scroll.on('scroll',position => {
        this.$emit('scroll',position)
      })
      //监听上拉操作，上拉加载更多
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp',)
      })
    },
    methods: {
      scrollTo(x,y,time = 500){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
