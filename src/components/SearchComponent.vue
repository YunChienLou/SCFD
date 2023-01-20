<template>
  <div class="container searchComponent" id="Search">
    <form class="mt-5 row g-3">
      <div class="col-4">
        <select
          class="form-select dropdown-menu-dark"
          aria-label="Default select"
          v-model="keyCatagory"
        >
          <option selected>選擇搜索項目</option>
          <option value="who">姓名</option>
          <option value="time">時間</option>
          <option value="unit">單位</option>
          <!-- <option value="onScene">現場狀況</option> -->
          <option value="otherContent">案件補述</option>
        </select>
      </div>
      <div class="col-5">
        <input
          v-if="keyCatagory === 'treatment'"
          type="text"
          class="form-control"
          placeholder="關鍵字"
          v-model="keyValue"
        />
        <div class="onScene" v-if="keyCatagory === 'onScene'">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="col btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#SceneModal"
          >
            勾選條件
          </button>

          <!-- Modal -->
          <div
            class="modal fade text-dark"
            id="SceneModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    現場狀況(可複選)
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="list-group">
                    <label class="fs-4 fw-bold">非創傷</label>
                    <ul class="p-0">
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="呼吸問題（喘／呼吸急促）"
                          v-model="keyValue"
                        />呼吸問題（喘／呼吸急促）
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="呼吸道問題（異物哽塞）"
                          v-model="keyValue"
                        />呼吸道問題（異物哽塞）
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="胸痛／悶"
                          v-model="keyValue"
                        />胸痛／悶
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="腹痛"
                          v-model="keyValue"
                        />腹痛
                      </li>
                      <li class="list-group-item">
                        <p>一般疾病</p>
                        <ul class="list-group">
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="頭痛／頭暈／昏倒／昏厥"
                              v-model="keyValue"
                            />頭痛／頭暈／昏倒／昏厥
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="發燒"
                              v-model="keyValue"
                            />發燒
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="噁心／嘔吐／腹瀉"
                              v-model="keyValue"
                            />噁心／嘔吐／腹瀉
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="肢體無力"
                              v-model="keyValue"
                            />肢體無力
                          </li>
                        </ul>
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="疑似毒藥物中毒"
                          v-model="keyValue"
                        />疑似毒藥物中毒
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="疑似一氧化碳中毒"
                          v-model="keyValue"
                        />疑似一氧化碳中毒
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="癲癇／抽搐"
                          v-model="keyValue"
                        />癲癇／抽搐
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="路倒"
                          v-model="keyValue"
                        />路倒
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="行為急症/精神異常"
                          v-model="keyValue"
                        />行為急症/精神異常
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="孕婦急產"
                          v-model="keyValue"
                        />孕婦急產
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="溺水"
                          v-model="keyValue"
                        />溺水
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="到院前心肺功能停止"
                          v-model="keyValue"
                        />到院前心肺功能停止
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="其他非創傷機轉"
                          v-model="keyValue"
                        />其他
                      </li>
                    </ul>
                    <label class="fs-4 fw-bold">創傷</label>
                    <ul class="p-0">
                      <li class="list-group-item">
                        <p>一般外傷</p>
                        <ul class="list-group">
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="頭部外傷"
                              v-model="keyValue"
                            />頭部外傷
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="胸部外傷"
                              v-model="keyValue"
                            />胸部外傷
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="腹部外傷"
                              v-model="keyValue"
                            />腹部外傷
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="背部外傷"
                              v-model="keyValue"
                            />背部外傷
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="肢體外傷"
                              v-model="keyValue"
                            />肢體外傷
                          </li>
                        </ul>
                      </li>
                      <div class="list-group-item">
                        <p>受傷機轉</p>
                        <ul class="list-group">
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="因交通事故"
                              v-model="keyValue"
                            />因交通事故
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="非交通事故"
                              v-model="keyValue"
                            />非交通事故
                          </li>
                        </ul>
                      </div>
                      <div class="list-group-item">
                        <p>事故類別(以傷病患為主)</p>
                        <ul class="list-group">
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="汽車"
                              v-model="keyValue"
                            />汽車
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="機車"
                              v-model="keyValue"
                            />機車
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="腳踏車"
                              v-model="keyValue"
                            />腳踏車
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="行人"
                              v-model="keyValue"
                            />行人
                          </li>
                          <li class="list-group-item list-group-item-secondary">
                            <input
                              type="checkbox"
                              value="其他交通事故"
                              v-model="keyValue"
                            />其他
                          </li>
                        </ul>
                      </div>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="墜落傷"
                          v-model="keyValue"
                        />墜落傷
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="肢體疼痛"
                          v-model="keyValue"
                        />肢體疼痛
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="挫傷"
                          v-model="keyValue"
                        />挫傷
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="血腫"
                          v-model="keyValue"
                        />血腫
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="穿刺傷"
                          v-model="keyValue"
                        />穿刺傷
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="燒燙傷"
                          v-model="keyValue"
                        />燒燙傷
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="電擊傷"
                          v-model="keyValue"
                        />電擊傷
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="生物咬螫傷"
                          v-model="keyValue"
                        />生物咬螫傷
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="到院前心肺功能停止"
                          v-model="keyValue"
                        />到院前心肺功能停止
                      </li>
                      <li class="list-group-item">
                        <input
                          type="checkbox"
                          value="其他創傷機轉"
                          v-model="keyValue"
                        />其他
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button>
                  <!-- <button type="button" class="btn btn-primary">儲存</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          v-if="keyCatagory == 'who' || keyCatagory == 'otherContent'"
          type="text"
          class="form-control"
          placeholder="關鍵字"
          v-model="keyValue"
        />
        <select
          class="form-select dropdown-menu-dark"
          aria-label="Default select"
          v-model="keyValue"
          v-if="keyCatagory == 'unit'"
        >
          <option>選擇搜索項目</option>
          <option value="蘆洲">蘆洲</option>
          <option value="成功">成功</option>
          <option value="三重">三重</option>
          <option value="重陽">重陽</option>
          <option value="慈福">慈福</option>
          <option value="二重">二重</option>
          <option value="龍源">龍源</option>
          <option value="淡水">淡水</option>
          <option value="竹圍">竹圍</option>
          <option value="三芝">三芝</option>
          <option value="滬尾">滬尾</option>
        </select>
        <div class="timePeriodSelector" v-if="keyCatagory === 'time'">
          <input
            type="date"
            class="form-control"
            id="inputPassword2"
            v-model="startTime"
          />
          <input
            type="date"
            class="form-control"
            id="inputPassword2"
            v-model="endTime"
          />
        </div>
      </div>
      <div class="col-3">
        <button
          type="submit"
          class="btn btn-danger mb-3"
          @click.prevent="do_unit_search()"
          v-if="keyCatagory == 'unit'"
        >
          搜索
        </button>
        <button
          type="submit"
          class="btn btn-danger mb-3"
          @click.prevent="do_time_period_search()"
          v-if="keyCatagory == 'time'"
        >
          搜索
        </button>
        <button
          type="submit"
          class="btn btn-primary mb-3"
          @click.prevent="do_search()"
          v-if="keyCatagory == 'who' || keyCatagory == 'otherContent'"
        >
          搜索
        </button>
      </div>
    </form>
    <hr />
    <div class="row" v-if="searchList.length == 0">
      <div class="h1 text-center">未搜索到任何項目</div>
    </div>
    <div class="row" v-if="searchList.length >= 0 && keyCatagory == 'time'">
      時間區段: "{{ startTime }} ~ {{ endTime }}" ；共搜索到{{
        searchList.length
      }}個結果
    </div>
    <div class="" v-else>
      關鍵字: "{{ keyValueDisplay }}" ；共搜索到{{ searchList.length }}個結果
    </div>
    <div
      class="card text-white bg-dark m-4 rounded-3"
      v-for="{
        id,
        treatment,
        onScene,
        time,
        who,
        rank,
        patient,
        location,
        selectedParts,
        otherContent,
        unit,
        emtlevel,
        tp,
        vital,
        hospital,
      } in searchList"
      :key="id"
    >
      <div class="card-header transBg fw-bold fs-4">
        {{ dateFormate(time) }}<br />{{ unit }}{{ emtlevel }} {{ who }} {{ rank
        }}<br />患者人數 : {{ patient }}
      </div>
      <div class="card-body transBg2">
        <div class="row mb-3">
          <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
              <g
                id="左肩大臂"
                class="cls-1"
                :class="classAppend(selectedParts, '左肩大臂')"
              >
                <path
                  id="左肩大臂-2"
                  data-name="左肩大臂"
                  d="M180.18,66s11.19,2.25,13.5,12.19,1.58,35.24,1.58,35.24-3.28,7.29-11.43,2.39c0,0-5.83-14.44-3.65-29.15C180.18,86.69,185.05,77.81,180.18,66Z"
                />
              </g>
              <g
                id="左腳掌"
                class="cls-1"
                :class="classAppend(selectedParts, '左腳掌')"
              >
                <path
                  id="左腳掌-2"
                  data-name="左腳掌"
                  d="M163.89,274.3a14.73,14.73,0,0,0,6.18,8.83s.62,3.53-3.09,1.15l-.29-.24a.42.42,0,0,0-.68.3c-.07,1.2-.5,2.92-2.67-.14a0,0,0,0,0-.05,0c.1.55.44,2.83-1.1,1.7a5.7,5.7,0,0,1-1.49-2.06c-.14-.25-.59-.53-.47-.27,1.1,2.26-1.82,4.79-2.12-.56,0-.23-.31.07-.29.3.19,3.34-3.58,5.1-2.59-.11,0,0-.7-7-.17-8.92C155.06,274.3,158,271.38,163.89,274.3Z"
                />
              </g>
              <g
                id="右手掌"
                class="cls-1"
                :class="classAppend(selectedParts, '右手掌')"
              >
                <path
                  id="右手掌-2"
                  data-name="右手掌"
                  d="M108.21,146.4A71,71,0,0,1,96,158.68s.53,3.09,7.68-1.24l-.53,15.37s.8,2.29,2.56,0l1.15-9.54.53,12.19s1,4.06,2.83,0v-9.89l1.32,10.33s1.24,2.65,2-.09V164.86l1.5,8.48s1.15,1.94,1.94-.36l.46-8.3a29.94,29.94,0,0,0,.51-16.69S110.64,152.05,108.21,146.4Z"
                />
              </g>
              <g
                id="右前臂"
                class="cls-1"
                :class="classAppend(selectedParts, '右前臂')"
              >
                <path
                  id="右前臂-2"
                  data-name="右前臂"
                  d="M113.91,113s-4.51,20.4-5.7,33.39c0,0,1.19,5.56,9.67,1.59,0,0,10.07-19.21,8.48-32.59C126.36,115.4,118.94,120.83,113.91,113Z"
                />
              </g>
              <g
                id="右肩大臂"
                class="cls-1"
                :class="classAppend(selectedParts, '右肩大臂')"
              >
                <path
                  id="右肩大臂-2"
                  data-name="右肩大臂"
                  d="M130.34,65.58s-12.19,2.25-14.71,12.19S113.91,113,113.91,113s3.57,7.29,12.45,2.39c0,0,6.36-14.45,4-29.15C130.34,86.25,125,77.37,130.34,65.58Z"
                />
              </g>
              <g
                id="右大腿"
                class="cls-1"
                :class="classAppend(selectedParts, '右大腿')"
              >
                <path
                  id="右大腿-2"
                  data-name="右大腿"
                  d="M127.69,171s2,20.32,7.68,35c0,0,9.89-5.65,17.31,0l.89-35S141.38,162.12,127.69,171Z"
                />
              </g>
              <g
                id="骨盆"
                class="cls-1"
                :class="classAppend(selectedParts, '骨盆')"
              >
                <path
                  id="骨盆-3"
                  data-name="骨盆"
                  d="M130.87,134.56s-7,15.55-3.18,36.39c0,0,11.74-9.89,25.88,0,0,0,19.57-11.3,26.12,1.06,0,0,4.44-17.13-1.75-38.15C177.94,133.86,156.23,123.26,130.87,134.56Z"
                />
                <line
                  class="cls-1"
                  x1="167.35"
                  y1="155.41"
                  x2="158.4"
                  y2="164.44"
                />
                <line
                  class="cls-1"
                  x1="141.38"
                  y1="154.35"
                  x2="151.8"
                  y2="164.44"
                />
              </g>
              <g
                id="左前臂"
                class="cls-1"
                :class="classAppend(selectedParts, '左前臂')"
              >
                <path
                  id="左前臂-2"
                  data-name="左前臂"
                  d="M195.26,113.45s4.14,20.41,5.23,33.39c0,0-1.09,5.56-8.87,1.59,0,0-9.25-19.21-7.79-32.59C183.83,115.84,190.64,121.27,195.26,113.45Z"
                />
              </g>
              <g
                id="腹腔"
                class="cls-1"
                :class="classAppend(selectedParts, '腹腔')"
              >
                <path
                  id="腹腔-2"
                  data-name="腹腔"
                  d="M133.25,105.06s1.42,22.26-2.38,29.5c0,0,23.58-10.77,47.07-.7,0,0-2.2-20.68-.17-28.8C177.77,105.06,159,96.4,133.25,105.06Z"
                />
              </g>
              <g
                id="胸腔"
                class="cls-1"
                :class="classAppend(selectedParts, '胸腔')"
              >
                <path
                  id="胸腔-2"
                  data-name="胸腔"
                  d="M130.34,65.58c-3.63,2.38-3.45,16.52,0,20.67l2.56,12.27.35,6.54s23.14-9,44.52,0V99s.95-3.9,2.76-13,3.4-8.37-.35-19.94c0,0-12.79-7.2-14.87-8.13,0,0-1.23,5-4.55,7.44A7.33,7.33,0,0,1,155.64,67c-5.7-.67-6.69-2.79-9.07-9.15Z"
                />
              </g>
              <g
                id="左手掌"
                class="cls-1"
                :class="classAppend(selectedParts, '左手掌')"
              >
                <path
                  id="左手掌-2"
                  data-name="左手掌"
                  d="M200.49,146.84a68.59,68.59,0,0,0,11.23,12.28s-.48,3.09-7.05-1.24l.49,15.37s-.73,2.3-2.36,0l-1.05-9.54-.49,12.19s-.89,4.06-2.59,0V166l-1.22,10.33s-1.13,2.65-1.78-.09V165.3l-1.38,8.48s-1,1.94-1.78-.35l-.42-8.31a32.48,32.48,0,0,1-.47-16.69S198.26,152.49,200.49,146.84Z"
                />
              </g>
              <g
                id="左大腿"
                class="cls-1"
                :class="classAppend(selectedParts, '左大腿')"
              >
                <path
                  id="左大腿-2"
                  data-name="左大腿"
                  d="M179.45,171s-2,20.32-7.69,35c0,0-9.89-5.65-17.31,0l-.88-35S165.76,162.12,179.45,171Z"
                />
              </g>
              <g
                id="右膝"
                class="cls-1"
                :class="classAppend(selectedParts, '右膝')"
              >
                <path
                  id="右膝-2"
                  data-name="右膝"
                  d="M135.37,205.93a16.21,16.21,0,0,1,17.31,0v12.54a18.6,18.6,0,0,0-17.31,0Z"
                />
              </g>
              <g
                id="頸部"
                class="cls-1"
                :class="classAppend(selectedParts, '頸部')"
              >
                <path
                  id="脖子"
                  d="M146.53,49.92v.29l0,7.68s2,10,9.94,9.17,8.8-9.17,8.8-9.17v-8s-4.51,4.26-9.64,5.35C155.67,55.27,149.74,54.07,146.53,49.92Z"
                />
              </g>
              <g
                id="頭部"
                class="cls-1"
                :class="classAppend(selectedParts, '頭部')"
              >
                <path
                  d="M145.34,21.49s-3.58,4-2,13.12,2,12.32,2,12.32,0,5.56,10.33,8.34c0,0,4.41-.82,9.64-5.35a142.8,142.8,0,0,0,3-15.41s.6-8.35-2.51-13C165.78,21.49,156.56,13,145.34,21.49Z"
                />
                <path d="M168,36.5s5.47.77-1.51,7.44" />
                <path d="M143.53,35.65s-5.27,1.36,1.37,8.29" />
              </g>
              <g
                id="右腳掌"
                class="cls-1"
                :class="classAppend(selectedParts, '右腳掌')"
              >
                <path
                  id="右腳掌-2"
                  data-name="右腳掌"
                  d="M142.08,274.3a14.73,14.73,0,0,1-6.18,8.83s-.62,3.53,3.09,1.15l.3-.24a.41.41,0,0,1,.67.3c.07,1.2.5,2.92,2.67-.14a0,0,0,0,1,.05,0c-.1.55-.44,2.83,1.1,1.7a5.7,5.7,0,0,0,1.49-2.06c.14-.25.59-.53.47-.27-1.09,2.26,1.82,4.79,2.12-.56,0-.23.31.07.3.3-.2,3.34,3.57,5.1,2.58-.11,0,0,.71-7,.18-8.92C150.92,274.3,148,271.38,142.08,274.3Z"
                />
              </g>
              <g
                id="左小腿"
                class="cls-1"
                :class="classAppend(selectedParts, '左小腿')"
              >
                <path
                  id="左小腿-2"
                  data-name="左小腿"
                  d="M170.63,218.47s3,26.86-4.24,37.81c0,0-3.53,15.37-2.47,18,0,0-5.3-3.71-8.83,0,0,0,.88-17.32,0-25.44,0,0-2.48-8.83-1.77-30.39C153.32,218.47,160.74,214.76,170.63,218.47Z"
                />
              </g>
              <g
                id="右小腿"
                class="cls-1"
                :class="classAppend(selectedParts, '右小腿')"
              >
                <path
                  id="右小腿-2"
                  data-name="右小腿"
                  d="M135.37,218.47s-3,26.86,4.24,37.81c0,0,3.53,15.37,2.47,18,0,0,5.3-3.71,8.84,0,0,0-.89-17.32,0-25.44,0,0,2.47-8.83,1.76-30.39C152.68,218.47,145.26,214.76,135.37,218.47Z"
                />
              </g>
              <g
                id="左膝"
                class="cls-1"
                :class="classAppend(selectedParts, '左膝')"
              >
                <path
                  id="左膝-2"
                  data-name="左膝"
                  d="M153.57,205.93a16.21,16.21,0,0,1,17.31,0v12.54a18.6,18.6,0,0,0-17.31,0Z"
                />
              </g>
            </svg>
          </div>
          <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
              <title>body template2</title>
              <g
                id="背部"
                class="cls-1"
                :class="classAppend(selectedParts, '背部')"
              >
                <path
                  id="後背"
                  d="M132.35,93.73V85s-5.93-11.9-.51-21l14.21-8.21s9.11,8.94,17.56,0l11,8.21s4.12,9.68,0,19.39l-1.89,10.34s-1.49,21.46-1,27.42c0,0-16.14,13.92-39.38,0A157.4,157.4,0,0,0,132.35,93.73Z"
                />
                <path d="M152.86,73.93s-2.26,18.14-8.22,19.39" />
                <path d="M155.43,73.93s2.25,18.14,8.22,19.39" />
              </g>

              <g
                id="左小腿-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '左小腿-後側')"
              >
                <path
                  id="右小腿後側"
                  d="M135.94,215.39s-2.45,27.09,4.86,49.21v7.21s-3.62,5.72-6.85,6.21,0,2.24,0,2.24,9.44-1,13.17,1.24c0,0,3.73.75,3-2s-3-6.47-1.88-10.2,2-17.14,2-17.14,2-30.61.08-36.79Z"
                />
              </g>

              <g
                id="左大腿-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '左大腿-後側')"
              >
                <path
                  id="右大腿後側"
                  d="M129.67,167.17s-.32,18.64,6.14,28.83c0,0,.78,11.62-.11,17.61-.17,1.16,1.53,1.78,2.7,1.78h11.88s.63-1.24,1.15-8.45,0-39.77,0-39.77S142.18,178.11,129.67,167.17Z"
                />
              </g>
              <g
                id="右小腿-後側"
                data-name="右小腿-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '右小腿-後側')"
              >
                <path
                  id="右小腿後側-2"
                  data-name="右小腿後側"
                  d="M169.34,215.64s2.45,27.09-4.86,49.21v7.21s3.62,5.72,6.85,6.21,0,2.24,0,2.24-9.44-1-13.17,1.24c0,0-3.73.75-3-2s3-6.46,1.88-10.19-2-17.15-2-17.15-2-30.6-.08-36.78Z"
                />
              </g>
              <g
                id="右大腿-後側"
                data-name="左大腿-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '右大腿-後側')"
              >
                <path
                  id="右大腿後側-2"
                  data-name="右大腿後側"
                  d="M175.61,167.42s.33,18.64-6.14,28.83c0,0-.78,11.62.11,17.61.17,1.16-1.53,1.78-2.7,1.78H155s-.62-1.24-1.15-8.45,0-39.77,0-39.77S163.1,178.36,175.61,167.42Z"
                />
              </g>

              <g
                id="臀部"
                class="cls-1"
                :class="classAppend(selectedParts, '臀部')"
              >
                <path
                  d="M132.35,121.15s-6.19,24.61-2.79,44.74c0,0,11.37,11,23.3,0,0,0,9.65,12.39,23.58-.54,0,0,3.49-15.9-4.71-44.24C171.73,121.15,155.59,136.32,132.35,121.15Z"
                />
                <path d="M149.36,138.3s6.71,23.62-4.72,20.14" />
                <path d="M154.81,138.3s-6.71,23.62,4.73,20.14" />
              </g>
              <g
                id="後頸"
                class="cls-1"
                :class="classAppend(selectedParts, '後頸')"
              >
                <path
                  id="後頸-2"
                  data-name="後頸"
                  d="M146.88,46.67l-.83,9.12s8.12,9.11,17.56,0l-.83-9.12S156.82,53,146.88,46.67Z"
                />
              </g>
              <g
                id="頭部後側"
                class="cls-1"
                :class="classAppend(selectedParts, '頭部後側')"
              >
                <path
                  id="頭部後側-2"
                  data-name="頭部後側"
                  d="M143.89,23.31s11.11-11.6,21.38,0a20.18,20.18,0,0,1,1.16,8,69.54,69.54,0,0,0,0,9.12l-3.7,6.29s-4.47,6-15.9,0l-3-7.12S142.07,29.77,143.89,23.31Z"
                />
              </g>

              <g
                id="右手背-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '右手背-後側')"
              >
                <path
                  id="右手背"
                  d="M195.36,139.81a66.12,66.12,0,0,0,11.47,11.51s-.49,2.9-7.2-1.15l.49,14.41s-.74,2.15-2.4,0l-1.08-9-.49,11.44s-.91,3.81-2.65,0v-9.28l-1.25,9.69s-1.16,2.49-1.82-.08V157.12l-1.41,8s-1.08,1.82-1.82-.33l-.43-7.79a28.07,28.07,0,0,1-.48-15.66S193.08,145.11,195.36,139.81Z"
                />
              </g>

              <g
                id="右前臂-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '右前臂-後側')"
              >
                <path
                  id="右前臂"
                  d="M190,108.49s4.22,19.14,5.34,31.32c0,0-1.12,5.22-9.07,1.49,0,0-9.45-18-8-30.57C178.33,110.73,185.29,115.82,190,108.49Z"
                />
              </g>
              <g
                id="右肩大臂-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '右肩大臂-後側')"
              >
                <path
                  id="右肩大臂"
                  d="M174.61,64S186,66.12,188.4,75.44,190,108.49,190,108.49s-3.36,6.84-11.69,2.24c0,0-6-13.55-3.72-27.34C174.61,83.39,179.58,75.06,174.61,64Z"
                />
              </g>
              <g
                id="左手背-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '左手背-後側')"
              >
                <path
                  id="左手背"
                  d="M111.09,139.81a66.12,66.12,0,0,1-11.47,11.51s.49,2.9,7.2-1.15l-.49,14.41s.74,2.15,2.4,0l1.08-9,.49,11.44s.91,3.81,2.65,0v-9.28l1.25,9.69s1.16,2.49,1.82-.08V157.12l1.41,8s1.07,1.82,1.82-.33l.43-7.79a28.07,28.07,0,0,0,.48-15.66S113.37,145.11,111.09,139.81Z"
                />
              </g>
              <g
                id="右前臂-後側-2"
                data-name="右前臂-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '右前臂-後側-2')"
              >
                <path
                  id="右前臂-2"
                  data-name="右前臂"
                  d="M116.43,108.49s-4.22,19.14-5.34,31.32c0,0,1.12,5.22,9.07,1.49,0,0,9.45-18,8-30.57C128.12,110.73,121.16,115.82,116.43,108.49Z"
                />
              </g>
              <g
                id="左肩大臂-後側"
                class="cls-1"
                :class="classAppend(selectedParts, '左肩大臂-後側')"
              >
                <path
                  id="右肩大臂-2"
                  data-name="右肩大臂"
                  d="M131.84,64s-11.43,2.12-13.79,11.44-1.62,33.05-1.62,33.05,3.36,6.84,11.69,2.24c0,0,6-13.55,3.72-27.34C131.84,83.39,126.87,75.06,131.84,64Z"
                />
              </g>
            </svg>
          </div>
          <div class="col overflow-auto" style="max-height: 150px">
            <div
              class="list-group"
              v-for="(parts, index) in selectedParts"
              :key="index"
            >
              <li
                class="
                  text-start
                  list-group-item
                  badge
                  text-wrap
                  p-1
                  mb-1
                  text-white
                  transBg
                "
              >
                {{ parts.whatPart }}<br />{{ parts.whatHappen }}
              </li>
            </div>
          </div>
        </div>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-info-circle"></i> 生命徵象 :
        </h5>
        <table class="table text-reset">
          <thead>
            <tr>
              <th scope="col">血壓</th>
              <th scope="col">血氧</th>
              <th scope="col">心律</th>
              <th scope="col">體溫</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-if="
                  vital?.Bp?.Systolic != null || vital?.Bp?.Diastolic != null
                "
                :class="[
                  vital?.Bp?.Systolic >= 120 ||
                  vital?.Bp?.Systolic <= 90 ||
                  vital?.Bp?.Diastolic >= 80
                    ? 'bg-danger text-white'
                    : '',
                ]"
              >
                <span>{{ vital?.Bp?.Systolic }} </span>
                /
                <span>{{ vital?.Bp?.Diastolic }}</span>
              </td>
              <td v-else class="bg-light text-dark">未量測</td>
              <td
                v-if="vital?.SpO2 != null"
                :class="[
                  vital?.SpO2 <= 97 ? 'text-white bg-danger' : 'text-white',
                ]"
              >
                {{ vital?.SpO2 }}
              </td>
              <td v-else class="bg-light text-dark">未量測</td>
              <td
                v-if="vital?.Hr != null"
                :class="[
                  vital?.Hr > 120 || vital?.Hr < 60
                    ? 'text-white bg-danger'
                    : 'text-white',
                ]"
              >
                {{ vital?.Hr }}
              </td>
              <td v-else class="bg-light text-dark">未量測</td>
              <td
                v-if="vital?.BodyTemp != null"
                :class="[
                  vital?.BodyTemp >= 38.5 || vital?.BodyTemp <= 32
                    ? 'text-white bg-danger'
                    : 'text-white',
                ]"
              >
                {{ vital?.BodyTemp }}
              </td>
              <td v-else class="bg-light text-dark">未量測</td>
            </tr>
          </tbody>
        </table>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-info-circle"></i> 現場狀況 :
        </h5>
        <p class="card-text">{{ onScene }}</p>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-activity"></i> 處置項目 :
        </h5>
        <p class="card-text">{{ treatment }}</p>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-geo-alt"></i>
          執行警消
        </h5>
        <p class="card-text">{{ tp }}</p>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-geo-alt"></i>
          報案地址 :
        </h5>
        <p class="card-text">{{ location }}</p>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-chat-left-dots"></i>
          案件補述 :
        </h5>
        <p class="card-text">{{ otherContent }}</p>
        <h5 class="card-title badge transBg p-2 text-wrap">
          <i class="bi bi-chat-left-dots"></i>
          後送醫院
        </h5>
        <p class="card-text">{{ hospital }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  loadUnitCases,
  loadWhoCases,
  loadOtherContentCases,
  loadCasesByTimePeriod,
} from "@/firebase";
import { reactive, ref } from "@vue/reactivity";
import { watch, inject } from "@vue/runtime-core";

export default {
  setup() {
    const keyCatagory = ref("who");
    const keyValue = ref("");
    const keyValueDisplay = ref("");
    const searchList = reactive([]);
    const startTime = ref();
    const endTime = ref();
    const dateFormate = inject("dateFormate");
    const do_search = async () => {
      searchList.length = 0;
      let temp;
      switch (keyCatagory.value) {
        case "who":
          temp = await loadWhoCases(keyValue.value);
          searchList.push(...temp);
          break;
        case "otherContent":
          temp = await loadOtherContentCases(keyValue.value);
          searchList.push(...temp);
          break;
      }
      keyValueDisplay.value = keyValue.value;
    };

    const do_unit_search = async () => {
      searchList.length = 0;
      let temp;
      temp = await loadUnitCases(keyValue.value);
      keyValueDisplay.value = keyValue.value;
      searchList.push(...temp);
    };

    const do_time_period_search = async () => {
      searchList.length = 0;
      let temp;
      keyValueDisplay.value = startTime.value + " ~ " + endTime.value;
      temp = await loadCasesByTimePeriod(startTime.value, endTime.value);
      searchList.push(...temp);
    };

    watch(keyCatagory, () => {
      keyValueDisplay.value = "";
    });
    const classAppend = (selectedParts = [], value) => {
      var partsArray = selectedParts.map((a) => a.whatPart);
      var target = value;
      var exsist = partsArray.includes(target);
      return {
        "cls-1": exsist,
        "cls-2": exsist,
      };
    };

    return {
      do_unit_search,
      keyCatagory,
      keyValue,
      startTime,
      endTime,
      keyValueDisplay,
      do_search,
      searchList,
      dateFormate,
      classAppend,
      do_time_period_search,
    };
  },
};
</script>
<style>
.searchComponent {
  min-height: 90vh;
}
.cls-1 {
  fill: #f8f9fa;
  stroke: #0d6efd;
  stroke-miterlimit: 10;
  stroke-width: 2px;
}
.cls-2 {
  fill: #750808;
  stroke: #f92626;
  stroke-miterlimit: 10;
  stroke-width: 3px;
}
</style>
