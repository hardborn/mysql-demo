<template>
  <div id="wrapper">
    <el-row>
      <el-col :span="24">
        <div class="logo">
          Smart365-Datebase
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" class="content-left">
        <el-row type="flex" justify="start">
          <div>
            <el-button type="info" @click="getAllTables">获取数据表</el-button>
            
          </div>
        </el-row>
        <el-row :span="20">
          <el-tree :data="databases" height="800" :props="defaultProps" empty-text="数据表" @node-click="handleNodeClick"></el-tree>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-table :data="tableData" height="800">
          <el-table-column v-for="field in fields" v-bind:prop="field" v-bind:label="field">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="footer">
          Muse-UI ©2017 Created by SI-TOP
        </div>
      </el-col>
    </el-row>
    <!--<img id="logo" src="~@/assets/logo.png" alt="electron-vue">
            <main>
              <div class="left-side">
                <span class="title">
                  Welcome to your new project!
                </span>
                <system-information></system-information>
              </div>
        
              <div class="right-side">
                <div class="doc">
                  <div class="title">Getting Started</div>
                  <p>
                    electron-vue comes packed with detailed documentation that covers everything from
                    internal configurations, using the project structure, building your application,
                    and so much more.
                  </p>
                  <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
                </div>
                <div class="doc">
                  <div class="title alt">Other Documentation</div>
                  <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
                  <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
                </div>
              </div>
            </main>-->
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
import {
  DB
} from '../utility/mysqlHelper'
export default {
  data () {
    return {
      databases: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [],
      fields: []
    }
  },
  name: 'landing-page',
  components: { SystemInformation },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    getAllTables () {
      let self = this
      DB.query('show tables', function (error, rows, fields) {
        if (error) throw error

        console.log(rows)
        let tableList = []
        rows.forEach(function (element) {
          for (var col in element) {
            if (element.hasOwnProperty(col)) {
              tableList.push({ name: element[col] })
            }
          }
        }, this)
        self.databases.push({ name: '365electricguard', children: tableList })
        // console.log(self.databases)
      })
    },
    handleNodeClick (data) {
      let self = this
      console.log(data)
      DB.query('select * from ' + data.name + ' limit 100', function (error, rows, fields) {
        if (error) throw error

        console.log(rows)
        self.tableData = []
        self.fields = []
        self.tableData = rows
        // var tableCols = []
        let i = 0
        for (i = 0; i < fields.length; i++) {
          self.fields.push(fields[i].name)
        }
        // fields.forEach(function (element) {
        //   tableCols.push(element.name)
        // }, this)
        // let tableList = []
        // rows.forEach(function (element) {
        //   for (var col in element) {
        //     if (element.hasOwnProperty(col)) {
        //       tableList.push({name: element[col]})
        //     }
        //   }
        // }, this)
        // self.databases.push({name: '365electricguard', children: tableList})
        // console.log(self.databases)
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient( ellipse at top left,
  rgba(255, 255, 255, 1) 40%,
  rgba(229, 229, 229, .9) 100%);
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

.logo {
  font-size: 24px;
  color: white;
  text-align: center;
  color: #7e57c2;
  padding: 10px 20px;
}

.footer {
  padding: 10px 0;
  text-align: center;
}

main {
  display: flex;
  justify-content: space-between;
}

main>div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: .8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}



/*.el-col {
    border-radius: 4px;
  }*/

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
