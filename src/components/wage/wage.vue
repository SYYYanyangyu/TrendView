<template>
  <div>
    <div>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select v-model="city" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input placeholder="请输入内容" v-model="keyworld" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="btn_query()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div style="margin-top:10px;">
      <el-card>
        <div  style="letter-spacing:2px;">
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="id" width="100"></el-table-column>
            <el-table-column prop="language" label="position" width="100"></el-table-column>
            <el-table-column prop="wage" label="wage" width="100"></el-table-column>
            <el-table-column prop="city" label="city" width="100"></el-table-column>
            <el-table-column prop="basicrequire" label="basicrequire"></el-table-column>
          </el-table>
        </div>

        <div style="margin-top:15px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          ></el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "北京",
          label: "北京"
        },
        {
          value: "上海",
          label: "上海"
        },
        {
          value: "广州",
          label: "广州"
        },
        {
          value: "深圳",
          label: "深圳"
        },
        {
          value: "武汉",
          label: "武汉"
        },
        {
          value: "杭州",
          label: "杭州"
        },
        {
          value: "西安",
          label: "西安"
        },
        {
          value: "苏州",
          label: "苏州"
        },
      ],
      city: "",
      keyworld: "",
      tableData: [],
      pageSize: 10,
      pageTotal: 1,
      pageIndex: 1,
      wagelist:{
        pageSize: 10,
        pageIndex: 1,
        city: "",
        keyWorld: "",
        totalCount: 0
      } 
    };
  },
  created(){
    this.getwagelist();
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 3 === 0) {
        return "warning-row";
      } 
      else if(rowIndex % 2 == 0)
      {
        return ''
      }
      else
      {
        return "success-row";
      }
    },
    handleSizeChange(pageSize) {
      this.wagelist.pageSize = pageSize;
      this.getwagelist();
    },
    handleCurrentChange(pageIndex) {
      console.log(pageIndex);
      this.wagelist.pageIndex = pageIndex;
      this.getwagelist();
    },
    async getwagelist() {
      const { data } = await this.$http.post(
        // "https://localhost:44310/api/Home/Find",
        "/api/Home/Find",
        this.wagelist,
        {headers: {"Content-Type": "application/json; charset=utf-8"}});
        this.tableData = data.data.items;
        this.pageIndex = data.data.pageIndex;
        this.pageTotal = data.data.totalItems;
    },
    btn_query()
    {
      this.wagelist.keyWorld = this.keyworld;
      this.wagelist.city = this.city;
      this.wagelist.pageIndex = 1;
      this.wagelist.pageSize = this.pageSize;
      console.log(this.wagelist)
      this.getwagelist();
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>