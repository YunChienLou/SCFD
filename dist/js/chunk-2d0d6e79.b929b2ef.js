(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6e79"],{7516:function(t,e,a){"use strict";a.r(e);a("b0c0");var n=a("7a23"),c=Object(n["g"])("div",{class:"d-flex justify-content-between align-items-center"},[Object(n["g"])("div",{class:"h1 mt-3"},"管理警消成員"),Object(n["g"])("div",{class:"mt-3 me-4"},[Object(n["g"])("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop2"}," + 新增警消 ")])],-1),i={key:0,class:"text-center mt-5 text-white"},l=Object(n["g"])("div",{class:"h1 text-center"},"資料處理中 .....",-1),s=Object(n["g"])("div",{class:"spinner-border text-primary",style:{width:"5rem",height:"5rem"},role:"status"},[Object(n["g"])("span",{class:"visually-hidden"},"Loading...")],-1),o=[l,s],r={key:1,class:"table table-dark table-striped"},d=Object(n["g"])("thead",null,[Object(n["g"])("tr",null,[Object(n["g"])("th",{scope:"col"},"No."),Object(n["g"])("th",{scope:"col"},"姓名"),Object(n["g"])("th",{class:"text-center me-3",scope:"col"},"編輯")])],-1),b={scope:"row"},u={class:"text-end"},m=["onClick"],g=["onClick"],f={class:"modal fade",id:"staticBackdrop2","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},O={class:"modal-dialog modal-dialog-centered"},j={class:"modal-content text-dark"},p=Object(n["g"])("div",{class:"modal-header"},[Object(n["g"])("h2",{class:"modal-title fw-bold",id:"staticBackdropLabel"},"新增成員"),Object(n["g"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),v={class:"modal-body"},h={class:"needs-validation",novalidate:""},y={class:"mb-3"},k=Object(n["g"])("label",{class:"form-label"},"姓名",-1),w={class:"modal-footer"},x=Object(n["g"])("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 關閉 ",-1),L=["disabled"],U={class:"modal fade editUserModal",id:"editUserModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},D={class:"modal-dialog modal-dialog-centered"},N={class:"modal-content text-dark"},I=Object(n["g"])("div",{class:"modal-header"},[Object(n["g"])("h2",{class:"modal-title fw-bold",id:"exampleModalLabel"},"修改資料"),Object(n["g"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),S={class:"modal-body"},C={class:"mb-3"},T=Object(n["g"])("label",{class:"form-label"},"姓名",-1),M={class:"modal-footer"},F=Object(n["g"])("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 關閉 ",-1);function V(t,e,a,l,s,V){return Object(n["u"])(),Object(n["f"])(n["a"],null,[c,l.isLoading?(Object(n["u"])(),Object(n["f"])("div",i,o)):(Object(n["u"])(),Object(n["f"])("table",r,[d,Object(n["g"])("tbody",null,[(Object(n["u"])(!0),Object(n["f"])(n["a"],null,Object(n["A"])(l.firefighters,(function(t,e){return Object(n["u"])(),Object(n["f"])("tr",{key:t.id},[Object(n["g"])("th",b,Object(n["D"])(e+1),1),Object(n["g"])("td",null,Object(n["D"])(t.name),1),Object(n["g"])("td",u,[Object(n["g"])("button",{type:"button",class:"btn btn-secondary me-1","data-bs-toggle":"modal","data-bs-target":"#editUserModal",onClick:function(t){return l.getUserData(e)}}," 修改 ",8,m),Object(n["g"])("button",{type:"button",class:"btn btn-danger me-3",onClick:function(e){return l.deleUser(t.id)}}," 刪除 ",8,g)])])})),128))])])),Object(n["g"])("div",f,[Object(n["g"])("div",O,[Object(n["g"])("div",j,[p,Object(n["g"])("div",v,[Object(n["g"])("form",h,[Object(n["g"])("div",y,[k,Object(n["L"])(Object(n["g"])("input",{type:"text",class:"form-control",placeholder:"請輸入 姓名 ..",id:"create.3","onUpdate:modelValue":e[0]||(e[0]=function(t){return l.create.name=t}),required:""},null,512),[[n["I"],l.create.name]])])])]),Object(n["g"])("div",w,[x,Object(n["g"])("button",{type:"button",class:"btn btn-primary","data-bs-dismiss":"modal",disabled:""==l.create.name,onClick:e[1]||(e[1]=function(t){return l.addUser()})}," 新增 ",8,L)])])])]),Object(n["g"])("div",U,[Object(n["g"])("div",D,[Object(n["g"])("div",N,[I,Object(n["g"])("div",S,[Object(n["g"])("form",null,[Object(n["g"])("div",C,[T,Object(n["L"])(Object(n["g"])("input",{type:"text",class:"form-control",id:"nameInput","aria-describedby":"輸入姓名","onUpdate:modelValue":e[2]||(e[2]=function(t){return l.nameInput=t}),required:""},null,512),[[n["I"],l.nameInput]])])])]),Object(n["g"])("div",M,[F,Object(n["g"])("button",{type:"button",class:"btn btn-primary",onClick:e[3]||(e[3]=function(t){return l.editUser()}),"data-bs-dismiss":"modal"}," 儲存修改 ")])])])])],64)}var B=a("1da1"),J=(a("96cf"),a("5c40")),R=a("a1e9"),q=a("5502"),A=a("f2f4"),z={setup:function(){var t=Object(q["b"])(),e=Object(J["t"])("$FirefighterAPI"),a=Object(R["m"])([]),n=Object(R["m"])(!1),c=Object(J["e"])((function(){return t.state.unit})),i=Object(J["e"])((function(){return t.state.token})),l=function(){return t.dispatch("verify")},s=Object(R["m"])(""),o=Object(R["m"])(""),r=Object(R["m"])(!1),d=Object(R["l"])({name:""}),b=function(){console.log("start execute afterGetUnit"),n.value=!0;var l=c.value,s=A["a"][l],o={data:{token:i.value,unit:s}};e.getFirefighters(o,i.value).then((function(t){a.value=t.data.result.data,n.value=!1})).catch((function(e){t.dispatch("push2Notification",{msg:"載入警消資料失敗: "+e,time:(new Date).toLocaleTimeString()})}))},u=function(){var t=Object(B["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=JSON.parse(JSON.stringify(a.value))[e],console.log(n,e),s.value=n.name,o.value=n.id;case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var a=Object(B["a"])(regeneratorRuntime.mark((function a(){var l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n.value=!0,l={data:{name:d.name,unit:A["a"][c.value],token:i.value}},console.log(l.data),e.createFirefighter(l,i.value).then((function(){d.name="",b(),t.dispatch("push2Notification",{msg:"成功新增警消",time:(new Date).toLocaleTimeString()})})).catch((function(e){t.dispatch("push2Notification",{msg:"新增警消失敗: "+e,time:(new Date).toLocaleTimeString()})}));case 4:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}(),g=function(){n.value=!0;var a={data:{name:s.value,token:i.value,unit:A["a"][c.value],userId:o.value}};console.log(a.data,"update data"),e.updateFirefighter(a,i.value).then((function(){t.dispatch("push2Notification",{msg:"成功修改警消資料",time:(new Date).toLocaleTimeString()}),b()})).catch((function(e){t.dispatch("push2Notification",{msg:"修改警消資料失敗: "+e,time:(new Date).toLocaleTimeString()})}))},f=function(a){n.value=!0;var l={data:{uid:a,unit:A["a"][c.value],token:i.value}};e.deleteFirefighter(l,i.value).then((function(){b(),t.dispatch("push2Notification",{msg:"刪除警消資料成功",time:(new Date).toLocaleTimeString()})})).catch((function(e){t.dispatch("push2Notification",{msg:"刪除警消資料失敗: "+e,time:(new Date).toLocaleTimeString()})}))};return l(),Object(J["z"])((function(){console.log("onMounted"),null==c.value&&null==i.value||b()})),{store:t,create:d,isLoading:n,nameInput:s,targetUserId:o,passwordVerifie:r,firefighters:a,unitVuex:c,tokenVuex:i,getUserData:u,editUser:g,deleUser:f,addUser:m}}};z.render=V;e["default"]=z}}]);
//# sourceMappingURL=chunk-2d0d6e79.b929b2ef.js.map