fbq("track","ViewContent");class Fetch{constructor(e,t={"Content-type":"application/x-www-form-urlencoded"}){this.url=e,this.headers=t}Insert(e){return fetch(this.url,{method:"POST",body:e}).then(e=>e.json())}Consult(e,t){return fetch(this.url,{method:"POST",body:new URLSearchParams(e).toString(),headers:this.headers}).then(e=>e.json())}}let franquias,results,getParams=function(e){for(var t=window.location.search.substring(1).split("&"),a=0;a<t.length;a++){var o=t[a].split("=");if(o[0]==e)return o[1]}return!1},api=new Fetch("https://api.ipadraomilitar.com.br/leads/test/query.php",{"Content-type":"application/x-www-form-urlencoded",Authorization:"Basic RGV2OlNIRTE1MDI5OEF3RHI="}),apiGoogle=new Fetch("https://script.google.com/macros/s/AKfycbzlTZekdxhVR6mCSmZ4EpqAPZERRB6xiI49HHG3Ipepzo3yN2s_r094/exec",{"Content-type":"application/x-www-form-urlencoded"}),r=!!getParams("r")&&getParams("r"),form=document.forms.form,f=form.elements.franquia.value,regiao=form.elements.regiao,nome_regiao=form.elements.nome_regiao,bairroList=document.getElementById("listBairro"),bairro=form.elements.bairro,responsavel=form.elements.responsavel,candidato=form.elements.candidato,idade=form.elements.idade,whatsapp=form.elements.whatsapp,grupo=form.elements.grupo,campanha=getParams("utm_campaign")?form.campanha.value=decodeURI(getParams("utm_campaign")):form.elements.campanha.value,idCurso=form.elements.curso.value,btnEnviar=form.elements.btnEnviar,Mask={whats:"99 99999-9999"};idades={IPMIL:[13,14,15,16,17,18,19,20,21],MIRIM:[6,7,8,9,10,11,12,13]};for(var i=0;i<idades[f].length;i++){var o=document.createElement("option");o.text=idades[f][i],o.value=idades[f][i],idade.appendChild(o)}function Bairro(){grupo.value=regiao.selectedOptions[0].dataset.grupo,nome_regiao.value=regiao.selectedOptions[0].dataset.nome,api.Consult({cidade:regiao.selectedOptions[0].getAttribute("data-cidade")}).then(e=>{bairroList.innerHTML="",bairro.value="";for(var t=0;t<e.length;t++){var a=document.createElement("option");a.text=e[t].bairro,a.value=e[t].bairro,bairroList.appendChild(a)}bairro.style.display=""})}function InsertDB(){document.querySelector(".process").classList.remove("is-hidden"),api.Insert(new FormData(form)).then(e=>{apiGoogle.Insert(new FormData(form)).then(e=>{Swal.fire({title:"Procurando Instrutor em "+nome_regiao.value,icon:"success",html:"<h3>Você será direcionado para WhatsApp, aguarde!</h3>",showCloseButton:!1,showCancelButton:!1,showConfirmButton:!1,focusConfirm:!1,onBeforeOpen:()=>{Swal.showLoading()}}),console.log(e)}).catch(e=>console.error("Google Error: "+e)),console.log(e),fbq("track","Lead"),fbq("trackCustom","Lead "+nome_regiao.value),results=e,GetWpp(e)}).catch(e=>console.error("Error: "+e))}function Direct(){document.querySelector(".direct").classList.remove("is-hidden"),Swal.fire({title:"Você já realizou seu cadastro!",icon:"info",html:"<h3>Você será direcionado para WhatsApp, aguarde!</h3>",showCloseButton:!1,showCancelButton:!1,showConfirmButton:!1,focusConfirm:!1,onBeforeOpen:()=>{Swal.showLoading()}}),fbq("trackCustom","Leads Duplicados"),GetWpp()}function GetWpp(e=null){e.irc?Wpp=e.irc.divulgador_whatsapp.replace(/[- ()]/g,""):Wpp=regiao.selectedOptions[0].getAttribute("data-wpp").replace(/[- ()]/g,""),Loader(40,Wpp)}function Loader(e,t=null){let a=0,o=document.createElement("a"),r=responsavel?`*EU QUERO*\nCandidato: ${candidato.value}\nResponsável: ${responsavel.value}\nRegião: ${regiao.selectedOptions[0].dataset.nome}`:`*EU QUERO*\nCandidato: ${candidato.value}\nRegião: ${regiao.selectedOptions[0].dataset.nome}`,n=setInterval(function(){a>=100?(clearInterval(n),o.href=`https://wa.me/55${encodeURIComponent(t)}?text=${encodeURIComponent(r)}`,o.innerHTML='<i class="fab fa-whatsapp"></i> Abrir WhatsApp',document.querySelectorAll(".load").forEach(e=>{e.style.display="none"}),document.querySelector(".process").append(o),document.querySelector(".direct").append(o),o.click()):a++},e)}function Send(){Swal.fire({title:"Processando!",allowOutsideClick:!1,allowEscapeKey:!1,onBeforeOpen:()=>{Swal.showLoading()}}),document.getElementById("regiao_text").innerText="em "+regiao.selectedOptions[0].dataset.nome,form.classList.add("is-hidden"),api.Consult({wpp:whatsapp.value,f:f.toLowerCase()}).then(e=>{0===e.length?InsertDB():Direct()}),window.scrollTo(0,0)}VMasker(whatsapp).maskPattern(Mask.whats),api.Consult({r:r,f:f}).then(e=>{franquias=e,console.log(franquias);for(var t=0;t<e.length;t++){var a=document.createElement("option");a.text=e[t].nome,a.value=e[t].id_irc,a.dataset.nome=e[t].nome,a.dataset.wpp=e[t].whatsapp_divulgador,a.dataset.consultor=e[t].divulgador,a.dataset.cidade=e[t].cidade,a.dataset.zona=e[t].grupo_regional,a.dataset.grupo=e[t].grupo,regiao.appendChild(a),1==e.length&&(regiao.selectedIndex=1,document.getElementById("regG").style.display="none",Bairro())}}),regiao.addEventListener("change",e=>{Bairro()}),function(){"use strict";var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(e){e.addEventListener("submit",function(t){t.preventDefault(),t.stopPropagation(),e.checkValidity()&&(console.log("EXEC"),Send()),e.classList.add("was-validated")},!1)})}();
