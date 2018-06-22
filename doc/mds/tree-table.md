<script>
  export default {
    data() {
      return {
        data: [
          {
            menu:'系统管理',
            sort:1,
            url:'/system/role',
            type:'menu',
            visible:1,
            acess:'system:role:view',
            children:[
              {
                menu:'机构管理',
                sort:1,
                url:'/system/role',
                type:'button',
                visible:0,
                acess:'system:role:view',
                children:[
                  {
                    menu:'机构管理',
                    sort:1,
                    url:'/system/role',
                    type:'button',
                    visible:1,
                    acess:'system:role:view'
                  }
                ]
              }
            ]
          }
        ],
        columns: [
         {
            label: '菜单名称',
            prop: 'menu',
            width: '150px',
            align: 'center',
            headerAlign:'center',
          },
          {
            label: '排序',
            prop: 'sort',
            width: '50px',
            align:'center',
            headerAlign:'center',
          },
          {
            label: '请求地址',
            prop: 'url',
            width: '100px',
            align:'center',
            headerAlign:'center',
          },
          {
            label: '类型',
            prop: 'type',
            width: '100px',
            align:'center',
            headerAlign:'center',
            type: 'template',
            template: 'type',
          },
          {
            label: '可见',
            prop: 'visible',
            width: '100px',
            align:'center',
            headerAlign:'center',
            type: 'template',
            template: 'visible',
          },
          {
            label: '授权标识',
            prop: 'acess',
            width: '150px',
            align:'center',
            headerAlign:'center',
          },
          {
            label: '操作',
            width: '150px',
            align:'center',
            headerAlign:'center',
            type: 'template',
            template: 'operation',
          }
         ],
                  
      };
    },
    methods:{
      modify(row){
        console.log('modify',row);
      },
      add(row){
        console.log('add',row);
      },
      del(row){
        console.log('del',row);
      }
    }
  };
</script>

<style scoped lang="less">
    .ivu-btn{
      padding:0;
    }
    .zk-icon-plus-square-o:before { content: "\E633"; }
    
    .zk-icon-minus-square-o:before { content: "\E633"; }
</style>
## TreeTable 树形表格
### 安装
 使用 npm:
```bash
$ npm i vue-table-with-tree-grid -S
```
或者 yarn:
```bash
$ yarn add vue-table-with-tree-grid
```
### 引入项目
```javascript
import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)
```
### DEMO
:::demo
```html
<div>
    <zk-table :data="data"
              :columns="columns"
              :border="true"
              :tree-type="true"
              :expand-type="true"
              :selection-type="false">
      <template slot="menu" slot-scope="scope">
          <i-icon type="speedometer">{{scope.row.menu}}</i-icon>
          <Tag color="blue" v-if="scope.row.type==='menu'">菜单</Tag>
          <Tag color="yellow" v-else-if="scope.row.type==='button'">按钮</Tag>
      </template> 
      <template slot="type" slot-scope="scope">
          <Tag color="blue" v-if="scope.row.type==='menu'">菜单</Tag>
          <Tag color="yellow" v-else-if="scope.row.type==='button'">按钮</Tag>
      </template> 
      <template slot="visible" slot-scope="scope">
         <Tag color="blue" v-if="scope.row.visible===1">显示</Tag>
         <Tag color="yellow" v-else-if="scope.row.visible===0">隐藏</Tag>
     </template>
     <template slot="operation" slot-scope="scope">
          <i-button type="text" :style="{color:'blue'}" @click="modify(scope.row)">修改</i-button>
          <i-button type="text" :style="{color:'blue'}"@click="add(scope.row)">增加</i-button>
          <i-button type="text" :style="{color:'red'}"@click="del(scope.row)">删除</i-button>
      </template>
    </zk-table>
  </div>
  <script>
    export default {
      data() {
        return {
          data: [
            {
              menu:'系统管理',
              sort:1,
              url:'/system/role',
              type:'menu',
              visible:1,
              acess:'system:role:view',
              children:[
                {
                  menu:'机构管理',
                  sort:1,
                  url:'/system/role',
                  type:'button',
                  visible:0,
                  acess:'system:role:view',
                  children:[
                    {
                      menu:'机构管理',
                      sort:1,
                      url:'/system/role',
                      type:'button',
                      visible:1,
                      acess:'system:role:view'
                    }
                  ]
                }
              ]
            }
          ],
          columns: [
           {
              label: '菜单名称',
              prop: 'menu',
              width: '150px',
              align: 'center',
              headerAlign:'center',
              type: 'template',
              template: 'menu',
            },
            {
              label: '排序',
              prop: 'sort',
              width: '50px',
              align:'center',
              headerAlign:'center',
            },
            {
              label: '请求地址',
              prop: 'url',
              width: '100px',
              align:'center',
              headerAlign:'center',
            },
            {
              label: '类型',
              prop: 'type',
              width: '100px',
              align:'center',
              headerAlign:'center',
              type: 'template',
              template: 'type',
            },
            {
              label: '可见',
              prop: 'visible',
              width: '100px',
              align:'center',
              headerAlign:'center',
              type: 'template',
              template: 'visible',
            },
            {
              label: '授权标识',
              prop: 'acess',
              width: '150px',
              align:'center',
              headerAlign:'center',
            },
            {
              label: '操作',
              width: '150px',
              align:'center',
              headerAlign:'center',
              type: 'template',
              template: 'operation',
            }
           ],
                    
        };
      },
      methods:{
        modify(row){
          console.log('modify',row);
        },
        add(row){
          console.log('add',row);
        },
        del(row){
          console.log('del',row);
        },
      }
    };
  </script>
```
:::
