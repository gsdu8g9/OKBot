const puppeteer = require('puppeteer');
let bot = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://ok.ru/');
    await page.click('#anonymPageContent > div.anonym_login_w > div > div:nth-child(3) > form > div.form-actions > div:nth-child(1) > input');
    await page.waitFor(1000);
    
    let email = "+79035512844";
    let password = "AgSvyazi2844";
    
    await page.evaluate((email, password) => {
        document.querySelector("#field_email").value = email;
        document.querySelector("#field_password").value = password;
        document.querySelector("#anonymPageContent > div.anonym_login_w > div > div:nth-child(3) > form > div.form-actions > div:nth-child(1) > input").click();
    }, email, password);
}; 
bot().then((value) => {
    console.log(value); // Получилось!
});