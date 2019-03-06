async function setInputValue(page,item,value){
    console.log(item)
    await page.waitForSelector("input[name='"+item+"']",{timeout: 5000}).then(()=>{
        page.type("input[name='"+item+"']",value);
    }) 
}

module.exports={
    setInputValue:setInputValue
}