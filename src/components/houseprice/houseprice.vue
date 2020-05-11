<template>
  <div>
    <div>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select v-model="city" @visible-change="changeArea" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.city"
                :label="item.city"
                :value="item.city"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="area" placeholder="请选择区">
              <el-option
                v-for="item in areaData"
                :key="item.area"
                :label="item.area"
                :value="item.area"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input
              placeholder="输入描述，如区名或房产名，居室大小，多少平米等"
              v-model="keyworld"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search" @click="btn_query()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div style="margin-top:10px;">
      <el-card>
        <div style="float:right;margin-bottom:15px;letter-spacing:2px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comparecity' }">城市对比</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a @click="compareArea">城市区域对比</a>
            </el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <div style="letter-spacing:2px;">
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="id" width="60"></el-table-column>
            <el-table-column prop="city" label="城市" width="80"></el-table-column>
            <el-table-column prop="address" label="地址" width="300"></el-table-column>
            <el-table-column prop="fangyuan" label="房源" width="300"></el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column prop="price" label="单价/元" width="100"></el-table-column>
            <el-table-column prop="size" label="大小"></el-table-column>
            <el-table-column prop="status" label="状态" width="80"></el-table-column>
            <el-table-column prop="valley" label="区" width="100"></el-table-column>
            <!-- <el-table-column prop="insertData" label="时间">
              <template v-slot="scope">{{ scope.row.insertData |  dateFormat}}</template>
            </el-table-column>-->
          </el-table>
        </div>

        <div style="margin-top:15px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="20"
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
      options: [],
      keyworld: "",
      tableData: [],
      cityData: [],
      city: "",
      area: "",
      areaData: [],
      pageSize: 20,
      pageTotal: 1,
      pageIndex: 1,
      hosuePrice: {
        pageSize: 20,
        pageIndex: 1,
        keyWorld: "",
        hosueType: "",
        price: "",
        status: "",
        city: "",
        valley: ""
      }
    };
  },
  created() {
    this.getHousePrice();
    this.getcitylist();
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 3 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 == 0) {
        return "";
      } else {
        return "success-row";
      }
    },
    handleSizeChange(pageSize) {
      this.hosuePrice.pageSize = pageSize;
      this.getHousePrice();
    },
    handleCurrentChange(pageIndex) {
      console.log(pageIndex);
      this.hosuePrice.pageIndex = pageIndex;
      this.getHousePrice();
    },
    changeArea() {
      this.getareabycity();
    },
    // 获取城市
    async getcitylist() {
      const { data } = await this.$http.post(
        // "https://localhost:44310/api/Home/Find_City",
        "/api/Home/Find_City",
        {
          headers: { "Content-Type": "application/json;charset=utf-8" }
        }
      );
      this.options = data.data;
      console.log(this.options);
      console.log(data);
    },
    async getareabycity() {
      const areacity = this.city;

      console.log(areacity);

      if (areacity != "") {
        const { data } = await this.$http.get(
          `/api/Home/FindArea?city=${areacity}`,
          {
            headers: { "Content-Type": "application/json;charset=utf-8" }
          }
        );

        console.log(data);
        this.areaData = data.data;
      }
    },
    async getHousePrice() {
      const { data } = await this.$http.post(
        "/api/Home/Find_HousePrice",
        this.hosuePrice,
        {
          headers: { "Content-Type": "application/json;charset=utf-8" }
        }
      );

      console.log(data);
      this.tableData = data.data.items;
      this.pageIndex = data.data.pageIndex;
      this.pageTotal = data.data.totalItems;
    },
    btn_query() {
      this.hosuePrice.keyWorld = this.keyworld;
      this.hosuePrice.city = this.city;
      this.hosuePrice.valley = this.area;
      this.hosuePrice.pageIndex = 1;
      this.hosuePrice.pageSize = this.pageSize;
      this.getHousePrice();
    },
    compareArea()
    {
      this.$router.push({
        name:'compareAreacity',
        params:{
          city:this.city
        }
      });
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