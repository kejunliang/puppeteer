const puppeteer = require('puppeteer');
const com= require("./common");
 (async () => {
 // const browser = await puppeteer.launch();//打开浏览器
  const browser = await puppeteer.launch({headless: false,devtools: false})
  const page = await browser.newPage();//打开一个空白页
//设置窗口
  await page.goto('http://uatbx.scpcdc.com.cn/');//在地址栏输入网址并等待加载
  //登录
  await page.type("#un","admin") // 用户名
  await page.type("#pwd","kfpassword")  //密码
  await page.waitForSelector("div[class='login-btn']",{timeout: 1000})
  await page.click("div[class='login-btn']");
  await page.waitFor(2500);  //等待登录进去后 一定要注意这里 设置等待时间 否则会由于登录不成功就跳转导致后续获取异常
 //页面登录成功后，是否需要reload 根据实际情况来确定
  await page.goto("http://uatbx.scpcdc.com.cn/ghbx/dep1/jdfyysd.nsf/myview?openform&view=vwdocdraft&RestrictToCategory=admin/scpcdc&count=20")
  const unfoldButton = "dojo.query(\"#btnContainer .btn-myview span>span\")[0].click()";
  await page.evaluate(unfoldButton)
  await page.screenshot({path: 'example2.png'});//截个图
  await page.waitFor(2000);     //获取新页面的时候要等待否则，新页签还没生成成功
  const page2 = ( await browser.pages() )[2];//得到所有窗口使用列表索引得到新的窗
  await page2.waitFor(500); 
  await page2.type("input[name='fldLfdw_xm']","100") // 设置域值
  await page2.click("span[widgetid='btnZancun']") //调用保存按钮进行保存
  await page2.screenshot({path: 'example3.png'});//截个图
  //await browser.close();//关掉浏览器
})();