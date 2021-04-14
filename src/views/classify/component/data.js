export const linkColumns = (h, $this) => [{
  dataKey: 'linkName',
  title: '链接名称',
  align: 'left',
  width: 400
}, {
  dataKey: 'status',
  title: '状态',
  align: 'right',
  render: (h, scoped, row) => {
    return (
      <span class="view-title ell" onClick={() => $this.toView(scoped)}>{scoped.row.roleName}</span>
    )
  }
}, {
  dataKey: 'brand',
  title: '品牌',
  align: 'left',
  columnRender: () => {
    return (
      <div onClick={() => $this.toggleIcon()}>
        <span>品牌</span>
        <i class={$this.iconClass ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}>
        </i>
        <transition name="el-zoom-in-top">
          111
        </transition>
      </div>
    )
  }
}, {
  dataKey: 'product',
  title: '商品',
  align: 'left'
}
  // {
  //   dataKey: 'operate',
  //   title: '操作',
  //   width: 280,
  //   render: (h, scoped) => {
  //     return (
  //       <div class="flex-justify-start flex-item-center">
  //         <span class="view-title operate-btn ell" style="padding-left:0" type="text" onClick={() => $this.editMoadl(scoped)}>编辑</span>
  //         <el-divider direction="vertical"></el-divider>
  //         <el-popconfirm onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
  //           <span class="view-title ell operate-btn" type="text" slot="reference" >删除</span>
  //         </el-popconfirm>
  //         <el-divider direction="vertical"></el-divider>
  //         <span class="view-title operate-btn ell" type="text" onClick={() => $this.roleEdit(scoped)}>角色编辑</span>
  //         <el-divider class="view-title ell" direction="vertical"></el-divider>
  //         <span class="view-title operate-btn ell" type="text" onClick={() => $this.warrant(scoped)}>角色授权</span>
  //       </div >
  //     )
  //   }
  // }
]
