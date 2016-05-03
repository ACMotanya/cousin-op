<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>

	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="author" content="SemiColonWeb" />

	<!-- Stylesheets
	============================================= -->
	<link href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Adamina:300,400,500,600,700,800,900|Raleway:300,400,500,600,700,800,900|Roboto:400,100,300,500,700,900|Permanent+Marker" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="style.css" type="text/css" />
	<link rel="stylesheet" href="css/dark.css" type="text/css" />
	<link rel="stylesheet" href="css/font-icons.css" type="text/css" />
	<link rel="stylesheet" href="css/animate.css" type="text/css" />
	<link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />
	<link rel="stylesheet" href="css/responsive.css" type="text/css" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!--[if lt IE 9]>
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
	<![endif]-->

	<!-- SLIDER REVOLUTION 5.x CSS SETTINGS -->
	<link rel="stylesheet" type="text/css" href="include/rs-plugin/css/settings.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="include/rs-plugin/css/layers.css">
	<link rel="stylesheet" type="text/css" href="include/rs-plugin/css/navigation.css">

	<link rel="stylesheet" href="css/custom.css" type="text/css" />


	<!-- Document Title
	============================================= -->
	<title>Laura Janelle</title>

</head>

<body class="stretched" ng-app="ljApp">

	<!-- Document Wrapper
	============================================= -->
	<div id="wrapper" class="clearfix">

		<!-- Header
		============================================= -->
		<header id="header" class="full-header transparent-header" data-sticky-class="not-dark">
			<div id="header-wrap">
				<div class="container clearfix">
					<div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

		<!--  Logo
					=============================================
					<div id="logo">
						<a href="index.html" class="standard-logo" data-dark-logo="one-page/images/lj-white-2.png"><img src="one-page/images/LJ_grey.jpg" alt="Canvas Logo"></a>
						<a href="index.html" class="retina-logo" data-dark-logo="one-page/images/lj-white-2.png"><img src="one-page/images/lj-bw-1.png" alt="Canvas Logo"></a>
					</div><!-- #logo end -->

					<!-- Primary Navigation
					============================================= -->
					<nav id="primary-menu">
						<ul class="one-page-menu" data-easing="easeInOutExpo" data-speed="1250" data-offset="65" style="font-family: Bodoni-Sans">

							<li><a href="comingsoon1.html"><div>ABOUT US</div></a></li>
							<li><a href="comingsoon.html"><div>FIND A STORE</div></a></li>
							<li><a href="comingsoon2.html"><div>RETAILERS</div></a></li>
							<li><a href="https://www.ivystone.com/find/search-for-a-sales-representative.asp" data-lightbox="iframe" ><div>FIND A REP</div></a></li>
							<li><a href="comingsoon1.html"><div>SALES REPS</div></a></li>
							<li><a href="contact.html"><div>CONTACT</div></a></li>
						</ul>
					</nav><!-- #primary-menu end -->
				</div>
			</div>
		</header><!-- #header end -->

		<!-- Slider
		============================================= -->
		<section id="slider" class="revslider-wrap full-screen slider-parallax clearfix">

			<div id="rev_slider_287_1_wrapper" class="rev_slider_wrapper fullscreen-container" data-alias="better-youtube-gallery" style="background-color:#000000;padding:0px;">
				<!-- START REVOLUTION SLIDER 5.1.4 fullscreen mode -->
				<div id="rev_slider_287_1" class="rev_slider fullscreenbanner" style="display:none;" data-version="5.1.4">
					<ul>
						<!-- SLIDE  -->
						<li data-index="rs-34" data-transition="fade" data-slotamount="7"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="include/rs-plugin/demos/assets/images/fashion_bg1-100x50.jpg"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="Intro" data-description="">
							<!-- MAIN IMAGE -->
							<img src="one-page/images/ljhero-2.jpg"  alt=""  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->

							<!-- LAYER NR. 1 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','left','left']" data-hoffset="['200','40','40','41']"
								data-y="['middle','bottom','bottom','middle']" data-voffset="['-35','330','290','50']"
								data-width="none"
								data-height="none"
								data-whitespace="nowrap"
								data-transform_idle="o:1;"
								data-transform_in="z:0;rX:0deg;rY:0;rZ:0;sX:1.5;sY:1.5;skX:0;skY:0;opacity:0;s:1500;e:Power3.easeOut;"
								data-transform_out="opacity:0;s:1000;s:1000;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-visibility="['on','on','off','off']"

								data-responsive_offset="on"
								style="z-index: 2;"> <img src="one-page/images/sleeklogo.png">
							</div>

							<!-- LAYER NR. 2 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','left','center']" data-hoffset="['200','40','40','-209']"
								data-y="['middle','bottom','bottom','middle']" data-voffset="['15','255','210','150']"
								data-fontsize="['15','15','15','15']"
								data-lineheight="['20','22','22','22']"
								data-width="139"
								data-height="71"
								data-whitespace="normal"
								data-transform_idle="o:1;"
								data-visibility="['on','on','on','off']"

								data-transform_in="z:0;rX:0deg;rY:0;rZ:0;sX:1.5;sY:1.5;skX:0;skY:0;opacity:0;s:1500;e:Power3.easeOut;"
								data-transform_out="opacity:0;s:1000;s:1000;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"

								data-responsive_offset="on"

								style="z-index: 3; white-space: normal; font-weight: 900; font-family: Bodoni-Sans;">Earring Drop<br/>
								Aquamarine Blue<br/>
								$21.99<br/>
							</div>

							<!-- LAYER NR. 3 -->
							<div class="tp-caption   tp-resizeme"
								data-x="['left','left','left','left']" data-hoffset="['200','40','40','40']"
								data-y="['middle','bottom','bottom','bottom']" data-voffset="['52','240','185','250']"
								data-width="none"
								data-height="none"
								data-whitespace="nowrap"
								data-visibility="['on','on','on','off']"
								data-transform_idle="o:1;"
								data-transform_in="z:0;rX:0deg;rY:0;rZ:0;sX:1.5;sY:1.5;skX:0;skY:0;opacity:0;s:1500;e:Power3.easeOut;"
								data-transform_out="opacity:0;s:1000;s:1000;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-visibility="['on','on','off','off']"

								data-responsive_offset="on"
								style="z-index: 4;"> <img src="one-page/images/swarovski1.png">
							</div>
						</li>

						<!-- SLIDE  -->
						<li data-index="rs-35" data-slotamount="7"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="include/rs-plugin/demos/assets/images/fashion_bg1-100x50.jpg"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="Intro" data-description="">
							<!-- MAIN IMAGE -->
							<img src="one-page/images/rglbhero.jpg"  alt=""  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->

							<!-- LAYER NR. 1 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','left','left']" data-hoffset="['205','60','30','0']"
								data-y="['middle','bottom','bottom','bottom']" data-voffset="['-25','300','300','30']"
								data-width="none"
								data-height="none"
								data-whitespace="nowrap"
								data-transform_idle="o:1;"
								data-visibility="['on','on','off','off']"

								data-transform_in="z:0;rX:0deg;rY:0;rZ:0;sX:1.5;sY:1.5;skX:0;skY:0;opacity:0;s:1500;e:Power3.easeOut;"
								data-transform_out="opacity:0;s:1000;s:1000;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-responsive_offset="on"
								style="z-index: 5;"> <img src="one-page/images/rglblogo.png">
							</div>

							<!-- LAYER NR. 2 -->
							<div class="tp-caption  tp-resizeme"
								data-x="['left','left','left','left']" data-hoffset="['215','65','35','145']"
								data-y="['middle','bottom','bottom','bottom']" data-voffset="['43','215','205','55']"
								data-fontsize="['20','17','17','17']"
								data-lineheight="['22','22','22','22']"
								data-width="119"
								data-height="91"
								data-whitespace="normal"
								data-transform_idle="o:1;"
								data-transform_in="x:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;s:1500;e:Power3.easeInOut;"
								data-transform_out="x:[-100%];s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-responsive_offset="on"
								data-visibility="['on','on','off','off']"

								style="z-index: 6; min-width: 219px; max-width: 219px; min-height: 161px; max-height: 161px; white-space: normal; font-family: Bodoni-Sans;">Magnetic Focal<br/>
								Bracelet<br/>
								$19.99<br/>
							</div>

						</li>

						<!-- SLIDE  -->
						<li data-index="rs-36" data-transition="fade" data-slotamount="7"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="include/rs-plugin/demos/assets/images/fashion_bg1-100x50.jpg"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="Intro" data-description="">
							<!-- MAIN IMAGE -->
							<img src="one-page/images/encharminghero.jpg"  alt=""  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->

							<!-- LAYER NR. 1 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','left','left']" data-hoffset="['200','65','35','0']"
								data-y="['middle','bottom','bottom','bottom']" data-voffset="['-27','300','380','00']"
								data-width="none"
								data-height="none"
								data-whitespace="nowrap"
								data-transform_idle="o:1;"
								data-transform_in="z:0;rX:0deg;rY:0;rZ:0;sX:1.5;sY:1.5;skX:0;skY:0;opacity:0;s:1500;e:Power3.easeOut;"
								data-transform_out="opacity:0;s:1000;s:1000;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-visibility="['on','on','on','off']"

								data-responsive_offset="on"
								style="z-index: 9;"> <img src="one-page/images/encharminglogo.png">
							</div>

							<!-- LAYER NR. 2 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','left','left']" data-hoffset="['205','65','35','90']"
								data-y="['middle','bottom','bottom','bottom']" data-voffset="['20','255','330','0']"
								data-fontsize="['20','20','20','20']"
								data-lineheight="['28','22','22','22']"
								data-width="140"
								data-height="none"
								data-whitespace="normal"
								data-transform_idle="o:1;"
								data-transform_in="x:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;s:1500;e:Power3.easeInOut;"
								data-transform_out="x:[-100%];s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"

								data-responsive_offset="on"
								data-visibility="['on','on','on','off']"

								style="z-index: 10; min-width: 219px; max-width: 219px; max-width: 161px; max-width: 161px; white-space: normal; font-family: Bodoni-Sans">Charm Necklace<br/>
								$9.99<br/>
							</div>
						</li>

						<!-- SLIDE  -->
						<li data-index="rs-37" data-transition="fade" data-slotamount="7"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="include/rs-plugin/demos/assets/images/fashion_bg1-100x50.jpg"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="Intro" data-description="">
							<!-- MAIN IMAGE -->
							<img src="one-page/images/identifyhero.jpg"  alt=""  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->

							<!-- LAYER NR. 3 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','right','right']" data-hoffset="['195','72','102','0']"
								data-y="['middle','bottom','top','top']" data-voffset="['-20','305','150','0']"
								data-width="none"
								data-height="none"
								data-whitespace="nowrap"
								data-transform_idle="o:1;"
								data-visibility="['on','on','on','off']"

								data-transform_in="z:0;rX:0deg;rY:0;rZ:0;sX:1.5;sY:1.5;skX:0;skY:0;opacity:0;s:1500;e:Power3.easeOut;"
								data-transform_out="opacity:0;s:1000;s:1000;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-responsive_offset="on"
								style="z-index: 12;"> <img src="one-page/images/identifylogo.png">
							</div>

							<!-- LAYER NR. 4 -->
							<div class="tp-caption tp-resizeme"
								data-x="['left','left','right','right']" data-hoffset="['205','82','52','82']"
								data-y="['middle','bottom','top','top']" data-voffset="['30','235','185','145']"
								data-fontsize="['20','17','17','17']"
								data-lineheight="['25','30','30','30']"
								data-visibility="['on','on','on','off']"
								data-width="149"
								data-height="71"
								data-whitespace="normal"
								data-transform_idle="o:1;"
								data-transform_in="x:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;s:1500;e:Power3.easeInOut;"
								data-transform_out="x:[-100%];s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
								data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
								data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
								data-start="500"
								data-splitin="none"
								data-splitout="none"
								data-basealign="slide"
								data-responsive_offset="on"

								style="z-index: 13; min-width: 219px; max-width: 219px; max-width: 161px; max-width: 161px; white-space: normal; font-family: Bodoni-Sans;">Lanyard &amp; Snap<br/>
								$15.99<br/>
							</div>
						</li>
					</ul>
					<div class="tp-static-layers">

						<!-- LAYER NR. 1 -->
						<div class="tp-caption tp-static-layer"
							data-x="['left','left','center','center']" data-hoffset="['40','40','0','0']"
							data-y="['top','top','top','top']" data-voffset="['5','0','0','']"
							data-width="none"
							data-height="none"
							data-whitespace="nowrap"
							data-transform_idle="o:1;"

							data-transform_out="y:[100%];s:1000;s:1000;"
							data-mask_in="x:0px;y:0px;"
							data-mask_out="x:inherit;y:inherit;"
							data-start="500"
							data-basealign="slide"
							data-responsive_offset="off"
							data-responsive="on"
							data-startslide="0"
							data-endslide="4"

							style="z-index: 5;"><img src="one-page/images/lj-bw-1.png" alt="" width="62" height="10" data-ww="['359px','325px','300px','240px']" data-hh="['115px','105px','95px','75px']" data-no-retina>
						</div>

						<!-- LAYER NR. 2 -->
						<div class="tp-caption tp-resizeme looks"
							data-x="['right','right','right','right']" data-hoffset="['108','80','0','0']"
							data-y="['middle','middle','middle','middle']" data-voffset="['-50','-45','150','150']"
							data-fontsize="['30','25','30','25']"
							data-lineheight="['30','30','30','30']"
							data-visibility="['on','on','off','off']"
							data-width="259"
							data-height="31"
							data-whitespace="normal"
							data-transform_idle="o:1;"

							data-transform_in="opacity:1;s:1000;s:3000;"
							data-transform_out="opacity:0;s:1000;s:1000;"
							data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
							data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
							data-start="500"
							data-splitin="none"
							data-splitout="none"
							data-basealign="slide"
							data-responsive_offset="on"

							style="z-index: 0; min-width: 319px; max-width: 319px; min-height: 191px; max-height: 191px; white-space: normal; font-weight: 500; font-family: Bodoni-Sans; color: #999;">THE LOOKS OF<br/>
						</div>

						<!-- LAYER NR. 3 -->
						<div class="tp-caption tp-resizeme looks"
							data-x="['right','right','right','right']" data-hoffset="['120','80','-270','0']"
							data-y="['middle','middle','middle','middle']" data-voffset="['23','23','40','40']"
							data-fontsize="['55','45','47','47']"
							data-lineheight="['45','35','30','30']"
							data-visibility="['on','on','off','off']"
							data-width="249"
							data-height="111"
							data-whitespace="normal"
							data-transform_idle="o:1;"
							data-transform_out="x:[-100%];s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
							data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
							data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
							data-start="500"
							data-splitin="none"
							data-splitout="none"
							data-basealign="slide"
							data-responsive_offset="on"

							style="z-index: 1; min-width: 219px; max-width: 319px; max-width: 161px; max-width: 161px; white-space: normal; font-family: Bodoni-Sans;">
							LAURA<br/>
							JANELLE<br/>
						</div>

						<!-- LAYER NR. 4 -->
						<div class="tp-caption tp-resizeme"
							data-x="['right','right','right','right']" data-hoffset="['5','5','5','5']"
							data-y="['bottom','bottom','bottom','bottom']" data-voffset="['75','75','75','75']"
							data-width="none"
							data-height="30"
							data-whitespace="normal"
							data-transform_idle="o:1;"
							data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
							data-mask_out="x:inherit;y:inherit;s:inherit;e:inherit;"
							data-start="500"
							data-splitin="none"
							data-splitout="none"
							data-basealign="slide"
							data-responsive_offset="on"

							style="z-index: 0; white-space: nowrap; font-size: 70px; line-height: 0px; color: rgba(0, 0, 0, .80); font-family:Bodoni-Sans, sans-serif;">
							<ul class="rotator one-page-menu">
								<li>ENCHANT</li>
								<li>EXCITE</li>
								<li>EMPOWER</li>
								<li>ENTICE</li>
							</ul>
						</div>


						<!-- LAYER NR. 5 target="_blank" -->
						<a class="tp-caption tp-static-layer"
				 			href="comingsoon.html"
							data-x="['left','left','left','left']" data-hoffset="['62','62','62','62']"
							data-y="['bottom','bottom','bottom','bottom']" data-voffset="['30','30','30','30']"
							data-width="none"
							data-height="none"
							data-whitespace="nowrap"
							data-visibility="['on','on','off','off']"
							data-transform_idle="o:1;"
							data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:300;e:Power3.easeInOut;"
							data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(59, 89, 152, 1.00);cursor:pointer;"

							data-transform_in="opacity:0;s:1500;e:Power3.easeInOut;"
							data-transform_out="auto:auto;s:300;"
							data-start="500"
							data-splitin="none"
							data-splitout="none"
							data-actions=''
							data-basealign="slide"
							data-responsive_offset="off"
							data-responsive="off"
							data-startslide="0"
							data-endslide="9"5

							style="z-index: 0; white-space: nowrap; font-size: 11px; line-height: 24px; font-weight: 400; color: rgba(255, 255, 255, 1.00);background-color:rgba(0, 0, 0, .80);padding:6px 10px 4px 11px;border-radius:30px 30px 30px 30px;"><i class="icon-twitter"></i>
						</a>


						<!-- LAYER NR. 6 target="_blank" -->
						<a class="tp-caption   tp-static-layer"
				 			href="comingsoon1.html" 	id="slide-18-layer-3"
							data-x="['left','left','left','left']" data-hoffset="['28','30','30','30']"
							data-y="['bottom','bottom','bottom','bottom']" data-voffset="['30','30','30','30']"
							data-width="none"
							data-height="none"
							data-whitespace="nowrap"
							data-visibility="['on','on','off','off']"
							data-transform_idle="o:1;"
							data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:300;e:Power3.easeInOut;"
							data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(59, 89, 152, 1.00);cursor:pointer;"

							data-transform_in="opacity:0;s:1500;e:Power3.easeInOut;"
							data-transform_out="auto:auto;s:300;"
							data-start="500"
							data-splitin="none"
							data-splitout="none"
							data-actions=''
							data-basealign="slide"
							data-responsive_offset="off"
							data-responsive="off"
							data-startslide="0"
							data-endslide="9"

							style="z-index: 0; white-space: nowrap; font-size: 17px; line-height: 22px; font-weight: 400; color: rgba(255, 255, 255, 1.00);background-color:rgba(0, 0, 0, .80);padding:6px 10px 4px 11px;border-radius:30px 30px 30px 30px;"><i class="icon-facebook"></i>
						</a>

						<!-- LAYER NR. 7 target="_blank" -->
 						<a class="tp-caption tp-static-layer"
 				 			href="comingsoon2.html" id="slide-18-layer-3"
 							data-x="['left','left','left','left']" data-hoffset="['101','101','101','101']"
 							data-y="['bottom','bottom','bottom','bottom']" data-voffset="['30','30','30','30']"
 							data-width="none"
 							data-height="none"
 							data-whitespace="nowrap"
 							data-visibility="['on','on','off','off']"
 							data-transform_idle="o:1;"
 							data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:300;e:Power3.easeInOut;"
 							data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(59, 89, 152, 1.00);cursor:pointer;"
 							data-transform_in="opacity:0;s:1500;e:Power3.easeInOut;"
 							data-transform_out="auto:auto;s:300;"
 							data-start="500"
 							data-splitin="none"
 							data-splitout="none"
 							data-actions=''
 							data-basealign="slide"
 							data-responsive_offset="off"
							data-responsive="off"
 							data-startslide="0"
 							data-endslide="9"

 							style="z-index: 7; white-space: nowrap; font-size: 14px; line-height: 23px; font-weight: 400; color: rgba(255, 255, 255, 1.00);background-color:rgba(0, 0, 0, .80);padding:6px 10px 4px 11px;border-radius:30px 30px 30px 30px;"><i class="icon-instagram"></i>
 						</a>

						<!-- LAYER NR. 8 target="_blank" -->
 						<a class="tp-caption   tp-static-layer"
 				 			href="comingsoon.html" id="slide-18-layer-3"
 							data-x="['left','left','left','left']" data-hoffset="['140','140','140','140']"
 							data-y="['bottom','bottom','bottom','bottom']" data-voffset="['30','30','30','30']"
 							data-width="none"
 							data-height="none"
 							data-whitespace="nowrap"
 							data-visibility="['on','on','off','off']"
 							data-transform_idle="o:1;"
 							data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:300;e:Power3.easeInOut;"
 							data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(59, 89, 152, 1.00);cursor:pointer;"
 							data-transform_in="opacity:0;s:1500;e:Power3.easeInOut;"
 							data-transform_out="auto:auto;s:300;"
 							data-start="500"
 							data-splitin="none"
 							data-splitout="none"
 							data-actions=''
 							data-basealign="slide"
 							data-responsive_offset="off"
							data-responsive="off"
 							data-startslide="0"
 							data-endslide="9"

 							style="z-index: 7; white-space: nowrap; font-size: 17px; line-height: 22px; font-weight: 400; color: rgba(255, 255, 255, 1.00);background-color:rgba(0, 0, 0, .80);padding:6px 10px 4px 11px;border-radius:30px 30px 30px 30px;"><i class="icon-pinterest"></i>
 						</a>

					</div>

					<div class="tp-bannertimer tp-bottom" style="visibility: hidden !important;"></div>
				</div>
			</div><!-- END REVOLUTION SLIDER -->

		</section>

	<!-- External JavaScripts
	============================================= -->
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/plugins.js"></script>

	<!-- Footer Scripts
	============================================= -->
	<script type="text/javascript" src="js/functions.js"></script>

	<!-- SLIDER REVOLUTION 5.x SCRIPTS  -->
	<script type="text/javascript" src="include/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
	<script type="text/javascript" src="include/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>

	<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.video.min.js"></script>
	<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.slideanims.min.js"></script>
	<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.actions.min.js"></script>
	<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.layeranimation.min.js"></script>
	<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.navigation.min.js"></script>
	<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.parallax.min.js"></script>

	<script type="text/javascript">
		var tpj = jQuery;

		var revapi287;
		tpj(document).ready(function() {
			if (tpj("#rev_slider_287_1").revolution == undefined) {
				revslider_showDoubleJqueryError("#rev_slider_287_1");
			} else {
				revapi287 = tpj("#rev_slider_287_1").show().revolution({
					sliderType: "standard",
					jsFileLocation: "include/rs-plugin/js/",
					sliderLayout: "fullscreen",
					dottedOverlay: "none",
					delay: 4000,
					navigation: {
						keyboardNavigation: "off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation: "off",
						onHoverStop: "off",
						touch: {
							touchenabled: "on",
							swipe_threshold: 75,
							swipe_min_touches: 50,
							swipe_direction: "horizontal",
							drag_block_vertical: false
						},
						arrows: {
							style: "uranus",
							enable: true,
							hide_onmobile: true,
							hide_under: 778,
							hide_onleave: true,
							hide_delay: 200,
							hide_delay_mobile: 1200,
							tmp: '',
							left: {
								h_align: "left",
								v_align: "center",
								h_offset: 20,
								v_offset: 0
							},
							right: {
								h_align: "right",
								v_align: "center",
								h_offset: 20,
								v_offset: 0
							}
						}
					},
					responsiveLevels: [1240, 1224, 778, 480],
					gridwidth: [1200, 1024, 778, 480],
					gridheight: [645, 576, 480, 480],
					lazyType: "none",
					parallax: {
						type: "scroll",
						origo: "enterpoint",
						speed: 400,
						levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
						type: "scroll",
					},
					shadow: 0,
					spinner: "off",
					stopLoop: "on",
					stopAfterLoops: -1,
					stopAtSlide: -1,
					shuffle: "on",
					autoHeight: "off",
					fullScreenAutoWidth: "off",
					fullScreenAlignForce: "off",
					fullScreenOffsetContainer: "",
					disableProgressBar: "off",
					hideThumbsOnMobile: "off",
					hideSliderAtLimit: 0,
					hideCaptionAtLimit: 0,
					hideAllCaptionAtLilmit: 0,
					debugMode: false,
					fallbacks: {
						simplifyAll: "off",
						nextSlideOnWindowFocus: "off",
						disableFocusListener: false,
					}
				});
			}
		}); /*ready*/

	</script>

</body>
</html>
