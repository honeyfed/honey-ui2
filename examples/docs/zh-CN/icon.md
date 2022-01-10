## Icon 图标

提供了一套常用的图标集合。

### 使用方法

TDesign 图标通过指定参数 `tdName` 来使用，Element 图标通过指定参数 `name` 来使用。还可直接通过设置类名为 `el-icon-iconName` 来使用 Element 图标。

:::demo

```html
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>

<div class="icon-block" style="margin-top:20px">
  <el-icon tdName="loading" style="color: #999999" />
  <el-icon tdName="close" @click="onIconClose" />
  <el-icon tdName="check-circle-filled" />
</div>

<div class="icon-block" style="margin-top:20px">
  <el-icon tdName="check-circle-filled" size="small" />
  <el-icon tdName="check-circle-filled" />
  <el-icon tdName="check-circle-filled" size="medium" />
  <el-icon tdName="check-circle-filled" size="large" />
  <el-icon tdName="check-circle-filled" size="25px" />
  <el-icon tdName="check-circle-filled" size="2em" />
</div>

<div class="icon-block" style="margin-top:20px">
  <el-icon tdName="check-circle-filled" style="color: red" />
  <el-icon tdName="check-circle-filled" style="color: green" />
  <el-icon tdName="check-circle-filled" style="color: orange" />
</div>
```

:::

### TDesign 图标集合

<ul class="icon-list td-icon">
  <li v-for="name in $tdIcon" :key="name">
    <span class="tdDemo">
      <el-icon :tdName="name"/>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>

### Element 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>
