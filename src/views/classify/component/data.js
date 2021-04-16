// export const linkColumns = (h, $this) => [{
//   dataKey: 'linkName',
//   title: '链接名称',
//   align: 'left',
//   width: 400
// }, {
//   dataKey: 'status',
//   title: '状态',
//   align: 'right',
//   render: (h, scoped, row) => {
//     return (
//       <span class="view-title ell" onClick={() => $this.toView(scoped)}>{scoped.row.roleName}</span>
//     )
//   }
// }, {
//   dataKey: 'brand',
//   title: '品牌',
//   align: 'left',
//   columnRender: () => {
//     return (
//       <div onClick={() => $this.toggleIcon()}>
//         <span>品牌</span>
//         <i class={$this.iconClass ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}>
//         </i>
//         <transition name="el-zoom-in-top">
//           111
//         </transition>
//       </div>
//     )
//   }
// }, {
//   dataKey: 'product',
//   title: '商品',
//   align: 'left'
// }
//   // {
//   //   dataKey: 'operate',
//   //   title: '操作',
//   //   width: 280,
//   //   render: (h, scoped) => {
//   //     return (
//   //       <div class="flex-justify-start flex-item-center">
//   //         <span class="view-title operate-btn ell" style="padding-left:0" type="text" onClick={() => $this.editMoadl(scoped)}>编辑</span>
//   //         <el-divider direction="vertical"></el-divider>
//   //         <el-popconfirm onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
//   //           <span class="view-title ell operate-btn" type="text" slot="reference" >删除</span>
//   //         </el-popconfirm>
//   //         <el-divider direction="vertical"></el-divider>
//   //         <span class="view-title operate-btn ell" type="text" onClick={() => $this.roleEdit(scoped)}>角色编辑</span>
//   //         <el-divider class="view-title ell" direction="vertical"></el-divider>
//   //         <span class="view-title operate-btn ell" type="text" onClick={() => $this.warrant(scoped)}>角色授权</span>
//   //       </div >
//   //     )
//   //   }
//   // }
// ]

export const linkData = [{
  linkName: '花王/KAO蒸汽睡眠眼罩薰衣草香型5片/盒热敷提高睡眠质量日花王/KAO蒸汽睡眠眼罩薰衣草香型5片/盒热敷提高睡眠质量日',
  isClassify: '0',
  brandName: '',
  productName: ''
}, {
  linkName: '582663622222碧柔净莹保湿泡沫洁面1',
  isClassify: '1',
  brandName: '碧柔',
  productName: '碧柔净莹保湿泡沫洁面'
}]
export const brandData = [{
  brandId: '1',
  brandName: '花王'
}, {
  brandId: '2',
  brandName: '碧柔'
}]

export const commodityData = [{
  brandName: '蜜浓',
  productId: '1',
  productName: '蜜浓氨基酸滋润保湿啫蜜浓氨基酸滋润保湿啫蜜浓氨基酸滋润保湿啫蜜浓氨基酸滋润保湿啫蜜浓氨基酸滋润保湿啫'
}, {
  brandName: '碧柔',
  productId: '2',
  productName: '碧柔氨基酸滋润保湿啫喱面膜22ml*4片日本原装进口护肤补水'
}]
