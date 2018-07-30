

import React, { Component } from 'react';
import './App.css';
import { Table,Select,Input,Button,Tooltip,Upload, message,Icon,Popconfirm,BackTop,Modal } from 'antd';
import reqwest from 'reqwest';
//import ExportJsonExcel from 'js-export-excel';
import {CSVLink} from 'react-csv';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



//const Option = Select.Option;

let day = new Date();
let today = day.toLocaleDateString();

class App extends Component {

    constructor(props){
        super(props);

        this.state={
            OraData: [],
            // selectDate:[],
            tableData:[],
            loading:false,
            pagination: {},
            maxpagenumber:30,
            filterDropdownVisible: false,
            searchText: '',
            visible: false,
            modalData:{},
          //  colname:[],


        }
    };









    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            filters: this.state.searchText,
            ...filters,
        });
    }
    fetch = (params = {}) => {
        console.log('params.all:', params.all);
        this.setState({ loading: true });
        reqwest({
            url: 'http://localhost:3000/',
            method: 'post',
            data: {
                results: this.state.maxpagenumber,
                page:1,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            let res = data.pop();
            //this.state.colname = data.pop();
           //console.log('colname:',Object.values(this.state.colname[0])[0])
            pagination.total = Object.values(res[0])[0];
            pagination.pageSize=this.state.maxpagenumber;
            // this.setState({
            //     loading: false,
            //     data: data.results,
            //     pagination,
            // });
           // console.log(data.pop());
            let arr=[];
            // let defaultData=[];
            for(let i = 0; i < data.length; i++){

                if(arr.indexOf(data[i].name)===-1){
                    arr.push(data[i].name);
                }

                // if(lastGist[i].language==='English'){
                //     defaultData.push(lastGist[i]);
                // }

            }
            // this.setState({OraData:lastGist,selectDate:arr,tableData:defaultData});
            if(typeof(params.all)!='undefined'){
                this.setState({OraData:data,loading: false});
                //console.log(data)
            }else{
                this.setState({tableData:data,loading: false,pagination});
                console.log(data)
            }


        });
    }
    getalldata=()=>{
        this.fetch({
            results: '',
            page: '',
            all: 'all',
        });
    }



//load json data from server
    async componentDidMount(){

        //await this.fetch();

        await this.getalldata();

    }
    async componentWillMount(){
        //await this.getalldata();
        await this.fetch();
    }

//load table data by <select>'s options
//         handleChange=(value)=> {
//         let selected=[];
//         for(let i=0;i<value.length;i++){
//             for(let j=0;j<this.state.OraData.length;j++){
//                 if(value[i]===this.state.OraData[j].name)
//                 {
//                     selected.push(this.state.OraData[j]);
//                 }
//
//             }
//
//         }
//         this.fetch(value);
//         if (selected.length===0){
//             selected=this.state.OraData
//         }
//         this.setState({tableData:selected});
//     }
    onSearch = () => {
        const { searchText} = this.state;
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
            filterDropdownVisible: false,
            searchText:''
        });
//        const reg = new RegExp(searchText, 'gi');
        this.fetch({
            filters:searchText,
        });

    }
    onReset=()=>{
        this.setState({
            filterDropdownVisible: false,
        });
        this.fetch();
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }


    onDelete = (index) => {
       // console.log('index',index)
      //  console.log('indexdata',this.state.tableData[index].id)
        reqwest({
            url: 'http://localhost:3000/edit',
            method: 'post',
            data: {
                delete: 'delete',
                data:this.state.tableData[index].id,
            },
            type: 'json',
        }).then((data) => {
            if(data.affectedRows===1){
                message.success('Delete Success');
                //window.location.reload();
                this.fetch()
            }else{
                message.error('Delete Error');
            }
        })
    }

    onEdit = (index) => {
         console.log('index',index)
          console.log('indexdata',this.state.tableData)
        this.setState({
            visible: true,
            modalData:this.state.tableData[index],
        });


        //Object.keys(this.state.tableData[index]).forEach((item)=>{console.log(item)})
        // reqwest({
        //     url: 'http://localhost:3000/edit',
        //     method: 'post',
        //     data: {
        //         delete: 'delete',
        //         data:this.state.tableData[index].id,
        //     },
        //     type: 'json',
        // }).then((data) => {
        //     if(data.affectedRows===1){
        //         window.location.reload();
        //     }
        // })
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        reqwest({
            url: 'http://localhost:3000/edit',
            method: 'post',
            data: {
                edit: 'edit',
                data:this.state.modalData,
            },
            type: 'json',
        }).then((data) => {
            if(data.affectedRows===1){
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
                message.success('Edit Success');
                //window.location.reload();
                this.fetch()
            }else{
                message.error('Edit Error');
            }
           // console.log('return',data)

        })



    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    onModalChange=(e)=>{
        let val=e.target.value;
      //  console.log('val',val)
         let id = e.target.id;
        let data = Object.assign({}, this.state.modalData, { [id]: val })
        this.setState({modalData:data})
    }



    render() {

const search=(
        <div className="custom-filter-dropdown">
            <Input
                placeholder="Search me"
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSearch}
            />
            <Tooltip placement="bottom" title='Search'>
                <Button type="primary" onClick={this.onSearch} shape="circle" icon="search" style={{'marginRight':'5px'}}/>
            </Tooltip>
            <Tooltip placement="bottom" title='Reset'>
                <Button type="danger" onClick={this.onReset} shape="circle" icon="reload"/>
            </Tooltip>
        </div>
)

//load table header and set sort function
      const columns = [{
          title: 'Id',
          dataIndex: 'id',
          sorter: (a, b) => {return a.id-b.id},
          defaultSortOrder:'id',
          // sorter: true,
          // render: id => `${id.first} ${id.last}`,

      }, {
          title: '名称',
          dataIndex: 'name',
          className:'name',
          sorter: (a, b) => {return a.name.toUpperCase().localeCompare(b.name.toUpperCase())},
          filterDropdown:search,
          filterDropdownVisible: this.state.filterDropdownVisible,
          onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
         //  sorter: true,
         //  render: name => `${name.first} ${name.last}`,

      }, {
          title: '规格',
          dataIndex: 'norm',
          className:'norm',
         sorter: (a, b) => {return (a.norm||'').toUpperCase().localeCompare((b.norm||'').toUpperCase())},

      },{
          title: '数量',
          dataIndex: 'number',
          className:'number',
         sorter: (a, b) => {return a.number - b.number},

      },{
          title: '价格',
          dataIndex: 'price',
          className:'price',
         sorter: (a, b) => {return a.price - b.price},

      },{
          title: '会员价',
          dataIndex: 'memberprice',
          className:'memberprice',
         sorter: (a, b) => {return a.memberprice - b.memberprice},

      },{
          title: '付款',
          dataIndex: 'pay',
          className:'pay',
         sorter: (a, b) => {return a.pay - b.pay},

      },{
          title: '地址',
          dataIndex: 'address',
          className:'address',
         sorter: (a, b) => {return (a.address||'').toUpperCase().localeCompare((b.address||'').toUpperCase())},

      },{
          title: '编码',
          dataIndex: 'code',
          className:'code',
         sorter: (a, b) => {return (a.code||'').toUpperCase().localeCompare((b.code||'').toUpperCase())},

      },{
          title: '备注',
          dataIndex: 'remark',
          className:'remark',
       //   defaultSortOrder: 'remark',
         sorter: (a, b) =>{return (a.remark||'').toUpperCase().localeCompare((b.remark||'').toUpperCase())},
      }, {
          title: '编辑',
          dataIndex: 'operation',
          render: (text, record, index) => {
              return (
                  <span>
                  {/*<Button style={{'marginRight':'5px'}}>Edit</Button>*/}
                      <a className='edit' onClick={() => this.onEdit(index)} style={{'marginRight':'5px'}}>Edit</a>
                      <span className="ant-divider" />
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                      <a className='edit'  >Delete</a>
                  </Popconfirm>
                  </span>
              );
          },
      }];

        // const data = [
        //     {firstname: 'Ahmed', lastname: 'Tomi' , email: 'ah@smthing.co.com'},
        //     {firstname:'Raed', lastname:'Labes' , email:'rl@smthing.co.com'} ,
        //     {firstname:'Yezzi', lastname:'Min l3b', email:'ymin@cocococo.com'}
        // ];
        // const headers = [
        //     {label: 'Id', key: 'id'},
        //     {label: '名称', key: 'name'},
        //     {label: '规格', key: 'norm'},
        //     {label: '数量', key: 'number'},
        //     {label: '价格', key: 'price'},
        //     {label: '会员价', key: 'memberprice'},
        //     {label: '付款', key: 'pay'},
        //     {label: '地址', key: 'address'},
        //     {label: '编码', key: 'code'},
        //     {label: '备注', key: 'remark'},
        // ];

        const props = {
            name: 'file',
            accept:'.xlsx',
            action: "http://localhost:3000/upload",
            beforeUpload(file) {
                console.log(file.type)
                const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                if (!isXLSX) {
                    message.error('只能上传 .xlsx 文件哦！');
                }
                return isXLSX;
            },
            headers: {
                authorization: 'authorization-text',
            },

        onChange(info) {
                //console.log('status',info.file.status)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                   // window.location.reload();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };




    return (
      <div className="App">
          <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                              data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">SnowBall - Sample Application</a>
                  </div>
                  <div id="navbar" className="collapse navbar-collapse">
                  </div>
              </div>
          </nav>

          <div className="container">
              <div className="starter-template">
                  <h1>My Book Catalogue</h1>
                  <label htmlFor="language">Language</label>

                  {/*<Select*/}
                      {/*mode="multiple"*/}
                      {/*style={{ width: '100%' }}*/}
                      {/*placeholder="Please select"*/}
                      {/*// defaultValue={['English']}*/}
                      {/*onChange={this.handleChange}*/}
                  {/*>*/}
                      {/*{options}*/}
                  {/*</Select>*/}
                <Table columns={columns} dataSource={this.state.tableData}  pagination={this.state.pagination} loading={this.state.loading} onChange={this.handleTableChange}/>
                  {/*<Button type="primary" onClick={this.onExport}>Download</Button>*/}
                  {/*<Button type="primary" style={{'marginRight':'15px'}}><CSVLink data={this.state.OraData} filename={"my-file.csv"} headers={headers}><Icon type="export" /> Export</CSVLink></Button>*/}
                  <ExcelFile filename={'Custom'+today}  element={<Button type="primary" style={{'marginRight':'15px'}}><Icon type="export" />Export</Button>} >
                      <ExcelSheet data={this.state.OraData} name="Product" >
                          <ExcelColumn label="ID" value="id"/>
                          <ExcelColumn label="名称" value="name"/>
                          <ExcelColumn label="规格" value="norm"/>
                          <ExcelColumn label="数量" value="number"/>
                          <ExcelColumn label="价格" value="price"/>
                          <ExcelColumn label="会员价" value="memberprice"/>
                          <ExcelColumn label="付款" value="pay"/>
                          <ExcelColumn label="地址" value="address"/>
                          <ExcelColumn label="编码" value="code"/>
                          <ExcelColumn label="备注" value="remark"/>
                          {/*<ExcelColumn label="付款"*/}
                                       {/*value={(col) => col.pay ? "Married" : "Single"}/>*/}
                      </ExcelSheet>
                  </ExcelFile>

                  <Upload {...props}>
                      <Button type="primary">
                          <Icon type="upload" /> Import
                      </Button>
                  </Upload>
             </div>
              <Modal title="Edit"
                     visible={this.state.visible}
                     onOk={this.handleOk}
                     confirmLoading={this.state.confirmLoading}
                     onCancel={this.handleCancel}
              >
                  <lable htmlFor="ID" style={{'marginRight':'20px'}}>ID</lable>
                  <input type='text' className='ID' value={this.state.modalData.id} disabled/>
                  <lable htmlFor="name" style={{'marginRight': '20px'}}>名称</lable>
                  <input type='text' id='name' className='name' value={this.state.modalData.name} onChange={this.onModalChange}/><br/>
                  <lable htmlFor="norm" style={{'marginRight': '5px'}}>规格</lable>
                  <input type='text' id='norm' className='norm' value={this.state.modalData.norm} onChange={this.onModalChange}/>
                  <lable htmlFor="number" style={{'marginRight': '20px'}}>数量</lable>
                  <input type='text' id='number' className='number' value={this.state.modalData.number} onChange={this.onModalChange}/><br/>
                  <lable htmlFor="price" style={{'marginRight': '5px'}}>价格</lable>
                  <input type='text' id='price' className='price' value={this.state.modalData.price} onChange={this.onModalChange}/>
                  <lable htmlFor="memberprice" style={{'marginRight': '5px'}}>会员价</lable>
                  <input type='text' id='memberprice' className='memberprice' value={this.state.modalData.memberprice} onChange={this.onModalChange}/><br/>
                  <lable htmlFor="pay" style={{'marginRight': '5px'}}>付款</lable>
                  <input type='text' id='pay' className='pay' value={this.state.modalData.pay} onChange={this.onModalChange}/>
                  <lable htmlFor="address" style={{'marginRight': '20px'}}>地址</lable>
                  <input type='text' id='address' className='address' value={this.state.modalData.address} onChange={this.onModalChange}/><br/>
                  <lable htmlFor="code" style={{'marginRight': '5px'}}>编码</lable>
                  <input type='text' id='code' className='code' value={this.state.modalData.code} onChange={this.onModalChange}/>
                  <lable htmlFor="remark" style={{'marginRight': '20px'}}>备注</lable>
                  <input type='text' id='remark' className='remark' value={this.state.modalData.remark} onChange={this.onModalChange}/>
              </Modal>
          </div>
          <div>
              <BackTop />
          </div>

      </div>
    );
  }
}

export default App;
