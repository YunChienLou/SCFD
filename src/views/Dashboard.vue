<template>
  <div style="height: 100px"></div>
  <div v-if="isLoading" class="text-center my-5 text-white">
    <div class="h1 text-center">資料處理中 .....</div>
    <div
      class="spinner-border text-primary"
      style="width: 5rem; height: 5rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="">
    <div class="text-end fs-5 mb-4">
      <span class="me-3">統計模式 : </span>
      <!-- <div class="h1" v-if="displayMode =='week'">week</div>
      <div class="h1" v-if="displayMode =='month'">Month</div>
      <div class="h1" v-if="displayMode =='twoMonth'">twoMonth</div> -->
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="week"
          v-model="displayMode"
        />
        <label class="form-check-label" for="inlineRadio1">週</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="month"
          :disabled="isMonthExist"
          v-model="displayMode"
        />
        <label class="form-check-label" for="inlineRadio2">月</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio3"
          value="twoMonth"
          v-model="displayMode"
          :disabled="isTwoMonthExist"
        />
        <label class="form-check-label" for="inlineRadio3">2 個月</label>
      </div>
    </div>
    <div class="h1 transBg p-2 text-wrap">
      總排名
      <span class="h5" v-if="displayMode == 'week'"
        >{{
          TimeStampConverter(reportData?.weekReport?.time._seconds)
        }}
        更新</span
      >
      <span class="h5" v-if="displayMode == 'month'"
        >{{
          TimeStampConverter(reportData?.monthReport?.time._seconds)
        }}
        更新</span
      >
      <span class="h5" v-if="displayMode == 'twoMonth'"
        >{{
          TimeStampConverter(reportData?.twoMonthReport?.time._seconds)
        }}
        更新</span
      >
    </div>
    <div class="row my-4">
      <div class="col">
        <div class="h4">救護次數-單人組</div>
        <ul class="list-group" v-if="displayMode == 'week'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.weekReport
              ?.missionStatsByAllPersonal"
            :key="index"
          >
            {{ item.unit }} {{ item.name }} : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
        <ul class="list-group" v-if="displayMode == 'month'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.monthReport
              ?.missionStatsByAllPersonal"
            :key="index"
          >
            {{ item.unit }} {{ item.name }} : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
        <ul class="list-group" v-if="displayMode == 'twoMonth'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.twoMonthReport
              ?.missionStatsByAllPersonal"
            :key="index"
          >
            {{ item.unit }} {{ item.name }} : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="row my-4">
      <div class="col">
        <div class="h4">救護次數-分隊組</div>
        <ul class="list-group" v-if="displayMode == 'week'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.weekReport
              ?.missionStatsByAllUnit"
            :key="index"
          >
            {{ item.unit }}分隊 : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
        <ul class="list-group" v-if="displayMode == 'month'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.monthReport
              ?.missionStatsByAllUnit"
            :key="index"
          >
            {{ item.unit }}分隊 : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
        <ul class="list-group" v-if="displayMode == 'twoMonth'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.twoMonthReport
              ?.missionStatsByAllUnit"
            :key="index"
          >
            {{ item.unit }}分隊 : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="h1 transBg p-2 text-wrap">
      隊排名
      <span class="h5" v-if="displayMode == 'week'"
        >{{
          TimeStampConverter(reportData?.unitData?.week?.time._seconds)
        }}
        更新</span
      >
      <span class="h5" v-if="displayMode == 'month'"
        >{{
          TimeStampConverter(reportData?.unitData?.month?.time._seconds)
        }}
        更新</span
      >
      <span class="h5" v-if="displayMode == 'twoMonth'"
        >{{
          TimeStampConverter(reportData?.unitData?.twoMonth?.time._seconds)
        }}
        更新</span
      >
    </div>
    <div class="row my-4">
      <div class="col">
        <div class="h4">救護次數</div>
        <ul class="list-group" v-if="displayMode == 'week'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.unitData?.week
              ?.missionStatsByUnitPersonal"
            :key="index"
          >
            {{ item.name }} : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
        <ul class="list-group" v-if="displayMode == 'month'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.unitData?.month
              ?.missionStatsByUnitPersonal"
            :key="index"
          >
            {{ item.name }} : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
        <ul class="list-group" v-if="displayMode == 'twoMonth'">
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              bg-dark
              text-white
              border-white
            "
            v-for="(item, index) in reportData?.unitData?.twoMonth
              ?.missionStatsByUnitPersonal"
            :key="index"
          >
            {{ item.name }} : {{ item.missionNum }} 次
            <span v-if="index == 0" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal.png" /> 冠軍</span
            >
            <span v-if="index == 1" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-1.png" /> 亞軍</span
            >
            <span v-if="index == 2" class="badge bg-primary rounded-pill"
              ><img src="../../public/medal-2.png" /> 季軍</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="plot" v-if="displayMode == 'week'">
      <div class="row mb-4">
        <div class="col">
          <div class="h4">現場狀況 統計圖</div>
          <BarPlot
            :data="reportData?.unitData?.week?.treatmentStatsByUnit"
            :id="'現場狀況'"
            v-if="reportData != undefined"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <div class="h4">處置項目 統計圖</div>
          <BarPlot
            :data="reportData?.unitData?.week?.onSceneStatsByUnit"
            :id="'處置項目'"
            v-if="reportData != undefined"
          />
        </div>
      </div>
    </div>
    <div class="plot" v-if="displayMode == 'month'">
      <div class="row mb-4">
        <div class="col">
          <div class="h4">現場狀況 統計圖</div>
          <BarPlot
            :data="reportData?.unitData?.month?.treatmentStatsByUnit"
            :id="'現場狀況'"
            v-if="reportData != undefined"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <div class="h4">處置項目 統計圖</div>
          <BarPlot
            :data="reportData?.unitData?.month?.onSceneStatsByUnit"
            :id="'處置項目'"
            v-if="reportData != undefined"
          />
        </div>
      </div>
    </div>
    <div class="plot" v-if="displayMode == 'twoMonth'">
      <div class="row mb-4">
        <div class="col">
          <div class="h4">現場狀況 統計圖</div>
          <BarPlot
            :data="reportData?.unitData?.twoMonth?.treatmentStatsByUnit"
            :id="'現場狀況'"
            v-if="reportData != undefined"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <div class="h4">處置項目 統計圖</div>
          <BarPlot
            :data="reportData?.unitData?.twoMonth?.onSceneStatsByUnit"
            :id="'處置項目'"
            v-if="reportData != undefined"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { unitNameEnum } from "@/util/Enum";
import { TimeStampConverter } from "@/util/TimeStampConverter";
import BarPlot from "../components/BarPlot.vue";
export default {
  name: "Dashboard",
  components: { BarPlot },
  setup() {
    const $ReportAPI = inject("$ReportAPI");
    const isLoading = ref(false);
    const displayMode = ref("week");
    const isWeekExist = computed(() => {
      if (reportData.value.weekReport) {
        return true;
      } else {
        return false;
      }
    });
    const isMonthExist = computed(() => {
      if (reportData.value.monthReport) {
        return true;
      } else {
        return false;
      }
    });
    const isTwoMonthExist = computed(() => {
      if (reportData.value.twoMonthReport) {
        return true;
      } else {
        return false;
      }
    });
    // const isTwoMonthExist = ref();
    const store = useStore();

    const tokenVuex = computed(() => {
      return store.state.token;
    });
    const unitVuex = computed(() => {
      return store.state.unit;
    });

    const reportData = ref({});
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
        isLoading.value = true;
        $ReportAPI
          .getReports(data, tokenVuex.value)
          .then((res) => {
            reportData.value = res.data.result;
            isLoading.value = false;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    watch(tokenVuex, () => {
      loadReportData();
    });
    onMounted(() => {
      loadReportData();
    });

    return {
      reportData,
      isLoading,
      unitVuex,
      tokenVuex,
      onSceneStatsAll,
      missionStatsByAllPersonal,
      treatmentStatsAll,
      missionStatsByAllUnit,
      weekUnitData,
      monthUnitData,
      twoMonthUnitData,
      TimeStampConverter,
      displayMode,
      isWeekExist,
      isMonthExist,
      isTwoMonthExist,
    };
  },
};
</script>
