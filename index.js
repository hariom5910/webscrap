const cheerio = require('cheerio');
const request= require('request-promise');
const json2csv = require('json2csv').Parser;
const fs= require('fs');


const record="https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020";

(async()=>{
    let data =[];
    const t=response=await request({

        uri:record,
        headers:{

            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"Accept-Encoding": "gzip, deflate", br,
"Accept-Language": "en-US,en;q=0.9"

        },
        gzip:true,
    });

    let $=cheerio.load(response);
    let publicationDate=$('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(1) > font > font').text.trim();
    let object=$('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > p:nth-child(6) > font > font').text.trim();
    let biddingDate=$('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(19) > font > font').text.trim();

    data.push({
publicationDate,
object,
biddingDate

    });
    const j2cp = new json2csv();
    const csv= j2cp.parse(data);

    fs.writeFileSync("./reportdetails.csv",csv,"uft-8");

})
