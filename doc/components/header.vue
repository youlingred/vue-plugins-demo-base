<style scoped>
  .headerWrapper {
    height: 80px;
  }

  .header {
    height: 80px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;

    .container {
      height: 100%;
      box-sizing: border-box;
    }

    .nav-lang-spe {
      color: #888;
    }

    h1 {
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: normal;

      a {
        color: #333;
        text-decoration: none;
        display: block;
      }

      span {
        font-size: 12px;
        display: inline-block;
        width: 34px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, .5);
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
        margin-left: 10px;
        border-radius: 3px;
      }
    }

    .nav {
      float: right;
      height: 100%;
      line-height: 80px;
      background: transparent;
      padding: 0;
      margin: 0;
    }

    .nav-gap {
      position: relative;
      width: 1px;
      height: 80px;
      padding: 0 20px;

      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        width: 1px;
        height: 16px;
        background: #ebebeb;
      }
    }

    .nav-logo,
    .nav-logo-small {
      vertical-align: sub;
    }

    .nav-logo-small {
      display: none;
    }

    .nav-item {
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;

      &.nav-algolia-search {
        cursor: default;
      }
      a {
        text-decoration: none;
        color: #888;
        display: block;
        padding: 0 22px;

        &.active,
        &:hover {
          color: #333;
        }

        &.active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 15px;
          left: calc(50% - 7px);
          width: 14px;
          height: 4px;
          background: #409EFF;
        }
      }
    }
  }

  .nav-dropdown {
    margin-bottom: 6px;
    padding-left: 18px;
    width: 100%;

    span {
      display: block;
      width: 100%;
      font-size: 16px;
      color: #888;
      line-height: 40px;
      transition: .2s;
      padding-bottom: 6px;
      user-select: none;

      &:hover {
         cursor: pointer;
       }
    }

    i {
      transition: .2s;
      font-size: 12px;
      color: #979797;
      transform: translateY(-2px);
    }

    @when active {
      span, i {
        color: #409EFF;
      }
      i {
        transform: rotateZ(180deg) translateY(3px);
      }
    }

    &:hover {
      span, i {
        color: #409EFF;
      }
    }
  }

  .nav-dropdown-list {
    width: auto;
  }
</style>
<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1><router-link :to="'/'">
          <!-- logo -->
          <slot>
            <img
              src="../assets/images/logo.jpg"
              alt="logo"
              class="nav-logo">
          </slot>

        </router-link></h1>

        <!--//FIXME 顶部菜单 -->
        <ul class="nav">
          <li class="nav-item nav-algolia-search" v-show="isComponentPage">
            <algolia-search></algolia-search>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/guide`">{{ langConfig.guide }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/component`">{{ langConfig.components }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/resource`"
              exact>{{ langConfig.resource }}
            </router-link>
          </li>
          <!--//FIXME 顶部菜单end-->
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
  import AlgoliaSearch from './search.vue';
  import compoLang from '../json/component.json';
  export default {
    data() {
      return {
        active: '',
      };
    },

    components: {
      AlgoliaSearch
    },
    computed: {
      langConfig() {
        return compoLang.header;
      },
      isComponentPage() {
        return /^component/.test(this.$route.name);
      }
    },
  };
</script>
