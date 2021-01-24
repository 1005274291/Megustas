//类型注解
let foo ="xx"//类型推论
let bar :string //类型注解
let efg:string|number//字符串或者数字
//对象类型约束
let abc:{
    foo:string,
    bar:number
}

//数组类型约束
let names:string[]//数组中的每一项都是字符串
names=["Tom","jerry"]

//任意类型
let baz:any

//函数中使用类型
function greeting(person:string,age?:number):string{
    return ""//形参类型，返回值类型 ：void无返回值
    //内置常用类型：string，number，boolean，void，any
    //声明了就是必填参数 加上？或者加默认值是可选参数 可选参在必选参后面
}
//函数重载 ：以参数数量或类型区分多个同名函数
//先声明，再实现
function info(a:object):string;
function info(a:string):object

//实现
function info(a:any):any{
    if(typeof a ==="object"){
        return a.name
    }else{
        return {name:a}
    }
}

//class
class MyComp{
    private _foo:string;//私有属性，不能通过继承访问和实例访问
    protected bar:string; //保护属性 可以通过继承访问
    readonly mua="mua";//只读属性必须在声明时或构造函数里初始化 不能更改
    static dong="dong" //只能通过MyComp.dong访问
    //构造函数：初始化成员变量
    //参数加上修饰符，能够定义并初始化一个成员属性
    constructor(private tua="tua"){
        this._foo="foo"
        this.bar="bar"
    }

    //方法也有修饰符
    private someMethod(){
        console.log(this.tua)
    }
    //存取器，存取数据时可添加额外逻辑，在vue里面可以用作计算属性  可以让private封装的被外部访问
    get foo(){return this._foo}
    set foo(val){this._foo=val}
}
//接口约束 只声明不实现
interface Person{
    firstName:String,
    lastName:string
}
function greeting2(person:Person){
    return
}
class Human implements Person{
    //累实现接口
    firstName:String
    lastName:string
    constructor(first:string,last:string){
        this.firstName=first
        this.lastName=last
    }
}
const user={firstName:"jiang",lastName:"jun"}
console.log(user)
console.log(greeting2(user))
const human=new Human("jun","jiang")
console.log(greeting2(human))