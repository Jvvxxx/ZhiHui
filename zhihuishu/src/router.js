import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: () =>
                import ('@/views/Login')
        },
        {
            path: '/page',
            redirect: '/page/sushegl',
            name: 'page',
            component: () =>
                import ('@/views/Page'),
            children: [{
                path: '/page/sushegl',
                name: 'sushegl',
                component: () =>
                    import ('@/views/SusheGL')
            }, {
                path: '/page/bclass',
                name: 'bclass',
                component: () =>
                    import ('@/views/bclass')
            }, {
                path: '/page/bdormitory',
                name: 'bdormitory',
                component: () =>
                    import ('@/views/bdormitory')
            }, {
                path: '/page/bstudent',
                name: 'bstudent',
                component: () =>
                    import ('@/views/Bstudent')
            }, {
                path: '/page/sdhygiene',
                name: 'sdhygiene',
                component: () =>
                    import ('@/views/Sdhygiene')
            }, {
                path: '/page/smstemplate',
                name: 'smstemplate',
                component: () =>
                    import ('@/views/Smstemplate')
            }, {
                path: '/page/hygienededuct',
                name: 'hygienededuct',
                component: () =>
                    import ('@/views/Hygienededuct')
            }, {
                path: '/page/attencerule',
                name: 'attencerule',
                component: () =>
                    import ('@/views/Attencerule')
            }, {
                path: '/page/role',
                name: 'role',
                component: () =>
                    import ('@/views/Role')
            }, {
                path: '/page/dict',
                name: 'dict',
                component: () =>
                    import ('@/views/Dict')
            }, {
                path: '/page/config',
                name: 'config',
                component: () =>
                    import ('@/views/Config')
            }]
        },
    ]
})