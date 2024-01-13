const puppeteer = require('puppeteer');

exports.pupp = async function pupp(data) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    
    async function getDataFromSelector(selector) {
        let title;
        try {
            const sel = await page.waitForSelector(selector, {timeout: 2000});
            title = await sel?.evaluate(el => el.textContent);
        } catch(err) {
            title = 'NOT FOUND'
        }
        return title;
    }

    for( i=0; i < data.length; i++){

        const mySearchText = data[i]['PRODUCT NAME'].replace(' ', '%20')


        await page.goto(`https://www.neptunecigar.com/search?text=${mySearchText}`, {waitUntil: 'networkidle0'});

        await page.setViewport({width: 1080, height: 1024});

        const title = await getDataFromSelector('#listProducts > div:nth-child(1) > div.product_primary_info > span:nth-child(1) > a > h2')
        
        /* Add Logic to evaluate strings

        */
        await page.click('#listProducts > div:nth-child(1) > div.product_primary_info > span:nth-child(1) > a > h2')

        const description = await getDataFromSelector('#pr_tabDesc > div.pr_divContent.pr_enhanced > p');
        data[i]['SHORT DESCRIPTION'] = description

        const shape = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(2) > div:nth-child(2) > div.onHover');
        data[i]['SHAPE'] = shape

        const Length = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(4) > div:nth-child(2) > div.onHover');
        data[i]['CIGAR LENGTH (INCHES)'] = Length

        const Origin = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(5) > div:nth-child(2) > div.onHover');
        data[i]['CIGAR ORIGIN (MADE IN WHICH COUNTRY)'] = Origin

        const ringGuage = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(6) > div:nth-child(2) > div.onHover');
        data[i]['RING SIZE (1/64 INCHES)'] = ringGuage

        const manufacturer = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(11) > div:nth-child(2) > div.onHover');
        data[i]['MANUFACTURER NAME'] = manufacturer

        const wrapper = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(12) > div:nth-child(2) > div.onHover');
        data[i]['WRAPPER ORIGIN'] = wrapper

        const Filler = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(14) > div:nth-child(2) > div.onHover');
        data[i]['FILLER ORIGIN'] = Filler

        const binder = await getDataFromSelector('#pr_tabSpec > div.pr_divContent.pr_enhanced > ul > li:nth-child(13) > div:nth-child(2) > div.onHover');
        data[i]['BINDER ORIGIN'] = binder

        const strength = await getDataFromSelector('#strengthCursor > div');
        data[i]['STRENGTH'] = strength
    }

    await browser.close()

    console.log('Browser Closed Bye !!')
    return data;
}