import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .github__menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 400px;
    padding: 2rem;
  }

  .search-field {
    margin-bottom: 20px;
  }

  .search-field__input {
    font-size: 1.4rem;
    margin-right: 10px;
  }

  .github-menu__repo-list {
    height: 300px;
    overflow-y: auto;
  }

  .github__content {
    margin-left: 400px;
    padding: 2rem;
  }

  .commit-tab {
    width: 500px;
    height: 700px;
    position: relative;
    padding: 1rem;
  }

  .commit-tab__list {
    overflow-y: auto;
    height: 100%;
  }

  .commit__date,
  .commit__name,
  .commit__message {
    padding: 0.3rem 0;
  }

  .commit__date span,
  .commit__name span,
  .commit__message span {
    margin-left: 0.5rem;
  }

  .commit__date span{
    font-size: 0.9rem;
  }

  .commit__name span{
    font-size: 1.4rem;
  }

  .commit__message span{
    color: #757575;
  }

  .commit-tab__list::-webkit-scrollbar,
  .github-menu__repo-list::-webkit-scrollbar {
    width: 4px;
  }

  .commit-tab__list::-webkit-scrollbar-track,
  .github-menu__repo-list::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .commit-tab__list::-webkit-scrollbar-thumb,
  .github-menu__repo-list::-webkit-scrollbar-thumb {
    background-color: #D84315;
  }
`;
