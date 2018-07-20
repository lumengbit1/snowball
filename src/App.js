

import React, { Component } from 'react';
import './App.css';
import { Table,Select } from 'antd';


const Option = Select.Option;




class App extends Component {

    constructor(){
        super();

        this.state={
            OraData: [],
            selectDate:[],
            tableData:[],

        }
    };
//load json data from server
    async componentDidMount(){

        let response = await fetch("http://localhost:3000/");
        let lastGist = await response.json();
        console.log(lastGist)
        let arr=[];
        // let defaultData=[];
        for(let i = 0; i < lastGist.length; i++){

            if(arr.indexOf(lastGist[i].name)===-1){
                arr.push(lastGist[i].name);
            }

            // if(lastGist[i].language==='English'){
            //     defaultData.push(lastGist[i]);
            // }

        }
        // this.setState({OraData:lastGist,selectDate:arr,tableData:defaultData});
        this.setState({OraData:lastGist,selectDate:arr,tableData:lastGist});

    }

//load table data by <select>'s options
        handleChange=(value)=> {
        let selected=[];
        for(let i=0;i<value.length;i++){
            for(let j=0;j<this.state.OraData.length;j++){
                if(value[i]===this.state.OraData[j].language)
                {
                    selected.push(this.state.OraData[j]);
                }

            }

        }
        this.setState({tableData:selected});
    }




    render() {
//load data  of language for <select>'option from server's data
      const options = [];
      this.state.selectDate.map(option=>{
          return options.push(<Option key={option}>{option}</Option>);
           });

//load table header and set sort function
      const columns = [{
          title: 'Id',
          dataIndex: 'id',
          sorter: (a, b) => {return a.id.toUpperCase().localeCompare(b.id.toUpperCase())},

      }, {
          title: '名称',
          dataIndex: 'name',
          className:'name',
          sorter: (a, b) => {return a.name.toUpperCase().localeCompare(b.name.toUpperCase())},

      }, {
          title: '规格',
          dataIndex: 'norm',
          className:'norm',
          sorter: (a, b) => {return a.norm.toUpperCase().localeCompare(b.norm.toUpperCase())},

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
          sorter: (a, b) => {return a.address.toUpperCase().localeCompare(b.address.toUpperCase())},

      },{
          title: '编码',
          dataIndex: 'code',
          className:'code',
          sorter: (a, b) => {return a.code.toUpperCase().localeCompare(b.code.toUpperCase())},

      },{
          title: '备注',
          dataIndex: 'remark',
          defaultSortOrder: 'remark',
          sorter: (a, b) =>{return a.remark.toUpperCase().localeCompare(b.remark.toUpperCase())},
      }];




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
                      <a className="navbar-brand" href="#">Intrepid Group - Sample Application</a>
                  </div>
                  <div id="navbar" className="collapse navbar-collapse">
                  </div>
              </div>
          </nav>

          <div className="container">
              <div className="starter-template">
                  <h1>My Book Catalogue</h1>
                  <label htmlFor="language">Language</label>

                  <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      // defaultValue={['English']}
                      onChange={this.handleChange}
                  >
                      {options}
                  </Select>
                <Table columns={columns} dataSource={this.state.tableData} />
              </div>
          </div>

      </div>
    );
  }
}

export default App;
