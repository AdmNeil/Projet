import { $, Rm, notif } from '../core.js';
const bwipjs = require('bwip-js');
const { ipcRenderer } = require('electron');

ipcRenderer.send('getVal');

ipcRenderer.on('valXmlBDD', (event, arg) => {
    let pieces = $(`pieces-1`);

    if(pieces.children.length !== 0) {
        while (pieces.lastElementChild) {
            pieces.removeChild(pieces.lastElementChild);
        }
    }

	let decomp = JSON.parse(arg.msg);

    if(arg.version === `NaN`) {
        notif(`Le chemin: ${decomp.path} est en erreur!`, `erreur`);

        return;
    }

    if(arg.reload === 1) notif(`Chargement du chemin OK`, `ok`);

    let x = new DocumentFragment();
    let stock = "";

    for(let [v, k] of Object.entries(decomp)) {
        if(stock !== k.D1) {
            let a = document.createElement(`div`);
            let b = document.createElement(`h3`);
            let c = document.createElement(`div`);

            a.setAttribute(`class`, `pieces-2`);
            c.setAttribute(`class`, `pieces-4`);
            
            stock = k.D1;

            b.textContent = k.D1;
            b.setAttribute(`class`, `pieces-3`);
            b.setAttribute(`open`, `false`);
            b.addEventListener(`click`, e => {
                if(e.target.attributes.open.value === "false") {
                    e.target.setAttribute(`open`, `true`);
                } else {
                    e.target.setAttribute(`open`, `false`);
                }
            })

            a.appendChild(b);
            a.appendChild(c);
            x.appendChild(a);

        } else {
            let d = document.createElement(`div`);
            let e = document.createElement(`input`);
            let f = document.createElement(`label`);
            let g = document.createElement(`p`);
        
            d.setAttribute(`class`, `pieces-5`);
            e.id = k.A1;
            e.type = `checkbox`;
            f.setAttribute(`for`, k.A1);
            f.textContent = k.B1;
            g.textContent = k.A1;

            d.appendChild(e);

            if("content" in document.createElement("template")) {
                let template = document.querySelector(".simplyGenSelect");
                let clone = document.importNode(template.content, true);
                
                e.addEventListener(`click`, g => {
                    let gDisabled = g.target.nextElementSibling;
                    gDisabled.toggleAttribute(`disabled`);

                    if(gDisabled.attributes.disabled === undefined) {
                        let w = document.createElement(`div`);
                        let x = document.createElement(`h2`);
                        let y = document.createElement(`h3`);
                        let z = document.createElement(`h2`);

                        w.setAttribute(`class`, `list-2`)
                        x.textContent = k.A1;
                        x.setAttribute(`class`, `list-3`);
                        x.id = k.A1;
                        y.textContent = k.B1;
                        y.setAttribute(`class`, `list-8`);
                        z.setAttribute(`count`, gDisabled.value);
                        z.textContent = gDisabled.value;

                        gDisabled.addEventListener(`change`, e => {
                            z.setAttribute(`count`, gDisabled.value);
                            z.textContent = e.target.value;
                        })
                        
                        w.appendChild(z);
                        w.appendChild(x);
                        w.appendChild(y);
                        
                        $(`list-1`).appendChild(w);
                    } else $(`list-1`).querySelector(`.list-3[id="${k.A1}"]`).offsetParent.remove();
                })

                d.appendChild(clone);
            }

            d.appendChild(g);
            d.appendChild(f);
            x.children[x.children.length -1].lastChild.appendChild(d);

        }
    }

    $(`pieces-1`).appendChild(x);

    $(`pieces-7`).addEventListener(`click`, () => {
        let count = 0;
        let arr = "";
        const dt = new Date();

        for(let a of $(`list-1`).children) {
            if(a.children[0].getAttribute('count') === null) continue;

            let val = parseInt(a.children[0].getAttribute('count'));

            count += val;

            for(let i = 1; i <= val; i++) {
                arr += `${a.children[1].id}/L2/1/S/#/`;
            }
        }

        bwipjs.toBuffer({ bcid:'qrcode', text: arr }, (err, png) => {
            if(err) return notif(err, `erreur`);
            else {
                pngtosvg('data:image/png;base64,' + png.toString('base64')).then(output => {
                    $('list-5').innerHTML = output;
                    $(`list-4`).textContent = count;
                    $(`list-8`).textContent = $(`pieces-9`).value.toString();
                    $(`list-9`).textContent = dt.toLocaleString('fr-FR');
                    $(`list-10`).textContent = arg.version.toString();

                    let getName = JSON.parse(localStorage.getItem('Pièces'));

                    $(`list-11`).textContent = getName.Name;
                    
                    ipcRenderer.send('printer');
                });
            }
        });
    });

    $(`pieces-8`).addEventListener(`click`, () => {

        for(let a of $(`pieces-1`).children) {
            for(let b of a.children[1].children) {
                let c = b.children[0];
                
                if(c.checked === true) {
                    c.checked = false;
                    
                    let cDisabled = c.nextElementSibling;
                    cDisabled.children[1].removeAttribute(`selected`);
                    cDisabled.children[1].setAttribute(`selected`, ``);
                    cDisabled.toggleAttribute(`disabled`);
                }
            }
        }

        Rm(`list-1`, `div`, `.list-0`);
        $(`pieces-9`).value = ``;
    });
});

ipcRenderer.on('printerInfo', (event, arg) => {
	notif(arg.msg, arg.type);
});

function pngtosvg(val) {
    return processImage(val);

    function each(obj,callback) {
        var length = obj.length,
        likeArray = ( length === 0 || ( length > 0 && (length - 1) in obj ) ),
        i = 0;

        if ( likeArray ) {
            for ( ; i < length; i++ ) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) { break; }
            }
        } else {
            for (i in obj) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) { break; }
            }
        }
    }
      
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    function getColor(r,g,b,a){
        if ( a === undefined || a === 255 ) { return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); }
        if ( a === 0 ) { return false; }
        return 'rgba('+r+','+g+','+b+','+a+')';
    }
      
    function makePathData(x,y,w) {
        return ('M'+x+','+y+'h0v1h'+w+'v-1z');
    }
      
    function path(color,data) {
        return '<path fill="'+color+'" d="'+data+'" />';
    }
      
    function processImage(src) {
        return new Promise((resolve, reject) => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let img = new Image();
            
            img.onload = function() {
                let width = img.width;
                let height = img.height;
        
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img,0,0);
            
                let output = '<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'" viewBox="0 0 '+width+' '+height+'" shape-rendering="crispEdges"';
            
                output += '>\n';
            
                let colors = {},
                    x = 0,
                    y = 0,
                    p, color;
            
                for ( y = 0; y < height; y++ ) {
                    for ( x = 0; x < width; x++ ) {
                        p = ctx.getImageData(x,y,1,1).data;
                        color = getColor(p[0],p[1],p[2],p[3]);
                        if ( color ) {
                            colors[color] = colors[color] || [];
                            colors[color].push([x,y]);
                        }
                    }
                }
            
                each(colors,function(i,value){
                    if ( i === false ) { return; }
                    let paths = [];
                    let curPath;
                    let w = 1;
                    each(value,function(){
                        if ( curPath && this[1] === curPath[1] && this[0] === (curPath[0] + w) ) {
                            w++;
                        } else {
                            if ( curPath ) {
                                paths.push(makePathData(curPath[0],curPath[1],w));
                                w = 1;
                            }
                            curPath = this;
                        }
                    });
                    paths.push(makePathData(curPath[0],curPath[1],w));
            
                    this.paths = paths;
                    output += path(i,paths.join(' '));
                });
            
                output += '\n</svg>';
            
                resolve(output);
            }

            img.src = ( src.target ? src.target.result : src );
        });
    }
}




























































// const fetch = require('node-fetch');

// // /sites/Repair/Freigegebene%20Dokumente/PROD/LISTE_A_SERVIR/APPLI/Bddpieces.xlsm
// // https://paulryan.com.au/2014/spo-remote-authentication-rest/

// let domain = `https://vorwerkholding.sharepoint.com`;
// let xml = `<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"
// xmlns:a="http://www.w3.org/2005/08/addressing"
// xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
// <s:Header>
// <a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>
// <a:ReplyTo>
// <a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>
// </a:ReplyTo>
// <a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To>
// <o:Security s:mustUnderstand="1"
//  xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
// <o:UsernameToken>
//   <o:Username>julien.grit@vorwerk.fr</o:Username>
//   <o:Password>Onepiece956952!</o:Password>
// </o:UsernameToken>
// </o:Security>
// </s:Header>
// <s:Body>
// <t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">
// <wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">
//   <a:EndpointReference>
//     <a:Address>${domain}/</a:Address>
//   </a:EndpointReference>
// </wsp:AppliesTo>
// <t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>
// <t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>
// <t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>
// </t:RequestSecurityToken>
// </s:Body>
// </s:Envelope>`;

// fetch("https://login.microsoftonline.com/extSTS.srf", {
//     method: 'POST',
//     headers: { "Accept": "application/soap+xml; charset=utf-8", "Set-Cookie": "SameSite=None; Secure; HttpOnly" },
//     credentials: 'same-origin',
//     body: xml
// }).then(response => {
//   console.log(response.headers.raw())
//   return response.text();
// }).then(val => {
//   let regex0 = new RegExp(`(?=wst:).*?(?=..\S:Value)`, 'ig');
//   let regex1 = new RegExp(`(?<=(<psf:text>)).*?(?=(<\/psf:text>))`, 'ig');
  
//   if(regex0.test(val)) {
//     notif(`${val.match(regex1)}\r\n${val.match(regex0)}`, `erreur`);
//   } else {
//     let getBinarySecurityToken = new RegExp(`(?<=(<wsse:BinarySecurityToken .*?">)).*?(?=(<\/wsse:BinarySecurityToken>))`, 'ig');
//     let getSecuretoken = val.match(getBinarySecurityToken)[0];
//     let getSecuretokens = getSecuretoken.replace(/\&amp;/g, '&');
    
//   fetch(`${domain}/_forms/default.aspx?wa=wsignin1.0`, {
//         method: 'POST',
//         mode: 'same-origin',
//         headers: {
//           "Accept": "application/x-www-form-urlencoded", 
//           "Set-Cookie": "SameSite=None; Secure; HttpOnly",
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         credentials: 'same-origin',
//         body: getSecuretokens
//     })
//     .then(response => {
//       console.log(response.headers.raw())
//       return response.text();
//     }).then(token => {
//       console.log(token)
//     });
//   }

//   // console.log(aa.headers.raw()['set-cookie'])
// }).catch(err => notif(err, `error`));










// const xlsx = require('xlsx');



// let aa = xlsx.readFile(path)

// // console.log(aa)

// function ReadDocument(documentUrl) {
//     try {
//         if (documentUrl) {
//                 var xhr = new XMLHttpRequest();
//                 xhr.onreadystatechange = function (data) {
//                     if (this.readyState == 4 && this.status == 200) {
//                         var fileData = this.response;

//                         console.log(fileData)
//                     }
//                 }
//                 xhr.open('GET', documentUrl, true);
//                 xhr.responseType = 'blob';
//                 xhr.send();
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

// ReadDocument(path)