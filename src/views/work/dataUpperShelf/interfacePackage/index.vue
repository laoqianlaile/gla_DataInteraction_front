<template>
   <div class="page" v-loading="loading">
       <p class="title" v-if='pageFlag=="stepOne"'>数据接口封装——第一步：基本信息维护</p>
       <p class="title" v-else>数据接口封装——第二步：生成sql语句</p>
       <el-form 
            v-if='pageFlag=="stepOne"'
            class='form-list' 
            label-position="right" 
            label-width="25%" size="mini" 
            ref='formTabel'
            :model="formModels">
            <el-form-item label="资源名称:">
                <el-input v-model="formModels.resourceName" disabled></el-input>
            </el-form-item>
            <el-form-item label="资源ID:">
                <el-input v-model="formModels.resourceId" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门单位:">
                <el-input v-model="formModels.departName" disabled></el-input>
            </el-form-item>
            <el-form-item label="数据接口名称:" prop="dataInterfaceName"
                :rules="[{required: true, message: '数据接口名称不能为空', trigger: 'blur'},{validator, trigger: 'blur'}]">
                <el-input v-model="formModels.dataInterfaceName"></el-input>
            </el-form-item>
            <el-form-item label="封装数据类型:">
                <el-select v-model="formModels.dataInterfaceType" placeholder="请选择" @change='changeDataType'>
                    <el-option
                        v-for="item in potDataType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-show="dataType=='type2'" :label="'请选择文件'" prop="urlAddress"
                :rules="{required:true, message: '文件不能为空', trigger:'change'}">
                <el-select  v-model="formModels.urlAddress" placeholder="请选择">
                    <el-option
                        v-for="item in urlAddressData"
                        :key="item.fileName"
                        :label="item.fileName"
                        :value="item.fileAddress">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-show="dataType=='type3'" :label="'接口URL源地址'" prop="urlAddress"
                :rules="{required:true, message: '接口URL源地址不能为空', trigger:'blur'}">
                <el-input v-model="formModels.urlAddress"></el-input>
            </el-form-item>
            <el-form-item v-if="dataType!='type2'" label="请求数据类型:">
                <el-input v-if='dataType=="type1"' v-model="formModels.requestInterType" disabled></el-input>
                <el-select v-else v-model="formModels.requestInterType" placeholder="请选择">
                    <el-option
                        v-for="item in requestType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="dataType!='type2'" label="响应数据类型:">
                <el-input v-if='dataType=="type1"' v-model="formModels.responseInterType" disabled></el-input>
                <el-select v-else v-model="formModels.responseInterType" placeholder="请选择">
                    <el-option
                        v-for="item in responseType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接口请求方式:">
                <el-input v-if='dataType=="type2"' v-model="formModels.requestInterMode" disabled></el-input>
                <el-select v-else v-model="formModels.requestInterMode" placeholder="请选择">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设置接口路径:" class="interface-path" prop="thirdAddress"
              :rules="{required: true, message: '设置接口路径不能为空', trigger: 'change'}">
                <el-select v-model="formModels.firstAddress" placeholder="一级路径" @change="selectFirstDir">
                    <el-option
                        v-for="item in firstDir"
                        :key="item.firstdir_mapping"
                        :label="item.first_dir"
                        :value="item.first_dir">
                    </el-option>
                </el-select>
                <el-select v-model="formModels.secondAddress" placeholder="二级路径" @change="selectSecondtDir">
                    <el-option
                        v-for="item in secondDir"
                        :key="item.sedir_map"
                        :label="item.second_dir"
                        :value="item.second_dir">
                    </el-option>
                </el-select>
                <el-select v-model="formModels.thirdAddress" placeholder="三级路径">
                    <el-option
                        v-for="item in thirdDir"
                        :key="item.thdir_map"
                        :label="item.third_dir"
                        :value="item.third_dir">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位域名:">
                <el-input v-model="formModels.departDomain" disabled></el-input>
            </el-form-item>
            <el-form-item label="请求头:">
                <el-select v-model="formModels.requestHeader">
                    <el-option
                        v-for="item in requestHeader"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="formModels.requestHeader"></el-input> -->
            </el-form-item>
            <el-form-item label="描述/备注:" prop="dataInterfaceDesc"
              :rules="{required: true, message: '描述/备注不能为空', trigger: 'blur'}">
                <el-input type="textarea" v-model="formModels.dataInterfaceDesc"></el-input>
            </el-form-item>
        </el-form>
        <stepTwo v-else @rebackUrlAddress="ReceiveUrl" :urlData="urlData"/>
        <div v-if='pageFlag=="stepOne"' class="oneSub"> 
            <el-button v-if='dataType!="type1"' type="primary" @click="onSubmit">提交</el-button>
            <span v-else>
                <el-button type="primary" @click="nextStep">下一步</el-button>
            </span>
            <el-button @click="cancel">取消</el-button>
        </div>
        <div v-else class="twoSub">
            <div><el-button type="primary" @click="preStep">上一步</el-button></div>
            <div><el-button type="primary" @click="onSubmit">提交</el-button></div>
            <div><el-button @click="cancel">取消</el-button></div>
        </div>
   </div>
</template>

<script>
import stepTwo from './stepTwo'
export default {
  components: {stepTwo},
  data() {
    return {
      urlData:'',
      formModels:{
        resourceName:'',
        resourceId:'',
        departName:'',
        urlAddress:'',
        dataInterfaceName:'',
        dataInterfaceType:'db', //给封装数据类型初始值
        requestInterType:'json',
        responseInterType:'json',
        requestInterMode:'post',
        departDomain: '',
        requestHeader:'application/json',
        firstAddress:'',
        secondAddress:'',
        thirdAddress:'',
        // interfaceAddress:'',  //接口路经
        dataInterfaceDesc:'',
        dataInterfaceStatus:'',
        dataArea:''
      },
      potDataType:[
          {value: 'db', label: '数据库表'},
          {value: 'interface', label: '接口'},
          {value: 'file', label: '文件'},
      ],
      requestType: [
          {value: 'xml', label: 'xml'},
          {value: 'json', label: 'json'},
      ],
      responseType: [
          {value: 'xml', label: 'xml'},
          {value: 'json', label: 'json'},
      ],
      requestWay: [
          {value: 'post', label: 'post'},
          {value: 'get', label: 'get'},
      ],
      requestHeader: [
        {value:'application/json',label:'application/json'},
        {value:'text/xml',label:'text/xml'},
        {value:'application/x-www-form-urlencoded',label:'application/x-www-form-urlencoded'},
        {value:'application/xml',label:'application/xml'},
      ],
      firstDir: [],
      secondDir: [],
      thirdDir: [],
      dataType: 1, //封装数据类型
      pageFlag: 'stepOne',
      loading: false,
      urlAddressData:[], //文件类型，接口URL源地址
    }
  },
  methods: {
    validator(rule, value, callback){
        if(!/[\u4e00-\u9fa5]/g.test(value)){
            callback( new Error('数据接口名称必须包含中文'))
        }else{
            callback()
        }
    },
    getData(){
      var queryParam = this.$route.query;
      this.formModels.dataInterfaceStatus = queryParam.dataInterfaceStatus;//数据资源状态
      this.formModels.departDomain = queryParam.departDomain; //单位域名
      //获取一级目录
      this.$api.get_firstdir({depart:queryParam.departName}).then(res=>{
          this.firstDir = res.data;
      })
      if(this.$route.name=='interfacePackage'){
        //接口封装;  通过query携带数据过来
        this.dataType = "type1";
        this.formModels.resourceName = queryParam.resourceName; //资源名称
        this.formModels.resourceId = queryParam.resourceId;//资源id
        this.formModels.departName = queryParam.departName//部门名称
      }else if(this.$route.name=='interfaceUpdate'){
        //接口修改;  通过接口查询数据
        let id = queryParam.resourceId;
        this.$api.query_resources({resourceId: id}).then((res)=>{
          // console.log(res.data[0])
          let requestData = res.data[0];
          for(var key in requestData){
            for(var list in this.formModels){
              if(list==key){
                  this.formModels[list]=requestData[key];
              }
            }
          };
          // 根据接口返回的封装数据类型，显示相应的表单
          if(this.formModels.dataInterfaceType=='db'){
              this.dataType = "type1";
              this.urlData = this.formModels.urlAddress;
              this.formModels.urlAddress = '';
          }else if(this.formModels.dataInterfaceType=='file'){
              this.dataType = "type2";
          }else if(this.formModels.dataInterfaceType=='interface'){
              this.dataType = "type3";
          }
          //获取二，三级目录
          this.$api.get_seconddir({depart:requestData.departName,first_dir: requestData.firstAddress}).then(res=>{
              this.secondDir = res.data;
          })
          this.$api.get_thirddir({depart:requestData.departName,second_dir: requestData.secondAddress}).then(res=>{
              this.thirdDir = res.data;
          })
        })
      };
    },
    //切换数据类型
    changeDataType(value){
      if(value == 'db'){
        //数据库类型：请求数据类型和响应数据类型固定为json
        this.dataType = "type1";
        this.formModels.requestInterType = 'json';
        this.formModels.responseInterType = 'json';
        //文件类型：请求方式固定为get请求数据类型和响应数据类型不显示
      }else if(value == 'file'){
        this.dataType = "type2";
        this.formModels.requestInterMode = "get";
        this.formModels.urlAddress = '';
      }else if(value == 'interface'){
        this.dataType = "type3";
        this.formModels.urlAddress = '';
      }
    },
    //切换一级路经
    selectFirstDir(value){
      //获取二级目录
      this.$api.get_seconddir({depart:this.formModels.departName,first_dir: value}).then(res=>{
        this.secondDir = res.data;
        this.formModels.secondAddress='';
        this.formModels.thirdAddress='';
      })
    },
    //切换二级路经
    selectSecondtDir(value){
      //获取三级目录
      this.$api.get_thirddir({depart:this.formModels.departName,second_dir: value}).then(res=>{
        this.thirdDir = res.data;
        this.formModels.thirdAddress='';
      })
    },
    //下一步
    nextStep() {
      this.formModels.urlAddress="urlData";
      this.$refs.formTabel.validate((valid) => {
        if (valid) {
          this.pageFlag='stepTwo';
        } else {
          this.$message.warning('请完善表单信息');
          return false;
        }
      })
    },
    // 接收子组件的urlAddress
    ReceiveUrl(data){
      this.formModels.urlAddress = data.urlAddress;
      this.formModels.dataArea = data.dataArea;
    },
    //提交
    onSubmit(){
      if (this.pageFlag=='stepOne') {
        this.$refs.formTabel.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$api.submit_interface(this.formModels).then(res=>{
              if(res.status=='200'){
                  this.$router.push({path:'api/info',query:{fromName: 'unpublished',resourceId:this.formModels.resourceId,dataInterfaceType:this.formModels.dataInterfaceType}})
                  this.loading = false;
              }})
          }
        })
      }else{
        if(this.formModels.dataArea==''){
          this.$message.warning('请完善SQL语句');
          return
        }
        this.loading = true;
        this.$api.submit_interface(this.formModels).then(res=>{
          if(res.status=='200'){
            this.$router.push({path:'api/info',query:{fromName: 'unpublished',resourceId:this.formModels.resourceId,dataInterfaceType:this.formModels.dataInterfaceType}})
            this.loading = false;
          }
        })
      }
    },
    //上一步
    preStep() {
      this.formModels.urlAddress = '';
      this.pageFlag='stepOne';
    },
    //取消
    cancel() {
      this.$router.push({path:'unpublished',query:{user:this.$route.query.user}})
    }
  },
  mounted(){
    this.getData();
    // 查询文件
    this.$api.query_file({depart: this.$route.query.departName}).then(res=>{
        this.urlAddressData = res.data;
    })
  },
}
</script>

<style lang="scss" scoped>
.page{
    min-width: 1096px;
    background: #fff;
    .title{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        margin-bottom: 35px;
        padding-top: 15px;
        &::before{
            content: ' ';
            width: 6px;
            display: inline-block;
            height: 12px;
            margin-right: 15px;
            background: #58CAFD;
        }
    }
    .form-list{
        .el-select,.el-input,.el-textarea{
            width: 470px;
        }
        .el-form-item{
            /deep/ .el-form-item__label{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333;
            }
        }
        .interface-path .el-select{
            width: 154px;
        }
    }
    .oneSub{
        width: 445px;
        text-align: right;
    }
    .twoSub{
        display: flex;
        padding: 20px 0 20px 153px;
        .el-button{
            margin-right: 15px;
        }
    }
    
}
</style>
