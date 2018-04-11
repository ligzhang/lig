# iview 框架 Select 组件 bug

### 在 Select 组件中 v-model 绑定值不能默认渲染的问题

### 初始代码如下：

```
<FormItem label="项目状态" class="" >

     <i-Select v-model="formEdit['project_status']" style="width:200px;margin-left:20px;"   placeholder='11' @on-change="clearSpan" >

          <i-Option v-for="item in project_status" :value="item.value" :key="item.value" :label="item.label" ></i-Option>
      </i-Select>
    </FormItem>
```

### 预期能达到的效果是在初始状态下显示 placeholder 中的值，经测试不能达到预期效果。于是使用<span>标签模拟，期望能够达到效果。改动后的代码如下：

```
<Modal v-model="modalEdit"  @on-ok="ok('edit')" @on-cancel="cancel('edit')" >

    <FormItem label="项目状态" class="" style="position:relative;"  >
      <span :class="[showSpan?'edit-project_status':'']" style="position:absolute;left:14%;top:50%;z-index:100;">{{statusTransform[formEdit['project_status']]}}</span>
     <i-Select v-model="formEdit['project_status']" style="width:200px;margin-left:20px;"   placeholder='11' @on-change="clearSpan" >

          <i-Option v-for="item in project_status" :value="item.value" :key="item.value" :label="item.label" ></i-Option>
      </i-Select>


    </FormItem>

</Modal>
```

### 这里的实现逻辑如下： 一开始使用<span>标签渲染初始值，随后当 select 组件发生 on-change 事件时，隐藏<span>标签，随后的渲染，可以完全依赖 iview 的自带效果了。

### 实现逻辑是不是很简单，是的，但是如果真这么简单，我也不会写这个笔记了。一切的坑才刚刚开始。首先声明一下：其实整个 form 表单是包裹在 Modal 里面的。

### 1. 在上面代码中，你可能已经注意到了 showSpan 变量，这是控制 span 标签显示还是隐藏的。

```
.edit-project_status {
   display: none !important;
}
```

### 后面的!important 很重要，覆盖 iview 框架默认的 style。初始时，showSpan 的默认值为 false，此时标签会显示。

### 进入第二步，点击 select，当值发生变化时，隐藏 span 标签。为此我们需要在 clearSpan 方法中写逻辑：showSpan = true.隐藏 span 标签。

### 但是，当你点击触发这个编辑 Model 的按钮后，会惊奇的发现，此时 span 标签已经隐藏。通过好多次的 console.log()之后，我发现这一定是事件冒泡的结果，至此，我以为我已经接近成功了。但是我把能阻止事件冒泡的方法都试过了，发现并不能解决，当然，有可能是因为我水平还是不够。然后，我接着在网上搜索，发现网上这种问题好多人都遇到过，但是并没有什么发现有说服力的回答。于是，我接着找，不知怎么的我想到了 vue 里面的 nextTick()方法，之前看过，是控制页面在数据刷新后的渲染问题的，但是不怎么清楚了。然后，尝试在 clearSpan 方法中使用，最终的 clearSpan 方法如下：

```
clearSpan() {
var s = () => {
       this.showSpan = false
       this.num++
       this.$nextTick(() => {

         if (this.num > 1 || this.formEdit.project_status != this.flag) {
           this.showSpan = true
         }

       })
     }
     setTimeout(s, 0)
}
```

### 核心部分是通过 setTimeout 函数控制 this.$nextTick()的运行。clearSpan 方法所有的实现只是为了 this.showSpan = true 这么一个逻辑可以达到。至此可以完美的使用 iview 的<select/>组件，并成功实现了初始值渲染和选中值的切换。

### 最后补充一下，触发这个 Modal 的方法：

```
show(params, event) {

      // 保存初始值
      this.flag = this.formEdit.project_status

      // 触发 Modal
      this.modalEdit = true

      // 是否隐藏span标签
      this.showSpan = false

      // 记录是第几次点击select
      this.num = 0

    },
```

### 至此，我们又可以和 iview 愉快的玩耍了。
