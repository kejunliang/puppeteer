const puppeteer = require('puppeteer');
const com= require("./common");
 (async () => {
 // const browser = await puppeteer.launch();//打开浏览器
  const browser = await puppeteer.launch({headless: true,devtools: false})
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
  await page.waitFor(2500);  //等待登录进去后 一定要注意这里 设置等待时间 否则会由于登录不成功就跳转导致后续获取异常
 //页面登录成功后，是否需要reload 根据实际情况来确定
  await page.waitForSelector("#menujy",{timeout: 1000})
  var fnbx="dojo.query(\"#menujy li[title='报销管理']\")[0].click();";
  await page.evaluate(fnbx)
  var sqsq="dojo.query(\"#nav_sub>ul li[title='事前申请单'] div\")[0].click();";
  await page.evaluate(sqsq)
  var  jdfy="dojo.query(\"#nav_sub li[title='接待费用预算单'] div\")[0].click()"
  await page.evaluate(jdfy)
  var jdfyqc="dojo.query(\"#nav_sub li[title='接待费用预算单'] li[title='草稿中']>div\")[0].click()"
  await page.evaluate(jdfyqc)
  await page.waitFor(2000); //获取frames的时候 要等待，否则框架还没有更新
  const frames = await page.frames()
  const targetFrame = frames.find(frame => {
      console.log(frame.name())
    return frame.name() === 'iframecontent'
})
  console.log(targetFrame.url())
  const unfoldButton = "dojo.query(\"#btnContainer .btn-myview span>span\")[0].click()";
  targetFrame.$eval('#viewDisplay', e => console.log(e.innerText));
  await targetFrame.evaluate(unfoldButton)
  await page.screenshot({path: 'example2.png'});//截个图
  await page.waitFor(1000);     //获取新页面的时候要等待否则，新页签还没生成成功
  const page2 = ( await browser.pages() )[2];//得到所有窗口使用列表索引得到新的窗
  await page2.waitFor(1000); 
  await page2.type("input[name='fldLfdw_xm']","100")
  await page2.screenshot({path: 'example3.png'});//截个图
 //await browser.close();//关掉浏览器
})();