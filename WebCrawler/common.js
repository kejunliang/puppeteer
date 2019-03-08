const config = require('./config');
//根据配置数据批量设置域值


//根据选择器sel选择id为val的子项
async function setOption(page, sel, val) {
  await page.evaluate((sel, val) => {
    document.querySelector(`${sel} > option[value="${val}"]`).selected = true;
    element = document.querySelector(sel);
    var event = new Event('change', { bubbles: true });
    event.simulated = true;
    element.dispatchEvent(event);
  }, sel, val);
}

//在id为sel的输入框中输入val
async function setTextVal(page, sel, val) {
  await page.evaluate((sel, val) => {
    document.querySelector(sel).value = val;
    element = document.querySelector(sel);
    var event = new Event('change', { bubbles: true });
    event.simulated = true;
    element.dispatchEvent(event);
  }, sel, val);
}

//判断选择器是否存在
async function isExist(page, selector) {
  var is = await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) {
      return false;
    } else {
      return true;
    }
  }, selector);

  return is;
}

//导入单个配置
async function importSingleConfiguration(page, configType, configContent) {
  const confirmBtn = 'input[value="Confirm"]';
  const configTypeSel = '#edit-config-type';
  await setOption(page, configTypeSel, configType);
  await page.click('#edit-import');
  await setTextVal(page, '#edit-import', configContent);
  await page.click('#edit-submit');
  await page.waitForNavigation();

  const is = await isExist(page, confirmBtn);
  if (is) {
    await page.click(confirmBtn);
    await page.waitForNavigation();
    await page.waitFor(3 * config.stepWait);
  }
}

//设置checkbox中子项的值
async function setCheckBoxVal(page, sel, val) {
  await page.evaluate((sel, val) => {
    document.querySelector(sel).checked = val;
    element = document.querySelector(sel);
    var event = new Event('change', { bubbles: true });
    event.simulated = true;
    element.dispatchEvent(event);
  }, sel, val);
}

module.exports = {
  setOption: setOption,
  setTextVal: setTextVal,
  importSingleConfiguration: importSingleConfiguration,
  isExist: isExist,
  setCheckBoxVal: setCheckBoxVal,

}