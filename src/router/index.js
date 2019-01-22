import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import home from '@/views/home'; // 
import index from '../views/work/index.vue'; // 


import leaderCockpit from '../views/work/leaderCockpit/leaderCockpit.vue';
import datainteration from '../views/work/datainteration';
/* 数据上架 */
import dataUpperShelf from '../views/work/dataUpperShelf';
import published  from '../views/work/dataUpperShelf/published.vue';// 已发布
import unpublished from '../views/work/dataUpperShelf/unpublished.vue';//未发布
import interfacePackage from '../views/work/dataUpperShelf/interfacePackage'; //数据接口封装
import api from '../views/work/dataUpperShelf/apiInfo/index'; //详情
import info from '../views/work/dataUpperShelf/apiInfo/info'; //详情
import params from '../views/work/dataUpperShelf/apiInfo/params'; //详情
import usage from '../views/work/dataUpperShelf/apiInfo/usage'; //详情


/* 系统管理 */
import systemManagement from '../views/work/systemManagement';
import dataAreaManagement from '../views/work/systemManagement/dataAreaManagement.vue';//数据区管理
import dataSheetDetails from'../views/work/systemManagement/dataSheetDetails.vue';// 数据表详情
import configManagement from '../views/work/systemManagement/configManagement.vue';//配置管理
import stateManagement  from '../views/work/systemManagement/stateManagement.vue';//状态管理
import unitDomainNameManagement from '../views/work/systemManagement/unitDomainNameManagement.vue';// 单位域名管理
import interfacePathManagement from '../views/work/systemManagement/interfacePathManagement.vue';// 接口路径管理
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home/index/leaderCockpit',
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                keepAlive: false,
            },
            children: [

                {
                    path: 'index',
                    name: 'index',
                    component: index,
                    meta: {
                        keepAlive: false,
                    },
                    children: [
                        {
                            path: 'leaderCockpit',
                            name: 'leaderCockpit',
                            component: leaderCockpit,
                            meta: {
                                keepAlive: true,
                                title: '领导驾驶舱'
                            }
                        },
                        {
                            path: 'datainteration',
                            name: 'datainteration',
                            component: datainteration,
                            meta: {
                                keepAlive: true,
                                title: '数据集成'
                            }
                        },
                        {
                            path: 'dataUpperShelf',
                            name: 'dataUpperShelf',
                            component: dataUpperShelf,
                            meta: {
                                keepAlive: true,
                                title: '数据上架'
                            },
                        },
                        {
                            path: 'published',
                            name: 'published',
                            component: published,
                            meta: {
                                keepAlive: true,
                                title: '数据上架-已发布'
                            },
                        },
                        {
                            path: 'unpublished',
                            name: 'unpublished',
                            component: unpublished,
                            meta: {
                                keepAlive: true,
                                title: '数据上架-未发布'
                            },
                        },
                        {
                            path: 'interfacePackage',
                            name: 'interfacePackage',
                            component: interfacePackage,
                            meta: {
                                keepAlive: true,
                                title: '数据接口封装'
                            },
                        },
                        {
                            path: 'interfaceUpdate',
                            name: 'interfaceUpdate',
                            component: interfacePackage,
                            meta: {
                                keepAlive: true,
                                title: '数据接口修改'
                            },
                        },
                        {
                            path: 'api',
                            name: 'api',
                            component: api,
                            meta: {
                                keepAlive: true,
                                title: '数据接口-详情'
                            },
                            children: [
                                {
                                    path: 'info',
                                    name: 'info',
                                    component: info,
                                    meta: {
                                        keepAlive: true,
                                        title: '数据接口-基本信息'
                                    },
                                },
                                {
                                    path: 'params',
                                    name: 'params',
                                    component: params,
                                    meta: {
                                        keepAlive: true,
                                        title: '数据接口-参数'
                                    },
                                },
                                {
                                    path: 'usage',
                                    name: 'usage',
                                    component: usage,
                                    meta: {
                                        keepAlive: true,
                                        title: '数据接口-使用情况'
                                    },
                                }
                            ]
                        },
                        {
                            path: 'systemManagement',
                            name: 'systemManagement',
                            component: systemManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理'
                            }
                        },
                        {
                            path: 'dataAreaManagement',
                            name: 'dataAreaManagement',
                            component: dataAreaManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理-数据区管理'
                            }
                        },
                        {
                            path: 'dataSheetDetails',
                            name: 'dataSheetDetails',
                            component: dataSheetDetails,
                            meta: {
                                keepAlive: true,
                                title: '系统管理-数据表详情'
                            }
                        },
                        {
                            path: 'configManagement',
                            name: 'configManagement',
                            component: configManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理-配置管理'
                            }
                        },
                        {
                            path: 'stateManagement',
                            name: 'stateManagement',
                            component: stateManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理-状态管理'
                            }
                        },
                        {
                            path: 'unitDomainNameManagement',
                            name: 'unitDomainNameManagement',
                            component: unitDomainNameManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理-单位域名管理'
                            }
                        },
                        {
                            path: 'interfacePathManagement',
                            name: 'interfacePathManagement',
                            component: interfacePathManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理-接口路径管理'
                            }
                        },
                    ]
                },
            ]
        }]
})



