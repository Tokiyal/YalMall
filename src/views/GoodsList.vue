<template>
    <div>
      <!-- 头部 -->
      <header-nav>
      </header-nav>
      
      <!-- 面包屑 -->
      <breadcrumb>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </breadcrumb>

      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sort_icon iconfont">&#xe60e;</span>
            <span class="sortby">排序 :</span>
            <a href="javascript:void(0)" :class="['default', {'cur': sortNum == 0}]" v-on:click="sortNum=0" @click="priceSort">默认</a>
            <a href="javascript:void(0)" :class="['price', {'cur': sortNum == 1}]" v-on:click="sortNum=1" @click="priceSort">价格<span class="iconfont">&#xe668;</span></a>
            <a href="javascript:void(0)" :class="['price', {'cur': sortNum == 2}]" v-on:click="sortNum=2" @click="priceSort">价格<span class="iconfont">&#xe667;</span></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="filterShow"><span class="iconfont">&#xe671;</span>筛选</a>
          </div>
          <div class="accessory-result">

            <div :class="['filter', 'stopPop', {'filterby-show': isShow}]" id="filter">
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur': priceSelected == 'all'}" @click="priceSelected='all'" v-on="{click: [filterPrice, closePop]}">All</a></dd>
                <dd v-for="(item, index) in priceList" :key="index">
                  <a href="javascript:void(0)" :class="{'cur': priceSelected == index}"  @click="setFilterShow(index)" v-on:click="filterPrice">{{ item.startPrice }} - {{ item.endPrice }}</a>
                </dd>
              </dl>
            </div>

            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <!--<div class="infinite-list-wrapper" style="overflow:auto">-->
                  <ul>
                    <li v-for="(item, index) in goodsList" :key="index">
                      <span class="iconfont hot" v-if="item.hotShow">&#xe619;</span>
                      <div class="pic">
                        <a href="#"><img v-lazy="'/static/images/' + item.productImage" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{ item.productName }}</div>
                        <div class="price">
                          <!-- <span class="saleprice">￥{{ item.salePrice }}</span>
                          <span class="oldprice">￥{{ item.oldPrice }}</span> -->
                          <p>
                            <span class="saleprice">￥{{ item.salePrice }}<span class="oldprice" v-if="item.hotShow">￥{{ item.oldPrice }}</span></span>
                            
                          </p>
                        </div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="infinite_div" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <p v-if="isLoading">
                      <img src="./../../static/images/svg-loaders/three-dots.svg" width="60" alt="">
                    </p>
                    <p class="nomore" v-if="isNomore"><span class="iconfont">&#xe618;</span>没有更多了</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="['md-overlay', {'hidden': !isShow}]" @click="closePop"></div>
      <footer-copy></footer-copy>
    </div>
</template>

<script>
//导入公共样式和商品样式
import './../assets/css/base.css'
import './../assets/css/product.css'

//导入头部组件
import HeaderNav from './../components/Header'

//导入底部组件
import FooterCopy from './../components/Footer'

//导入面包屑组件
import Breadcrumb from './../components/Breadcrumb'

//导入axios
import axios from 'axios'

export default {
    data() {
        return {
            goodsList: [],
            priceList: [
              {
                startPrice: 0,
                endPrice: 100
              },
              {
                startPrice: 100,
                endPrice: 500
              },
              {
                startPrice: 500,
                endPrice: 1000
              },
              {
                startPrice: 1000,
                endPrice: 2000
              }
            ],
            priceSelected: 'all',
            isShow: false,
            hotShow: false,
            sortSelected: 'default',
            sortNum: 0,//默认：0，升序：1，降序：2
            currPage: 1,
            pageSize: 8,
            busy: true,
            isLoading: false,
            isNomore: false
        }
    },
    methods: {
      getGoodsList(flag = false) {
        //this.isLoading = false
        let params = {
          currPage: this.currPage,
          pageSize: this.pageSize,
          sortNum: this.sortNum,
          priceSelected: this.priceSelected
        }
        axios.get('/goods', {
          params: params
        }).then((result) => {
          var res = result.data
          if (res.status == "0") {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.message.list)
              this.busy = true
              if (res.message.count == 0) {
                this.busy = true
                this.isNomore = true
              } else {
                this.busy = false
              }
            } else {
              this.goodsList = res.message.list
              this.busy = false
            }
          }
        }).catch(function (err) {
          console.log("获取商品列表失败")
        })
      },
      priceSort() {
        this.currPage = 1
        this.isNomore = false
        this.getGoodsList()
      },
      filterPrice() {
        this.currPage = 1
        this.getGoodsList()
        this.isNomore = false
        this.busy = true
      },
      filterShow() {
        this.isShow = true
      },
      setFilterShow(index) {
        this.priceSelected = index
        this.closePop()
      },
      closePop() {
        this.isShow = false
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.isLoading = true
        }, 600)
        setTimeout(() => {
          this.currPage++
          this.getGoodsList(true)
          this.isLoading = false
        }, 2000);
      },
      addCart(id) {
        axios.post('/goods/addCart', {
          productId: id
        }).then((result) => {
          console.log(result)
        })
        console.log(1111)
      }
    },
    components: {
        HeaderNav,
        FooterCopy,
        Breadcrumb
    },
    mounted() {
      this.getGoodsList()
    },
}
</script>

<style lang="">
    .infinite_div p {
      text-align: center;
      padding: 10px 0;
    }
    .infinite_div .nomore {
      color: #ee7a23;
    }
    .infinite_div .nomore span {
      margin-right: 5px;
    }
</style>