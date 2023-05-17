
//正常写：
//试试：但是发现导入和导出的变量重名
//import Navbar from './Navbar'
//export const NavbarNavbar
//解决：外面必须用Navbar导入，这里按需导出Navbar,import后面换名
//import Navbar1 from './Navbar'
//export eonst Navbar Navbar1
//上面写法麻烦
//下面默认导入并按需导出

// export { default as 导出变量名 } from '导入模块js'

export { default as AppMain } from './AppMain'
export { default as Navbar } from './Navbar'
export { default as Sidebar } from './Sidebar'

