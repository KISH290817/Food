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
var log4js = require("log4js");

log4js.configure({
  appenders: { cheese: { type: "file", filename: "reservation.log" } },
  categories: { default: { appenders: ["cheese"], level: "info" } },
});
var logger = log4js.getLogger("reservation");
console.log(new Date());
const date = new Date();
const schedule = require("node-schedule");
const job = schedule.scheduleJob("00 00 11 * * *", async function () {
  console.log(new Date(), "The answer to life, the universe, and everything!");
  if (
    moment(date).add(1, "d").weekday() != 0 &&
    moment(date).add(1, "d").weekday() != 6
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
      const samDates = await instance.post("/updateDates", {
        employeeNumber: "521",
        datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
      });
      if (samDates) {
        resOBJ = { ...resOBJ, samDates: true };
      }
      const samMenu = await instance.post("/updateFoods", [
        {
          employeeNumber: "521",
          date: moment(date).format("YYYY-MM-DD"),
          breakfast: "breakfast",
          lunch: "lunch",
          snacks: "snacks",
        },
        {
          employeeNumber: "521",
          date: moment(date).add(1, "d").format("YYYY-MM-DD"),
          breakfast: "breakfast",
          lunch: "lunch",
          snacks: "snacks",
        },
      ]);
      if (samMenu) {
        resOBJ = { ...resOBJ, samMenu: true };
      }
      logger.info({
        date: new Date(),
        data: "Success",
        people: resOBJ,
      });
      // res.json(resOBJ);
    } catch (e) {
      console.log(e);
      logger.log({ date: new Date(), error: e, data: "Something went wrong!" });
      // res.writeHead(500);
      // res.json();
    }
  } else {
    logger.log({
      date: new Date(),
      error: "Week End",
      data: "Something went wrong!",
    });
  }
});
// http
//   .createServer(async (req, res) => {
//     if (
//       moment(date).add(1, "d").weekday() != 0 &&
//       moment(date).add(1, "d").weekday() != 6 &&
//       moment(date).add(1, "d").weekday() != 7
//     ) {
//       try {
//         const kishDates = await instance.post("/updateDates", {
//           employeeNumber: "573",
//           datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
//         });
//         if (kishDates) {
//           resOBJ = { ...resOBJ, kishDate: true };
//         }
//         const kishMenu = await instance.post("/updateFoods", [
//           {
//             employeeNumber: "573",
//             date: moment(date).format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//           {
//             employeeNumber: "573",
//             date: moment(date).add(1, "d").format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//         ]);
//         if (kishMenu) {
//           resOBJ = { ...resOBJ, kishMenu: true };
//         }
//         const priyaDates = await instance.post("/updateDates", {
//           employeeNumber: "493",
//           datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
//         });
//         if (priyaDates) {
//           resOBJ = { ...resOBJ, priyaDate: true };
//         }
//         const priyaMenu = await instance.post("/updateFoods", [
//           {
//             employeeNumber: "493",
//             date: moment(date).format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//           {
//             employeeNumber: "493",
//             date: moment(date).add(1, "d").format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//         ]);
//         if (priyaMenu) {
//           resOBJ = { ...resOBJ, priyaMenu: true };
//         }
//         const gopikaDates = await instance.post("/updateDates", {
//           employeeNumber: "487",
//           datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
//         });
//         if (gopikaDates) {
//           resOBJ = { ...resOBJ, gopikaDates: true };
//         }
//         const gopikaMenu = await instance.post("/updateFoods", [
//           {
//             employeeNumber: "487",
//             date: moment(date).format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//           {
//             employeeNumber: "487",
//             date: moment(date).add(1, "d").format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//         ]);
//         if (gopikaMenu) {
//           resOBJ = { ...resOBJ, gopikaMenu: true };
//         }
//         const samDates = await instance.post("/updateDates", {
//           employeeNumber: "521",
//           datesList: [moment(date).add(1, "d").format("YYYY-MM-DD")],
//         });
//         if (samDates) {
//           resOBJ = { ...resOBJ, samDates: true };
//         }
//         const samMenu = await instance.post("/updateFoods", [
//           {
//             employeeNumber: "521",
//             date: moment(date).format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//           {
//             employeeNumber: "521",
//             date: moment(date).add(1, "d").format("YYYY-MM-DD"),
//             breakfast: "breakfast",
//             lunch: "lunch",
//             snacks: "snacks",
//           },
//         ]);
//         if (samMenu) {
//           resOBJ = { ...resOBJ, samMenu: true };
//         }
//         res.writeHead(200);
//         // res.json(resOBJ);
//       } catch (e) {
//         console.log(e);
//         res.writeHead(500);
//         // res.json();
//       }
//     }
//     res.end(JSON.stringify(resOBJ));
//   })
//   .listen(8082);
