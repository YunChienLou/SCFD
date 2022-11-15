<template>
  <div style="height: 100px"></div>
  <div class="h1 transBg p-2 text-wrap">總排名 {{TimeStampConverter(reportData?.weekReport?.time._seconds)}}</div>
  <div class="row my-4">
    <div class="col">
      <div class="h4">救護次數-單人組</div>
      <ul class="list-group">
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
          v-for="(item, index) in reportData?.weekReport?.missionStatsByAllPersonal"
          :key="index"
        >
          {{ item.unit }} {{ item.name }} : {{ item.missionNum }} 次
          <span v-if="index==0" class="badge bg-primary rounded-pill"
            ><img src="../../public/medal.png" /> 冠軍</span
          >
          <span v-if="index==1" class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-1.png" /> 亞軍</span
          >
          <span v-if="index==2" class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-2.png" /> 季軍</span
          >
        </li>
      </ul>
    </div>
    <div class="col">
      <div class="h4">救護次數-分隊組</div>
      <ul class="list-group">
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
          v-for="(item, index) in reportData?.weekReport?.missionStatsByAllUnit"
          :key="index"
        >
          {{ item.unit }}分隊 : {{ item.missionNum }} 次
          <span v-if="index==0" class="badge bg-primary rounded-pill"
            ><img src="../../public/medal.png" /> 冠軍</span
          >
          <span v-if="index==1" class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-1.png" /> 亞軍</span
          >
          <span v-if="index==2" class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-2.png" /> 季軍</span
          >
        </li>
      </ul>

    </div>
  </div>

  <div class="h1 transBg p-2 text-wrap">隊排名 {timeStamps}</div>
  <div class="row my-4">
    <div class="col">
      <div class="h4">救護次數</div>
      <ul class="list-group">
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal.png" /> 冠軍</span
          >
        </li>
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A second list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-1.png" /> 亞軍</span
          >
        </li>
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A third list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-2.png" /> 季軍</span
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col">
      <div class="h4">OHCA 次數</div>
      <ul class="list-group">
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal.png" /> 冠軍</span
          >
        </li>
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A second list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-1.png" /> 亞軍</span
          >
        </li>
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A third list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-2.png" /> 季軍</span
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col">
      <div class="h4">警消出勤</div>
      <ul class="list-group">
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal.png" /> 冠軍</span
          >
        </li>
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A second list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-1.png" /> 亞軍</span
          >
        </li>
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
        >
          A third list item
          <span class="badge bg-primary rounded-pill"
            ><img src="../../public/medal-2.png" /> 季軍</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, inject, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { unitNameEnum } from "@/util/Enum";
import { TimeStampConverter } from "@/util/TimeStampConverter";
export default {
  name: "Dashboard",
  setup() {
    const $ReportAPI = inject("$ReportAPI");
    const store = useStore();
    const data = ref();
    // const userGetData = ref();
    const tokenVuex = computed(() => {
      return store.state.token;
    });
    const unitVuex = computed(() => {
      return store.state.unit;
    });
    const reportData = ref();
    const onSceneStatsAll = ref();
    const missionStatsByAllPersonal = ref();
    const treatmentStatsAll = ref();
    const missionStatsByAllUnit = ref();
    const weekUnitData = ref();
    const monthUnitData = ref();
    const twoMonthUnitData = ref();

    const loadReportData = () => {
      let data = {
        data: {
          unit: unitNameEnum[unitVuex.value],
        },
      };
      if (tokenVuex.value != undefined && unitVuex.value != undefined) {
        console.log("run api", tokenVuex.value, unitVuex.value);
        $ReportAPI
          .getReports(data, tokenVuex.value)
          .then((res) => {
            reportData.value = res.data.result;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    watch(tokenVuex, () => {
      loadReportData();
      console.log("watch reportData", reportData);
      console.log("watch loadReportData");
    });
    onMounted(async () => {
      console.log("onMounted loadReportData");
      loadReportData();
      console.log("onMounted reportData", reportData);
    });

    return {
      reportData,
      data,
      unitVuex,
      tokenVuex,
      onSceneStatsAll,
      missionStatsByAllPersonal,
      treatmentStatsAll,
      missionStatsByAllUnit,
      weekUnitData,
      monthUnitData,
      twoMonthUnitData,
      TimeStampConverter
    };
  },
};
</script>
