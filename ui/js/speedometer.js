$(document).ready(function () {
  $.fn.speedometer = function () {
    this.defaultProperty = {
      maxVal: 280 /**Max value of the meter*/,
      divFact: 10 /**Division value of the meter*/,
      dangerLevel: 120 /**more than this leval, color will be red*/,
      initDeg: -45 /**reading begins angle*/,
      maxDeg: 270 /**total angle of the meter reading*/,
      edgeRadius: 200 /**radius of the meter circle*/,
      speedNobeH: 3 /**speed nobe height*/,
      speedoNobeW: 98 /**speed nobe width*/,
      speedoNobeL: 50 /**speed nobe left position*/,
      indicatorRadius: 170 /**radius of indicators position*/,
      indicatorNumbRadius: 130 /**radius of numbers position*/,
      speedPositionTxtWH: 100 /**speedo-meter current value cont*/,
      nobW: 20 /**indicator nob width*/,
      nobH: 4 /**indicator nob height*/,
      numbW: 30 /**indicator number width*/,
      numbH: 30 /**indicator number height*/,
      midNobW: 10 /**indicator mid nob width*/,
      midNobH: 2 /**indicator mid nob height*/,
      noOfSmallDiv: 2 /**no of small div between main div*/,
      eventListenerType: "keyup" /**type of event listener*/,
      multiplier: 1 /**Center value multiplier e.g. 1 x 1000 RPM*/,
    };
    var noOfDev = this.defaultProperty.maxVal / this.defaultProperty.divFact,
      divDeg = this.defaultProperty.maxDeg / noOfDev,
      speedoWH = this.defaultProperty.edgeRadius * 2,
      speedNobeTop = this.defaultProperty.edgeRadius - this.defaultProperty.speedNobeH / 2,
      speedNobeAngle = this.defaultProperty.initDeg,
      speedPositionTxtTL = this.defaultProperty.edgeRadius - this.defaultProperty.speedPositionTxtWH / 2,
      tempDiv = "",
      induCatorLinesPosLeft,
      induCatorLinesPosTop,
      induCatorNumbPosLeft,
      induCatorNumbPosTop;

    this.setCssProperty = function () {
      var tempStyleVar = ["<style>", "#" + this.parentElemId + " .envelope{", "width:" + speedoWH + "px;", "height :" + speedoWH + "px;", "}", "#" + this.parentElemId + " .speedNobe{", "height:" + this.defaultProperty.speedNobeH + "px;", "top:" + speedNobeTop + "px;", "transform:rotate(" + speedNobeAngle + "deg);", "-webkit-transform :rotate(" + speedNobeAngle + "deg);", "-moz-transform:rotate(" + speedNobeAngle + "deg);", "-o-transform:rotate(" + speedNobeAngle + "deg);", "}", "#" + this.parentElemId + " .speedPosition{", "width:" + this.defaultProperty.speedPositionTxtWH + "px;", "height :" + this.defaultProperty.speedPositionTxtWH + "px;", "top:" + speedPositionTxtTL + "px;", "left :" + speedPositionTxtTL + "px;", "}", "#" + this.parentElemId + " .speedNobe div{", "width:" + this.defaultProperty.speedoNobeW + "px;", "left :" + this.defaultProperty.speedoNobeL + "px;", "}", "#" + this.parentElemId + " .nob{", "width:" + this.defaultProperty.nobW + "px;", "height :" + this.defaultProperty.nobH + "px;", "}", "#" + this.parentElemId + " .numb{", "width:" + this.defaultProperty.numbW + "px;", "height :" + this.defaultProperty.numbH + "px;", "}", "#" + this.parentElemId + " .midNob{", "width:" + this.defaultProperty.midNobW + "px;", "height :" + this.defaultProperty.midNobH + "px;", "}", "</style>"].join("");
      this.parentElem.append(tempStyleVar);
    };
    this.creatHtmlsElecments = function () {
      this.parentElemId = "speedometerWraper-" + $(this).attr("id");
      $(this).wrap('<div id="' + this.parentElemId + '">');
      this.parentElem = $(this).parent();
      this.setCssProperty();
      this.createIndicators();
    };
    this.createIndicators = function () {
      for (var i = 0; i <= noOfDev; i++) {
        var curDig = this.defaultProperty.initDeg + i * divDeg;
        var curIndVal = i * this.defaultProperty.divFact;
        var dangCls = "";
        if (curIndVal >= this.defaultProperty.dangerLevel) {
          dangCls = "danger";
        }
        var induCatorLinesPosY = this.defaultProperty.indicatorRadius * Math.cos(0.01746 * curDig);
        var induCatorLinesPosX = this.defaultProperty.indicatorRadius * Math.sin(0.01746 * curDig);

        var induCatorNumbPosY = this.defaultProperty.indicatorNumbRadius * Math.cos(0.01746 * curDig);
        var induCatorNumbPosX = this.defaultProperty.indicatorNumbRadius * Math.sin(0.01746 * curDig);

        if (i % this.defaultProperty.noOfSmallDiv == 0) {
          induCatorLinesPosLeft = this.defaultProperty.edgeRadius - induCatorLinesPosX - 2;
          induCatorLinesPosTop = this.defaultProperty.edgeRadius - induCatorLinesPosY - 10;
          var tempDegInd = ["transform:rotate(" + curDig + "deg)", "-webkit-transform :rotate(" + curDig + "deg)", "-o-transform:rotate(" + curDig + "deg)", "-moz-transform:rotate(" + curDig + "deg)"].join(";");
          tempDiv += '<div class="nob ' + dangCls + '" style="left:' + induCatorLinesPosTop + "px;top:" + induCatorLinesPosLeft + "px;" + tempDegInd + '"></div>';
          induCatorNumbPosLeft = this.defaultProperty.edgeRadius - induCatorNumbPosX - this.defaultProperty.numbW / 2;
          induCatorNumbPosTop = this.defaultProperty.edgeRadius - induCatorNumbPosY - this.defaultProperty.numbH / 2;
          tempDiv += '<div class="numb ' + dangCls + '" style="left:' + induCatorNumbPosTop + "px;top:" + induCatorNumbPosLeft + 'px;">' + curIndVal + "</div>";
        } else {
          induCatorLinesPosLeft = this.defaultProperty.edgeRadius - induCatorLinesPosX - this.defaultProperty.midNobH / 2;
          induCatorLinesPosTop = this.defaultProperty.edgeRadius - induCatorLinesPosY - this.defaultProperty.midNobW / 2;
          var tempDegInd = ["transform:rotate(" + curDig + "deg)", "-webkit-transform :rotate(" + curDig + "deg)", "-o-transform:rotate(" + curDig + "deg)", "-moz-transform:rotate(" + curDig + "deg)"].join(";");
          tempDiv += '<div class="nob ' + dangCls + ' midNob" style="left:' + induCatorLinesPosTop + "px;top:" + induCatorLinesPosLeft + "px;" + tempDegInd + '"></div>';
          tempDiv += '<div class="numb"></div>';
        }
      }
      this.parentElem.append('<div class="envelope">');
      var speedNobe = ['<div class="speedNobe"><div></div></div><div class="speedPosition"></div>'].join();
      this.parentElem.find(".envelope").append(speedNobe + tempDiv);
    };

    this.creatHtmlsElecments();
    $(this).bind(this.defaultProperty.eventListenerType, this.changePosition);
    return this;
  };
  const ufspeedometer = $(".speedometer");
  const fuel = document.createElement("div");
  const icons = document.createElement("div");
  const iconsTOP = document.createElement("div");
  const iconsBOTTOM = document.createElement("div");
  const fuelvalue = document.createElement("div");
  const fuelalert = document.createElement("div");
  const fuelicon = document.createElement("img");
  const svgsTOP = [(engine = '<svg class="engine-control" viewBox="0 0 231 173"> <path d="M230.338 77.795L219.161 52.483C217.961 49.765 215.271 48.012 212.3 48.012H193.776C189.634 48.012 186.276 51.369 186.276 55.512V67.335H180.514V57.607C180.514 53.464 177.156 50.107 173.014 50.107H153.046V29.642C153.046 25.499 149.688 22.142 145.546 22.142H108.651V15H145.546C149.688 15 153.046 11.642 153.046 7.5C153.046 3.357 149.688 0 145.546 0H56.758C52.616 0 49.258 3.357 49.258 7.5C49.258 11.642 52.616 15 56.758 15H93.653V22.142H56.758C52.616 22.142 49.258 25.499 49.258 29.642V35.876H32.804C28.662 35.876 25.304 39.233 25.304 43.376V83.623H15V43.376C15 39.233 11.642 35.876 7.5 35.876C3.358 35.876 0 39.234 0 43.376V138.872C0 143.015 3.358 146.372 7.5 146.372C11.642 146.372 15 143.015 15 138.872V98.623H25.304V138.872C25.304 143.015 28.662 146.372 32.804 146.372H61.943L91.551 171.134C92.901 172.263 94.603 172.881 96.363 172.881H173.015C177.157 172.881 180.515 169.524 180.515 165.381V144.936H186.277V156.759C186.277 160.902 189.635 164.259 193.777 164.259H212.301C215.272 164.259 217.962 162.506 219.162 159.788L230.339 134.476C230.76 133.522 230.978 132.49 230.978 131.447V80.824C230.978 79.782 230.76 78.749 230.338 77.795ZM215.978 129.866L207.415 149.26H201.277V137.437C201.277 133.294 197.919 129.937 193.777 129.937H173.015C168.873 129.937 165.515 133.294 165.515 137.437V157.882H99.085L69.477 133.12C68.127 131.991 66.425 131.373 64.665 131.373H40.304V50.876H56.758C60.9 50.876 64.258 47.519 64.258 43.376V37.142H138.047V57.609C138.047 61.752 141.405 65.109 145.547 65.109H165.515V74.837C165.515 78.98 168.873 82.337 173.015 82.337H193.777C197.919 82.337 201.277 78.98 201.277 74.837V63.013H207.415L215.978 82.407V129.866Z" /></svg>'), (lowbeam = '<svg class="lowbeam" viewBox="0 0 212 161"><path d="M60.7027 117.808L4.14774 146.086C0.442743 147.938 -1.05926 152.443 0.793744 156.148C2.10774 158.776 4.75574 160.295 7.50774 160.295C8.63474 160.295 9.77874 160.04 10.8557 159.502L67.4117 131.224C71.1167 129.372 72.6187 124.867 70.7657 121.162C68.9127 117.457 64.4077 115.954 60.7027 117.808Z" /><path d="M60.7027 63.099L4.14774 91.376C0.442743 93.228 -1.05926 97.733 0.793744 101.438C2.10774 104.066 4.75574 105.585 7.50774 105.585C8.63474 105.585 9.77874 105.33 10.8557 104.792L67.4117 76.515C71.1167 74.663 72.6187 70.158 70.7657 66.453C68.9127 62.747 64.4077 61.246 60.7027 63.099Z" /><path d="M60.7027 35.745L4.14774 64.023C0.442743 65.875 -1.05926 70.38 0.793744 74.085C2.10774 76.713 4.75574 78.232 7.50774 78.232C8.63474 78.232 9.77874 77.977 10.8557 77.439L67.4117 49.161C71.1167 47.309 72.6187 42.804 70.7657 39.099C68.9127 35.393 64.4077 33.891 60.7027 35.745Z" /><path d="M60.7027 8.39099L4.14774 36.668C0.442743 38.52 -1.05926 43.025 0.793744 46.73C2.10774 49.358 4.75574 50.877 7.50774 50.877C8.63474 50.877 9.77874 50.622 10.8557 50.083L67.4117 21.806C71.1167 19.954 72.6187 15.448 70.7657 11.744C68.9127 8.03899 64.4077 6.53599 60.7027 8.39099Z" /><path d="M182.327 19.272C165.845 7.204 145.322 0 127.427 0C109.416 0 96.1048 7.262 87.8638 21.583C81.4068 32.804 78.2668 48.103 78.2668 68.354C78.2668 88.604 81.4058 103.903 87.8638 115.125C96.1058 129.446 109.417 136.708 127.427 136.708C145.322 136.708 165.845 129.503 182.327 117.435C201.075 103.708 211.399 86.277 211.399 68.354C211.399 50.429 201.074 32.998 182.327 19.272ZM173.465 105.331C159.67 115.432 142.028 121.707 127.426 121.707C111.522 121.707 93.2658 115.643 93.2658 68.353C93.2658 21.064 111.522 14.999 127.426 14.999C142.029 14.999 159.67 21.274 173.465 31.374C188.04 42.045 196.399 55.523 196.399 68.353C196.399 81.182 188.04 94.66 173.465 105.331Z" /><path d="M60.7027 90.453L4.14774 118.732C0.442743 120.584 -1.05926 125.089 0.793744 128.794C2.10774 131.422 4.75574 132.941 7.50774 132.941C8.63474 132.941 9.77874 132.686 10.8557 132.148L67.4117 103.87C71.1167 102.018 72.6187 97.513 70.7657 93.808C68.9127 90.102 64.4077 88.6 60.7027 90.453Z" /></svg>'), (highbeam = '<svg class="highbeam" viewBox="0 0 211.398 211.398"><path d="M182.325,56.618c-16.482-12.067-37.006-19.272-54.901-19.272c-18.011,0-31.322,7.262-39.563,21.583 c-6.457,11.221-9.597,26.52-9.597,46.771c0,20.25,3.139,35.549,9.597,46.771c8.242,14.321,21.553,21.583,39.563,21.583 c17.895,0,38.419-7.205,54.901-19.272c18.748-13.727,29.073-31.158,29.073-49.081C211.398,87.775,201.073,70.345,182.325,56.618z M173.464,142.677c-13.795,10.101-31.437,16.375-46.04,16.375c-15.904,0-34.16-6.064-34.16-53.353s18.256-53.354,34.16-53.354 c14.604,0,32.245,6.274,46.04,16.375c14.575,10.671,22.935,24.149,22.935,36.979C196.398,118.528,188.039,132.006,173.464,142.677z " /><path d="M64.055,44.945L7.5,44.944c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5l56.555,0.001c4.142,0,7.5-3.358,7.5-7.5 S68.197,44.945,64.055,44.945z" /><path d="M64.055,72.299H7.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h56.555c4.142,0,7.5-3.358,7.5-7.5 C71.555,75.657,68.197,72.299,64.055,72.299z" /><path d="M64.055,99.653H7.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h56.555c4.142,0,7.5-3.358,7.5-7.5 C71.555,103.011,68.197,99.653,64.055,99.653z" /><path d="M64.055,127.008H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h56.555c4.142,0,7.5-3.358,7.5-7.5 S68.197,127.008,64.055,127.008z" /> <path d="M64.055,154.362H7.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h56.555c4.142,0,7.5-3.358,7.5-7.5 C71.555,157.72,68.197,154.362,64.055,154.362z" /></svg>'), (handbrake = '<svg class="handbrake-control" viewBox="0 0 234.409 234.409"> <path d="M117.204,30.677c-47.711,0-86.527,38.816-86.527,86.528c0,47.711,38.816,86.526,86.527,86.526s86.527-38.815,86.527-86.526 C203.732,69.494,164.915,30.677,117.204,30.677z M117.204,188.732c-39.44,0-71.527-32.086-71.527-71.526 c0-39.441,32.087-71.528,71.527-71.528s71.527,32.087,71.527,71.528C188.732,156.645,156.645,188.732,117.204,188.732z" /> <path d="M44.896,44.897c2.929-2.929,2.929-7.678,0-10.607c-2.93-2.929-7.678-2.929-10.607,0 c-45.718,45.719-45.718,120.111,0,165.831c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.197 c2.93-2.929,2.93-7.677,0.001-10.606C5.026,149.643,5.026,84.768,44.896,44.897z" /> <path d="M200.119,34.29c-2.93-2.929-7.678-2.929-10.607,0c-2.929,2.929-2.929,7.678,0,10.607 c39.872,39.871,39.872,104.746,0,144.618c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197 c1.919,0,3.839-0.732,5.304-2.197C245.839,154.4,245.839,80.009,200.119,34.29z" /> <path d="M117.204,140.207c4.143,0,7.5-3.358,7.5-7.5v-63.88c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v63.88 	C109.704,136.849,113.062,140.207,117.204,140.207z" /> <circle cx="117.204" cy="156.254" r="9.329" /></svg>')];
  const svgsBOTTOM = [(leftsignal = '<svg class="left-signal" viewBox="0 0 137 148"><path d="M129.352 33.6558H81.408L81.406 7.5008C81.406 4.4678 79.579 1.7328 76.776 0.571801C73.972 -0.589199 70.749 0.0528004 68.602 2.1978L2.196 68.6038C0.79 70.0098 0 71.9178 0 73.9068C0 75.8958 0.79 77.8038 2.197 79.2098L68.605 145.616C70.04 147.051 71.958 147.813 73.91 147.813C74.876 147.813 75.85 147.626 76.778 147.242C79.581 146.081 81.408 143.346 81.408 140.313V114.158H129.351C133.494 114.158 136.851 110.8 136.851 106.658V41.1548C136.852 37.0138 133.494 33.6558 129.352 33.6558ZM121.852 99.1588H73.908C69.765 99.1588 66.408 102.517 66.408 106.659V122.207L18.106 73.9068L66.407 25.6058L66.408 41.1558C66.408 45.2978 69.766 48.6558 73.908 48.6558H121.851V99.1588H121.852Z" /></svg>'), (hazardlight = '<svg class="hazard-light" viewBox="0 0 212.715 212.715"><path d="M211.436,187.771L112.843,17.002c-1.34-2.32-3.815-3.75-6.495-3.75c-2.68,0-5.155,1.43-6.495,3.75L1.005,188.213 c-1.34,2.32-1.34,5.18,0,7.5c1.34,2.32,3.816,3.75,6.495,3.75h197.695c0.007,0,0.015,0,0.02,0c4.143,0,7.5-3.357,7.5-7.5 C212.715,190.41,212.243,188.968,211.436,187.771z M20.49,184.463l85.857-148.711l85.857,148.711H20.49z" /><path d="M99.853,67.055L44.251,163.36c-1.34,2.32-1.34,5.18,0,7.5c1.34,2.32,3.815,3.75,6.495,3.75h111.203 c0.008,0.001,0.015,0.001,0.02,0c4.143,0,7.5-3.357,7.5-7.5c0-1.553-0.472-2.995-1.279-4.192l-55.347-95.863 c-1.34-2.32-3.815-3.75-6.495-3.75C103.668,63.305,101.192,64.734,99.853,67.055z M148.959,159.61H63.736l42.611-73.806 L148.959,159.61z" />  </svg>'), (rightsignal = '<svg class="right-signal" viewBox="0 0 137 148"> <path d="M134.801 68.6038L68.393 2.1978C66.248 0.051801 63.022 -0.590198 60.22 0.571802C57.417 1.7328 55.59 4.4678 55.59 7.5008V33.6558H7.647C3.504 33.6558 0.147003 37.0138 0.147003 41.1558V106.659C0.147003 110.801 3.504 114.159 7.647 114.159H55.59L55.592 140.314C55.592 143.347 57.419 146.082 60.222 147.243C61.15 147.627 62.124 147.814 63.09 147.814C65.042 147.814 66.96 147.052 68.396 145.617L134.802 79.2108C136.208 77.8048 136.998 75.8968 136.998 73.9078C136.998 71.9188 136.208 70.0098 134.801 68.6038ZM70.591 122.208L70.59 106.658C70.59 102.516 67.232 99.1578 63.09 99.1578H15.147V48.6548H63.09C67.233 48.6548 70.59 45.2968 70.59 41.1548V25.6078L118.892 73.9078L70.591 122.208Z" /> </svg>')];
  fuel.className = "fuel";
  icons.className = "icons";
  iconsTOP.className = "iconsTOP";
  iconsBOTTOM.className = "iconsBOTTOM";
  fuelvalue.className = "fuelvalue";
  fuelalert.className = "fuelalert";
  fuelicon.className = "fuelicon";

  ufspeedometer.append(fuel);
  ufspeedometer.append(icons);

  icons.append(iconsTOP);
  icons.append(iconsBOTTOM);

  for (let i = 0; i < svgsTOP.length; i++) {
    iconsTOP.innerHTML += svgsTOP[i];
  }
  for (let i = 0; i < svgsBOTTOM.length; i++) {
    iconsBOTTOM.innerHTML += svgsBOTTOM[i];
  }

  fuel.append(fuelicon);
  fuel.append(fuelvalue);
  fuel.append(fuelalert);

  window.addEventListener("message", function (event) {
    $(".fuelicon").attr("src", "img/fuel.svg");
    let data = event.data;
    let maxDeg = 270;
    let maxVal = 280;
    let divFact = 10;
    let initDeg = -45;
    if (data.lights == "normal") {
      $(".lowbeam").css("fill", "lime");
      $(".highbeam").css("fill", "#fff");

      $(".highbeam").hide();
      $(".lowbeam").show();
    } else if (data.lights == "high") {
      $(".lowbeam").css("fill", "lime");
      $(".highbeam").css("fill", "blue");

      $(".lowbeam").hide();
      $(".highbeam").show();
    } else {
      $(".highbeam").hide();
      $(".lowbeam").show();

      $(".lowbeam").css("fill", "#fff");
      $(".highbeam").css("fill", "#fff");
    }

    if (data.signalLights === 0) {
      $(".left-signal").css("fill", "#fff");
      $(".right-signal").css("fill", "#fff");
      $(".hazard-light").css("fill", "#fff");
      $(".left-signal").removeClass("blink");
      $(".right-signal").removeClass("blink");
      $(".hazard-light").removeClass("blink");
    } else if (data.signalLights === 1) {
      $(".left-signal").css("fill", "lime");
      $(".left-signal").addClass("blink");

      $(".right-signal").css("fill", "#fff");
      $(".hazard-light").css("fill", "#fff");
      $(".right-signal").removeClass("blink");
      $(".hazard-light").removeClass("blink");
    } else if (data.signalLights === 2) {
      $(".right-signal").css("fill", "lime");
      $(".right-signal").addClass("blink");

      $(".left-signal").css("fill", "#fff");
      $(".hazard-light").css("fill", "#fff");
      $(".left-signal").removeClass("blink");
      $(".hazard-light").removeClass("blink");
    } else if (data.signalLights === 3) {
      $(".left-signal").css("fill", "lime");
      $(".right-signal").css("fill", "lime");
      $(".hazard-light").css("fill", "rgba(233, 182, 41, 1)");
      $(".left-signal").addClass("blink");
      $(".right-signal").addClass("blink");
      $(".hazard-light").addClass("blink");
    }

    if (data.engineControl) {
      $(".engine-control").css("fill", "lime");
    } else {
      $(".engine-control").css("fill", "rgba(184, 20, 20, 1)");
    }

    if (data.handbrake) {
      $(".handbrake-control").css("fill", "rgba(184, 20, 20, 1)");
    } else {
      $(".handbrake-control").css("fill", "#fff");
    }

    noOfDev = maxVal / divFact;
    speedInDeg = (maxDeg / maxVal) * data.speed + initDeg;

    if (data.display && !data.pauseMenuOn) {
      $("#container").show();
      $("#myValues").val(Math.round(data.speed));
      $(".speedPosition").text(data.gear);
      $(".speedNobe").css("transform", "rotate(" + speedInDeg + "deg)");
      $(".fuelvalue").css("width", Math.round(data.fuel) + "%");

      if (data.speed == 0 && data.gear >= 0) {
        $(".speedPosition").text("N");
      }

      if (data.speed > 0 && data.gear == 0) {
        $(".speedPosition").text("R");
      }

      if (data.fuel <= data.fuelAlert) {
        $(".fuelalert").css("display", "block");
        $(".fuelalert").addClass("blink");
        $(".fuelvalue").css("box-shadow", "none");
      } else {
        $(".fuelalert").css("display", "none");
        $(".fuelalert").removeClass("blink");
        $(".fuelvalue").css("box-shadow", "0 0 3px rgba(233, 182, 41, 1)");
      }

      $(".envelope .nob,.envelope .numb").removeClass("bright");
      for (var i = 0; i <= noOfDev; i++) {
        if (Math.round(data.speed) >= i * divFact) {
          $(".envelope .nob").eq(i).addClass("bright");
          $(".envelope .numb").eq(i).addClass("bright");
        } else {
          break;
        }
      }
    } else {
      $("#container").hide();
    }
  });
});
