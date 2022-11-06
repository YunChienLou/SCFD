const missionStatsByPersonal = (cases) => {
  let ResultStats = {
    //總排名
    missionStatsByAllPersonal: [],
    missionStatsByAllUnit: [],
    //隊排名
    missionStatsByUnitPersonal: [],
  };
  let missionStatsAll = [];
  cases.forEach((el) => {
    if (missionStatsAll.find((e) => e.uid == el.uid)) {
      let obj = missionStatsAll.find((e) => {
        return e.uid === el.uid;
      });
      obj.missionNum += 1;
      // console.log("此案執行人員已造冊");
      // 此案執行人員已造冊
    } else {
      // 此案執行人員未曾出現過
      missionStatsAll.push({
        unit: el.unit,
        name: el.who,
        uid: el.uid,
        missionNum: 1,
      });
      // console.log("此案執行人員未造冊", missionStatsAll);
    }
  });
  // missionStatsAll 即是 三大所有人 的勤務數量表
  // 按照分隊歸類成 一個 Array 再跑一次 即可得到各分隊 排名
  let missionStatsSortByUnit = {};
  missionStatsAll.forEach((person) => {
    let thisPersonsUnit = person.unit;
    if (person.unit in missionStatsSortByUnit) {
      missionStatsSortByUnit[thisPersonsUnit].push(person);
    } else {
      missionStatsSortByUnit[thisPersonsUnit] = [];
      missionStatsSortByUnit[thisPersonsUnit].push(person);
    }
  });
  // console.log("按照分隊 分出 個人統計結果", missionStatsSortByUnit);

  Object.keys(missionStatsSortByUnit).forEach((key) => {
    missionStatsSortByUnit[key] = missionNumTopN(
      missionStatsSortByUnit[key],
      3
    );
  });
  // console.log("各分隊 救護前三名", missionStatsSortByUnit);
  ResultStats.missionStatsByUnitPersonal = missionStatsSortByUnit;

  // console.log("三大 個人 救護前三名: ", missionNumTopN(missionStatsAll, 3));
  ResultStats.missionStatsByAllPersonal = missionNumTopN(missionStatsAll, 3);

  let missionStatsByUnit = [];
  missionStatsAll.forEach((person) => {
    if (missionStatsByUnit.find((e) => e.unit == person.unit)) {
      let obj = missionStatsByUnit.find((e) => {
        return e.unit == person.unit;
      });
      obj.missionNum += person.missionNum;
    } else {
      missionStatsByUnit.push({ unit: person.unit, missionNum: 1 });
    }
  });
  ResultStats.missionStatsByAllUnit = missionNumTopN(missionStatsByUnit, 3);

  // console.log("三大各分隊 統計結果: ", missionNumTopN(missionStatsByUnit, 3));
  return ResultStats;
};

const missionNumTopN = (arr, n) => {
  return arr
    .slice()
    .sort((a, b) => {
      return b.missionNum - a.missionNum;
    })
    .slice(0, n);
};

const onSceneStats = (cases) => {
  let result = {
    onSceneStatsAll: {},
    onSceneStatsByUnit: {},
  };
  result.onSceneStatsByUnit = {};
  cases.forEach((Case) => {
    if (Case.unit in result.onSceneStatsByUnit) {
      // console.log("此分隊已造冊");
    } else {
      result.onSceneStatsByUnit[Case.unit] = {};
      // console.log("此分隊未造冊");
    }
    Case.onScene.forEach((el) => {
      if (el in result.onSceneStatsByUnit[Case.unit]) {
        result.onSceneStatsByUnit[Case.unit][el] += 1;
        // console.log("已有此統計項目");
      } else {
        result.onSceneStatsByUnit[Case.unit][el] = 1;
        // console.log("尚未有此統計項目");
      }
    });
  });

  Object.values(result.onSceneStatsByUnit).forEach((unit) => {
    // console.log(Object.entries(unit), "this is units");
    Object.entries(unit).forEach((scene) => {
      if (scene[0] in result.onSceneStatsAll) {
        result.onSceneStatsAll[scene[0]] += scene[1];
      } else {
        result.onSceneStatsAll[scene[0]] = scene[1];
      }
    });
  });
  return result;
};

const treatmentStats = (Cases) => {
  let result = {
    treatmentStatsAll: {},
    treatmentStatsByUnit: {},
  };
  result.treatmentStatsByUnit = {};
  Cases.forEach((Case) => {
    if (Case.unit in result.treatmentStatsByUnit) {
      // console.log("此分隊已造冊");
    } else {
      result.treatmentStatsByUnit[Case.unit] = {};
      // console.log("此分隊未造冊");
    }
    Case.treatment.forEach((el) => {
      if (el in result.treatmentStatsByUnit[Case.unit]) {
        result.treatmentStatsByUnit[Case.unit][el] += 1;
        // console.log("已有此統計項目");
      } else {
        result.treatmentStatsByUnit[Case.unit][el] = 1;
        // console.log("尚未有此統計項目");
      }
    });
  });

  Object.values(result.treatmentStatsByUnit).forEach((unit) => {
    // console.log(Object.entries(unit), "this is units");
    Object.entries(unit).forEach((scene) => {
      if (scene[0] in result.treatmentStatsAll) {
        result.treatmentStatsAll[scene[0]] += scene[1];
      } else {
        result.treatmentStatsAll[scene[0]] = scene[1];
      }
    });
  });
  return result;
};

const json = require("../assets/testJson.json");
const MissionStatsResult = missionStatsByPersonal(json);
const OnSceneStatsResult = onSceneStats(json);
const treatmentStatsResult = treatmentStats(json);
console.log("OnSceneStatsResult", OnSceneStatsResult);
console.log("treatmentStatsResult", treatmentStatsResult);
console.log("MissionStatsResult", MissionStatsResult);
