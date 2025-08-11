const d=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FrameworksDS</title>
  </head>
  <body class="bg-white text-slate-900">
    <div id="root"></div>
    <!-- Use a RELATIVE path so Vite emits relative assets for Figma -->
    <script type="module" src="./src/ui/main.tsx"><\/script>
  </body>
</html>
`;function c(i){const t=i.replace("#",""),e=parseInt(t,16);return{r:e>>16&255,g:e>>8&255,b:e&255}}figma.showUI(d,{width:900,height:700});async function s(){const i="Framework Colors";let e=figma.variables.getLocalVariableCollections().find(a=>a.name===i);e||(e=figma.variables.createVariableCollection(i));let n=e.modes.find(a=>a.name==="Light");n||(n=e.addMode("Light"));let o=e.modes.find(a=>a.name==="Dark");return o||(o=e.addMode("Dark")),{collectionId:e.id,lightId:n.modeId||n.id,darkId:o.modeId||o.id}}function g(i,t){const e=figma.variables.getLocalVariables().find(n=>n.name===i&&n.variableCollectionId===t);return e||figma.variables.createVariable(i,"COLOR",t)}function r(i,t,e){const{r:n,g:o,b:a}=c(e);i.setValueForMode(t,{r:n/255,g:o/255,b:a/255,a:1})}figma.ui.onmessage=async i=>{try{if(i.type==="INIT"){const t=await s();figma.ui.postMessage({type:"INIT",payload:t});return}if(i.type==="GENERATE_PRIMITIVES"||i.type==="GENERATE_SEMANTICS"||i.type==="UPDATE_VARIABLES"){const{collectionId:t,lightId:e,darkId:n}=await s(),o=i.payload||[];for(const a of o){if(!(a!=null&&a.name))continue;const l=g(a.name,t);a.light&&r(l,e,a.light),a.dark&&r(l,n,a.dark)}figma.ui.postMessage({type:"UPDATE_VARIABLES",payload:o.length})}}catch(t){figma.ui.postMessage({type:"ERROR",payload:String((t==null?void 0:t.message)||t)})}};
