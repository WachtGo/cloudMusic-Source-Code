<template>
  <div>
    <div class="list-wrap">
      <div>
        <div>
          <div class="inline-block"
               style="padding:5px 0;">
            <span style=" font-size: 16px;">类型：</span>
            <span class="type-area singer-type"
                  v-for="(item,index) in singerType"
                  :key="item.type"
                  @click="checkedStyle(typeElement,index) ;getSingerlist(item.type,area)">
              {{item.typeName}}
            </span>
          </div>

        </div>
        <div>
          <div class="inline-block"
               style="padding:5px 0;">
            <span style=" font-size: 16px;">地区：</span>
            <span class="type-area singer-area"
                  v-for="(item,index) in singerArea"
                  :key="item.area"
                  @click="checkedStyle(areaElement,index) ;getSingerlist(type,item.area)">
              {{item.areaName}}
            </span>
          </div>
          <div class="inline-block clearfix "
               style="float: right;padding:5px 0;">
            <!-- <span style="color:#eee">当前：</span>
          <span class='categary-select'>{{currentTag}}</span> -
					<span class='categary-select'>{{currentTag}}</span> - -->
            <span style="color:#eee">&nbsp;排列：</span>
            <span class='categary-select'
                  @click="categaryShow = !categaryShow">{{align}}</span>
            <!-- 全部分类窗口 -->
            <div class="categary-allTag-wrap"
                 v-if="categaryShow">

              <div class="categary-allTag-wrap-list"
                   v-for="(item,index) in initialtitle"
                   :key="index">
                <div><span>{{item}}:</span></div>
                <div class="categary-allTag-wrap-list-item"><span v-for="(item2,index2) in initialData[index]"
                        @click="initial = item2.orderValue;align = item2.order;categaryShow = false"
                        :key="index2">{{item2.order}}</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 歌手列表 -->
      <div class="singerListClass">
        <h3 v-show="singerList.length === 0"
            style="text-align:center"><i class="el-icon-loading"></i></h3>
        <li class="liWrap"
            v-for="(item, index) in singerList"
            :key="index"
            @click.stop="goSingerDetail(item.id)">
          <div class="liWrap-block1">
            <img :src="item.img1v1Url"
                 alt="" />
          </div>
          <div class="liWrap-block2">
            <div class="div1">
              歌手：<span>{{ item.name }}</span>
            </div>
            <div>
              <div class="divOther">
                专辑：<span>{{ item.albumSize }}</span>
              </div>

              <div class="divOther">
                歌曲：<span>{{ item.musicSize }}</span>
              </div>
            </div>
          </div>
        </li>
      </div>

    </div>
    <div class="pagination">
      <el-pagination v-show="count !== 0"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="9"
                     layout="prev, pager, next, jumper"
                     :total="count"
                     :background="true">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import { getSingerlist } from '@/api/api'
export default {
  data() {
    return {
      type: '-1',
      area: '-1',
      align: '热门',
      categaryShow: false,
      initialtitle: ['热门', '序号'],
      initialData: {
        0: [
          {
            order: '热门',
            orderValue: 'a',
          },
        ],
        1: [
          {
            order: 'A',
            orderValue: 'a',
          },
          {
            order: 'B',
            orderValue: 'b',
          },
          {
            order: 'C',
            orderValue: 'c',
          },
          {
            order: 'D',
            orderValue: 'd',
          },
          {
            order: 'E',
            orderValue: 'e',
          },
          {
            order: 'F',
            orderValue: 'f',
          },
          {
            order: 'G',
            orderValue: 'g',
          },
          {
            order: 'F',
            orderValue: 'f',
          },
          {
            order: 'H',
            orderValue: 'h',
          },
          {
            order: 'I',
            orderValue: 'i',
          },
          {
            order: 'J',
            orderValue: 'j',
          },
          {
            order: 'K',
            orderValue: 'k',
          },
          {
            order: 'L',
            orderValue: 'l',
          },
          {
            order: 'M',
            orderValue: 'm',
          },
          {
            order: 'N',
            orderValue: 'n',
          },
          {
            order: 'O',
            orderValue: 'o',
          },
          {
            order: 'P',
            orderValue: 'p',
          },
          {
            order: 'Q',
            orderValue: 'q',
          },
          {
            order: 'R',
            orderValue: 'r',
          },
          {
            order: 'S',
            orderValue: 's',
          },
          {
            order: 'T',
            orderValue: 't',
          },
          {
            order: 'U',
            orderValue: 'u',
          },
          {
            order: 'V',
            orderValue: 'v',
          },
          {
            order: 'W',
            orderValue: 'w',
          },
          {
            order: 'X',
            orderValue: 'x',
          },
          {
            order: 'Y',
            orderValue: 'y',
          },
          {
            order: 'Z',
            orderValue: 'z',
          },
        ],
      },
      initial: '-1',
      singerType: [
        {
          type: '-1',
          typeName: '全部',
        },
        {
          type: '1',
          typeName: '男歌手',
        },
        {
          type: '2',
          typeName: '女歌手',
        },
        {
          type: '3',
          typeName: '乐队',
        },
      ],
      singerArea: [
        {
          area: '-1',
          areaName: '全部',
        },
        {
          area: '7',
          areaName: '华语',
        },
        {
          area: '96',
          areaName: '欧美',
        },
        {
          area: '8',
          areaName: '日本',
        },
        {
          area: '16',
          areaName: '韩国',
        },
        {
          area: '0',
          areaName: '其他',
        },
      ],
      typeareaElement: [],
      singerList: [],
      count: 999,
      //初始页
      currentPage: 1,
    }
  },
  watch: {
    //排列顺序发生变化时，自动获取
    initial() {
      this.getSingerlist(this.type, this.area)
    },
  },
  mounted() {
    this.typeElement = document.querySelectorAll('.singer-type')
    this.areaElement = document.querySelectorAll('.singer-area')
    this.getSingerlist(this.currentTag)
  },
  methods: {
    //更改点击样式，方便查看选择的歌手类型和地区
    checkedStyle(element, idx) {
      // console.log(element)
      element.forEach((item, index) => {
        if (idx === index) {
          item.classList.add('type-area-checked')
        } else {
          if (item.classList.contains('type-area-checked')) {
            item.classList.remove('type-area-checked')
          }
        }
      })
    },
    areaStyle() {},
    //获取歌手列表----
    async getSingerlist(type, area) {
      let that = this
      that.type = type
      that.area = area
      let params = {
        type: that.type,
        area: that.area,
        initial: this.initial,
        limit: 9,
        offset: (that.currentPage - 1) * 9,
      }
      // that.categaryShow = false
      // if (that.currentTag === cat && notChangePage) return
      that.singerList = [] //清空，重新获取，防止页面图片加载慢
      await getSingerlist(params).then((res) => {
        // console.log(res)
        that.singerList = res.data.artists
      })
    },
    //获取歌手详情
    goSingerDetail(id) {
      if (id) {
        this.$router.push({
          name: 'singerDetail',
          params: {
            singerId: id,
          },
        })
      }
    },
    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      var that = this
      that.currentPage = currentPage
      that.getSingerlist(that.type, that.area)
    },
  },
}
</script>

<style lang="less" scoped>
.descript {
  display: flex;
  justify-content: space-between;
  color: aliceblue;
  font-weight: bolder;
  padding: 0 20px;
  border-radius: 20px 20px 0 0;
  // background: rgba(95, 158, 160, 0.05);
  box-sizing: border-box;
}
.list-wrap {
  margin: 10px auto 0;
  padding: 0 20px;
  width: 1120px;
  height: 695px;
  border-radius: 20px;
  // background: rgba(95, 158, 160, 0.11);
  box-sizing: border-box;

  .type-area {
    padding: 0 5px;
    font-size: 15px;
    color: rgb(201, 185, 165);
    // border: 1px dotted rgb(192, 190, 190);
    // border-radius: 10px;
    transition: 0.3s;

    &:hover {
      cursor: pointer;
      color: rgb(238, 195, 143);
    }
  }
  .type-area-checked {
    color: rgba(255, 192, 115, 0.966) !important;
    // border: 1px solid rgba(255, 198, 129, 0.89);
    // border-radius: 10px;
  }
  .categary-select {
    display: inline-block;
    // padding: 0 10px;
    width: 50px;
    text-align: center;
    // border: 1px solid #eee;
    border-radius: 10px;

    color: rgb(202, 162, 108);
    transition: 0.3s;
    &:hover {
      color: rgb(202, 162, 108);
      cursor: pointer;
    }
  }
  .categary-allTag {
    color: rgb(201, 185, 165);
    transition: 0.2s;
    &:hover {
      color: rgb(202, 162, 108);
      cursor: pointer;
    }
  }
  .categary-allTag-wrap {
    z-index: 100;
    position: absolute;
    right: 40px;
    width: 600px;
    height: 300px;
    padding: 10px;
    background: rgba(77, 114, 131, 0.884);
    border-radius: 20px;
    overflow-x: hidden;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }

    .categary-allTag-wrap-list-item {
      padding: 5px 20px;
      box-sizing: border-box;
      // background: rgb(153, 140, 140);

      span {
        display: inline-block;
        width: 40px;
        margin: 5px 0px;
        text-align: center;
        color: rgb(207, 206, 204);
        transition: 0.2s;

        &:hover {
          color: rgb(202, 162, 108);
          cursor: pointer;
        }
      }
    }
  }
}
//歌手列表样式
.singerListClass {
  padding: 5px 0;
  height: 630px;
  box-sizing: border-box;
  // overflow-x: hidden;

  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .liWrap {
    display: flex;
    justify-content: space-around;
    margin: 0 auto 10px;
    padding: 2px 10px;
    width: 99%;
    height: 60px;
    border-radius: 12px;
    background-color: rgba(129, 235, 199, 0.068);
    box-sizing: border-box;
    transition: 0.2s;
    &:hover {
      transform: scale(1.01);
    }
    .liWrap-block1 {
      width: 56px;
      height: 56px;
      border-radius: 10px;
      background-color: rgba(152, 158, 149, 0);
      transition: 0.2s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      &:hover {
        transform: scale(1.05);
        cursor: pointer;
      }
    }
    .liWrap-block2 {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      width: 80%;
      height: 56px;
      font-size: 15px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      border-radius: 10px;
      line-height: 36px;
      box-sizing: border-box;
      // background-color: rgba(226, 214, 156, 0.075);
      transition: 0.2s;

      span {
        &:hover {
          color: rgba(136, 240, 240, 0.719);
        }
      }
      .div1 {
        display: inline-block;
        // width: 200px;

        span {
          color: bisque;
          transition: 0.2s;
          &:hover {
            color: rgba(252, 214, 167, 0.979);
          }
        }
      }
      .divOther {
        display: inline-block;
        width: 100px;
        margin-right: 5px;

        span {
          color: bisque;
          transition: 0.2s;
          &:hover {
            color: rgba(255, 198, 129, 0.979);
          }
        }
      }
      &:hover {
        transform: scale(1.01);
        cursor: pointer;
      }
    }
  }
}

.pagination {
  text-align: center;
  background: none !important;

  /deep/ .el-pager {
    height: 30px !important;
    background: none !important;
  }
  /deep/ .number,
  /deep/ .btn-prev,
  /deep/ .btn-quicknext,
  /deep/ .btn-next,
  /deep/ .el-input__inner,
  /deep/ .more {
    color: #f2fff7 !important;
    background: transparent !important;
  }
  /deep/ .number:hover,
  /deep/ .btn-prev:hover,
  /deep/ .btn-quicknext:hover,
  /deep/ .btn-next:hover,
  /deep/ .el-input__inner:hover,
  /deep/ .more:hover {
    color: #f7a588 !important;
  }
  /deep/ .active {
    color: #f7a588 !important;
  }
  /deep/ .el-input__inner {
    border: none;
  }
  /deep/ .el-pagination__jump {
    color: #f7dd88 !important;
  }
  /deep/ .el-pagination {
    height: 100% !important;
  }
}
</style>