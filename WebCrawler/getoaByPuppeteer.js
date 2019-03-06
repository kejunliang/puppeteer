const puppeteer = require('puppeteer');
const com= require("./common");
 (async () => {
 // const browser = await puppeteer.launch();//打开浏览器
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage();//打开一个空白页
//设置窗口
  await page.goto('http://uatbx.scpcdc.com.cn/');//在地址栏输入网址并等待加载
  //登录
  await page.waitForSelector("#un",{timeout: 1000})
  await page.type('#un',"admin");
  await page.waitForSelector("#pwd",{timeout: 1000})
  await page.type('#pwd','kfpassword');
  await page.waitForSelector("div[class='login-btn']",{timeout: 1000})
  await page.click("div[class='login-btn']");
  await page.waitFor(1000);  //等待登录进去后 一定要注意这里 设置等待时间 否则会由于登录不成功就跳转导致后续获取异常
 //页面登录成功后，是否需要reload 根据实际情况来确定
 await page.goto('http://uatbx.scpcdc.com.cn/ghbx/dep1/fybx.nsf/frmWebFlow?openform&unid=44B5C6F212F7BC33482583820024BD69&flowtype=%B2%BB%B6%A8%C1%F7%B3%CC&flowkey=D5A85E82923957E248257A020028F2FD');//在地址栏输入网址并等待加载
 //await page.waitFor(500);
 await com.setInputValue(page,"fldfjzs","7")
 await com.setInputValue(page,"fldfpzs_xm","10")
 await com.setInputValue(page,"fldReimburseReason","自动测试")
 await page.waitForSelector("#glsqadd",{timeout: 500})
 await page.click("#glsqadd") //调用保存按钮进行保存
 var fn="dojo.query(\"select[name='fldsqywlx_xm'] option\").forEach(function(obj,index){if(index==1){obj.selected=true}})"
 await page.evaluate(fn);
 var  fn1="dojo.byId(\"fldDb_xm\").value=fnGetSelectName(\"fldsqywlx_xm\",\"value\");dojo.byId(\"lx\").value=fnGetSelectName(\"fldsqywlx_xm\",\"name\")"
 await page.evaluate(fn1); 
 var  fn2="dojo.byId(\"sqdh\").click()"
 await page.evaluate(fn2); 
 await page.waitFor(1000);  //等待登录进去后
//await page.click("span[widgetid='btnZancun']") //调用保存按钮进行保存
 await page.screenshot({path: 'example2.png'});//截个图
 await browser.close();//关掉浏览器
})();