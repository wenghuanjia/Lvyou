// 取 主题相关数据



// 引入 axios 模块（封装的 ajax）
import axios from 'axios';

var $http = axios.create({
	// 基本的url
  baseURL: '/api',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 请求主题列表的方法
function getTopics(options){
	// 默认参数
	var newsOpitons = Object.assign({
    category:"news_hot",
    count:20,
	},options);

	return $http({
		url:'/',
		// 参数
		params:newsOpitons,
	});
}


// 请求主题详细信息
function getTopicData(id){
	return $http.get('/topic/'+id);
}




// 暴露取数据的
export {getTopics}