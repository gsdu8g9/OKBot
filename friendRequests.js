const puppeteer = require('puppeteer');

let bot = async () => {
    const browser = await puppeteer.launch({headless: false});    
    const siteOK = await browser.newPage();
    await siteOK.goto('https://ok.ru/');
    await siteOK.waitFor(1000);

    let EMAIL = "YOUR_NUMBER_PHONE_OR_EMAIL";
    let PASSWORD = "YOUR_PASSWORD_FOR_ACCOUNT";
    
    await siteOK.evaluate((EMAIL, PASSWORD) => {
        document.querySelector("#field_email").value = EMAIL;
        document.querySelector("#field_password").value = PASSWORD;
        document.querySelector("#anonymPageContent > div.anonym_login_w > div > div:nth-child(3) > form > div.form-actions > div:nth-child(1) > input").click();
    }, EMAIL, PASSWORD);
    console.log("Авторизовались..");

    const friendRequest = await browser.newPage();    
    await friendRequest.goto('https://ok.ru/profile/YOUR_ID_PAGE/friendRequests');
    await friendRequest.waitFor(5000);
    console.log("Зашли на страницу с заявками в друзья..");
    await friendRequest.reload();
    console.log("Перезагрузили страницу..");
    
    siteOK.close();
    console.log("Закрыли главную страницу..");
    
    console.log ("Добавляем вам немного друзей ^_^ ")
    while (true){
        await friendRequest.evaluate(() => {
            for (let i = 0; i < 12; i++){    
                const buttonAccept = document.getElementsByClassName('js-entity-accept button-pro __small mr-2x')[i];
                buttonAccept.click();   
            }
        });
        await friendRequest.reload();
    }
}; 
bot(() => {
    console.log("Work !"); // Получилось!
});
