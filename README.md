# 商城

## 开发阶段

##### 关于vue-cli
- 使用vue-cli搭建项目
- 使用vue-ui可以进行可视化操作
- Vue-DevTools查看项目的相关结构和数据

##### 开发工具
使用VSCode，其插件的多样性和源代码的管理能够很好地提高开发效率；

##### 目录结构
    ~/public·····················································存放静态文件
    ~/src························································项目源码
    ~src/api·····················································公共的api方法
    ~/src/assets·················································资源文件
    ~/src/components·············································项目公共组件
    ~/src/pages··················································项目的页面
    ~/src/storage················································浏览器storage的统一处理
    ~/src/store··················································vuex数据
    ~/src/utils··················································公共方法

##### 插件介绍
- vue-lazyload：应用于图片的懒加载；[相关连接](https://www.npmjs.com/package/vue-lazyload "相关连接")
- swiper vue-awesome-swiper：轮播图；[相关连接](https://www.npmjs.com/package/vue-awesome-swiper "相关连接")
- element-ui：UI工具；[相关连接](https://www.npmjs.com/package/element-ui "相关连接")
- axios vue-axios：HTTP工具；[相关连接](https://www.npmjs.com/package/vue-axios "相关连接")
- vue-cookie：用于操作cookie的vue插件；[相关连接](https://www.npmjs.com/package/vue-cookie "相关连接")
- node-sass sass-loader：解析sass样式；[相关连接](https://www.npmjs.com/package/sass-loader "相关连接")

##### 跨域
使用接口代理的方法解决跨域问题，开发解决可以在vue.config.js中进行配置：
```javascript
module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            '/api':{
                target:'https://mock.yonyoucloud.com/mock/10225',
                changeOrigin:true,
                pathRewrite:{
                '/api':''
                }
            }
        }
    }
}
```
为了统一，可以为每个接口都添加“/api”的路径，在转发的时候，pathRewrite会把“/api”设置为空，这时实际的接口就会是真实请求数据的接口了;
##### storage封装
为什么要对浏览器的storage进行封装？
因为如果按照原生的storage进行数据存储的话，每个字段对应一个值，那么如果是多个字段的话那storage列表将会有很多key/value，这样会影响美观，而且使用也不太方便。通过封装，每个项目的都只有一个storage，它对应的值是一个json字符串；将需要保存的数据都集中在这个json对象中，然后再转换为json字符串保存在storage中：
```javascript
// storage 封装
const STORAGE_KEY = 'mall'
export default {
    // 获取某个模块下面的某个值
    getItem(key, module_name) {
        ......
    },
    // 存储值到对应的模块中
    setItem(key, value, module_name) {
        ......
    },
    // 获取整个storage
    getStorage() {
        ......
    },
    // 清除某个模块下的某个值
    clear(key, module_name) {
        ......
    }
}

```
##### 接口错误拦截

###### 对接口返回的状态进行统一处理对接口的返回的状态进行统一处理
使用axios对接口的响应进行拦截：
```javascript
axios.interceptors.response.use(function (response) {
    let res = response.data
	//对返回状态进行判断：比如状态status为0则数据成功返回；
    if(res.status == 0) {
        return res.data
    } else if(res.status == 10) {
        ......
    } else {
        ......
    }
})
```
上面的情况是处理状态码为2xx的情况，如果状态码不是2xx，再添加use的参数：[详情请看这里](https://github.com/axios/axios#interceptors "详情");
###### 关于axios
get请求添加参数需要用params；post请求可以直接添加参数对象。[详情](https://github.com/axios/axios#example "详情");

还需要配置baseurl:`axios.defaults.baseURL = '/api';`这样每个请求都会加上“/api”，跟处理跨域问题是的接口代理相对应;

对于接口来说设置一个超时时间也是一个很好的使用体验：`axios.defaults.timeout = 6000;`;

如果接口方法是动态的可以使用中括号表示，比如`this.axios[method](url).then()`;

##### 接口环境设置

需要根据开发、测试、线上等环境对不同的接口进行设置；

##### Mock设置

常用的Mock设置有以下几种方式：
1. 本地直接创建json数据；
2. mock平台，比如easy-mock等等；
3. 集成Mock API：[具体查看这里](https://www.npmjs.com/package/mockjs "具体查看这里")

##### 代码相关

###### sass

模块化：reset.scss、mixin.scss、config.scss、base.scss等等；
- reset.scss：重置样式，对浏览器的默认样式进行重新设置；
- mixin.scss：定义一些公用样式方法，可以动态去使用；@mixin、@include
- config.scss：定义一些样式变量，方便对相同的样式进行修改；
- base.scss：基本样式

###### a标签

demo中有些连接是虚设的，为了不让其刷新页面，可以将href设置为：
```javascript
<a href="javascript:;">小米商城</a>
```
###### style样式
vue组件中的style标签需要添加属性lang=“scss”才会被编译成css;

###### 插件的引入可以使用按需引入需要用到的组件即可
比如swiper:
```javascript
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
```
###### 图片懒加载
使用vue-lazyload，可以直接给图片绑定v-lazy，这样就可以实现图片的懒加载；非常适合首屏图片比较多的情况；
```javascript
<img v-lazy="imgSrc" alt="">
```
###### 路由的跳转也可以直接使用window.location.href
```javascript
window.location.href = '/#/login';
```
###### 吸顶功能
```javascript
let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
```
可以获得元素滚动的距离，这样就可以根据项目中的实际情况进行判断了;

###### svg的使用
```javascript
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
    <defs>
      <symbol id="icon-add" viewBox="0 0 31 32">
        <title>add</title>
        <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
      </symbol>
    </defs>
</svg>
```
调用：
```javascript
<svg class="icon icon-edit">
	<use xlink:href="#icon-edit"></use>
</svg>
```
[参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/symbol "参考");

###### 路由跳转
1. 直接使用路由字符串
```javascript
this.$router.push('/.../...')
```
2. 使用path
```javascript
this.$router.push({
	path:'/../..',
	query:{
		key:val
	}
})
```
3. 使用name：这里的name就是定义路由是提供的name属性
```javascript
this.$router.push({
	name:'...',
	query:{
		key:val
	}
})
```
query可以这样获得：`this.$route.query`;

###### 分页器的使用
一般在数据列表展示的地方比较常用:
1. elementUI的Pagination 分页；[详情](https://element.eleme.cn/#/zh-CN/component/pagination "详情")
2. 点击按钮加载更多数据
3. 滚动加载更多：使用[vue-infinite-scroll](https://www.npmjs.com/package/vue-infinite-scroll "vue-infinite-scroll")插件


## 部署上线

##### 优化·路由按需加载优化·路由按需加载

路由按需加载可以减少首屏的加载时间
[vue-router按需加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97 "vue-router按需加载")

安装 syntax-dynamic-import 插件，然后直接import就可以；

这样结果就是首屏路由在页面刷新的时候会直接加载，但是其他路由会预加载，当调到其他路由的时候会直接调用对应的路由；
如果不使用预加载，而是跳转路由的时候再加载，可以到vue.config.js文件进行配置：
```javascript
module.exports = {
    ... ,
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    }
}
```
##### 配置nginx
在nginx.conf配置server：
```javascript
server {
  listen 80;
  server_name 监听的服务器域名;
	root /workspace/项目文件名;
	index index.html index.htm login.html;
	location ^~/api/ {
	  proxy_pass 代理的域名/;
  }
  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
  {
    root /workspace/项目文件名;
  }

  location ~ .*\.(js|html|css)?$
  {
    root /workspace/项目文件名;
    expires 30d;
  }
}
```
这里代理的域名后面需要添加斜杠“/”，这样才会把“/api/”替换掉；






