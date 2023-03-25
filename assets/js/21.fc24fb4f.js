(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{670:function(s,a,t){"use strict";t.r(a);var e=t(5),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",[s._v("因为自己还是个小白，API什么的还不懂怎么弄"),t("br"),s._v("\n所以就先用别人的吧qwq")])]),s._v(" "),t("h1",{attrs:{id:"metingapi的使用说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#metingapi的使用说明"}},[s._v("#")]),s._v(" metingAPI的使用说明")]),s._v(" "),t("p",[s._v("环境要求"),t("strong",[s._v("nodejs8.12+")])]),s._v(" "),t("h2",{attrs:{id:"meting参数说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#meting参数说明"}},[s._v("#")]),s._v(" meting参数说明")]),s._v(" "),t("p",[s._v("server: 数据源"),t("br"),s._v("\nnetease 网易云音乐(默认)"),t("br"),s._v("\ntencent QQ音乐")]),s._v(" "),t("p",[s._v("type: 类型"),t("br"),s._v("\nname 歌曲名"),t("br"),s._v("\nartist 歌手"),t("br"),s._v("\nurl 链接"),t("br"),s._v("\ncover 封面"),t("br"),s._v("\nlrc 歌词"),t("br"),s._v("\nsingle 获取以上所有信息(单曲)"),t("br"),s._v("\nplaylist 获取以上所有信息(歌单)")]),s._v(" "),t("p",[s._v("id: 单曲ID或歌单ID")]),s._v(" "),t("p",[s._v("GitHub："),t("a",{attrs:{href:"https://github.com/injahow/meting-api",target:"_blank",rel:"noopener noreferrer"}},[s._v("meting-api"),t("OutboundLink")],1),s._v("，此API基于 "),t("a",{attrs:{href:"https://github.com/metowolf/Meting",target:"_blank",rel:"noopener noreferrer"}},[s._v("Meting"),t("OutboundLink")],1),s._v(" 构建。")]),s._v(" "),t("h2",{attrs:{id:"实例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实例"}},[s._v("#")]),s._v(" 实例")]),s._v(" "),t("p",[s._v("例如："),t("br"),s._v("\nhttps://api.injahow.cn/meting/?type=url&id=416892104"),t("br"),s._v("\nhttps://api.injahow.cn/meting/?type=single&id=591321"),t("br"),s._v("\nhttps://api.injahow.cn/meting/?type=playlist&id=2619366284")]),s._v(" "),t("h1",{attrs:{id:"neteaseapi搭建以及使用说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#neteaseapi搭建以及使用说明"}},[s._v("#")]),s._v(" neteaseAPI搭建以及使用说明")]),s._v(" "),t("h2",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git  //下载完成以后进入目录NeteaseCloudMusicApi/\nnpm install\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("div",{staticClass:"custom-block danger"},[t("p",[s._v("服务器从github下载可能会很慢，"),t("a",{attrs:{href:"https://neteasecloudmusicapi.js.org/#/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方文档"),t("OutboundLink")],1),s._v("上的链接不是很推荐，因为会报错没有权限，建议前往"),t("a",{attrs:{href:"https://github.com/Binaryify/NeteaseCloudMusicApi",target:"_blank",rel:"noopener noreferrer"}},[s._v("github"),t("OutboundLink")],1),t("br"),s._v(" "),t("code",[s._v("npm")]),s._v("安装可能会报错"),t("code",[s._v("404 not found")]),t("br"),s._v("\n此时你需要"),t("code",[s._v("yarn")]),s._v("安装,npm安装yarn可自行百度")])]),s._v(" "),t("p",[s._v("yarn")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("yarn install    //目录NeteaseCloudMusicApi/下\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"运行"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#运行"}},[s._v("#")]),s._v(" 运行")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("node app.js\n或\nyarn start\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"custom-block danger"},[t("p",[s._v("你可能会在这个步骤遇到些问题，比如，报错什么的导致允许不了"),t("br"),s._v("\n大概率是依赖的问题，重新yarn install应该就可以了()")])]),s._v(" "),t("p",[s._v("服务器启动默认端口为 3000, 若不想使用 3000 端口 , 可使用以下命令 : Mac/Linux")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PORT")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4000")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" app.js\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PORT")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4000")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" app.js\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("服务器启动默认 host 为localhost,如果需要更改, 可使用以下命令 : Mac/Linux")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("HOST")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1 "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" app.js\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("HOST")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" app.js\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"custom-block warning"},[t("p",[s._v("运行时会消耗一定的资源，非必要可以不自己搭（）")])]),s._v(" "),t("h2",{attrs:{id:"实例-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实例-2"}},[s._v("#")]),s._v(" 实例")]),s._v(" "),t("p",[s._v("就拿单曲url、歌词、歌单详情举例，具体参数请参考"),t("a",{attrs:{href:"https://neteasecloudmusicapi.js.org/#/",target:"_blank",rel:"noopener noreferrer"}},[s._v("网易云音乐 API"),t("OutboundLink")],1),s._v("或者"),t("a",{attrs:{href:"https://github.com/Binaryify/NeteaseCloudMusicApi",target:"_blank",rel:"noopener noreferrer"}},[s._v("github"),t("OutboundLink")],1),t("br"),s._v("\n获取单曲url:"),t("br"),s._v("\nhttp://localhost:3000/song/url?id=512376195"),t("br"),s._v("\n获取歌词："),t("br"),s._v("\nhttp://localhost:3000/lyric?id=512376195"),t("br"),s._v("\n获取歌单:"),t("br"),s._v("\nhttp://localhost:3000/playlist/detail?id=6877495415")])])}),[],!1,null,null,null);a.default=n.exports}}]);