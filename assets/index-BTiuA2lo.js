(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const bn=6048e5,ar=864e5,vn=6e4,xn=36e5,Pt=Symbol.for("constructDateFrom");function L(e,t){return typeof e=="function"?e(t):e&&typeof e=="object"&&Pt in e?e[Pt](t):e instanceof Date?new e.constructor(t):new Date(t)}function D(e,t){return L(t||e,e)}function ve(e,t,n){const r=D(e,n?.in);return isNaN(t)?L(e,NaN):(t&&r.setDate(r.getDate()+t),r)}function Ne(e,t,n){const r=D(e,n?.in);if(isNaN(t))return L(e,NaN);if(!t)return r;const o=r.getDate(),i=L(e,r.getTime());i.setMonth(r.getMonth()+t+1,0);const a=i.getDate();return o>=a?i:(r.setFullYear(i.getFullYear(),i.getMonth(),o),r)}let sr={};function We(){return sr}function H(e,t){const n=We(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,o=D(e,t?.in),i=o.getDay(),a=(i<r?7:0)+i-r;return o.setDate(o.getDate()-a),o.setHours(0,0,0,0),o}function Fe(e,t){return H(e,{...t,weekStartsOn:1})}function wn(e,t){const n=D(e,t?.in),r=n.getFullYear(),o=L(n,0);o.setFullYear(r+1,0,4),o.setHours(0,0,0,0);const i=Fe(o),a=L(n,0);a.setFullYear(r,0,4),a.setHours(0,0,0,0);const s=Fe(a);return n.getTime()>=i.getTime()?r+1:n.getTime()>=s.getTime()?r:r-1}function Zt(e){const t=D(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}function ht(e,...t){const n=L.bind(null,e||t.find(r=>typeof r=="object"));return t.map(n)}function X(e,t){const n=D(e,t?.in);return n.setHours(0,0,0,0),n}function ae(e,t,n){const[r,o]=ht(n?.in,e,t),i=X(r),a=X(o),s=+i-Zt(i),u=+a-Zt(a);return Math.round((s-u)/ar)}function cr(e,t){const n=wn(e,t),r=L(e,0);return r.setFullYear(n,0,4),r.setHours(0,0,0,0),Fe(r)}function ur(e,t,n){const[r,o]=ht(n?.in,e,t);return+X(r)==+X(o)}function lr(e){return e instanceof Date||typeof e=="object"&&Object.prototype.toString.call(e)==="[object Date]"}function yn(e){return!(!lr(e)&&typeof e!="number"||isNaN(+D(e)))}function pt(e,t){const n=D(e,t?.in),r=n.getMonth();return n.setFullYear(n.getFullYear(),r+1,0),n.setHours(23,59,59,999),n}function ee(e,t){const n=D(e,t?.in);return n.setDate(1),n.setHours(0,0,0,0),n}function dr(e,t){const n=D(e,t?.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}function fr(e,t){const n=t?.weekStartsOn,r=D(e,t?.in),o=r.getDay(),i=(o<n?-7:0)+6-(o-n);return r.setDate(r.getDate()+i),r.setHours(23,59,59,999),r}const mr={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},hr=(e,t,n)=>{let r;const o=mr[e];return typeof o=="string"?r=o:t===1?r=o.one:r=o.other.replace("{{count}}",t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function me(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const pr={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},gr={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},br={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},vr={date:me({formats:pr,defaultWidth:"full"}),time:me({formats:gr,defaultWidth:"full"}),dateTime:me({formats:br,defaultWidth:"full"})},xr={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},wr=(e,t,n,r)=>xr[e];function R(e){return(t,n)=>{const r=n?.context?String(n.context):"standalone";let o;if(r==="formatting"&&e.formattingValues){const a=e.defaultFormattingWidth||e.defaultWidth,s=n?.width?String(n.width):a;o=e.formattingValues[s]||e.formattingValues[a]}else{const a=e.defaultWidth,s=n?.width?String(n.width):e.defaultWidth;o=e.values[s]||e.values[a]}const i=e.argumentCallback?e.argumentCallback(t):t;return o[i]}}const yr={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},_r={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},kr={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},$r={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},Sr={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Dr={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Mr=(e,t)=>{const n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},zr={ordinalNumber:Mr,era:R({values:yr,defaultWidth:"wide"}),quarter:R({values:_r,defaultWidth:"wide",argumentCallback:e=>e-1}),month:R({values:kr,defaultWidth:"wide"}),day:R({values:$r,defaultWidth:"wide"}),dayPeriod:R({values:Sr,defaultWidth:"wide",formattingValues:Dr,defaultFormattingWidth:"wide"})};function U(e){return(t,n={})=>{const r=n.width,o=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],i=t.match(o);if(!i)return null;const a=i[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],u=Array.isArray(s)?Pr(s,f=>f.test(a)):Er(s,f=>f.test(a));let l;l=e.valueCallback?e.valueCallback(u):u,l=n.valueCallback?n.valueCallback(l):l;const d=t.slice(a.length);return{value:l,rest:d}}}function Er(e,t){for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t(e[n]))return n}function Pr(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return n}function _n(e){return(t,n={})=>{const r=t.match(e.matchPattern);if(!r)return null;const o=r[0],i=t.match(e.parsePattern);if(!i)return null;let a=e.valueCallback?e.valueCallback(i[0]):i[0];a=n.valueCallback?n.valueCallback(a):a;const s=t.slice(o.length);return{value:a,rest:s}}}const Zr=/^(\d+)(th|st|nd|rd)?/i,Or=/\d+/i,Ir={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Tr={any:[/^b/i,/^(a|c)/i]},Nr={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Cr={any:[/1/i,/2/i,/3/i,/4/i]},Fr={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Lr={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Ar={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},jr={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Br={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Wr={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Rr={ordinalNumber:_n({matchPattern:Zr,parsePattern:Or,valueCallback:e=>parseInt(e,10)}),era:U({matchPatterns:Ir,defaultMatchWidth:"wide",parsePatterns:Tr,defaultParseWidth:"any"}),quarter:U({matchPatterns:Nr,defaultMatchWidth:"wide",parsePatterns:Cr,defaultParseWidth:"any",valueCallback:e=>e+1}),month:U({matchPatterns:Fr,defaultMatchWidth:"wide",parsePatterns:Lr,defaultParseWidth:"any"}),day:U({matchPatterns:Ar,defaultMatchWidth:"wide",parsePatterns:jr,defaultParseWidth:"any"}),dayPeriod:U({matchPatterns:Br,defaultMatchWidth:"any",parsePatterns:Wr,defaultParseWidth:"any"})},Ur={code:"en-US",formatDistance:hr,formatLong:vr,formatRelative:wr,localize:zr,match:Rr,options:{weekStartsOn:0,firstWeekContainsDate:1}};function qr(e,t){const n=D(e,t?.in);return ae(n,dr(n))+1}function Yr(e,t){const n=D(e,t?.in),r=+Fe(n)-+cr(n);return Math.round(r/bn)+1}function kn(e,t){const n=D(e,t?.in),r=n.getFullYear(),o=We(),i=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,a=L(t?.in||e,0);a.setFullYear(r+1,0,i),a.setHours(0,0,0,0);const s=H(a,t),u=L(t?.in||e,0);u.setFullYear(r,0,i),u.setHours(0,0,0,0);const l=H(u,t);return+n>=+s?r+1:+n>=+l?r:r-1}function Gr(e,t){const n=We(),r=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,o=kn(e,t),i=L(t?.in||e,0);return i.setFullYear(o,0,r),i.setHours(0,0,0,0),H(i,t)}function Vr(e,t){const n=D(e,t?.in),r=+H(n,t)-+Gr(n,t);return Math.round(r/bn)+1}function b(e,t){const n=e<0?"-":"",r=Math.abs(e).toString().padStart(t,"0");return n+r}const V={y(e,t){const n=e.getFullYear(),r=n>0?n:1-n;return b(t==="yy"?r%100:r,t.length)},M(e,t){const n=e.getMonth();return t==="M"?String(n+1):b(n+1,2)},d(e,t){return b(e.getDate(),t.length)},a(e,t){const n=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(e,t){return b(e.getHours()%12||12,t.length)},H(e,t){return b(e.getHours(),t.length)},m(e,t){return b(e.getMinutes(),t.length)},s(e,t){return b(e.getSeconds(),t.length)},S(e,t){const n=t.length,r=e.getMilliseconds(),o=Math.trunc(r*Math.pow(10,n-3));return b(o,t.length)}},le={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},Ot={G:function(e,t,n){const r=e.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if(t==="yo"){const r=e.getFullYear(),o=r>0?r:1-r;return n.ordinalNumber(o,{unit:"year"})}return V.y(e,t)},Y:function(e,t,n,r){const o=kn(e,r),i=o>0?o:1-o;if(t==="YY"){const a=i%100;return b(a,2)}return t==="Yo"?n.ordinalNumber(i,{unit:"year"}):b(i,t.length)},R:function(e,t){const n=wn(e);return b(n,t.length)},u:function(e,t){const n=e.getFullYear();return b(n,t.length)},Q:function(e,t,n){const r=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return b(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){const r=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return b(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){const r=e.getMonth();switch(t){case"M":case"MM":return V.M(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){const r=e.getMonth();switch(t){case"L":return String(r+1);case"LL":return b(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,t,n,r){const o=Vr(e,r);return t==="wo"?n.ordinalNumber(o,{unit:"week"}):b(o,t.length)},I:function(e,t,n){const r=Yr(e);return t==="Io"?n.ordinalNumber(r,{unit:"week"}):b(r,t.length)},d:function(e,t,n){return t==="do"?n.ordinalNumber(e.getDate(),{unit:"date"}):V.d(e,t)},D:function(e,t,n){const r=qr(e);return t==="Do"?n.ordinalNumber(r,{unit:"dayOfYear"}):b(r,t.length)},E:function(e,t,n){const r=e.getDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){const o=e.getDay(),i=(o-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return b(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(o,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(o,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(o,{width:"short",context:"formatting"});case"eeee":default:return n.day(o,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){const o=e.getDay(),i=(o-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return b(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(o,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(o,{width:"narrow",context:"standalone"});case"cccccc":return n.day(o,{width:"short",context:"standalone"});case"cccc":default:return n.day(o,{width:"wide",context:"standalone"})}},i:function(e,t,n){const r=e.getDay(),o=r===0?7:r;switch(t){case"i":return String(o);case"ii":return b(o,t.length);case"io":return n.ordinalNumber(o,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){const o=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(o,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(o,{width:"wide",context:"formatting"})}},b:function(e,t,n){const r=e.getHours();let o;switch(r===12?o=le.noon:r===0?o=le.midnight:o=r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(o,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(o,{width:"wide",context:"formatting"})}},B:function(e,t,n){const r=e.getHours();let o;switch(r>=17?o=le.evening:r>=12?o=le.afternoon:r>=4?o=le.morning:o=le.night,t){case"B":case"BB":case"BBB":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(o,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(o,{width:"wide",context:"formatting"})}},h:function(e,t,n){if(t==="ho"){let r=e.getHours()%12;return r===0&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return V.h(e,t)},H:function(e,t,n){return t==="Ho"?n.ordinalNumber(e.getHours(),{unit:"hour"}):V.H(e,t)},K:function(e,t,n){const r=e.getHours()%12;return t==="Ko"?n.ordinalNumber(r,{unit:"hour"}):b(r,t.length)},k:function(e,t,n){let r=e.getHours();return r===0&&(r=24),t==="ko"?n.ordinalNumber(r,{unit:"hour"}):b(r,t.length)},m:function(e,t,n){return t==="mo"?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):V.m(e,t)},s:function(e,t,n){return t==="so"?n.ordinalNumber(e.getSeconds(),{unit:"second"}):V.s(e,t)},S:function(e,t){return V.S(e,t)},X:function(e,t,n){const r=e.getTimezoneOffset();if(r===0)return"Z";switch(t){case"X":return Tt(r);case"XXXX":case"XX":return te(r);case"XXXXX":case"XXX":default:return te(r,":")}},x:function(e,t,n){const r=e.getTimezoneOffset();switch(t){case"x":return Tt(r);case"xxxx":case"xx":return te(r);case"xxxxx":case"xxx":default:return te(r,":")}},O:function(e,t,n){const r=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+It(r,":");case"OOOO":default:return"GMT"+te(r,":")}},z:function(e,t,n){const r=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+It(r,":");case"zzzz":default:return"GMT"+te(r,":")}},t:function(e,t,n){const r=Math.trunc(+e/1e3);return b(r,t.length)},T:function(e,t,n){return b(+e,t.length)}};function It(e,t=""){const n=e>0?"-":"+",r=Math.abs(e),o=Math.trunc(r/60),i=r%60;return i===0?n+String(o):n+String(o)+t+b(i,2)}function Tt(e,t){return e%60===0?(e>0?"-":"+")+b(Math.abs(e)/60,2):te(e,t)}function te(e,t=""){const n=e>0?"-":"+",r=Math.abs(e),o=b(Math.trunc(r/60),2),i=b(r%60,2);return n+o+t+i}const Nt=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}},$n=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}},Hr=(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],r=n[1],o=n[2];if(!o)return Nt(e,t);let i;switch(r){case"P":i=t.dateTime({width:"short"});break;case"PP":i=t.dateTime({width:"medium"});break;case"PPP":i=t.dateTime({width:"long"});break;case"PPPP":default:i=t.dateTime({width:"full"});break}return i.replace("{{date}}",Nt(r,t)).replace("{{time}}",$n(o,t))},Xr={p:$n,P:Hr},Jr=/^D+$/,Qr=/^Y+$/,Kr=["D","DD","YY","YYYY"];function eo(e){return Jr.test(e)}function to(e){return Qr.test(e)}function no(e,t,n){const r=ro(e,t,n);if(console.warn(r),Kr.includes(e))throw new RangeError(r)}function ro(e,t,n){const r=e[0]==="Y"?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const oo=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,io=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ao=/^'([^]*?)'?$/,so=/''/g,co=/[a-zA-Z]/;function pe(e,t,n){const r=We(),o=n?.locale??r.locale??Ur,i=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,a=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=D(e,n?.in);if(!yn(s))throw new RangeError("Invalid time value");let u=t.match(io).map(d=>{const f=d[0];if(f==="p"||f==="P"){const h=Xr[f];return h(d,o.formatLong)}return d}).join("").match(oo).map(d=>{if(d==="''")return{isToken:!1,value:"'"};const f=d[0];if(f==="'")return{isToken:!1,value:uo(d)};if(Ot[f])return{isToken:!0,value:d};if(f.match(co))throw new RangeError("Format string contains an unescaped latin alphabet character `"+f+"`");return{isToken:!1,value:d}});o.localize.preprocessor&&(u=o.localize.preprocessor(s,u));const l={firstWeekContainsDate:i,weekStartsOn:a,locale:o};return u.map(d=>{if(!d.isToken)return d.value;const f=d.value;(!n?.useAdditionalWeekYearTokens&&to(f)||!n?.useAdditionalDayOfYearTokens&&eo(f))&&no(f,t,String(e));const h=Ot[f[0]];return h(s,f,o.localize,l)}).join("")}function uo(e){const t=e.match(ao);return t?t[1].replace(so,"'"):e}function lo(e,t){return+D(e)>+D(t)}function fo(e,t){return+D(e)==+D(t)}function Ct(e,t,n){const[r,o]=ht(n?.in,e,t);return+H(r,n)==+H(o,n)}function j(e,t){const n=()=>L(t?.in,NaN),o=go(e);let i;if(o.date){const l=bo(o.date,2);i=vo(l.restDateString,l.year)}if(!i||isNaN(+i))return n();const a=+i;let s=0,u;if(o.time&&(s=xo(o.time),isNaN(s)))return n();if(o.timezone){if(u=wo(o.timezone),isNaN(u))return n()}else{const l=new Date(a+s),d=D(0,t?.in);return d.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),d.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),d}return D(a+s+u,t?.in)}const Me={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},mo=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ho=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,po=/^([+-])(\d{2})(?::?(\d{2}))?$/;function go(e){const t={},n=e.split(Me.dateTimeDelimiter);let r;if(n.length>2)return t;if(/:/.test(n[0])?r=n[0]:(t.date=n[0],r=n[1],Me.timeZoneDelimiter.test(t.date)&&(t.date=e.split(Me.timeZoneDelimiter)[0],r=e.substr(t.date.length,e.length))),r){const o=Me.timezone.exec(r);o?(t.time=r.replace(o[1],""),t.timezone=o[1]):t.time=r}return t}function bo(e,t){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),r=e.match(n);if(!r)return{year:NaN,restDateString:""};const o=r[1]?parseInt(r[1]):null,i=r[2]?parseInt(r[2]):null;return{year:i===null?o:i*100,restDateString:e.slice((r[1]||r[2]).length)}}function vo(e,t){if(t===null)return new Date(NaN);const n=e.match(mo);if(!n)return new Date(NaN);const r=!!n[4],o=ge(n[1]),i=ge(n[2])-1,a=ge(n[3]),s=ge(n[4]),u=ge(n[5])-1;if(r)return So(t,s,u)?yo(t,s,u):new Date(NaN);{const l=new Date(0);return!ko(t,i,a)||!$o(t,o)?new Date(NaN):(l.setUTCFullYear(t,i,Math.max(o,a)),l)}}function ge(e){return e?parseInt(e):1}function xo(e){const t=e.match(ho);if(!t)return NaN;const n=Je(t[1]),r=Je(t[2]),o=Je(t[3]);return Do(n,r,o)?n*xn+r*vn+o*1e3:NaN}function Je(e){return e&&parseFloat(e.replace(",","."))||0}function wo(e){if(e==="Z")return 0;const t=e.match(po);if(!t)return 0;const n=t[1]==="+"?-1:1,r=parseInt(t[2]),o=t[3]&&parseInt(t[3])||0;return Mo(r,o)?n*(r*xn+o*vn):NaN}function yo(e,t,n){const r=new Date(0);r.setUTCFullYear(e,0,4);const o=r.getUTCDay()||7,i=(t-1)*7+n+1-o;return r.setUTCDate(r.getUTCDate()+i),r}const _o=[31,null,31,30,31,30,31,31,30,31,30,31];function Sn(e){return e%400===0||e%4===0&&e%100!==0}function ko(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(_o[t]||(Sn(e)?29:28))}function $o(e,t){return t>=1&&t<=(Sn(e)?366:365)}function So(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}function Do(e,t,n){return e===24?t===0&&n===0:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}function Mo(e,t){return t>=0&&t<=59}function be(e,t){if(e.one!==void 0&&t===1)return e.one;const n=t%10,r=t%100;return n===1&&r!==11?e.singularNominative.replace("{{count}}",String(t)):n>=2&&n<=4&&(r<10||r>20)?e.singularGenitive.replace("{{count}}",String(t)):e.pluralGenitive.replace("{{count}}",String(t))}function N(e){return(t,n)=>n?.addSuffix?n.comparison&&n.comparison>0?e.future?be(e.future,t):"через "+be(e.regular,t):e.past?be(e.past,t):be(e.regular,t)+" назад":be(e.regular,t)}const zo={lessThanXSeconds:N({regular:{one:"меньше секунды",singularNominative:"меньше {{count}} секунды",singularGenitive:"меньше {{count}} секунд",pluralGenitive:"меньше {{count}} секунд"},future:{one:"меньше, чем через секунду",singularNominative:"меньше, чем через {{count}} секунду",singularGenitive:"меньше, чем через {{count}} секунды",pluralGenitive:"меньше, чем через {{count}} секунд"}}),xSeconds:N({regular:{singularNominative:"{{count}} секунда",singularGenitive:"{{count}} секунды",pluralGenitive:"{{count}} секунд"},past:{singularNominative:"{{count}} секунду назад",singularGenitive:"{{count}} секунды назад",pluralGenitive:"{{count}} секунд назад"},future:{singularNominative:"через {{count}} секунду",singularGenitive:"через {{count}} секунды",pluralGenitive:"через {{count}} секунд"}}),halfAMinute:(e,t)=>t?.addSuffix?t.comparison&&t.comparison>0?"через полминуты":"полминуты назад":"полминуты",lessThanXMinutes:N({regular:{one:"меньше минуты",singularNominative:"меньше {{count}} минуты",singularGenitive:"меньше {{count}} минут",pluralGenitive:"меньше {{count}} минут"},future:{one:"меньше, чем через минуту",singularNominative:"меньше, чем через {{count}} минуту",singularGenitive:"меньше, чем через {{count}} минуты",pluralGenitive:"меньше, чем через {{count}} минут"}}),xMinutes:N({regular:{singularNominative:"{{count}} минута",singularGenitive:"{{count}} минуты",pluralGenitive:"{{count}} минут"},past:{singularNominative:"{{count}} минуту назад",singularGenitive:"{{count}} минуты назад",pluralGenitive:"{{count}} минут назад"},future:{singularNominative:"через {{count}} минуту",singularGenitive:"через {{count}} минуты",pluralGenitive:"через {{count}} минут"}}),aboutXHours:N({regular:{singularNominative:"около {{count}} часа",singularGenitive:"около {{count}} часов",pluralGenitive:"около {{count}} часов"},future:{singularNominative:"приблизительно через {{count}} час",singularGenitive:"приблизительно через {{count}} часа",pluralGenitive:"приблизительно через {{count}} часов"}}),xHours:N({regular:{singularNominative:"{{count}} час",singularGenitive:"{{count}} часа",pluralGenitive:"{{count}} часов"}}),xDays:N({regular:{singularNominative:"{{count}} день",singularGenitive:"{{count}} дня",pluralGenitive:"{{count}} дней"}}),aboutXWeeks:N({regular:{singularNominative:"около {{count}} недели",singularGenitive:"около {{count}} недель",pluralGenitive:"около {{count}} недель"},future:{singularNominative:"приблизительно через {{count}} неделю",singularGenitive:"приблизительно через {{count}} недели",pluralGenitive:"приблизительно через {{count}} недель"}}),xWeeks:N({regular:{singularNominative:"{{count}} неделя",singularGenitive:"{{count}} недели",pluralGenitive:"{{count}} недель"}}),aboutXMonths:N({regular:{singularNominative:"около {{count}} месяца",singularGenitive:"около {{count}} месяцев",pluralGenitive:"около {{count}} месяцев"},future:{singularNominative:"приблизительно через {{count}} месяц",singularGenitive:"приблизительно через {{count}} месяца",pluralGenitive:"приблизительно через {{count}} месяцев"}}),xMonths:N({regular:{singularNominative:"{{count}} месяц",singularGenitive:"{{count}} месяца",pluralGenitive:"{{count}} месяцев"}}),aboutXYears:N({regular:{singularNominative:"около {{count}} года",singularGenitive:"около {{count}} лет",pluralGenitive:"около {{count}} лет"},future:{singularNominative:"приблизительно через {{count}} год",singularGenitive:"приблизительно через {{count}} года",pluralGenitive:"приблизительно через {{count}} лет"}}),xYears:N({regular:{singularNominative:"{{count}} год",singularGenitive:"{{count}} года",pluralGenitive:"{{count}} лет"}}),overXYears:N({regular:{singularNominative:"больше {{count}} года",singularGenitive:"больше {{count}} лет",pluralGenitive:"больше {{count}} лет"},future:{singularNominative:"больше, чем через {{count}} год",singularGenitive:"больше, чем через {{count}} года",pluralGenitive:"больше, чем через {{count}} лет"}}),almostXYears:N({regular:{singularNominative:"почти {{count}} год",singularGenitive:"почти {{count}} года",pluralGenitive:"почти {{count}} лет"},future:{singularNominative:"почти через {{count}} год",singularGenitive:"почти через {{count}} года",pluralGenitive:"почти через {{count}} лет"}})},Eo=(e,t,n)=>zo[e](t,n),Po={full:"EEEE, d MMMM y 'г.'",long:"d MMMM y 'г.'",medium:"d MMM y 'г.'",short:"dd.MM.y"},Zo={full:"H:mm:ss zzzz",long:"H:mm:ss z",medium:"H:mm:ss",short:"H:mm"},Oo={any:"{{date}}, {{time}}"},Io={date:me({formats:Po,defaultWidth:"full"}),time:me({formats:Zo,defaultWidth:"full"}),dateTime:me({formats:Oo,defaultWidth:"any"})},gt=["воскресенье","понедельник","вторник","среду","четверг","пятницу","субботу"];function To(e){const t=gt[e];switch(e){case 0:return"'в прошлое "+t+" в' p";case 1:case 2:case 4:return"'в прошлый "+t+" в' p";case 3:case 5:case 6:return"'в прошлую "+t+" в' p"}}function Ft(e){const t=gt[e];return e===2?"'во "+t+" в' p":"'в "+t+" в' p"}function No(e){const t=gt[e];switch(e){case 0:return"'в следующее "+t+" в' p";case 1:case 2:case 4:return"'в следующий "+t+" в' p";case 3:case 5:case 6:return"'в следующую "+t+" в' p"}}const Co={lastWeek:(e,t,n)=>{const r=e.getDay();return Ct(e,t,n)?Ft(r):To(r)},yesterday:"'вчера в' p",today:"'сегодня в' p",tomorrow:"'завтра в' p",nextWeek:(e,t,n)=>{const r=e.getDay();return Ct(e,t,n)?Ft(r):No(r)},other:"P"},Fo=(e,t,n,r)=>{const o=Co[e];return typeof o=="function"?o(t,n,r):o},Lo={narrow:["до н.э.","н.э."],abbreviated:["до н. э.","н. э."],wide:["до нашей эры","нашей эры"]},Ao={narrow:["1","2","3","4"],abbreviated:["1-й кв.","2-й кв.","3-й кв.","4-й кв."],wide:["1-й квартал","2-й квартал","3-й квартал","4-й квартал"]},jo={narrow:["Я","Ф","М","А","М","И","И","А","С","О","Н","Д"],abbreviated:["янв.","фев.","март","апр.","май","июнь","июль","авг.","сент.","окт.","нояб.","дек."],wide:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"]},Bo={narrow:["Я","Ф","М","А","М","И","И","А","С","О","Н","Д"],abbreviated:["янв.","фев.","мар.","апр.","мая","июн.","июл.","авг.","сент.","окт.","нояб.","дек."],wide:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]},Wo={narrow:["В","П","В","С","Ч","П","С"],short:["вс","пн","вт","ср","чт","пт","сб"],abbreviated:["вск","пнд","втр","срд","чтв","птн","суб"],wide:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"]},Ro={narrow:{am:"ДП",pm:"ПП",midnight:"полн.",noon:"полд.",morning:"утро",afternoon:"день",evening:"веч.",night:"ночь"},abbreviated:{am:"ДП",pm:"ПП",midnight:"полн.",noon:"полд.",morning:"утро",afternoon:"день",evening:"веч.",night:"ночь"},wide:{am:"ДП",pm:"ПП",midnight:"полночь",noon:"полдень",morning:"утро",afternoon:"день",evening:"вечер",night:"ночь"}},Uo={narrow:{am:"ДП",pm:"ПП",midnight:"полн.",noon:"полд.",morning:"утра",afternoon:"дня",evening:"веч.",night:"ночи"},abbreviated:{am:"ДП",pm:"ПП",midnight:"полн.",noon:"полд.",morning:"утра",afternoon:"дня",evening:"веч.",night:"ночи"},wide:{am:"ДП",pm:"ПП",midnight:"полночь",noon:"полдень",morning:"утра",afternoon:"дня",evening:"вечера",night:"ночи"}},qo=(e,t)=>{const n=Number(e),r=t?.unit;let o;return r==="date"?o="-е":r==="week"||r==="minute"||r==="second"?o="-я":o="-й",n+o},Yo={ordinalNumber:qo,era:R({values:Lo,defaultWidth:"wide"}),quarter:R({values:Ao,defaultWidth:"wide",argumentCallback:e=>e-1}),month:R({values:jo,defaultWidth:"wide",formattingValues:Bo,defaultFormattingWidth:"wide"}),day:R({values:Wo,defaultWidth:"wide"}),dayPeriod:R({values:Ro,defaultWidth:"any",formattingValues:Uo,defaultFormattingWidth:"wide"})},Go=/^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i,Vo=/\d+/i,Ho={narrow:/^((до )?н\.?\s?э\.?)/i,abbreviated:/^((до )?н\.?\s?э\.?)/i,wide:/^(до нашей эры|нашей эры|наша эра)/i},Xo={any:[/^д/i,/^н/i]},Jo={narrow:/^[1234]/i,abbreviated:/^[1234](-?[ыои]?й?)? кв.?/i,wide:/^[1234](-?[ыои]?й?)? квартал/i},Qo={any:[/1/i,/2/i,/3/i,/4/i]},Ko={narrow:/^[яфмаисонд]/i,abbreviated:/^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,wide:/^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i},ei={narrow:[/^я/i,/^ф/i,/^м/i,/^а/i,/^м/i,/^и/i,/^и/i,/^а/i,/^с/i,/^о/i,/^н/i,/^я/i],any:[/^я/i,/^ф/i,/^мар/i,/^ап/i,/^ма[йя]/i,/^июн/i,/^июл/i,/^ав/i,/^с/i,/^о/i,/^н/i,/^д/i]},ti={narrow:/^[впсч]/i,short:/^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,abbreviated:/^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,wide:/^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i},ni={narrow:[/^в/i,/^п/i,/^в/i,/^с/i,/^ч/i,/^п/i,/^с/i],any:[/^в[ос]/i,/^п[он]/i,/^в/i,/^ср/i,/^ч/i,/^п[ят]/i,/^с[уб]/i]},ri={narrow:/^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,abbreviated:/^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,wide:/^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i},oi={any:{am:/^дп/i,pm:/^пп/i,midnight:/^полн/i,noon:/^полд/i,morning:/^у/i,afternoon:/^д[ен]/i,evening:/^в/i,night:/^н/i}},ii={ordinalNumber:_n({matchPattern:Go,parsePattern:Vo,valueCallback:e=>parseInt(e,10)}),era:U({matchPatterns:Ho,defaultMatchWidth:"wide",parsePatterns:Xo,defaultParseWidth:"any"}),quarter:U({matchPatterns:Jo,defaultMatchWidth:"wide",parsePatterns:Qo,defaultParseWidth:"any",valueCallback:e=>e+1}),month:U({matchPatterns:Ko,defaultMatchWidth:"wide",parsePatterns:ei,defaultParseWidth:"any"}),day:U({matchPatterns:ti,defaultMatchWidth:"wide",parsePatterns:ni,defaultParseWidth:"any"}),dayPeriod:U({matchPatterns:ri,defaultMatchWidth:"wide",parsePatterns:oi,defaultParseWidth:"any"})},we={code:"ru",formatDistance:Eo,formatLong:Io,formatRelative:Fo,localize:Yo,match:ii,options:{weekStartsOn:1,firstWeekContainsDate:1}},at=(e,t)=>t.some(n=>e instanceof n);let Lt,At;function ai(){return Lt||(Lt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function si(){return At||(At=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const st=new WeakMap,Qe=new WeakMap,Re=new WeakMap;function ci(e){const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{n(re(e.result)),o()},a=()=>{r(e.error),o()};e.addEventListener("success",i),e.addEventListener("error",a)});return Re.set(t,e),t}function ui(e){if(st.has(e))return;const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{n(),o()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});st.set(e,t)}let ct={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return st.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return re(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Dn(e){ct=e(ct)}function li(e){return si().includes(e)?function(...t){return e.apply(ut(this),t),re(this.request)}:function(...t){return re(e.apply(ut(this),t))}}function di(e){return typeof e=="function"?li(e):(e instanceof IDBTransaction&&ui(e),at(e,ai())?new Proxy(e,ct):e)}function re(e){if(e instanceof IDBRequest)return ci(e);if(Qe.has(e))return Qe.get(e);const t=di(e);return t!==e&&(Qe.set(e,t),Re.set(t,e)),t}const ut=e=>Re.get(e);function fi(e,t,{blocked:n,upgrade:r,blocking:o,terminated:i}={}){const a=indexedDB.open(e,t),s=re(a);return r&&a.addEventListener("upgradeneeded",u=>{r(re(a.result),u.oldVersion,u.newVersion,re(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),s.then(u=>{i&&u.addEventListener("close",()=>i()),o&&u.addEventListener("versionchange",l=>o(l.oldVersion,l.newVersion,l))}).catch(()=>{}),s}const mi=["get","getKey","getAll","getAllKeys","count"],hi=["put","add","delete","clear"],Ke=new Map;function jt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ke.get(t))return Ke.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=hi.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||mi.includes(n)))return;const i=async function(a,...s){const u=this.transaction(a,o?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(s.shift())),(await Promise.all([l[n](...s),o&&u.done]))[0]};return Ke.set(t,i),i}Dn(e=>({...e,get:(t,n,r)=>jt(t,n)||e.get(t,n,r),has:(t,n)=>!!jt(t,n)||e.has(t,n)}));const pi=["continue","continuePrimaryKey","advance"],Bt={},lt=new WeakMap,Mn=new WeakMap,gi={get(e,t){if(!pi.includes(t))return e[t];let n=Bt[t];return n||(n=Bt[t]=function(...r){lt.set(this,Mn.get(this)[t](...r))}),n}};async function*bi(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,gi);for(Mn.set(n,t),Re.set(n,ut(t));t;)yield n,t=await(lt.get(n)||t.continue()),lt.delete(n)}function Wt(e,t){return t===Symbol.asyncIterator&&at(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&at(e,[IDBIndex,IDBObjectStore])}Dn(e=>({...e,get(t,n,r){return Wt(t,n)?bi:e.get(t,n,r)},has(t,n){return Wt(t,n)||e.has(t,n)}}));const vi="BudgetDB",xi=1,Le="budget",ye="transactions",$e=fi(vi,xi,{upgrade(e){e.objectStoreNames.contains(Le)||e.createObjectStore(Le),e.objectStoreNames.contains(ye)||e.createObjectStore(ye,{keyPath:"id",autoIncrement:!0}).createIndex("date","date")}});async function Ue(e){await(await $e).put(Le,e,"current")}async function wi(){return(await $e).get(Le,"current")}async function yi(e){return await(await $e).add(ye,e)}async function _i(e){await(await $e).delete(ye,e)}async function bt(){const t=await(await $e).getAll(ye);return t.sort((n,r)=>n.date===r.date?(r.id??0)-(n.id??0):n.date<r.date?1:-1),t}function ki(e){let t=e;const n=new Set;return{getState:()=>t,setState:a=>{const s=typeof a=="function"?a(t):a;t={...t,...s},n.forEach(u=>{u(t)})},subscribe:a=>(n.add(a),()=>{n.delete(a)})}}const _=ki({route:"start",budget:null,transactions:[],loading:!1,error:null});function $i(e){const t=j(e);return pe(t,"d MMMM",{locale:we})}function Si(e,t){const n=X(j(e.startDate)),r=X(new Date),o=Math.max(1,ae(r,n)+1),i=t.filter(a=>a.type==="expense").reduce((a,s)=>a+Math.abs(s.amount),0);return i===0?0:i/o}function et(e){return new Intl.NumberFormat("ru-RU",{maximumFractionDigits:0}).format(e)}function Di(){const e=_.getState(),t=document.createElement("div");t.className="min-h-screen bg-slate-50";const n=e.budget;if(!n)return _.setState({route:"start"}),t;const r=e.transactions??[],o=new Set,i=()=>_.setState({route:"main"}),a=()=>r.filter(d=>!o.has(Number(d.id))),s=()=>a().filter(d=>d.type==="expense").map(d=>({...d,amount:Math.abs(d.amount)})),u=(d,f)=>d.length?d.map((h,p)=>{const g=p===d.length-1?"":`<div class="h-px w-full ${f?"bg-slate-200":"bg-slate-500"}"></div>`;return`
          <div class="${f?"py-2":""} flex items-baseline gap-3">
            <div class="flex-1 text-[18px] ${f?"font-normal":"font-semibold"} leading-[1.3] text-slate-900 font-inter">
              ${et(h.amount)}
            </div>

            <div class="text-[16px] font-normal leading-[1.5] text-slate-500 font-inter">
              ${$i(h.date)}
            </div>

            <button
              type="button"
              class="ml-1 inline-flex ${f?"h-8 w-8":"h-6 w-6"} items-center justify-center text-slate-500 hover:text-slate-700"
              aria-label="Удалить"
              data-del-id="${String(h.id)}"
            >
              ${Mi()}
            </button>
          </div>
          ${g}
        `}).join(""):`<div class="${f?"mt-4":""} text-[16px] font-normal leading-[1.5] text-slate-500 font-inter">Пока нет расходов.</div>`,l=()=>{const d=a(),f=s(),h=Si(n,d),p=o.size>0;t.innerHTML=`
      <!-- MOBILE (<704) -->
      <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
        <div class="pb-32">
          <div class="flex flex-col gap-1">
            <div class="text-[24px] font-bold leading-[1.2] text-slate-900 font-inter">
              История расходов
            </div>
            <div id="avgMobile" class="text-[12px] font-normal leading-[1.4] text-blue-500 font-inter">
              Средние траты в день: ${et(h)} ₽
            </div>
          </div>

          <div id="historyListMobile" class="mt-6 flex flex-col gap-2">
            ${u(f,!0)}
          </div>
        </div>

        <!-- fixed bottom buttons -->
        <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
          <button
            id="backBtnMobile"
            type="button"
            class="${p?"hidden":""} h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться
          </button>

          <button
            id="cancelBtnMobile"
            type="button"
            class="${p?"":"hidden"} h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться без сохранения
          </button>

          <button
            id="saveBtnMobile"
            type="button"
            class="${p?"":"hidden"} mt-3 h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
          >
            Сохранить
          </button>
        </div>
      </div>

      <!-- TABLET/DESKTOP (>=704) -->
      <div
        class="hidden min-[704px]:flex min-h-screen bg-slate-50 px-4 pt-16 pb-6 flex-col items-center
               min-[704px]:pt-0 min-[704px]:pb-0 min-[704px]:justify-center
               min-[1140px]:pt-16 min-[1140px]:pb-6 min-[1140px]:justify-start"
      >
        <div class="w-full flex flex-col min-[704px]:w-[524px] min-[1140px]:w-[558px]">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <div class="text-[24px] font-semibold leading-[1.2] text-slate-900 font-inter">
                  История расходов
                </div>
                <div id="avgDesktop" class="text-[12px] font-normal leading-[1.4] text-blue-500 font-inter">
                  Средние траты в день: ${et(h)} ₽
                </div>
              </div>

              <div id="historyListDesktop" class="flex flex-col gap-2">
                ${u(f,!1)}
              </div>

              ${p?`
                    <button
                      id="cancelBtnDesktop"
                      type="button"
                      class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10 font-inter"
                    >
                      Вернуться без сохранения
                    </button>
                    <button
                      id="saveBtnDesktop"
                      type="button"
                      class="h-12 w-full rounded-[4px] bg-blue-500 px-4 text-[16px] font-medium leading-[1.5] text-white hover:bg-blue-500/85 font-inter"
                    >
                      Сохранить
                    </button>
                  `:`
                    <button
                      id="backBtnDesktop"
                      type="button"
                      class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10 font-inter"
                    >
                      Вернуться
                    </button>
                  `}
            </div>
          </section>
        </div>
      </div>
    `,t.querySelector("#backBtnMobile")?.addEventListener("click",i),t.querySelector("#backBtnDesktop")?.addEventListener("click",i),t.querySelector("#cancelBtnMobile")?.addEventListener("click",i),t.querySelector("#cancelBtnDesktop")?.addEventListener("click",i);const g=()=>{(async()=>{if(!o.size){i();return}const v=Array.from(o.values());await Promise.all(v.map(I=>_i(I)));const Z=await bt();_.setState({transactions:Z}),i()})()};t.querySelector("#saveBtnMobile")?.addEventListener("click",g),t.querySelector("#saveBtnDesktop")?.addEventListener("click",g);const P=v=>{const Z=v.target.closest("button[data-del-id]");if(!Z)return;const I=Number(Z.dataset.delId);Number.isFinite(I)&&(o.add(I),l())};t.querySelector("#historyListMobile")?.addEventListener("click",P),t.querySelector("#historyListDesktop")?.addEventListener("click",P)};return l(),t}function Mi(){return`
    <img
      src="/assets/delete.svg"
      alt=""
      class="h-3 w-3"
      aria-hidden="true"
      draggable="false"
    />
  `}function zi(e){const t=j(e.startDate),n=j(e.endDate);return Math.max(0,ae(n,t))}function vt(e,t){const n=X(j(t)),r=X(j(e.endDate));return Math.max(0,ae(r,n))}function zn(e){const t=zi(e);return t<=0?0:qe(e.initialBalance/t)}function xt(e,t){const n=t.reduce((r,o)=>r+(o.type==="income"?o.amount:-o.amount),0);return qe(e.initialBalance+n)}function Ei(e,t){return qe(e.filter(n=>n.date===t).reduce((n,r)=>n+(r.type==="income"?r.amount:-r.amount),0))}function Pi(e,t,n){const r=vt(e,n);if(r<=0)return 0;const o=xt(e,t),i=Ei(t,n);return qe(o/r+i)}function qe(e){return Math.round(e*100)/100}function Se(e){return pe(e,"yyyy-MM-dd")}function c(e,t,n){function r(s,u){var l;Object.defineProperty(s,"_zod",{value:s._zod??{},enumerable:!1}),(l=s._zod).traits??(l.traits=new Set),s._zod.traits.add(e),t(s,u);for(const d in a.prototype)d in s||Object.defineProperty(s,d,{value:a.prototype[d].bind(s)});s._zod.constr=a,s._zod.def=u}const o=n?.Parent??Object;class i extends o{}Object.defineProperty(i,"name",{value:e});function a(s){var u;const l=n?.Parent?new i:this;r(l,s),(u=l._zod).deferred??(u.deferred=[]);for(const d of l._zod.deferred)d();return l}return Object.defineProperty(a,"init",{value:r}),Object.defineProperty(a,Symbol.hasInstance,{value:s=>n?.Parent&&s instanceof n.Parent?!0:s?._zod?.traits?.has(e)}),Object.defineProperty(a,"name",{value:e}),a}class he extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class En extends Error{constructor(t){super(`Encountered unidirectional transform during encode: ${t}`),this.name="ZodEncodeError"}}const Pn={};function oe(e){return Pn}function Zi(e){const t=Object.values(e).filter(r=>typeof r=="number");return Object.entries(e).filter(([r,o])=>t.indexOf(+r)===-1).map(([r,o])=>o)}function dt(e,t){return typeof t=="bigint"?t.toString():t}function wt(e){return{get value(){{const t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function yt(e){return e==null}function _t(e){const t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function Oi(e,t){const n=(e.toString().split(".")[1]||"").length,r=t.toString();let o=(r.split(".")[1]||"").length;if(o===0&&/\d?e-\d?/.test(r)){const u=r.match(/\d?e-(\d?)/);u?.[1]&&(o=Number.parseInt(u[1]))}const i=n>o?n:o,a=Number.parseInt(e.toFixed(i).replace(".","")),s=Number.parseInt(t.toFixed(i).replace(".",""));return a%s/10**i}const Rt=Symbol("evaluating");function x(e,t,n){let r;Object.defineProperty(e,t,{get(){if(r!==Rt)return r===void 0&&(r=Rt,r=n()),r},set(o){Object.defineProperty(e,t,{value:o})},configurable:!0})}function se(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function ce(...e){const t={};for(const n of e){const r=Object.getOwnPropertyDescriptors(n);Object.assign(t,r)}return Object.defineProperties({},t)}function Ut(e){return JSON.stringify(e)}const Zn="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function Ae(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Ii=wt(()=>{if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{const e=Function;return new e(""),!0}catch{return!1}});function _e(e){if(Ae(e)===!1)return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(Ae(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function On(e){return _e(e)?{...e}:Array.isArray(e)?[...e]:e}const Ti=new Set(["string","number","symbol"]);function Ye(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function J(e,t,n){const r=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(r._zod.parent=e),r}function m(e){const t=e;if(!t)return{};if(typeof t=="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error=="string"?{...t,error:()=>t.error}:t}function Ni(e){return Object.keys(e).filter(t=>e[t]._zod.optin==="optional"&&e[t]._zod.optout==="optional")}const Ci={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function Fi(e,t){const n=e._zod.def,r=ce(e._zod.def,{get shape(){const o={};for(const i in t){if(!(i in n.shape))throw new Error(`Unrecognized key: "${i}"`);t[i]&&(o[i]=n.shape[i])}return se(this,"shape",o),o},checks:[]});return J(e,r)}function Li(e,t){const n=e._zod.def,r=ce(e._zod.def,{get shape(){const o={...e._zod.def.shape};for(const i in t){if(!(i in n.shape))throw new Error(`Unrecognized key: "${i}"`);t[i]&&delete o[i]}return se(this,"shape",o),o},checks:[]});return J(e,r)}function Ai(e,t){if(!_e(t))throw new Error("Invalid input to extend: expected a plain object");const n=e._zod.def.checks;if(n&&n.length>0)throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");const o=ce(e._zod.def,{get shape(){const i={...e._zod.def.shape,...t};return se(this,"shape",i),i},checks:[]});return J(e,o)}function ji(e,t){if(!_e(t))throw new Error("Invalid input to safeExtend: expected a plain object");const n={...e._zod.def,get shape(){const r={...e._zod.def.shape,...t};return se(this,"shape",r),r},checks:e._zod.def.checks};return J(e,n)}function Bi(e,t){const n=ce(e._zod.def,{get shape(){const r={...e._zod.def.shape,...t._zod.def.shape};return se(this,"shape",r),r},get catchall(){return t._zod.def.catchall},checks:[]});return J(e,n)}function Wi(e,t,n){const r=ce(t._zod.def,{get shape(){const o=t._zod.def.shape,i={...o};if(n)for(const a in n){if(!(a in o))throw new Error(`Unrecognized key: "${a}"`);n[a]&&(i[a]=e?new e({type:"optional",innerType:o[a]}):o[a])}else for(const a in o)i[a]=e?new e({type:"optional",innerType:o[a]}):o[a];return se(this,"shape",i),i},checks:[]});return J(t,r)}function Ri(e,t,n){const r=ce(t._zod.def,{get shape(){const o=t._zod.def.shape,i={...o};if(n)for(const a in n){if(!(a in i))throw new Error(`Unrecognized key: "${a}"`);n[a]&&(i[a]=new e({type:"nonoptional",innerType:o[a]}))}else for(const a in o)i[a]=new e({type:"nonoptional",innerType:o[a]});return se(this,"shape",i),i},checks:[]});return J(t,r)}function fe(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function In(e,t){return t.map(n=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}function ze(e){return typeof e=="string"?e:e?.message}function ie(e,t,n){const r={...e,path:e.path??[]};if(!e.message){const o=ze(e.inst?._zod.def?.error?.(e))??ze(t?.error?.(e))??ze(n.customError?.(e))??ze(n.localeError?.(e))??"Invalid input";r.message=o}return delete r.inst,delete r.continue,t?.reportInput||delete r.input,r}function kt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function ke(...e){const[t,n,r]=e;return typeof t=="string"?{message:t,code:"custom",input:n,inst:r}:{...t}}const Tn=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,dt,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},Nn=c("$ZodError",Tn),Cn=c("$ZodError",Tn,{Parent:Error});function Ui(e,t=n=>n.message){const n={},r=[];for(const o of e.issues)o.path.length>0?(n[o.path[0]]=n[o.path[0]]||[],n[o.path[0]].push(t(o))):r.push(t(o));return{formErrors:r,fieldErrors:n}}function qi(e,t=n=>n.message){const n={_errors:[]},r=o=>{for(const i of o.issues)if(i.code==="invalid_union"&&i.errors.length)i.errors.map(a=>r({issues:a}));else if(i.code==="invalid_key")r({issues:i.issues});else if(i.code==="invalid_element")r({issues:i.issues});else if(i.path.length===0)n._errors.push(t(i));else{let a=n,s=0;for(;s<i.path.length;){const u=i.path[s];s===i.path.length-1?(a[u]=a[u]||{_errors:[]},a[u]._errors.push(t(i))):a[u]=a[u]||{_errors:[]},a=a[u],s++}}};return r(e),n}const $t=e=>(t,n,r,o)=>{const i=r?Object.assign(r,{async:!1}):{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new he;if(a.issues.length){const s=new(o?.Err??e)(a.issues.map(u=>ie(u,i,oe())));throw Zn(s,o?.callee),s}return a.value},St=e=>async(t,n,r,o)=>{const i=r?Object.assign(r,{async:!0}):{async:!0};let a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise&&(a=await a),a.issues.length){const s=new(o?.Err??e)(a.issues.map(u=>ie(u,i,oe())));throw Zn(s,o?.callee),s}return a.value},Ge=e=>(t,n,r)=>{const o=r?{...r,async:!1}:{async:!1},i=t._zod.run({value:n,issues:[]},o);if(i instanceof Promise)throw new he;return i.issues.length?{success:!1,error:new(e??Nn)(i.issues.map(a=>ie(a,o,oe())))}:{success:!0,data:i.value}},Yi=Ge(Cn),Ve=e=>async(t,n,r)=>{const o=r?Object.assign(r,{async:!0}):{async:!0};let i=t._zod.run({value:n,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new e(i.issues.map(a=>ie(a,o,oe())))}:{success:!0,data:i.value}},Gi=Ve(Cn),Vi=e=>(t,n,r)=>{const o=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return $t(e)(t,n,o)},Hi=e=>(t,n,r)=>$t(e)(t,n,r),Xi=e=>async(t,n,r)=>{const o=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return St(e)(t,n,o)},Ji=e=>async(t,n,r)=>St(e)(t,n,r),Qi=e=>(t,n,r)=>{const o=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return Ge(e)(t,n,o)},Ki=e=>(t,n,r)=>Ge(e)(t,n,r),ea=e=>async(t,n,r)=>{const o=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return Ve(e)(t,n,o)},ta=e=>async(t,n,r)=>Ve(e)(t,n,r),na=/^[cC][^\s-]{8,}$/,ra=/^[0-9a-z]+$/,oa=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,ia=/^[0-9a-vA-V]{20}$/,aa=/^[A-Za-z0-9]{27}$/,sa=/^[a-zA-Z0-9_-]{21}$/,ca=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,ua=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,qt=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,la=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,da="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function fa(){return new RegExp(da,"u")}const ma=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,ha=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,pa=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,ga=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,ba=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Fn=/^[A-Za-z0-9_-]*$/,va=/^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,xa=/^\+(?:[0-9]){6,14}[0-9]$/,Ln="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",wa=new RegExp(`^${Ln}$`);function An(e){const t="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function ya(e){return new RegExp(`^${An(e)}$`)}function _a(e){const t=An({precision:e.precision}),n=["Z"];e.local&&n.push(""),e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const r=`${t}(?:${n.join("|")})`;return new RegExp(`^${Ln}T(?:${r})$`)}const ka=e=>{const t=e?`[\\s\\S]{${e?.minimum??0},${e?.maximum??""}}`:"[\\s\\S]*";return new RegExp(`^${t}$`)},$a=/^-?\d+$/,Sa=/^-?\d+(?:\.\d+)?/,Da=/^[^A-Z]*$/,Ma=/^[^a-z]*$/,C=c("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),jn={number:"number",bigint:"bigint",object:"date"},Bn=c("$ZodCheckLessThan",(e,t)=>{C.init(e,t);const n=jn[typeof t.value];e._zod.onattach.push(r=>{const o=r._zod.bag,i=(t.inclusive?o.maximum:o.exclusiveMaximum)??Number.POSITIVE_INFINITY;t.value<i&&(t.inclusive?o.maximum=t.value:o.exclusiveMaximum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:n,code:"too_big",maximum:t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Wn=c("$ZodCheckGreaterThan",(e,t)=>{C.init(e,t);const n=jn[typeof t.value];e._zod.onattach.push(r=>{const o=r._zod.bag,i=(t.inclusive?o.minimum:o.exclusiveMinimum)??Number.NEGATIVE_INFINITY;t.value>i&&(t.inclusive?o.minimum=t.value:o.exclusiveMinimum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:n,code:"too_small",minimum:t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),za=c("$ZodCheckMultipleOf",(e,t)=>{C.init(e,t),e._zod.onattach.push(n=>{var r;(r=n._zod.bag).multipleOf??(r.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?n.value%t.value===BigInt(0):Oi(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Ea=c("$ZodCheckNumberFormat",(e,t)=>{C.init(e,t),t.format=t.format||"float64";const n=t.format?.includes("int"),r=n?"int":"number",[o,i]=Ci[t.format];e._zod.onattach.push(a=>{const s=a._zod.bag;s.format=t.format,s.minimum=o,s.maximum=i,n&&(s.pattern=$a)}),e._zod.check=a=>{const s=a.value;if(n){if(!Number.isInteger(s)){a.issues.push({expected:r,format:t.format,code:"invalid_type",continue:!1,input:s,inst:e});return}if(!Number.isSafeInteger(s)){s>0?a.issues.push({input:s,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,continue:!t.abort}):a.issues.push({input:s,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,continue:!t.abort});return}}s<o&&a.issues.push({origin:"number",input:s,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!t.abort}),s>i&&a.issues.push({origin:"number",input:s,code:"too_big",maximum:i,inst:e})}}),Pa=c("$ZodCheckMaxLength",(e,t)=>{var n;C.init(e,t),(n=e._zod.def).when??(n.when=r=>{const o=r.value;return!yt(o)&&o.length!==void 0}),e._zod.onattach.push(r=>{const o=r._zod.bag.maximum??Number.POSITIVE_INFINITY;t.maximum<o&&(r._zod.bag.maximum=t.maximum)}),e._zod.check=r=>{const o=r.value;if(o.length<=t.maximum)return;const a=kt(o);r.issues.push({origin:a,code:"too_big",maximum:t.maximum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),Za=c("$ZodCheckMinLength",(e,t)=>{var n;C.init(e,t),(n=e._zod.def).when??(n.when=r=>{const o=r.value;return!yt(o)&&o.length!==void 0}),e._zod.onattach.push(r=>{const o=r._zod.bag.minimum??Number.NEGATIVE_INFINITY;t.minimum>o&&(r._zod.bag.minimum=t.minimum)}),e._zod.check=r=>{const o=r.value;if(o.length>=t.minimum)return;const a=kt(o);r.issues.push({origin:a,code:"too_small",minimum:t.minimum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),Oa=c("$ZodCheckLengthEquals",(e,t)=>{var n;C.init(e,t),(n=e._zod.def).when??(n.when=r=>{const o=r.value;return!yt(o)&&o.length!==void 0}),e._zod.onattach.push(r=>{const o=r._zod.bag;o.minimum=t.length,o.maximum=t.length,o.length=t.length}),e._zod.check=r=>{const o=r.value,i=o.length;if(i===t.length)return;const a=kt(o),s=i>t.length;r.issues.push({origin:a,...s?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!t.abort})}}),He=c("$ZodCheckStringFormat",(e,t)=>{var n,r;C.init(e,t),e._zod.onattach.push(o=>{const i=o._zod.bag;i.format=t.format,t.pattern&&(i.patterns??(i.patterns=new Set),i.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=o=>{t.pattern.lastIndex=0,!t.pattern.test(o.value)&&o.issues.push({origin:"string",code:"invalid_format",format:t.format,input:o.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(r=e._zod).check??(r.check=()=>{})}),Ia=c("$ZodCheckRegex",(e,t)=>{He.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),Ta=c("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=Da),He.init(e,t)}),Na=c("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=Ma),He.init(e,t)}),Ca=c("$ZodCheckIncludes",(e,t)=>{C.init(e,t);const n=Ye(t.includes),r=new RegExp(typeof t.position=="number"?`^.{${t.position}}${n}`:n);t.pattern=r,e._zod.onattach.push(o=>{const i=o._zod.bag;i.patterns??(i.patterns=new Set),i.patterns.add(r)}),e._zod.check=o=>{o.value.includes(t.includes,t.position)||o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:o.value,inst:e,continue:!t.abort})}}),Fa=c("$ZodCheckStartsWith",(e,t)=>{C.init(e,t);const n=new RegExp(`^${Ye(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.onattach.push(r=>{const o=r._zod.bag;o.patterns??(o.patterns=new Set),o.patterns.add(n)}),e._zod.check=r=>{r.value.startsWith(t.prefix)||r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:r.value,inst:e,continue:!t.abort})}}),La=c("$ZodCheckEndsWith",(e,t)=>{C.init(e,t);const n=new RegExp(`.*${Ye(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.onattach.push(r=>{const o=r._zod.bag;o.patterns??(o.patterns=new Set),o.patterns.add(n)}),e._zod.check=r=>{r.value.endsWith(t.suffix)||r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:r.value,inst:e,continue:!t.abort})}}),Aa=c("$ZodCheckOverwrite",(e,t)=>{C.init(e,t),e._zod.check=n=>{n.value=t.tx(n.value)}});class ja{constructor(t=[]){this.content=[],this.indent=0,this&&(this.args=t)}indented(t){this.indent+=1,t(this),this.indent-=1}write(t){if(typeof t=="function"){t(this,{execution:"sync"}),t(this,{execution:"async"});return}const r=t.split(`
`).filter(a=>a),o=Math.min(...r.map(a=>a.length-a.trimStart().length)),i=r.map(a=>a.slice(o)).map(a=>" ".repeat(this.indent*2)+a);for(const a of i)this.content.push(a)}compile(){const t=Function,n=this?.args,o=[...(this?.content??[""]).map(i=>`  ${i}`)];return new t(...n,o.join(`
`))}}const Ba={major:4,minor:1,patch:12},M=c("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=Ba;const r=[...e._zod.def.checks??[]];e._zod.traits.has("$ZodCheck")&&r.unshift(e);for(const o of r)for(const i of o._zod.onattach)i(e);if(r.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{const o=(a,s,u)=>{let l=fe(a),d;for(const f of s){if(f._zod.def.when){if(!f._zod.def.when(a))continue}else if(l)continue;const h=a.issues.length,p=f._zod.check(a);if(p instanceof Promise&&u?.async===!1)throw new he;if(d||p instanceof Promise)d=(d??Promise.resolve()).then(async()=>{await p,a.issues.length!==h&&(l||(l=fe(a,h)))});else{if(a.issues.length===h)continue;l||(l=fe(a,h))}}return d?d.then(()=>a):a},i=(a,s,u)=>{if(fe(a))return a.aborted=!0,a;const l=o(s,r,u);if(l instanceof Promise){if(u.async===!1)throw new he;return l.then(d=>e._zod.parse(d,u))}return e._zod.parse(l,u)};e._zod.run=(a,s)=>{if(s.skipChecks)return e._zod.parse(a,s);if(s.direction==="backward"){const l=e._zod.parse({value:a.value,issues:[]},{...s,skipChecks:!0});return l instanceof Promise?l.then(d=>i(d,a,s)):i(l,a,s)}const u=e._zod.parse(a,s);if(u instanceof Promise){if(s.async===!1)throw new he;return u.then(l=>o(l,r,s))}return o(u,r,s)}}e["~standard"]={validate:o=>{try{const i=Yi(e,o);return i.success?{value:i.data}:{issues:i.error?.issues}}catch{return Gi(e,o).then(a=>a.success?{value:a.data}:{issues:a.error?.issues})}},vendor:"zod",version:1}}),Dt=c("$ZodString",(e,t)=>{M.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??ka(e._zod.bag),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value=="string"||n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),k=c("$ZodStringFormat",(e,t)=>{He.init(e,t),Dt.init(e,t)}),Wa=c("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=ua),k.init(e,t)}),Ra=c("$ZodUUID",(e,t)=>{if(t.version){const r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(r===void 0)throw new Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=qt(r))}else t.pattern??(t.pattern=qt());k.init(e,t)}),Ua=c("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=la),k.init(e,t)}),qa=c("$ZodURL",(e,t)=>{k.init(e,t),e._zod.check=n=>{try{const r=n.value.trim(),o=new URL(r);t.hostname&&(t.hostname.lastIndex=0,t.hostname.test(o.hostname)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:va.source,input:n.value,inst:e,continue:!t.abort})),t.protocol&&(t.protocol.lastIndex=0,t.protocol.test(o.protocol.endsWith(":")?o.protocol.slice(0,-1):o.protocol)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort})),t.normalize?n.value=o.href:n.value=r;return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),Ya=c("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=fa()),k.init(e,t)}),Ga=c("$ZodNanoID",(e,t)=>{t.pattern??(t.pattern=sa),k.init(e,t)}),Va=c("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=na),k.init(e,t)}),Ha=c("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=ra),k.init(e,t)}),Xa=c("$ZodULID",(e,t)=>{t.pattern??(t.pattern=oa),k.init(e,t)}),Ja=c("$ZodXID",(e,t)=>{t.pattern??(t.pattern=ia),k.init(e,t)}),Qa=c("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=aa),k.init(e,t)}),Ka=c("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=_a(t)),k.init(e,t)}),es=c("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=wa),k.init(e,t)}),ts=c("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=ya(t)),k.init(e,t)}),ns=c("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=ca),k.init(e,t)}),rs=c("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=ma),k.init(e,t),e._zod.onattach.push(n=>{const r=n._zod.bag;r.format="ipv4"})}),os=c("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=ha),k.init(e,t),e._zod.onattach.push(n=>{const r=n._zod.bag;r.format="ipv6"}),e._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}}}),is=c("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=pa),k.init(e,t)}),as=c("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=ga),k.init(e,t),e._zod.check=n=>{const r=n.value.split("/");try{if(r.length!==2)throw new Error;const[o,i]=r;if(!i)throw new Error;const a=Number(i);if(`${a}`!==i)throw new Error;if(a<0||a>128)throw new Error;new URL(`http://[${o}]`)}catch{n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}}});function Rn(e){if(e==="")return!0;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}const ss=c("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=ba),k.init(e,t),e._zod.onattach.push(n=>{n._zod.bag.contentEncoding="base64"}),e._zod.check=n=>{Rn(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}});function cs(e){if(!Fn.test(e))return!1;const t=e.replace(/[-_]/g,r=>r==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return Rn(n)}const us=c("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=Fn),k.init(e,t),e._zod.onattach.push(n=>{n._zod.bag.contentEncoding="base64url"}),e._zod.check=n=>{cs(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),ls=c("$ZodE164",(e,t)=>{t.pattern??(t.pattern=xa),k.init(e,t)});function ds(e,t=null){try{const n=e.split(".");if(n.length!==3)return!1;const[r]=n;if(!r)return!1;const o=JSON.parse(atob(r));return!("typ"in o&&o?.typ!=="JWT"||!o.alg||t&&(!("alg"in o)||o.alg!==t))}catch{return!1}}const fs=c("$ZodJWT",(e,t)=>{k.init(e,t),e._zod.check=n=>{ds(n.value,t.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}}),Un=c("$ZodNumber",(e,t)=>{M.init(e,t),e._zod.pattern=e._zod.bag.pattern??Sa,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}const o=n.value;if(typeof o=="number"&&!Number.isNaN(o)&&Number.isFinite(o))return n;const i=typeof o=="number"?Number.isNaN(o)?"NaN":Number.isFinite(o)?void 0:"Infinity":void 0;return n.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...i?{received:i}:{}}),n}}),ms=c("$ZodNumber",(e,t)=>{Ea.init(e,t),Un.init(e,t)}),hs=c("$ZodUnknown",(e,t)=>{M.init(e,t),e._zod.parse=n=>n}),ps=c("$ZodNever",(e,t)=>{M.init(e,t),e._zod.parse=(n,r)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});function Yt(e,t,n){e.issues.length&&t.issues.push(...In(n,e.issues)),t.value[n]=e.value}const gs=c("$ZodArray",(e,t)=>{M.init(e,t),e._zod.parse=(n,r)=>{const o=n.value;if(!Array.isArray(o))return n.issues.push({expected:"array",code:"invalid_type",input:o,inst:e}),n;n.value=Array(o.length);const i=[];for(let a=0;a<o.length;a++){const s=o[a],u=t.element._zod.run({value:s,issues:[]},r);u instanceof Promise?i.push(u.then(l=>Yt(l,n,a))):Yt(u,n,a)}return i.length?Promise.all(i).then(()=>n):n}});function je(e,t,n,r){e.issues.length&&t.issues.push(...In(n,e.issues)),e.value===void 0?n in r&&(t.value[n]=void 0):t.value[n]=e.value}function qn(e){const t=Object.keys(e.shape);for(const r of t)if(!e.shape?.[r]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${r}": expected a Zod schema`);const n=Ni(e.shape);return{...e,keys:t,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(n)}}function Yn(e,t,n,r,o,i){const a=[],s=o.keySet,u=o.catchall._zod,l=u.def.type;for(const d of Object.keys(t)){if(s.has(d))continue;if(l==="never"){a.push(d);continue}const f=u.run({value:t[d],issues:[]},r);f instanceof Promise?e.push(f.then(h=>je(h,n,d,t))):je(f,n,d,t)}return a.length&&n.issues.push({code:"unrecognized_keys",keys:a,input:t,inst:i}),e.length?Promise.all(e).then(()=>n):n}const bs=c("$ZodObject",(e,t)=>{if(M.init(e,t),!Object.getOwnPropertyDescriptor(t,"shape")?.get){const s=t.shape;Object.defineProperty(t,"shape",{get:()=>{const u={...s};return Object.defineProperty(t,"shape",{value:u}),u}})}const r=wt(()=>qn(t));x(e._zod,"propValues",()=>{const s=t.shape,u={};for(const l in s){const d=s[l]._zod;if(d.values){u[l]??(u[l]=new Set);for(const f of d.values)u[l].add(f)}}return u});const o=Ae,i=t.catchall;let a;e._zod.parse=(s,u)=>{a??(a=r.value);const l=s.value;if(!o(l))return s.issues.push({expected:"object",code:"invalid_type",input:l,inst:e}),s;s.value={};const d=[],f=a.shape;for(const h of a.keys){const g=f[h]._zod.run({value:l[h],issues:[]},u);g instanceof Promise?d.push(g.then(P=>je(P,s,h,l))):je(g,s,h,l)}return i?Yn(d,l,s,u,r.value,e):d.length?Promise.all(d).then(()=>s):s}}),vs=c("$ZodObjectJIT",(e,t)=>{bs.init(e,t);const n=e._zod.parse,r=wt(()=>qn(t)),o=h=>{const p=new ja(["shape","payload","ctx"]),g=r.value,P=w=>{const z=Ut(w);return`shape[${z}]._zod.run({ value: input[${z}], issues: [] }, ctx)`};p.write("const input = payload.value;");const v=Object.create(null);let Z=0;for(const w of g.keys)v[w]=`key_${Z++}`;p.write("const newResult = {};");for(const w of g.keys){const z=v[w],$=Ut(w);p.write(`const ${z} = ${P(w)};`),p.write(`
        if (${z}.issues.length) {
          payload.issues = payload.issues.concat(${z}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${$}, ...iss.path] : [${$}]
          })));
        }
        
        
        if (${z}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${z}.value;
        }
        
      `)}p.write("payload.value = newResult;"),p.write("return payload;");const I=p.compile();return(w,z)=>I(h,w,z)};let i;const a=Ae,s=!Pn.jitless,l=s&&Ii.value,d=t.catchall;let f;e._zod.parse=(h,p)=>{f??(f=r.value);const g=h.value;return a(g)?s&&l&&p?.async===!1&&p.jitless!==!0?(i||(i=o(t.shape)),h=i(h,p),d?Yn([],g,h,p,f,e):h):n(h,p):(h.issues.push({expected:"object",code:"invalid_type",input:g,inst:e}),h)}});function Gt(e,t,n,r){for(const i of e)if(i.issues.length===0)return t.value=i.value,t;const o=e.filter(i=>!fe(i));return o.length===1?(t.value=o[0].value,o[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map(i=>i.issues.map(a=>ie(a,r,oe())))}),t)}const xs=c("$ZodUnion",(e,t)=>{M.init(e,t),x(e._zod,"optin",()=>t.options.some(o=>o._zod.optin==="optional")?"optional":void 0),x(e._zod,"optout",()=>t.options.some(o=>o._zod.optout==="optional")?"optional":void 0),x(e._zod,"values",()=>{if(t.options.every(o=>o._zod.values))return new Set(t.options.flatMap(o=>Array.from(o._zod.values)))}),x(e._zod,"pattern",()=>{if(t.options.every(o=>o._zod.pattern)){const o=t.options.map(i=>i._zod.pattern);return new RegExp(`^(${o.map(i=>_t(i.source)).join("|")})$`)}});const n=t.options.length===1,r=t.options[0]._zod.run;e._zod.parse=(o,i)=>{if(n)return r(o,i);let a=!1;const s=[];for(const u of t.options){const l=u._zod.run({value:o.value,issues:[]},i);if(l instanceof Promise)s.push(l),a=!0;else{if(l.issues.length===0)return l;s.push(l)}}return a?Promise.all(s).then(u=>Gt(u,o,e,i)):Gt(s,o,e,i)}}),ws=c("$ZodIntersection",(e,t)=>{M.init(e,t),e._zod.parse=(n,r)=>{const o=n.value,i=t.left._zod.run({value:o,issues:[]},r),a=t.right._zod.run({value:o,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([u,l])=>Vt(n,u,l)):Vt(n,i,a)}});function ft(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(_e(e)&&_e(t)){const n=Object.keys(t),r=Object.keys(e).filter(i=>n.indexOf(i)!==-1),o={...e,...t};for(const i of r){const a=ft(e[i],t[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};o[i]=a.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};const n=[];for(let r=0;r<e.length;r++){const o=e[r],i=t[r],a=ft(o,i);if(!a.valid)return{valid:!1,mergeErrorPath:[r,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Vt(e,t,n){if(t.issues.length&&e.issues.push(...t.issues),n.issues.length&&e.issues.push(...n.issues),fe(e))return e;const r=ft(t.value,n.value);if(!r.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);return e.value=r.data,e}const ys=c("$ZodEnum",(e,t)=>{M.init(e,t);const n=Zi(t.entries),r=new Set(n);e._zod.values=r,e._zod.pattern=new RegExp(`^(${n.filter(o=>Ti.has(typeof o)).map(o=>typeof o=="string"?Ye(o):o.toString()).join("|")})$`),e._zod.parse=(o,i)=>{const a=o.value;return r.has(a)||o.issues.push({code:"invalid_value",values:n,input:a,inst:e}),o}}),_s=c("$ZodTransform",(e,t)=>{M.init(e,t),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new En(e.constructor.name);const o=t.transform(n.value,n);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then(a=>(n.value=a,n));if(o instanceof Promise)throw new he;return n.value=o,n}});function Ht(e,t){return e.issues.length&&t===void 0?{issues:[],value:void 0}:e}const ks=c("$ZodOptional",(e,t)=>{M.init(e,t),e._zod.optin="optional",e._zod.optout="optional",x(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),x(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${_t(n.source)})?$`):void 0}),e._zod.parse=(n,r)=>{if(t.innerType._zod.optin==="optional"){const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>Ht(i,n.value)):Ht(o,n.value)}return n.value===void 0?n:t.innerType._zod.run(n,r)}}),$s=c("$ZodNullable",(e,t)=>{M.init(e,t),x(e._zod,"optin",()=>t.innerType._zod.optin),x(e._zod,"optout",()=>t.innerType._zod.optout),x(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${_t(n.source)}|null)$`):void 0}),x(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,null]):void 0),e._zod.parse=(n,r)=>n.value===null?n:t.innerType._zod.run(n,r)}),Ss=c("$ZodDefault",(e,t)=>{M.init(e,t),e._zod.optin="optional",x(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)return n.value=t.defaultValue,n;const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>Xt(i,t)):Xt(o,t)}});function Xt(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const Ds=c("$ZodPrefault",(e,t)=>{M.init(e,t),e._zod.optin="optional",x(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>(r.direction==="backward"||n.value===void 0&&(n.value=t.defaultValue),t.innerType._zod.run(n,r))}),Ms=c("$ZodNonOptional",(e,t)=>{M.init(e,t),x(e._zod,"values",()=>{const n=t.innerType._zod.values;return n?new Set([...n].filter(r=>r!==void 0)):void 0}),e._zod.parse=(n,r)=>{const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>Jt(i,e)):Jt(o,e)}});function Jt(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t}),e}const zs=c("$ZodCatch",(e,t)=>{M.init(e,t),x(e._zod,"optin",()=>t.innerType._zod.optin),x(e._zod,"optout",()=>t.innerType._zod.optout),x(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>(n.value=i.value,i.issues.length&&(n.value=t.catchValue({...n,error:{issues:i.issues.map(a=>ie(a,r,oe()))},input:n.value}),n.issues=[]),n)):(n.value=o.value,o.issues.length&&(n.value=t.catchValue({...n,error:{issues:o.issues.map(i=>ie(i,r,oe()))},input:n.value}),n.issues=[]),n)}}),Es=c("$ZodPipe",(e,t)=>{M.init(e,t),x(e._zod,"values",()=>t.in._zod.values),x(e._zod,"optin",()=>t.in._zod.optin),x(e._zod,"optout",()=>t.out._zod.optout),x(e._zod,"propValues",()=>t.in._zod.propValues),e._zod.parse=(n,r)=>{if(r.direction==="backward"){const i=t.out._zod.run(n,r);return i instanceof Promise?i.then(a=>Ee(a,t.in,r)):Ee(i,t.in,r)}const o=t.in._zod.run(n,r);return o instanceof Promise?o.then(i=>Ee(i,t.out,r)):Ee(o,t.out,r)}});function Ee(e,t,n){return e.issues.length?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}const Ps=c("$ZodReadonly",(e,t)=>{M.init(e,t),x(e._zod,"propValues",()=>t.innerType._zod.propValues),x(e._zod,"values",()=>t.innerType._zod.values),x(e._zod,"optin",()=>t.innerType._zod.optin),x(e._zod,"optout",()=>t.innerType._zod.optout),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(Qt):Qt(o)}});function Qt(e){return e.value=Object.freeze(e.value),e}const Zs=c("$ZodCustom",(e,t)=>{C.init(e,t),M.init(e,t),e._zod.parse=(n,r)=>n,e._zod.check=n=>{const r=n.value,o=t.fn(r);if(o instanceof Promise)return o.then(i=>Kt(i,n,r,e));Kt(o,n,r,e)}});function Kt(e,t,n,r){if(!e){const o={code:"custom",input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(o.params=r._zod.def.params),t.issues.push(ke(o))}}class Os{constructor(){this._map=new WeakMap,this._idmap=new Map}add(t,...n){const r=n[0];if(this._map.set(t,r),r&&typeof r=="object"&&"id"in r){if(this._idmap.has(r.id))throw new Error(`ID ${r.id} already exists in the registry`);this._idmap.set(r.id,t)}return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(t){const n=this._map.get(t);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(t),this}get(t){const n=t._zod.parent;if(n){const r={...this.get(n)??{}};delete r.id;const o={...r,...this._map.get(t)};return Object.keys(o).length?o:void 0}return this._map.get(t)}has(t){return this._map.has(t)}}function Is(){return new Os}const Pe=Is();function Ts(e,t){return new e({type:"string",...m(t)})}function Ns(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...m(t)})}function en(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...m(t)})}function Cs(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...m(t)})}function Fs(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...m(t)})}function Ls(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...m(t)})}function As(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...m(t)})}function js(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...m(t)})}function Bs(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...m(t)})}function Ws(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...m(t)})}function Rs(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...m(t)})}function Us(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...m(t)})}function qs(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...m(t)})}function Ys(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...m(t)})}function Gs(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...m(t)})}function Vs(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...m(t)})}function Hs(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...m(t)})}function Xs(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...m(t)})}function Js(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...m(t)})}function Qs(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...m(t)})}function Ks(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...m(t)})}function ec(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...m(t)})}function tc(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...m(t)})}function nc(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...m(t)})}function rc(e,t){return new e({type:"string",format:"date",check:"string_format",...m(t)})}function oc(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...m(t)})}function ic(e,t){return new e({type:"string",format:"duration",check:"string_format",...m(t)})}function ac(e,t){return new e({type:"number",checks:[],...m(t)})}function sc(e,t){return new e({type:"number",coerce:!0,checks:[],...m(t)})}function cc(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...m(t)})}function uc(e){return new e({type:"unknown"})}function lc(e,t){return new e({type:"never",...m(t)})}function tn(e,t){return new Bn({check:"less_than",...m(t),value:e,inclusive:!1})}function tt(e,t){return new Bn({check:"less_than",...m(t),value:e,inclusive:!0})}function nn(e,t){return new Wn({check:"greater_than",...m(t),value:e,inclusive:!1})}function nt(e,t){return new Wn({check:"greater_than",...m(t),value:e,inclusive:!0})}function rn(e,t){return new za({check:"multiple_of",...m(t),value:e})}function Gn(e,t){return new Pa({check:"max_length",...m(t),maximum:e})}function Be(e,t){return new Za({check:"min_length",...m(t),minimum:e})}function Vn(e,t){return new Oa({check:"length_equals",...m(t),length:e})}function dc(e,t){return new Ia({check:"string_format",format:"regex",...m(t),pattern:e})}function fc(e){return new Ta({check:"string_format",format:"lowercase",...m(e)})}function mc(e){return new Na({check:"string_format",format:"uppercase",...m(e)})}function hc(e,t){return new Ca({check:"string_format",format:"includes",...m(t),includes:e})}function pc(e,t){return new Fa({check:"string_format",format:"starts_with",...m(t),prefix:e})}function gc(e,t){return new La({check:"string_format",format:"ends_with",...m(t),suffix:e})}function De(e){return new Aa({check:"overwrite",tx:e})}function bc(e){return De(t=>t.normalize(e))}function vc(){return De(e=>e.trim())}function xc(){return De(e=>e.toLowerCase())}function wc(){return De(e=>e.toUpperCase())}function yc(e,t,n){return new e({type:"array",element:t,...m(n)})}function _c(e,t,n){return new e({type:"custom",check:"custom",fn:t,...m(n)})}function kc(e){const t=$c(n=>(n.addIssue=r=>{if(typeof r=="string")n.issues.push(ke(r,n.value,t._zod.def));else{const o=r;o.fatal&&(o.continue=!1),o.code??(o.code="custom"),o.input??(o.input=n.value),o.inst??(o.inst=t),o.continue??(o.continue=!t._zod.def.abort),n.issues.push(ke(o))}},e(n.value,n)));return t}function $c(e,t){const n=new C({check:"custom",...m(t)});return n._zod.check=e,n}const Sc=c("ZodISODateTime",(e,t)=>{Ka.init(e,t),S.init(e,t)});function Dc(e){return nc(Sc,e)}const Mc=c("ZodISODate",(e,t)=>{es.init(e,t),S.init(e,t)});function zc(e){return rc(Mc,e)}const Ec=c("ZodISOTime",(e,t)=>{ts.init(e,t),S.init(e,t)});function Pc(e){return oc(Ec,e)}const Zc=c("ZodISODuration",(e,t)=>{ns.init(e,t),S.init(e,t)});function Oc(e){return ic(Zc,e)}const Ic=(e,t)=>{Nn.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:n=>qi(e,n)},flatten:{value:n=>Ui(e,n)},addIssue:{value:n=>{e.issues.push(n),e.message=JSON.stringify(e.issues,dt,2)}},addIssues:{value:n=>{e.issues.push(...n),e.message=JSON.stringify(e.issues,dt,2)}},isEmpty:{get(){return e.issues.length===0}}})},A=c("ZodError",Ic,{Parent:Error}),Tc=$t(A),Nc=St(A),Cc=Ge(A),Fc=Ve(A),Lc=Vi(A),Ac=Hi(A),jc=Xi(A),Bc=Ji(A),Wc=Qi(A),Rc=Ki(A),Uc=ea(A),qc=ta(A),E=c("ZodType",(e,t)=>(M.init(e,t),e.def=t,e.type=t.type,Object.defineProperty(e,"_def",{value:t}),e.check=(...n)=>e.clone(ce(t,{checks:[...t.checks??[],...n.map(r=>typeof r=="function"?{_zod:{check:r,def:{check:"custom"},onattach:[]}}:r)]})),e.clone=(n,r)=>J(e,n,r),e.brand=()=>e,e.register=((n,r)=>(n.add(e,r),e)),e.parse=(n,r)=>Tc(e,n,r,{callee:e.parse}),e.safeParse=(n,r)=>Cc(e,n,r),e.parseAsync=async(n,r)=>Nc(e,n,r,{callee:e.parseAsync}),e.safeParseAsync=async(n,r)=>Fc(e,n,r),e.spa=e.safeParseAsync,e.encode=(n,r)=>Lc(e,n,r),e.decode=(n,r)=>Ac(e,n,r),e.encodeAsync=async(n,r)=>jc(e,n,r),e.decodeAsync=async(n,r)=>Bc(e,n,r),e.safeEncode=(n,r)=>Wc(e,n,r),e.safeDecode=(n,r)=>Rc(e,n,r),e.safeEncodeAsync=async(n,r)=>Uc(e,n,r),e.safeDecodeAsync=async(n,r)=>qc(e,n,r),e.refine=(n,r)=>e.check(Fu(n,r)),e.superRefine=n=>e.check(Lu(n)),e.overwrite=n=>e.check(De(n)),e.optional=()=>cn(e),e.nullable=()=>un(e),e.nullish=()=>cn(un(e)),e.nonoptional=n=>Pu(e,n),e.array=()=>bu(e),e.or=n=>wu([e,n]),e.and=n=>_u(e,n),e.transform=n=>ln(e,$u(n)),e.default=n=>Mu(e,n),e.prefault=n=>Eu(e,n),e.catch=n=>Ou(e,n),e.pipe=n=>ln(e,n),e.readonly=()=>Nu(e),e.describe=n=>{const r=e.clone();return Pe.add(r,{description:n}),r},Object.defineProperty(e,"description",{get(){return Pe.get(e)?.description},configurable:!0}),e.meta=(...n)=>{if(n.length===0)return Pe.get(e);const r=e.clone();return Pe.add(r,n[0]),r},e.isOptional=()=>e.safeParse(void 0).success,e.isNullable=()=>e.safeParse(null).success,e)),Hn=c("_ZodString",(e,t)=>{Dt.init(e,t),E.init(e,t);const n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null,e.regex=(...r)=>e.check(dc(...r)),e.includes=(...r)=>e.check(hc(...r)),e.startsWith=(...r)=>e.check(pc(...r)),e.endsWith=(...r)=>e.check(gc(...r)),e.min=(...r)=>e.check(Be(...r)),e.max=(...r)=>e.check(Gn(...r)),e.length=(...r)=>e.check(Vn(...r)),e.nonempty=(...r)=>e.check(Be(1,...r)),e.lowercase=r=>e.check(fc(r)),e.uppercase=r=>e.check(mc(r)),e.trim=()=>e.check(vc()),e.normalize=(...r)=>e.check(bc(...r)),e.toLowerCase=()=>e.check(xc()),e.toUpperCase=()=>e.check(wc())}),Yc=c("ZodString",(e,t)=>{Dt.init(e,t),Hn.init(e,t),e.email=n=>e.check(Ns(Vc,n)),e.url=n=>e.check(js(Hc,n)),e.jwt=n=>e.check(tc(lu,n)),e.emoji=n=>e.check(Bs(Xc,n)),e.guid=n=>e.check(en(on,n)),e.uuid=n=>e.check(Cs(Ze,n)),e.uuidv4=n=>e.check(Fs(Ze,n)),e.uuidv6=n=>e.check(Ls(Ze,n)),e.uuidv7=n=>e.check(As(Ze,n)),e.nanoid=n=>e.check(Ws(Jc,n)),e.guid=n=>e.check(en(on,n)),e.cuid=n=>e.check(Rs(Qc,n)),e.cuid2=n=>e.check(Us(Kc,n)),e.ulid=n=>e.check(qs(eu,n)),e.base64=n=>e.check(Qs(su,n)),e.base64url=n=>e.check(Ks(cu,n)),e.xid=n=>e.check(Ys(tu,n)),e.ksuid=n=>e.check(Gs(nu,n)),e.ipv4=n=>e.check(Vs(ru,n)),e.ipv6=n=>e.check(Hs(ou,n)),e.cidrv4=n=>e.check(Xs(iu,n)),e.cidrv6=n=>e.check(Js(au,n)),e.e164=n=>e.check(ec(uu,n)),e.datetime=n=>e.check(Dc(n)),e.date=n=>e.check(zc(n)),e.time=n=>e.check(Pc(n)),e.duration=n=>e.check(Oc(n))});function Gc(e){return Ts(Yc,e)}const S=c("ZodStringFormat",(e,t)=>{k.init(e,t),Hn.init(e,t)}),Vc=c("ZodEmail",(e,t)=>{Ua.init(e,t),S.init(e,t)}),on=c("ZodGUID",(e,t)=>{Wa.init(e,t),S.init(e,t)}),Ze=c("ZodUUID",(e,t)=>{Ra.init(e,t),S.init(e,t)}),Hc=c("ZodURL",(e,t)=>{qa.init(e,t),S.init(e,t)}),Xc=c("ZodEmoji",(e,t)=>{Ya.init(e,t),S.init(e,t)}),Jc=c("ZodNanoID",(e,t)=>{Ga.init(e,t),S.init(e,t)}),Qc=c("ZodCUID",(e,t)=>{Va.init(e,t),S.init(e,t)}),Kc=c("ZodCUID2",(e,t)=>{Ha.init(e,t),S.init(e,t)}),eu=c("ZodULID",(e,t)=>{Xa.init(e,t),S.init(e,t)}),tu=c("ZodXID",(e,t)=>{Ja.init(e,t),S.init(e,t)}),nu=c("ZodKSUID",(e,t)=>{Qa.init(e,t),S.init(e,t)}),ru=c("ZodIPv4",(e,t)=>{rs.init(e,t),S.init(e,t)}),ou=c("ZodIPv6",(e,t)=>{os.init(e,t),S.init(e,t)}),iu=c("ZodCIDRv4",(e,t)=>{is.init(e,t),S.init(e,t)}),au=c("ZodCIDRv6",(e,t)=>{as.init(e,t),S.init(e,t)}),su=c("ZodBase64",(e,t)=>{ss.init(e,t),S.init(e,t)}),cu=c("ZodBase64URL",(e,t)=>{us.init(e,t),S.init(e,t)}),uu=c("ZodE164",(e,t)=>{ls.init(e,t),S.init(e,t)}),lu=c("ZodJWT",(e,t)=>{fs.init(e,t),S.init(e,t)}),Mt=c("ZodNumber",(e,t)=>{Un.init(e,t),E.init(e,t),e.gt=(r,o)=>e.check(nn(r,o)),e.gte=(r,o)=>e.check(nt(r,o)),e.min=(r,o)=>e.check(nt(r,o)),e.lt=(r,o)=>e.check(tn(r,o)),e.lte=(r,o)=>e.check(tt(r,o)),e.max=(r,o)=>e.check(tt(r,o)),e.int=r=>e.check(an(r)),e.safe=r=>e.check(an(r)),e.positive=r=>e.check(nn(0,r)),e.nonnegative=r=>e.check(nt(0,r)),e.negative=r=>e.check(tn(0,r)),e.nonpositive=r=>e.check(tt(0,r)),e.multipleOf=(r,o)=>e.check(rn(r,o)),e.step=(r,o)=>e.check(rn(r,o)),e.finite=()=>e;const n=e._zod.bag;e.minValue=Math.max(n.minimum??Number.NEGATIVE_INFINITY,n.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,e.maxValue=Math.min(n.maximum??Number.POSITIVE_INFINITY,n.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,e.isInt=(n.format??"").includes("int")||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null});function du(e){return ac(Mt,e)}const fu=c("ZodNumberFormat",(e,t)=>{ms.init(e,t),Mt.init(e,t)});function an(e){return cc(fu,e)}const mu=c("ZodUnknown",(e,t)=>{hs.init(e,t),E.init(e,t)});function sn(){return uc(mu)}const hu=c("ZodNever",(e,t)=>{ps.init(e,t),E.init(e,t)});function pu(e){return lc(hu,e)}const gu=c("ZodArray",(e,t)=>{gs.init(e,t),E.init(e,t),e.element=t.element,e.min=(n,r)=>e.check(Be(n,r)),e.nonempty=n=>e.check(Be(1,n)),e.max=(n,r)=>e.check(Gn(n,r)),e.length=(n,r)=>e.check(Vn(n,r)),e.unwrap=()=>e.element});function bu(e,t){return yc(gu,e,t)}const vu=c("ZodObject",(e,t)=>{vs.init(e,t),E.init(e,t),x(e,"shape",()=>t.shape),e.keyof=()=>Jn(Object.keys(e._zod.def.shape)),e.catchall=n=>e.clone({...e._zod.def,catchall:n}),e.passthrough=()=>e.clone({...e._zod.def,catchall:sn()}),e.loose=()=>e.clone({...e._zod.def,catchall:sn()}),e.strict=()=>e.clone({...e._zod.def,catchall:pu()}),e.strip=()=>e.clone({...e._zod.def,catchall:void 0}),e.extend=n=>Ai(e,n),e.safeExtend=n=>ji(e,n),e.merge=n=>Bi(e,n),e.pick=n=>Fi(e,n),e.omit=n=>Li(e,n),e.partial=(...n)=>Wi(Qn,e,n[0]),e.required=(...n)=>Ri(Kn,e,n[0])});function Xn(e,t){const n={type:"object",shape:e??{},...m(t)};return new vu(n)}const xu=c("ZodUnion",(e,t)=>{xs.init(e,t),E.init(e,t),e.options=t.options});function wu(e,t){return new xu({type:"union",options:e,...m(t)})}const yu=c("ZodIntersection",(e,t)=>{ws.init(e,t),E.init(e,t)});function _u(e,t){return new yu({type:"intersection",left:e,right:t})}const mt=c("ZodEnum",(e,t)=>{ys.init(e,t),E.init(e,t),e.enum=t.entries,e.options=Object.values(t.entries);const n=new Set(Object.keys(t.entries));e.extract=(r,o)=>{const i={};for(const a of r)if(n.has(a))i[a]=t.entries[a];else throw new Error(`Key ${a} not found in enum`);return new mt({...t,checks:[],...m(o),entries:i})},e.exclude=(r,o)=>{const i={...t.entries};for(const a of r)if(n.has(a))delete i[a];else throw new Error(`Key ${a} not found in enum`);return new mt({...t,checks:[],...m(o),entries:i})}});function Jn(e,t){const n=Array.isArray(e)?Object.fromEntries(e.map(r=>[r,r])):e;return new mt({type:"enum",entries:n,...m(t)})}const ku=c("ZodTransform",(e,t)=>{_s.init(e,t),E.init(e,t),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new En(e.constructor.name);n.addIssue=i=>{if(typeof i=="string")n.issues.push(ke(i,n.value,t));else{const a=i;a.fatal&&(a.continue=!1),a.code??(a.code="custom"),a.input??(a.input=n.value),a.inst??(a.inst=e),n.issues.push(ke(a))}};const o=t.transform(n.value,n);return o instanceof Promise?o.then(i=>(n.value=i,n)):(n.value=o,n)}});function $u(e){return new ku({type:"transform",transform:e})}const Qn=c("ZodOptional",(e,t)=>{ks.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType});function cn(e){return new Qn({type:"optional",innerType:e})}const Su=c("ZodNullable",(e,t)=>{$s.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType});function un(e){return new Su({type:"nullable",innerType:e})}const Du=c("ZodDefault",(e,t)=>{Ss.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Mu(e,t){return new Du({type:"default",innerType:e,get defaultValue(){return typeof t=="function"?t():On(t)}})}const zu=c("ZodPrefault",(e,t)=>{Ds.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType});function Eu(e,t){return new zu({type:"prefault",innerType:e,get defaultValue(){return typeof t=="function"?t():On(t)}})}const Kn=c("ZodNonOptional",(e,t)=>{Ms.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType});function Pu(e,t){return new Kn({type:"nonoptional",innerType:e,...m(t)})}const Zu=c("ZodCatch",(e,t)=>{zs.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Ou(e,t){return new Zu({type:"catch",innerType:e,catchValue:typeof t=="function"?t:()=>t})}const Iu=c("ZodPipe",(e,t)=>{Es.init(e,t),E.init(e,t),e.in=t.in,e.out=t.out});function ln(e,t){return new Iu({type:"pipe",in:e,out:t})}const Tu=c("ZodReadonly",(e,t)=>{Ps.init(e,t),E.init(e,t),e.unwrap=()=>e._zod.def.innerType});function Nu(e){return new Tu({type:"readonly",innerType:e})}const Cu=c("ZodCustom",(e,t)=>{Zs.init(e,t),E.init(e,t)});function Fu(e,t={}){return _c(Cu,e,t)}function Lu(e){return kc(e)}function er(e){return sc(Mt,e)}const Ce=Gc().regex(/^\d{4}-\d{2}-\d{2}$/,"Неверный формат даты (ожидается YYYY-MM-DD)").refine(e=>yn(j(e)),"Некорректная дата"),Au=Xn({initialBalance:er().positive("Баланс должен быть положительным"),startDate:Ce,endDate:Ce,createdAt:Ce}).refine(e=>{const t=j(e.startDate),n=j(e.endDate);return lo(n,t)||fo(n,t)},{message:"Дата окончания должна быть не раньше даты начала",path:["endDate"]}),ju=Xn({id:du().int().positive().optional(),amount:er().positive("Сумма должна быть больше 0"),type:Jn(["expense","income"]),date:Ce});function zt(e){const t=Math.floor(Math.abs(e));return`${new Intl.NumberFormat("ru-RU").format(t)} ₽`}function tr(e){const t=e.replace(/[^\d]/g,"");return t?Number(t):0}function xe(e,t){const n=t?.emptyPlaceholder??e.placeholder??"",r="0 ₽",o=()=>{const a=Math.max(0,e.value.length-2);try{e.setSelectionRange(a,a)}catch{}},i=()=>{const a=e.value.replace(/[^\d]/g,"");if(!a){e.value="";return}e.value=zt(Number(a)),requestAnimationFrame(o)};e.addEventListener("focus",()=>{e.placeholder=r,i()}),e.addEventListener("blur",()=>{e.placeholder=n,i()}),e.addEventListener("input",()=>{i()})}function nr(e){return e.issues[0]?.message??"Ошибка валидации"}function rr(e){const t={initialBalance:tr(e.initialBalance),startDate:e.startDate,endDate:e.endDate,createdAt:Se(new Date)},n=Au.safeParse(t);return n.success?{ok:!0,value:n.data}:{ok:!1,error:nr(n.error)}}function Bu(e){const t={amount:tr(e.amount),type:e.type,date:e.date},n=ju.omit({id:!0}).safeParse(t);return n.success?{ok:!0,value:n.data}:{ok:!1,error:nr(n.error)}}function de(e){return`${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(e)} ₽`}function dn(e){const n=new Intl.PluralRules("ru-RU").select(e);return n==="one"?"день":n==="few"?"дня":"дней"}function Wu(e){const t=j(e);return pe(t,"d MMMM",{locale:we})}function Ru(e,t){const n=j(e.startDate),o=Math.max(1,Math.ceil((new Date().getTime()-n.getTime())/(1e3*60*60*24))+1),i=t.filter(a=>a.type==="expense").reduce((a,s)=>a+Math.abs(s.amount),0);return i===0?0:i/o}function Uu(e){const t=e.replace(/[^\d]/g,"");return t?Number(t):0}function qu(){const e=_.getState(),t=document.createElement("div");t.className="min-h-screen bg-slate-50";const n=e.budget;if(!n)return _.setState({route:"start"}),t;const r=Se(new Date),o=e.transactions,i={...n,createdAt:n.createdAt||r},a=xt(i,o),s=zn(i),u=Pi(i,o,r),l=vt(i,r),d=o.filter($=>$.type==="expense").slice(0,3).map($=>({...$,amount:Math.abs($.amount)})),f=Ru(i,o),h=u>=0?"🎉 Отлично справились — сегодня вы в пределах лимита!":"⚠️ Сегодня вы вышли за пределы лимита.",p=u>=0?"text-emerald-500":"text-red-600";t.innerHTML=`
    <!-- MOBILE (<704) -->
    <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
      <div class="pb-32">
        <!-- header -->
        <div class="flex items-center justify-between">
          <div class="font-inter text-[24px] font-semibold leading-[1.2] text-slate-500">
            Общий баланс
          </div>
          <div class="font-inter text-[16px] font-normal leading-[1.5] text-blue-500">
            ${de(s)} в день
          </div>
        </div>

        <!-- total -->
        <div class="mt-2 flex items-baseline gap-3">
          <div class="font-inter text-[40px] font-bold leading-[1.1] text-slate-900">
            ${de(a)}
          </div>
          <div class="font-inter text-[24px] font-normal leading-[1.2] text-slate-500">
            на ${l} ${dn(l)}
          </div>
        </div>

        <!-- actions -->
        <div class="mt-6 grid grid-cols-2 gap-4">
          <button
            id="editBudgetMobile"
            type="button"
            class="h-14 w-full rounded border border-blue-500 bg-white font-inter text-[24px] font-medium leading-[1.2] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Изменить
          </button>

          <button
            id="toHistoryMobile"
            type="button"
            class="h-14 w-full rounded border border-blue-500 bg-white font-inter text-[24px] font-medium leading-[1.2] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            История расходов
          </button>
        </div>

        <!-- today -->
        <div class="mt-10">
          <div class="font-inter text-[24px] font-semibold leading-[1.2] text-slate-500">
            На сегодня доступно
          </div>

          <div class="mt-2 flex items-baseline gap-3">
            <div class="font-inter text-[64px] font-bold leading-[1.0] ${p}">
              ${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(u)} ₽
            </div>
            <div class="font-inter text-[64px] font-bold leading-[1.0] text-slate-500">/</div>
            <div class="font-inter text-[64px] font-bold leading-[1.0] text-slate-500">
              ${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(s)}
            </div>
          </div>

          <div class="mt-3 font-inter text-[20px] font-normal leading-[1.3] text-slate-900">
            ${h}
          </div>

          <form id="txFormMobile" class="mt-8 flex flex-col gap-2">
            <div class="font-inter text-[24px] font-normal leading-[1.2] text-slate-500">
              Введите трату
            </div>

            <input
              id="amountMobile"
              name="amount"
              type="text"
              inputmode="numeric"
              placeholder="0 ₽"
              class="h-16 w-full rounded-lg border-2 border-blue-500 bg-white px-4 font-inter text-[24px] font-normal leading-[1.2] text-slate-900 outline-none"
            />

            <p id="txErrorMobile" class="hidden text-sm text-red-600"></p>
          </form>
        </div>
      </div>

      <!-- fixed bottom save -->
      <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
        <button
          type="submit"
          form="txFormMobile"
          id="saveTxBtnMobile"
          class="hidden h-14 w-full rounded bg-blue-500 px-4 font-inter text-[24px] font-medium leading-[1.2] text-white transition-colors duration-150 hover:bg-blue-500/85"
        >
          Сохранить
        </button>
      </div>
    </div>

    <!-- TABLET/DESKTOP (>=704) - оставляем как было -->
    <div class="hidden min-[704px]:block">
      <div class="min-h-screen bg-slate-50 px-4 pt-16 pb-6 flex flex-col items-center min-[704px]:pt-0 min-[704px]:pb-0 min-[704px]:justify-center min-[1140px]:pt-16 min-[1140px]:pb-6 min-[1140px]:justify-start">
        <div class="w-full flex flex-col gap-2 min-[704px]:w-[524px] min-[1140px]:w-[558px]">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <div class="flex-1 text-[18px] font-[600] leading-[1.3] text-slate-500">
                  Общий баланс
                </div>

                <div class="text-[16px] font-normal leading-[1.5] text-blue-500">
                  ${de(s)} в день
                </div>
              </div>

              <div class="flex items-baseline gap-2">
                <div class="text-[32px] font-bold leading-[1.2] text-slate-900">
                  ${de(a)}
                </div>
                <div class="text-[16px] font-normal leading-[1.5] text-slate-500">
                  на ${l} ${dn(l)}
                </div>
              </div>

              <button
                id="editBudget"
                type="button"
                class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10"
              >
                Изменить
              </button>
            </div>
          </section>

          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-0.5">
                <div class="text-[18px] font-semibold leading-[1.3] text-slate-500">
                  На сегодня доступно
                </div>

                <div class="flex items-baseline gap-2">
                  <div class="text-[32px] font-bold leading-[1.2] ${p}">
                    ${de(u)}
                  </div>
                  <div class="text-[32px] font-bold leading-[1.2] text-slate-500">/</div>
                  <div class="text-[32px] font-bold leading-[1.2] text-slate-500">
                    ${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(s)}
                  </div>
                </div>
              </div>

              <div class="text-[12px] font-normal leading-[1.4] text-slate-900">
                ${h}
              </div>

              <form id="txForm" class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                  <div class="ml-3 text-[12px] font-normal leading-[1.4] text-slate-500">
                    Введите трату
                  </div>

                  <input
                    id="amount"
                    name="amount"
                    type="text"
                    inputmode="numeric"
                    placeholder="0 ₽"
                    class="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-900 outline-none focus:border-2 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  class="h-12 w-full rounded-[4px] bg-blue-500 px-4 text-[16px] font-medium leading-[1.5] text-white hover:bg-blue-500/85"
                >
                  Сохранить
                </button>

                <p id="txError" class="hidden text-sm text-red-600"></p>
              </form>
            </div>
          </section>

          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <div class="text-[24px] font-semibold leading-[1.2] text-slate-500">
                  История расходов
                </div>
                <div class="text-[12px] font-normal leading-[1.4] text-blue-500">
                  Средние траты в день: ${de(f)}
                </div>
              </div>

              <div class="flex flex-col">
                ${d.length?d.map(($,B)=>{const W=B===d.length-1?"":'<div class="my-1.5 h-px w-full bg-slate-500"></div>';return`
                            <div class="flex items-baseline gap-3">
                              <div class="flex-1 text-[18px] leading-[1.3] text-slate-900">
                               <span class="font-semibold">
                                 ${new Intl.NumberFormat("ru-RU").format($.amount)}
                               </span>
                               <span class="font-normal"> ₽</span>
                             </div>
                              <div class="text-[16px] font-normal leading-[1.5] text-slate-500">
                                ${Wu($.date)}
                              </div>
                            </div>
                            ${W}
                          `}).join(""):'<div class="text-[16px] font-normal leading-[1.5] text-slate-500">Пока нет расходов.</div>'}
              </div>

              <button
                id="toHistory"
                type="button"
                class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10"
              >
                Смотреть всю историю
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,t.querySelector("#toHistory")?.addEventListener("click",()=>{_.setState({route:"history"})}),t.querySelector("#editBudget")?.addEventListener("click",()=>{_.setState({route:"start"})}),t.querySelector("#toHistoryMobile")?.addEventListener("click",()=>{_.setState({route:"history"})}),t.querySelector("#editBudgetMobile")?.addEventListener("click",()=>{_.setState({route:"start"})});const g=t.querySelector("#txForm"),P=t.querySelector("#txError"),v=t.querySelector("#amount");g&&P&&v&&(xe(v,{emptyPlaceholder:"0 ₽"}),g.addEventListener("submit",$=>{$.preventDefault(),fn({errEl:P,amountEl:v,today:r})}));const Z=t.querySelector("#txFormMobile"),I=t.querySelector("#txErrorMobile"),w=t.querySelector("#amountMobile"),z=t.querySelector("#saveTxBtnMobile");if(w&&xe(w,{emptyPlaceholder:"0 ₽"}),Z&&I&&w&&z){const $=()=>Uu(w.value)>0,B=()=>{z.classList.toggle("hidden",!$())};w.addEventListener("input",B),w.addEventListener("blur",B),B(),Z.addEventListener("submit",W=>{W.preventDefault(),fn({errEl:I,amountEl:w,today:r})})}return t}async function fn(e){const{errEl:t,amountEl:n,today:r}=e;t.classList.add("hidden"),t.textContent="";const o=Bu({amount:n.value.trim(),type:"expense",date:r});if(!o.ok){t.textContent=o.error,t.classList.remove("hidden");return}await yi(o.value);const i=await bt();_.setState({transactions:i}),n.value=""}function rt(e){const{id:t,label:n,type:r="text",placeholder:o="",inputmode:i,min:a,value:s=""}=e,u=i?`inputmode="${i}"`:"",l=a?`min="${a}"`:"";return`
    <label class="block">
      ${n?`<span class="text-sm text-slate-600">${n}</span>`:""}
      <input
        id="${t}"
        name="${t}"
        type="${r}"
        ${u}
        ${l}
        value="${mn(s)}"
        placeholder="${mn(o)}"
        class="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-900 placeholder:text-slate-500 outline-none focus:border-2 focus:border-blue-500"

      />
    </label>
  `}function mn(e){return e.replace(/[&<>"']/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return t}})}const or=[{key:"day",label:"День"},{key:"week",label:"Неделя"},{key:"twoWeeks",label:"2 недели"},{key:"month",label:"Месяц"},{key:"endOfMonth",label:"До конца месяца"},{key:"custom",label:"Своя дата"}];function Oe(e){const[t,n,r]=e.split("-").map(Number);return new Date(t,(n??1)-1,r??1)}function Yu(e){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}function Gu(e){const n=new Intl.PluralRules("ru-RU").select(e);return n==="one"?"день":n==="few"?"дня":"дней"}function ir(e){return`до ${pe(e,"d MMMM",{locale:we})}`}function hn(e,t){return t==="day"?ve(e,1):t==="week"?ve(e,7):t==="twoWeeks"?ve(e,14):t==="month"?Ne(e,1):t==="endOfMonth"?pt(e):null}function Vu(e,t){const n=ae(t,e);return`${n} ${Gu(n)} (${ir(t)})`}function Hu(e){return e.replace(/[&<>"']/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return t}})}function Xu(e){return e&&e.charAt(0).toUpperCase()+e.slice(1)}function Ju(e,t){const n=pt(e);let r=e;for(;r<=n;){if(ae(r,t)>0)return!0;r=ve(r,1)}return!1}function ot(e=""){return`
    <img
      src="/assets/enter.svg"
      alt=""
      aria-hidden="true"
      draggable="false"
      class="${["h-2 w-4 select-none",e].filter(Boolean).join(" ")}"
    />
  `}function Ie(e){const t=Hu(e.id),n=or.map(r=>{const o=r.key==="custom"?"":`<span class="text-slate-500 text-[16px] leading-[1.5]" id="${t}__right_${r.key}"></span>`;return`
     <li class="py-[2px] border-t border-slate-200 first:border-t-0">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-[4px] px-3 py-2 text-left text-[16px] leading-[1.5] text-slate-700 hover:bg-blue-500/10 hover:text-blue-500"
          data-preset="${r.key}"
        >
          <span>${r.label}</span>
          ${o}
        </button>
      </li>
    `}).join("");return`
    <div class="relative">
      <input id="${t}" name="${t}" type="hidden" value="" />

      <button
        type="button"
        id="${t}__trigger"
        class="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-500 outline-none focus:border-2 focus:border-blue-500"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <span id="${t}__text">Выберите срок</span>
        <span class="ml-3 text-slate-500">
          ${ot("")}
        </span>
      </button>

      <div
        id="${t}__panel"
        class="absolute left-0 z-20 mt-2 hidden w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
      >
        <div id="${t}__modeList" class="p-3">
          <ul class="space-y-0" role="listbox" id="${t}__list">
            ${n}
          </ul>
        </div>

        <div id="${t}__modeCalendar" class="hidden">
          <div class="relative flex w-full flex-col items-start gap-2 bg-white p-[12px_12px_8px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] rounded-t-xl">
            <button
              type="button"
              id="${t}__prev"
              class="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
              aria-label="Предыдущий месяц"
            >
              ${ot("rotate-90")}
            </button>

            <button
              type="button"
              id="${t}__next"
              class="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md text-slate-900 hover:bg-slate-50"
              aria-label="Следующий месяц"
            >
              ${ot("-rotate-90")}
            </button>

            <div class="flex w-full min-w-0 flex-col items-start gap-1 px-10">
              <div class="flex h-[23px] w-full items-center justify-between px-2">
                <div id="${t}__month" class="text-[18px] font-semibold leading-[1.3] text-slate-900"></div>
                <div id="${t}__year" class="text-[18px] font-semibold leading-[1.3] text-slate-900"></div>
              </div>

              <div class="flex w-full flex-col items-start p-2">
                <div class="grid w-full grid-cols-7 gap-[2px]">
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">пн</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">вт</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">ср</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">чт</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">пт</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">сб</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">вс</div>
                </div>

                <div id="${t}__grid" class="mt-[2px] grid w-full grid-cols-7 gap-[2px]"></div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-200"></div>
        </div>
      </div>
    </div>
  `}function Te(e,t){const n=Oe(t.minDateISO),r=e.querySelector(`#${CSS.escape(t.id)}`),o=e.querySelector(`#${CSS.escape(t.id)}__trigger`),i=e.querySelector(`#${CSS.escape(t.id)}__text`),a=e.querySelector(`#${CSS.escape(t.id)}__panel`),s=e.querySelector(`#${CSS.escape(t.id)}__modeList`),u=e.querySelector(`#${CSS.escape(t.id)}__modeCalendar`),l=e.querySelector(`#${CSS.escape(t.id)}__list`),d=e.querySelector(`#${CSS.escape(t.id)}__prev`),f=e.querySelector(`#${CSS.escape(t.id)}__next`),h=e.querySelector(`#${CSS.escape(t.id)}__month`),p=e.querySelector(`#${CSS.escape(t.id)}__year`),g=e.querySelector(`#${CSS.escape(t.id)}__grid`);if(!r||!o||!i||!a||!s||!u||!l||!d||!f||!h||!p||!g)return;or.forEach(y=>{if(y.key==="custom")return;const T=hn(n,y.key),O=e.querySelector(`#${CSS.escape(t.id)}__right_${y.key}`);T&&O&&(O.textContent=ir(T))});let P=!1,v=ee(n);const Z=()=>{if(!r.value){i.textContent="Выберите срок",o.classList.add("text-slate-500"),o.classList.remove("text-slate-900");return}const y=Oe(r.value);i.textContent=Vu(n,y),o.classList.remove("text-slate-500"),o.classList.add("text-slate-900")},I=y=>{P=y,o.setAttribute("aria-expanded",String(y)),a.classList.toggle("hidden",!y),y&&(s.classList.remove("hidden"),u.classList.add("hidden")),Z()},w=()=>{I(!1)},z=()=>{I(!0)},$=y=>{r.value=Yu(y),Z(),w()},B=()=>{const y=ee(Ne(v,-1)),T=Ju(y,n);d.disabled=!T},W=()=>{h.textContent=Xu(pe(v,"LLLL",{locale:we})),p.textContent=pe(v,"yyyy",{locale:we}),g.innerHTML="";const y=H(ee(v),{weekStartsOn:1}),T=fr(pt(v),{weekStartsOn:1});let O=y;for(;O<=T;){const F=O.getMonth()===v.getMonth(),q=ae(O,n)<=0,Y=r.value?ur(O,Oe(r.value)):!1,G=["flex w-full items-center justify-center h-[64.61px] rounded-[4px] text-[16px] leading-[1.5] font-normal",F?"":"pointer-events-none bg-white text-[#F9FAFB]",F&&q?"pointer-events-none bg-white text-[#F9FAFB]":"",F&&!q&&Y?"bg-blue-500 text-white hover:bg-blue-500/85":"",F&&!q&&!Y?"bg-[#F9FAFB] text-slate-900 hover:bg-slate-100":""].filter(Boolean).join(" "),Q=document.createElement("button");if(Q.type="button",Q.className=G,Q.textContent=String(O.getDate()),F&&!q){const ue=new Date(O);Q.addEventListener("click",()=>{$(ue)})}g.append(Q),O=ve(O,1)}B()};o.addEventListener("click",()=>{P?w():z()}),document.addEventListener("click",y=>{const T=y.target;P&&(e.contains(T)||w())}),l.addEventListener("click",y=>{const T=y.target.closest("button[data-preset]");if(!T)return;const O=T.dataset.preset;if(O==="custom"){s.classList.add("hidden"),u.classList.remove("hidden"),i.textContent="Выбор даты",o.classList.add("text-slate-500"),o.classList.remove("text-slate-900"),r.value?v=ee(Oe(r.value)):v=ee(n),W();return}const F=hn(n,O);F&&$(F)}),d.addEventListener("click",()=>{d.disabled||(v=ee(Ne(v,-1)),W())}),f.addEventListener("click",()=>{v=ee(Ne(v,1)),W()}),Z()}function it(e){return`${new Intl.NumberFormat("ru-RU",{maximumFractionDigits:2}).format(e)} ₽`}function Qu(e){const n=new Intl.PluralRules("ru-RU").select(e);return n==="one"?"день":n==="few"?"дня":"дней"}function ne(e){const t=e.replace(/[^\d]/g,"");return t?Number(t):0}function pn(e){const t="+0 ₽",n=()=>{const o=Math.max(0,e.value.length-2);e.setSelectionRange(o,o)},r=()=>{const o=e.value.replace(/[^\d]/g,"");if(!o){e.value="";return}const i=zt(Number(o));e.value=`+${i}`,requestAnimationFrame(n)};e.placeholder=t,e.addEventListener("focus",()=>{e.placeholder=t,r()}),e.addEventListener("blur",()=>{e.placeholder=t,r()}),e.addEventListener("input",()=>{r()})}function Ku(){const e=_.getState(),t=document.createElement("div"),n=Se(new Date),r=e.budget;if(r){const f=e.transactions,h=xt(r,f),p=zn(r),g=vt(r,n);t.innerHTML=`
      <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
        <div class="pb-28">
          <div class="flex items-baseline justify-between gap-3">
            <div class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
              Общий баланс
            </div>
            <div class="font-inter text-[18px] font-normal leading-[1.3] text-blue-500">
              ${it(p)} в день
            </div>
          </div>

          <form id="editBudgetFormMobile" class="mt-6 flex w-full flex-col gap-4">
            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                Ваш баланс
              </div>
              ${rt({id:"currentBalanceMobile",type:"text",inputmode:"numeric",placeholder:"0 ₽"})}
            </div>

            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                Пополнить
              </div>
              <input
                id="topUpMobile"
                name="topUpMobile"
                type="text"
                inputmode="numeric"
                placeholder="+0 ₽"
                class="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 font-inter text-[16px] font-normal leading-[1.5] text-slate-900 outline-none focus:border-2 focus:border-blue-500"
              />
            </div>

            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                На срок
              </div>
              ${Ie({id:"endDateMobileEdit"})}
            </div>

            <p id="editFormErrorMobile" class="hidden text-sm text-red-600"></p>
          </form>
        </div>

        <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
          <button
            type="button"
            id="backBtnMobile"
            class="h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться
          </button>

          <button
            type="button"
            id="cancelBtnMobile"
            class="hidden mt-3 h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться без сохранения
          </button>

          <button
            type="submit"
            form="editBudgetFormMobile"
            id="saveBtnMobile"
            class="hidden mt-3 h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
          >
            Сохранить
          </button>
        </div>
      </div>

      <div class="hidden min-[704px]:flex min-h-screen bg-slate-50 px-4 pt-16 pb-6 flex-col items-center min-[704px]:pt-0 min-[704px]:pb-0 min-[704px]:justify-center min-[1140px]:pt-16 min-[1140px]:pb-6 min-[1140px]:justify-start">
        <div class="w-full flex flex-col gap-2 min-[704px]:w-[524px] min-[1140px]:w-[558px]">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex items-baseline gap-2">
                  <div class="flex-1 font-inter text-[24px] font-semibold leading-[1.2] text-slate-500">
                    Общий баланс
                  </div>

                  <div class="font-inter text-[16px] font-normal leading-[1.5] text-blue-500">
                    ${it(p)} в день
                  </div>
                </div>

                <div class="flex items-baseline gap-2">
                  <div class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
                    ${it(h)}
                  </div>

                  <div class="font-inter text-[16px] font-normal leading-[1.5] text-slate-500">
                    на ${g} ${Qu(g)}
                  </div>
                </div>
              </div>

              <form id="editBudgetForm" class="flex w-full flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                    Пополнить
                  </div>

                  <input
                    id="topUp"
                    name="topUp"
                    type="text"
                    inputmode="numeric"
                    placeholder="+0 ₽"
                    class="h-12 w-full rounded-lg border-2 border-blue-500 bg-white px-3 font-inter text-[16px] font-normal leading-[1.5] text-slate-900 outline-none"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                    На срок
                  </div>
                  ${Ie({id:"endDate"})}
                </div>

                <p id="editFormError" class="hidden text-sm text-red-600"></p>

                <button
                  type="submit"
                  id="saveEditBtn"
                  class="h-12 w-full rounded-[4px] bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
                >
                  Сохранить
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    `;const P=t.querySelector("#endDate");P&&(P.value=r.endDate),Te(t,{id:"endDate",minDateISO:n});const v=t.querySelector("#topUp");v&&pn(v);const Z=t.querySelector("#editBudgetForm"),I=t.querySelector("#editFormError");Z&&I&&Z.addEventListener("submit",G=>{G.preventDefault(),nl(t,I)});const w=t.querySelector("#endDateMobileEdit");w&&(w.value=r.endDate),Te(t,{id:"endDateMobileEdit",minDateISO:n});const z=t.querySelector("#currentBalanceMobile");z&&(z.value=zt(Math.max(0,h)),xe(z,{emptyPlaceholder:"0 ₽"}));const $=t.querySelector("#topUpMobile");$&&pn($);const B=t.querySelector("#editBudgetFormMobile"),W=t.querySelector("#editFormErrorMobile");B&&W&&B.addEventListener("submit",G=>{G.preventDefault(),rl(t,W)});const y=t.querySelector("#backBtnMobile"),T=t.querySelector("#cancelBtnMobile"),O=t.querySelector("#saveBtnMobile"),F=t.querySelector("#currentBalanceMobile"),q=t.querySelector("#topUpMobile"),Y=t.querySelector("#endDateMobileEdit"),Xe=()=>{_.setState({route:"main"})};if(y?.addEventListener("click",Xe),T?.addEventListener("click",Xe),y&&T&&O&&F&&q&&Y){const G={balance:ne(F.value),topUp:ne(q.value),endDate:(Y.value??"").trim()},Q=()=>{const K={balance:ne(F.value),topUp:ne(q.value),endDate:(Y.value??"").trim()};return K.balance!==G.balance||K.topUp!==G.topUp||K.endDate!==G.endDate},ue=()=>{const K=Q();y.classList.toggle("hidden",K),T.classList.toggle("hidden",!K),O.classList.toggle("hidden",!K)};F.addEventListener("input",ue),q.addEventListener("input",ue);let Et=Y.value;window.setInterval(()=>{Y.value!==Et&&(Et=Y.value,ue())},100),ue()}return t}t.innerHTML=`
    <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
      <div class="pb-28">
        <h1 class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
          Начнём!
        </h1>

        <form id="budgetFormMobile" class="mt-6 flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              Укажите баланс
            </div>
            ${rt({id:"initialBalanceMobile",type:"text",inputmode:"numeric",placeholder:"Стартовый баланс"})}
          </div>

          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              На срок
            </div>
            ${Ie({id:"endDateMobile"})}
          </div>

          <p id="formErrorMobile" class="hidden text-sm text-red-600"></p>
        </form>
      </div>

      <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
        <button
          type="submit"
          form="budgetFormMobile"
          id="calculateBtnMobile"
          class="hidden h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
        >
          Рассчитать
        </button>
      </div>
    </div>

    <div class="hidden min-[704px]:flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 pb-16">
      <div class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-md min-[704px]:w-[524px] min-[1140px]:w-[558px]">
        <h1 class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
          Начнём!
        </h1>

        <form id="budgetForm" class="mt-6 flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              Укажите баланс
            </div>
            ${rt({id:"initialBalance",type:"text",inputmode:"numeric",placeholder:"Стартовый баланс"})}
          </div>

          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              На срок
            </div>
            ${Ie({id:"endDate"})}
          </div>

          <p id="formError" class="hidden text-sm text-red-600"></p>

          <button
            type="submit"
            id="calculateBtn"
            class="h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
          >
            Рассчитать
          </button>
        </form>
      </div>
    </div>
  `;const o=t.querySelector("#budgetForm"),i=t.querySelector("#formError");if(o&&i){o.addEventListener("submit",h=>{h.preventDefault(),el(t,i)});const f=t.querySelector("#initialBalance");f&&xe(f,{emptyPlaceholder:"Стартовый баланс"}),Te(t,{id:"endDate",minDateISO:n})}const a=t.querySelector("#budgetFormMobile"),s=t.querySelector("#formErrorMobile"),u=t.querySelector("#calculateBtnMobile"),l=t.querySelector("#initialBalanceMobile"),d=t.querySelector("#endDateMobile");if(a&&s&&a.addEventListener("submit",f=>{f.preventDefault(),tl(t,s)}),l&&xe(l,{emptyPlaceholder:"Стартовый баланс"}),Te(t,{id:"endDateMobile",minDateISO:n}),u&&l&&d){const f=()=>{const g=l.value.replace(/[^\d]/g,""),P=g?Number(g):0,v=!!(d.value&&d.value.trim().length>0);return P>0&&v},h=()=>{u.classList.toggle("hidden",!f())};l.addEventListener("input",h),l.addEventListener("blur",h);let p=d.value;window.setInterval(()=>{d.value!==p&&(p=d.value,h())},100),h()}return t}async function el(e,t){t.classList.add("hidden"),t.textContent="";const n=(e.querySelector("#initialBalance")?.value??"").trim(),r=Se(new Date),o=(e.querySelector("#endDate")?.value??"").trim(),i=rr({initialBalance:n,startDate:r,endDate:o});if(!i.ok){t.textContent=i.error,t.classList.remove("hidden");return}await Ue(i.value),_.setState({budget:i.value,route:"main",error:null})}async function tl(e,t){t.classList.add("hidden"),t.textContent="";const n=(e.querySelector("#initialBalanceMobile")?.value??"").trim(),r=Se(new Date),o=(e.querySelector("#endDateMobile")?.value??"").trim(),i=rr({initialBalance:n,startDate:r,endDate:o});if(!i.ok){t.textContent=i.error,t.classList.remove("hidden");return}await Ue(i.value),_.setState({budget:i.value,route:"main",error:null})}async function nl(e,t){const r=_.getState().budget;if(!r)return;t.classList.add("hidden"),t.textContent="";const o=(e.querySelector("#topUp")?.value??"").trim(),i=(e.querySelector("#endDate")?.value??"").trim();if(!i){t.textContent="Выберите срок",t.classList.remove("hidden");return}const a=ne(o),s={...r,initialBalance:r.initialBalance+a,endDate:i};await Ue(s),_.setState({budget:s,route:"main",error:null})}async function rl(e,t){const r=_.getState().budget;if(!r)return;t.classList.add("hidden"),t.textContent="";const o=(e.querySelector("#currentBalanceMobile")?.value??"").trim(),i=(e.querySelector("#topUpMobile")?.value??"").trim(),a=(e.querySelector("#endDateMobileEdit")?.value??"").trim(),s=ne(o),u=ne(i);if(s<=0){t.textContent="Введите баланс",t.classList.remove("hidden");return}if(!a){t.textContent="Выберите срок",t.classList.remove("hidden");return}const l={...r,initialBalance:s+u,endDate:a};await Ue(l),_.setState({budget:l,route:"main",error:null})}function gn(e,t){if(t.innerHTML="",e==="start"){t.append(Ku());return}if(e==="main"){t.append(qu());return}t.append(Di())}async function ol(){const e=document.getElementById("app");if(!e)throw new Error("Root element #app not found in index.html");_.setState({loading:!0,error:null});try{const[t,n]=await Promise.all([wi(),bt()]);_.setState({budget:t??null,transactions:n,route:t?"main":"start",loading:!1})}catch(t){_.setState({loading:!1,error:t instanceof Error?t.message:"Unknown error",route:"start"})}_.subscribe(t=>{gn(t.route,e)}),gn(_.getState().route,e)}document.addEventListener("DOMContentLoaded",()=>{ol()});
//# sourceMappingURL=index-BTiuA2lo.js.map
