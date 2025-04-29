// const puppeteer = require("puppeteer");

// module.exports = async function parseBmsTicket(url) {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });

//   const page = await browser.newPage();
//   await page.setUserAgent(
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
//   );

//   await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//   const pageContent = await page.content();

//   await browser.close();

//   return pageContent;
// };

// // usage
// async function main() {
//   const parseBmsTicket = require("./parseBmsTicket"); // Replace with your actual filename
//   const ticketPage = await parseBmsTicket(
//     "https://bmsurl.co/BMSTNY/Ost2JIxv3z"
//   );
//   console.log(ticketPage);
// }

// main();
