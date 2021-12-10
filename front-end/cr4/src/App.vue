<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/IFunny_logo.png" height=90em width=auto>
      </div>
    </router-link>
    <div class="title">
      <h1>NOT iFunny</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <div class="links">
      <router-link to="/add">Add/Edit</router-link>
      <router-link to="/">Gallery</router-link>
    </div>
    <a href="https://github.com/BYUCS260/museum-cramterr" id="github">
    https://github.com/BYUCS260/museum-cramterr</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #212121;
  padding: 0px;
  margin: 0px;
  color: #d4a331;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #1a1a1a;
  color: #d4a331;
  align-items: center;
  justify-content:center;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 75px;
  padding: 20px 100px 0px 100px;
  background: #1a1a1a;
  font-size: 12px;
}

.links {
  display: flex;
}

.footer a {
  margin: 10px;
  color: #d4a331;
  align-content: center;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
