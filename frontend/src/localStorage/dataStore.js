let dataTools = {};

let dataStore = JSON.parse(window.localStorage.getItem('soccerData') || '{}');

// data=[{},{},{}]的增删改查
// 增
dataTools.add = function (data) {
    data.map((item,index)=>{
        dataStore[item.id] = JSON.stringify(item);
    })
    this.save();
}

// 更新:新的data可能数据量小于原先的数据量，所以是在之前的数据基础之上进行更新




dataTools.save = function () {
    window.localStorage.setItem('soccerData',dataStore);
}