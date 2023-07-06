const http = require("http");
const axios = require("axios");
const moment = require("moment/moment");
let resOBJ = {
  kishDate: false,
  kishMenu: false,
  priyaDate: false,
  priyaMenu: false,
};
const instance = axios.create({
  baseURL: "https://reserve.tpfsoftware.com/tpfSoftware",
});
const date = new Date();
http
  .createServer(async (req, res) => {
    if (
      moment(date).add(1, "d").weekday() != 0 &&
      moment(date).add(1, "d").weekday() != 6 &&
      moment(date).add(1, "d").weekday() != 7
    ) {
      try {
        const kishDates = await instance.post("/updateDates", {
          employeeNumber: "573",
          datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
        });
        if (kishDates) {
          resOBJ = { ...resOBJ, kishDate: true };
        }
        const kishMenu = await instance.post("/updateFoods", [
          {
            employeeNumber: "573",
            date: moment(date).format("YYYY-MM-DD"),
            breakfast: "breakfast",
            lunch: "lunch",
            snacks: "snacks",
          },
          {
            employeeNumber: "573",
            date: moment(date).add(1, "d").format("YYYY-MM-DD"),
            breakfast: "breakfast",
            lunch: "lunch",
            snacks: "snacks",
          },
        ]);
        if (kishMenu) {
          resOBJ = { ...resOBJ, kishMenu: true };
        }
        const priyaDates = await instance.post("/updateDates", {
          employeeNumber: "493",
          datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
        });
        if (priyaDates) {
          resOBJ = { ...resOBJ, priyaDate: true };
        }
        const priyaMenu = await instance.post("/updateFoods", [
          {
            employeeNumber: "493",
            date: moment(date).format("YYYY-MM-DD"),
            breakfast: "breakfast",
            lunch: "lunch",
            snacks: "snacks",
          },
          {
            employeeNumber: "493",
            date: moment(date).add(1, "d").format("YYYY-MM-DD"),
            breakfast: "breakfast",
            lunch: "lunch",
            snacks: "snacks",
          },
        ]);
        if (priyaMenu) {
          resOBJ = { ...resOBJ, priyaMenu: true };
        }
        const gopikaDates = await instance.post("/updateDates", {
          employeeNumber: "487",
          datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
        });
        if (gopikaDates) {
          resOBJ = { ...resOBJ, gopikaDates: true };
        }
        const gopikaMenu = await instance.post("/updateFoods", [
          {
            employeeNumber: "487",
            date: moment(date).format("YYYY-MM-DD"),
            breakfast: "breakfast",
            lunch: "lunch",
            snacks: "snacks",
          },
          {
            employeeNumber: "487",
            date: moment(date).add(1, "d").format("YYYY-MM-DD"),
            breakfast: "breakfast",
            lunch: "lunch",
            snacks: "snacks",
          },
        ]);
        if (gopikaMenu) {
          resOBJ = { ...resOBJ, gopikaMenu: true };
        }
        res.writeHead(200);
        // res.json(resOBJ);
      } catch (e) {
        console.log(e);
        res.writeHead(500);
        // res.json();
      }
    }
    res.end(JSON.stringify(resOBJ));
  })
  .listen(8082);

// fetch("https://reserve.tpfsoftware.com/tpfSoftware/updateDates", {
//   headers: {
//     accept: "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/json",
//     "sec-ch-ua":
//       '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Windows"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site",
//     Referer: "https://reservation.tpfsoftware.com/",
//     "Referrer-Policy": "strict-origin-when-cross-origin",
//   },
//   body: '{"employeeNumber":"573","datesList":["2023-07-07"]}',
//   method: "POST",
// });

// fetch("https://reserve.tpfsoftware.com/tpfSoftware/updateFoods", {
//   headers: {
//     accept: "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/json",
//     "sec-ch-ua":
//       '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Windows"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site",
//     Referer: "https://reservation.tpfsoftware.com/",
//     "Referrer-Policy": "strict-origin-when-cross-origin",
//   },
//   body: '[{"employeeNumber":"573","date":"2023-07-06","breakfast":"breakfast","lunch":"lunch","snacks":"snacks"},{"employeeNumber":"573","date":"2023-07-07","breakfast":"breakfast","lunch":"lunch","snacks":"snacks"}]',
//   method: "POST",
// });
