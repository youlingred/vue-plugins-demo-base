import navConfig from '../build/json/nav.config.json';

const LOAD_MAP = name => {
  return r => require.ensure([], () =>
      r(require(`./pages/${name}.vue`)),
    'page');
}

const load = path => {
  return LOAD_MAP(path);
};

const LOAD_DOCS_MAP = path => {
  return r => require.ensure([], () =>
      r(require(`./mds${path}.md`)),
    'page');
}

const loadDocs = path => {
  return LOAD_DOCS_MAP(path);
};

const registerRoute = (navConfig) => {
  let route = [];
  let navs = navConfig;
  route.push({
    path: '/component',
    redirect: '/component/installation',
    component: load('component'),
    children: []
  });
  navs.forEach(nav => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav);
      });
    } else {
      addRoute(nav);
    }
  });

//添加路由
  function addRoute(page) {
    const component = page.path === '/changelog'
      ? load('changelog')
      : loadDocs(page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    };
    console.log(route)
    route[0].children.push(child);
  };
  return route;
};
//通过nav.config.js注册组件一级路由一级各个组件的二级路由
let route = registerRoute(navConfig);
//生成一级路由
const generateMiscRoutes = function () {
  let guideRoute = {
  // 指南
    path: `/guide`,
    redirect: `/guide/design`,
    component: load('guide'),
    children: [
      {
      // 设计原则
      path: 'design',
      name: 'guide-design',
      component: load('design')
    },
      {
      // 导航
      path: 'nav',
      name: 'guide-nav',
      component: load('nav')
    }]
  };
  // 资源
  let resourceRoute = {
    path: `/resource`,
    name: 'resource',
    component: load('resource')
  };
  // 首页
  let indexRoute = {
    path: `/`,
    name: 'home',
    component: load('index')
  };

  return [guideRoute, resourceRoute, indexRoute];
};
//融合组件路由
route = route.concat(generateMiscRoutes());
// route=[].concat(generateMiscRoutes());
console.log(route)
//设置首页默认重定向
route = route.concat([{
  path: '/',
  // redirect: '/'  //重定向的首页
  redirect: '/component'  //重定向的组件页
}, {
  path: '*',
  redirect: '/'
}]);

export default route;
