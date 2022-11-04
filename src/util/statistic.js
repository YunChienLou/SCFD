const missionStatsByPersonal = (cases) => {
  let result = [{ unit: "", name: "", uid: "", missionNum: 0 }];
  cases.forEach((el) => {
    if (
      result.filter((e) => {
        e.uid == el.uid;
      }).length > 0
    ) {
      //   let obj = result.find((e) => {
      //     return e.uid === el.uid;
      //   });

      console.log("此案執行人員已造冊");
      // 此案執行人員已造冊
    } else {
      // 此案執行人員未曾出現過
      result.push({ unit: el.unit, name: el.who, uid: el.uid, missionNum: 1 });
      console.log("此案執行人員未造冊");
    }
    console.log(result);
  });
};
const json = require("../assets/testJson.json");
missionStatsByPersonal(json);
