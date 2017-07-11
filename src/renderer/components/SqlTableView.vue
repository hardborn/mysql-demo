<template>
  <!-- <div>
    <div class="header">
    </div>
    <div class="leftRegion">
      <table border="1">
        <thead>
          <th v-for="title in titles">{{title}}</th>
        </thead>
        <tbody>
          <tr v-for="row in tableList">
            <td v-for="col in row">{{col}}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" name="button" @click="getAllTables"></button>
    </div>
    <div class="rightRegion">
    </div>
  </div> -->
  <div class="layout">
    <div class="content">
      <div class="content-left">
        <div class="logo">
          Smart365-Datebase
        </div>
        <mu-raised-button label="获取数据表" class="demo-raised-button" @click="getAllTables" primary/>
        <mu-list>
          <mu-list-item v-for="row in tableList" v-bind:title="Object.values(row)[0]">
            <mu-icon slot="left" value="inbox" />
          </mu-list-item>
  
        </mu-list>
      </div>
      <div class="content-right">
        <div class="header"></div>
        <div class="body">
  
        </div>
      </div>
  
    </div>
    <div class="footer">
      Muse-UI ©2017 Created by SI-TOP
    </div>
  </div>
</template>

<script>
import {
  DB
} from '../utility/mysqlHelper'
export default {
  data () {
    return {
      titles: [],
      tableList: []
    }
  },
  methods: {
    getAllTables () {
      let self = this
      DB.query('show tables', function (error, rows, fields) {
        if (error) throw error

        var i = 0

        var tableCols = []
        for (i = 0; i < fields.length; i++) {
          tableCols.push(fields[i].name)
        }
        self.titles = tableCols
        self.tableList = rows
        console.log(self.tableList)
      })
    }
  }
}
</script>

<style scoped>
.layout {}

.logo {
  font-size: 24px;
  color: white;
  text-align: center;
  color: #7e57c2;
  padding: 10px 20px;
}

.tab {
  margin: 0 auto;
  width: 400px;
}

.content {
  overflow: hidden;
}

.content-left {
  width: 30%;
  float: left;
  background-color: rgb(225, 225, 225);
  margin-bottom: -4000px;
  padding-bottom: 4000px;
}

.content-right {
  width: 70%;
  /*display: inline-block;*/
  float: right;
  background-color: rgb(236, 236, 236);
}

.header {
  background-color: white;
  height: 40px;
}

.body {
  min-height: 500px;
  background-color: white;
  margin: 10px 20px;
}

.footer {
  padding: 10px 0;
  text-align: center;
}
</style>
