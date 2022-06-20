<?php header('Cache-Control: max-age=31536000,  must-revalidate'); header('Content-Type:  text/css');
/*if($_GET['v']===''){$theme='undefined';}else{$theme=$_GET['v'];}
if($theme == 'a2'){echo'
	.body-2 {
		background-color:#000;
		color:#fff;
	}
';}
else if($theme == 'a0' || $theme == 'undefined'){echo'
	.body-2 {
		background-color:#fff;
		color:#000;
	}
';}*/
?>

:root { /* pas d'espace sinon en JS il faut rajouté un espace */
	--colorWhite: #fff;
	--colorBlack: #000;
	--defaultColor:cadetblue;
	--defaultColorSecondary: orange;
	--background: var(--colorWhite);
	--colorSupportInit: var(--colorBlack);
	--valueInit:0;
	--value0:22px;
	--value1:9999;
	--value2:hidden;
	--value3:50px;
	--value4:none;
	--value5:none;
}

*, body, html {
	position: relative;
	margin: 0;
	padding: 0;
	line-height: 1.5;
	font-family: calibri;
}

html, body {
	height: 100%;
}

body {
	background-color: var(--background);
	overflow: var(--value2);
	display: grid;
	grid-template-areas: "main" "footer";
	grid-template-rows: auto 0fr;
}

main {
	opacity: var(--valueInit);
	transition: opacity linear .5s;
	margin-top: 82px;
	background: url(../img/backgroundIndex.webp);
	grid-area: main;
}

footer {
	opacity: var(--valueInit);
	transition: opacity linear .5s;
	background: url(../img/backgroundFooter.webp);
	grid-area: footer;
	padding: 3% 10%;
	color: #fff;
}

a {
	text-decoration: none;
	cursor: pointer;
	color: #000;
}

.preload-0 {
	transition: bottom linear 1.5s, right linear 1.5s; /* a reglé le décalage sur les écrans: top linear 1.5s, , left linear 1.5s*/
	position: fixed;
	align-items: center;
	justify-items: center;
	display: inline-grid;
	z-index: var(--value1);
	left: 10%;
	right: 10%;
	top: 0;
	bottom: 0;
}

.preload-1 {
	display: inline-flex;
	align-items: center;
}

.preload-2 {
	box-shadow: 0 0 25px rgba(72, 144, 196, .7);
	transition: all linear .5s;
	-webkit-animation: preloadIcon 1.5s infinite;
    animation: preloadIcon 1.5s infinite;
	border-radius: 50%;
	margin: 1rem;
	padding: 1rem;
	background-color: var(--defaultColor);
}

.preload-3 {
	width: var(--valueInit);
	overflow: hidden;
	transition: all linear .5s;
	font-size: var(--value0);
	white-space: nowrap;
	text-align: center;
	cursor: default;
}

.nav-0 {
	padding: 0 10%;
	display: inline-grid;
	position: fixed;
	top: 0;
	z-index: var(--value1);
	left: 0;
	right: 0;
	grid-template-columns: 0fr 1fr;
	background-color: var(--background);
}

.nav-1 {
	display: inline-flex;
	align-items: center;
}

.nav-2 {
	background-color: var(--defaultColor);
	border-radius: 50%;
	margin: .5rem;
	padding: .5rem;
	width: var(--value3);
	height: var(--value3);
	transition: all linear .3s;
}

.nav-3 {
	font-size: 20px;
	white-space: nowrap;
	text-align: center;
	font-weight: bolder;
}

.nav-4 {
	display: inline-flex;
	align-items: center;
	gap: 1rem;
	justify-content: right;
    justify-self: right;
}

/* older */
/*.nav-5 {
	color: #222;
	font-size: 18px;
}*/

[class*="nav-5_"] {
	background-image: url('../img/grid.svg');
	background-repeat: no-repeat;
	background-size: 75%;
	width: 30px;
	height: 30px;
	cursor: pointer;
	background-position: center;
}

[class*="nav-6"] {
	background-color: var(--colorWhite);
	border-radius: 10px 0 10px 10px;
	box-shadow: 0 0 2px rgba(0, 0, 0, .7);
	padding: 2rem;
	position: absolute;
	top: 100%;
	right: 0;
	width: 250px;
}

.nav-6_0 {
	display: var(--value5);
	grid-template-columns: repeat(3, calc((100% - 2rem) / 3));
	text-align: center;
	grid-gap: 1rem;
}

.nav-7:not(href) > * {
    pointer-events: none;
}

.nav-8 {
	width: 50px;
	height: 50px;
}

.nav-10 {
    display: inline-flex;
    align-items: center;
    border: 1px dashed black;
    padding: .1rem .5rem;
}

.nav-10::before {
    content: "";
    display: inline-block;
    background-image: url(../img/logout.svg);
    width: 18px;
    height: 18px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: .2rem;
}

.header-0 {
	display: grid;
}

.index-0 {
	padding: 5% 10%;
}

/*.index-0 > *:not(.tet) {
	z-index: 1;
}

.tet_0 {
	position: absolute;
	left: 0;
	z-index: 0;
	right: 0;
	top: 0;
	bottom: 0;}

.tet-1 {
	animation-duration: 4s;
	
}

.tet-2 {
	animation-duration: 6s;
	
}

.tet-3 {
	animation-duration: 5s;
	
}

.tet-4 {
	animation-duration: 7s;
	
}

[class^="tet-"] {
	width: 150px;
	animation-name: move;
	animation-iteration-count: infinite;
	margin: 0 4rem;
}

@keyframes move {
  from {
    bottom: 0;
  }
  50% {
    bottom: 5px;
  }

  to {
    bottom: 0;
  }
}*/

.index-1 {
	margin: 5% 10%;
	display: grid;
	grid-template-areas: "index0 index1";
	grid-template-columns: 1fr 1fr;
	grid-gap: 1rem;
	text-align: center;
	align-items: center;
}

.index-1:nth-child(2n) {
	direction: rtl;
}

.index-2 {
	box-shadow: 0 0 7px rgba(0, 0, 0, .7);
	padding: .5rem;
	grid-area: index0;
}

.index-3 {
	grid-area: index1;
	border: 2px solid green;
	width: 10rem;
}

.index-4 {
	background-color: #5f9ea094;
	color: var(--colorWhite);;
	font-family: "Noto Sans";
	font-weight: 700;
	font-size: 14px;
	line-height: 18px;
	border-bottom: 2px solid green;
	padding: 1rem;
}

.index-5 {
	color: #196d17;
	background-color: var(--colorWhite);;
	font-family: "Noto Sans";
	font-weight: 700;
	font-size: 14px;
	line-height: 18px;
	display: inherit;
	padding: .5rem;
}

.index-6 {
	text-align: center;
}

.index-7 {
	border-style: inset;
	width: 20%;
	display: inline-block;
}

.index-8 {
	display: inline;
}

.index-9 {
 	justify-content: center;
	grid-template-columns: repeat(5, 125px);
	grid-template-rows: repeat(6, 125px);
	display: grid;
	grid-gap: 0 1rem;
	margin: 5% 0;
}

.index-10 {
	margin: 5% 10%;
	text-align: center;
}

.index-11 {
	display: inline-grid;
	padding: .5rem;
	background-color: var(--colorWhite);;
	margin: .5rem;
	vertical-align: middle;
	box-shadow: 0 0 10px rgba(188, 156, 115, 0.7);
	border-radius: 10px;
	width: 125px;
	height: 125px;
	justify-content: center;
	align-content: center;
}

.index-12 {
    width: 100%;
    height: 100%;
}

.index-13 {
	text-align: center;
	background: url(../img/backgroundFooter.webp);
	color: var(--colorWhite);
	padding: .5rem;
	cursor: default;
}

.index-14 {
	cursor: pointer;
	color: var(--defaultColorSecondary);
}

.index-15::after {
    content: "";
    border-top: 15px solid var(--defaultColor);
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    position: absolute;
    bottom: -.9rem;
    justify-self: center;
}

.index-15 {
	position: absolute;
	top: -2rem;
	left: 0;
	right: 0;
	display: none;
	background-color: var(--defaultColor);
	width: 150px;
	margin: auto;
}

.index-14:hover ~ .index-15 {
	display: grid;
}

.item-0 {
	grid-row: 1 / 3;
	grid-column: 1 / 3;
	text-align: center;
}

.item-1 {
	grid-row: 4;
}

.item-2 {
	grid-column: 3/ 4;
	grid-row: 3 / 4;
}

.item-3 {
	grid-column: 5 / 6;
	grid-row: 3 / 4;
}

.item-4 {
	grid-column: 4 / 5;
}

.item-5 {
	grid-column: 3;
	grid-row: 5 / 6;
}

.item-0 > .item_0 {
	width: 250px;
	height: 250px;
}

.item-0 > .item_1 {
	margin: 0 .5rem;
	width: auto;
}

.item_0 {
	width: 125px;
	height: 125px;
	box-shadow: 0 0 6px rgba(0, 0, 0, .7);
}

.item_1 {
	color: #4958ab;
	box-shadow: 0 0 6px rgba(0, 0, 0, .7);
	background-color: #ffffffd4;
	display: -webkit-box;
	padding: .5rem;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-align: center;
	width: calc(125px - (.5rem * 2));
}


.launcher-0 {
	display: block;
	text-align: center;
	margin-top: 5%;
	text-decoration: underline goldenrod 3px;
}

.launcher-1 {
	font-family: Arial;
}

.launcher-2 {
	display: block;
	text-align: center;
	margin: 5%;
}

.launcher-3 {
	background-color: #5f9ea094;
	border: 2px solid green;
	display: inline-grid;
	padding: 2rem;
	margin: 1rem;
	color: var(--colorWhite);
	font-weight: bold;
	font-size: 17px;
}

.launcher-3:hover {
	box-shadow: 0 0 10px rgba(109, 109, 109, .7);
}

.launcher-4 {
	width: 7rem;
}

.support-0 {
	margin: 5% 10%;
}

.support-1 {
	border-radius: 15px;
	border: none;
	padding: .3rem .7rem;
	font-size: 17px;
	border-bottom: 2px solid gray;
	font-family: Arial;
	display: block;
	color: var(--colorSupportInit);
}

.support-2 {
	margin: 1rem;
	display: inline-grid;
	grid-gap: 1rem;
	grid-template-areas: "a b";
}

.support-3 {
	
}

.support-4 {
	
}

.support-5 {
	color: var(--defaultColor);
}

.support-6 {
	display: grid;
	grid-gap: 2rem;
	width: 500px;
}

.support-7 {
	background-color: var(--colorWhite);
	padding: 1rem;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, .7);
	cursor: default;
}

.support-8 {
	color: #4958ab;
	font-weight: bolder;
	font-size: 18px;
}

.support-9 {
	color: #555;
}

.support-10 {
	color: #222;
	margin-top: 1rem;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
}

.support-11 {
	float: right;
	background-color: var(--defaultColorSecondary);
	color: var(--colorWhite);
	padding: .2rem .6rem;
	border-radius: 25px;
	border: 2px solid #f7a178;
}

.sujet-0 {
	margin: 3% 10%;
}

.sujet-1 {
	background-color: var(--colorWhite);
	padding: 1rem;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, .7);
	display: grid;
	grid-gap: 1rem;
	grid-template-areas: "sujet_a sujet_b sujet_b" "sujet_c sujet_c sujet_c" ". . sujet_d";
	grid-template-columns: auto 1fr auto;
	margin: 0 10rem;

	/*
	responsive:
	
	grid-template-areas: "a" "b" "c" "d";
	grid-template-columns: none;*/
}

.sujet-2 {
	color: #4958ab;
	grid-area: sujet_a;
	display: contents;
}

.sujet-3 {
	color: #555;
	grid-area: sujet_b;
	align-self: end;
}

.sujet-4 {
	color: #222;
	grid-area: sujet_c;
}

.sujet-5 {
	background-color: var(--defaultColorSecondary);
	color: var(--colorWhite);
	padding: .2rem .6rem;
	border-radius: 25px;
	border: 2px solid #f7a178;
	grid-area: sujet_d;
	justify-self: end;
}

.sujet-6 {
	display: grid;
	grid-gap: 1rem;
	margin: 2rem auto;
	/*width: 400px;*/
}

.sujet-7 {
	background-color: rgb(218, 218, 218);
	border: none;
	padding: .5rem;
	resize: vertical;
	min-height: 70px;
	max-height: 300px;
}

.sujet-8 {
	justify-self: end;
	padding: .1rem .5rem;
	background-color: orange;
	border: none;
	color: var(--colorWhite);
	cursor: pointer;
}

.sujet-9 {
	background-color: var(--colorWhite);
	padding: 1rem;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, .7);
	text-align: center;
	width: 400px;
	justify-self: center;
}

.sujet-10 {
	margin: 1rem 15rem;
	border-bottom: 3px double var(--defaultColorSecondary);
	padding: 1rem;
}

.sujet-11 {
	color: var(--defaultColor);
}

.sujet-12 {
	color: #222;
    padding-top: 1rem;
}

.sujet-13 {
	margin: 1rem 20rem;
	display: inline-grid;
	grid-gap: 1rem;
}

.compte-0, .verif-0 {
	margin: 2rem auto;
	text-align: center;
	width: 500px;
}

.compte-1 {
	display: inline-grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	gap: 1rem;
	margin: 2rem;
}

[class*="compte-2_"]:not([class*="compte-2_2"]), .verif-9 {
	cursor: pointer;
	border-radius: 10px;
	background-color: var(--defaultColor);
	color: var(--colorWhite);
	padding: 0 1rem;
	box-shadow: 0 0 5px rgba(21, 132, 175, 0.79);
}

.compte-2_0, .verif-9 {
	--value4: 2px underline var(--defaultColorSecondary);
	text-decoration: var(--value4);
}

.compte-2_1 {
	text-decoration: var(--value4);
}

.compte-2_2 {
	cursor: pointer;
	text-decoration: var(--value4);
}

[class*="compte-3"], .verif-2 {
	background-color: var(--colorWhite);
	border-radius: 10px;
	box-shadow: 0 0 2px rgba(0, 0, 0, .7);
	padding: 2rem;
}

.compte-3_0, .verif-2 {
	--value5: block;
	display: var(--value5);
}

.compte-3_1 {
	display: var(--value5);
}

.compte-3_2 {
	display: var(--value5);
}

.compte-4, .verif-3 {
	display: grid;
	grid-gap: .5rem;
	padding: 1rem;
}

.compte-5 {
	display: grid;
	grid-gap: 7rem;
	padding: 1rem;
	grid-template-columns: 1fr 1fr;
}

.compte-6, .verif-6 {
	display: inline-flex;
}

.compte-7:required:invalid, .compte-8:required:invalid, .compte-11:required:invalid, .compte-12:required:invalid, .compte-14:required:invalid, .compte-17:required:invalid, .compte-20:required:invalid, .compte-21:required:invalid {
	border: double #c40d0d;
}

.compte-7, .compte-8, .compte-11, .compte-12, .compte-14, .compte-17, .compte-20, .compte-21, .compte-22, .compte-23, .compte-25, .compte-26, .compte-27, .compte-28,
.verif-5, .verif-7 {
	padding: .2rem 1rem;
}

.compte-10, .compte-19, .compte-9, .compte-24, .compte-29,
.verif-8 {
	cursor: pointer;
	background-color: var(--defaultColor);
	color: var(--colorWhite);
	border-radius: 10px;
	box-shadow: 0 0 5px rgba(3, 77, 171, .7);
	padding: 0 1rem;
}

.compte-13 {
	visibility: hidden;
	position: absolute;
	top: -5rem;
	left: 0;
	right: 0;
	background-color: var(--colorWhite);
	border: 2px dotted black;
	box-shadow: 0 0 4px rgba(120, 120, 120, .7);
	padding: .5rem;
}

.compte-16:hover ~ .compte-13 {
    visibility: visible;
}

.compte-15 {
	display: inline-grid;
	grid-template-columns: 1fr 0fr;	
}

.compte-16 {
    background-color: #00b7ff;
    width: 30px;
    color: var(--colorWhite);
    border-radius: 50%;
    height: 30px;
    display: inline-grid;
    align-items: center;
    cursor: pointer;
}

.compte-18 {
	padding: 1rem;
	width: auto;
	display: flex;
	flex-direction: row-reverse;
}

.verif-1 {
	display: inline-grid;
	margin: 2rem;
}

.verif-4 {
	display: grid;
	padding: 1rem;
}
.verif-8 {
	justify-self: end;
}

.verif-10 {
	background-color: var(--background);
	color: red;
	padding: 0 1rem;
	box-shadow: 0 0 5px rgba(21, 132, 175, 0.79);
	cursor: default;
	border-radius: 10px;
}

.mail-0 {
	position: fixed;
	background-color:#2b2b2b80;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	justify-content: center;
	align-content: center;
	display: inline-flex;
	cursor: pointer;
}

.mail-1 {
	background-color:#fff;
	width: 50%;
	border-radius: 15px;
	align-self: center;
	-webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-name: fadeInDown;
    display: grid;
    grid-template-columns: 0fr 1fr;
	overflow: auto;
	max-height: 50%;
}

.mail-2 {
	font-family: "Times", "Times New Roman", "serif", "sans-serif", "EmojiSymbols";
	font-weight: 500;
	color:#9b9384;
	font-size: xxx-large;
	padding: 1rem 0 1rem 1rem;
}

.mail-3 {
	padding: 1rem;
	align-self: center;
}

.mail-4 {
	display: grid;
	line-height: 2;
	color:#0070FF;
}

.infoLog-0 {
	display: grid;
	margin: auto;
	width: 200px;
	align-content: center;
	height: 200px;
}

.infoLog-1 {
	font-weight: normal;
	text-align: center;
	background-color: var(--colorWhite);
	border: 1.2px dashed #f91111;
}

.r404-0 {
	display: grid;
	height: 100%;
}

.r404-1 {
	align-self: center;
	justify-self: center;
	margin: 1rem;
}

@-webkit-keyframes preloadIcon {
	to{box-shadow: 0 0 25px rgba(72, 144, 196, .7);}
	50%{box-shadow: 0 0 50px rgba(39, 61, 183, .7);}
	from{box-shadow: 0 0 25px rgba(72, 144, 196, .7);}
}

@keyframes preloadIcon{
	to{box-shadow: 0 0 25px rgba(72, 144, 196, .7);}
	50%{box-shadow: 0 0 50px rgba(39, 61, 183, .7);}
	from{box-shadow: 0 0 25px rgba(72, 144, 196, .7);}
}

@media screen and (max-width:900px) {

	.index-2 {
		width: calc(100% - 1rem);
		height: auto;
	}

	.index-9 {
		display: inline-block;
		text-align: center;
	}

	[class^="item-"] {
		display: flex;
		gap: 1rem;
		margin: 5% 0;
	}

	.item-0 > .item_0 {
	    width: 125px;
	    height: 125px;
	}

	.item_1 {
		margin: 0 .5rem;
		width: auto;
		align-self: center;
	}

	.sujet-1 {
		grid-template-areas: "sujet_a" "sujet_b" "sujet_c" "sujet_d";
		grid-template-columns: none;
	}

}

/*.mail-1 {
	background-color:#fff;
	width: 50%;
	border-radius: 15px;
	align-self: center;
	-webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-name: fadeInDown;
    display: grid;
    grid-template-columns: 0fr 1fr;
}

@-webkit-keyframes spin{
	0% {opacity:0;-webkit-transform:rotate(0deg)}
	100% {opacity:1;-webkit-transform:rotate(360deg)}
}

@keyframes spin {
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
}

@-webkit-keyframes fadeInDown{
	0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}
	to{opacity:1;-webkit-transform:translateZ(0);transform:translateZ(0)}
}

@keyframes fadeInDown{
	0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}
	to{opacity:1;-webkit-transform:translateZ(0);transform:translateZ(0)}
}

@media screen and (max-width:1000px) {

	.nav-1 {
		grid-template-areas: "a b" "c c";
	}

	.nav-2 {
		grid-area: c;
		text-align: center;
		display: var(--menuEnable);
		padding-top: 2rem;
	}

	.nav-3 {
		display: grid;
		gap: 0.5rem;
	}

	.menu-0 {
		position: initial;
	}

	.user-0 {
		display: inline-block;
	}

	.link-3 {
		display: inherit;
	}

	.block-5 {
		grid-template-areas: "a a" "b b";
	}

}

@media screen and (max-width:700px) {

	/*.img-1 {
		width: 100%;
		height: 10rem;
		background-size: cover;
	}*\/

	.cpt-5 {
		width: auto;
	}

}

@media screen and (max-width:600px) {

	.status-0 {
		width:100%;
		grid-template-columns: 1fr;
	}

	.status-1, .status-5, .status-6 {
		display: none;
	}

	.clip-1 {
		text-align: center;
	}

}

@media screen and (max-width:500px) {

	.block-3, .block-6 {
		grid-template-columns: repeat(auto-fit, 100%);
	}

	.cont-2 {
		height: inherit;
	}

	.discord-1 > iframe {
		width:100%;
	}

}*/



/****************** theme ********************/

/*;
.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial;
  text-shadow: 0 0 1px #000;
}

@-webkit-keyframes snowflakes-fall{0%{top:-10%}100%{top:100%}}@-webkit-keyframes snowflakes-shake{0%{-webkit-transform:translateX(0px);transform:translateX(0px)}50%{-webkit-transform:translateX(80px);transform:translateX(80px)}100%{-webkit-transform:translateX(0px);transform:translateX(0px)}}@keyframes snowflakes-fall{0%{top:-10%}100%{top:100%}}@keyframes snowflakes-shake{0%{transform:translateX(0px)}50%{transform:translateX(80px)}100%{transform:translateX(0px)}}.snowflake{position:fixed;top:-10%;z-index:9999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;-webkit-animation-name:snowflakes-fall,snowflakes-shake;-webkit-animation-duration:10s,3s;-webkit-animation-timing-function:linear,ease-in-out;-webkit-animation-iteration-count:infinite,infinite;-webkit-animation-play-state:running,running;animation-name:snowflakes-fall,snowflakes-shake;animation-duration:10s,3s;animation-timing-function:linear,ease-in-out;animation-iteration-count:infinite,infinite;animation-play-state:running,running}.snowflake:nth-of-type(0){left:1%;-webkit-animation-delay:0s,0s;animation-delay:0s,0s}.snowflake:nth-of-type(1){left:10%;-webkit-animation-delay:1s,1s;animation-delay:1s,1s}.snowflake:nth-of-type(2){left:20%;-webkit-animation-delay:6s,.5s;animation-delay:6s,.5s}.snowflake:nth-of-type(3){left:30%;-webkit-animation-delay:4s,2s;animation-delay:4s,2s}.snowflake:nth-of-type(4){left:40%;-webkit-animation-delay:2s,2s;animation-delay:2s,2s}.snowflake:nth-of-type(5){left:50%;-webkit-animation-delay:8s,3s;animation-delay:8s,3s}.snowflake:nth-of-type(6){left:60%;-webkit-animation-delay:6s,2s;animation-delay:6s,2s}.snowflake:nth-of-type(7){left:70%;-webkit-animation-delay:2.5s,1s;animation-delay:2.5s,1s}.snowflake:nth-of-type(8){left:80%;-webkit-animation-delay:1s,0s;animation-delay:1s,0s}.snowflake:nth-of-type(9){left:90%;-webkit-animation-delay:3s,1.5s;animation-delay:3s,1.5s}
/* Demo Purpose Only*\/
.demo {
  font-family: 'Raleway', sans-serif;
	color:#fff;
    display: block;
    margin: 0 auto;
    padding: 15px 0;
    text-align: center;
}
.demo a{
  font-family: 'Raleway', sans-serif;
color: #000;		
}*/