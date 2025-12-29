var axiom = "A";
var sentence = axiom;
var len = 100;

var windVonLinks = false;
var windVonRechts = false;

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var rules = [];
for (var i = 0; i < 26; i++) {
  var l = alphabet.charAt(i);
  var r1 = alphabet.charAt(
    Math.floor(convertRange(Math.random(), [0, 1], [0, 15.9]))
  );
  var r2 = alphabet.charAt(
    Math.floor(convertRange(Math.random(), [0, 1], [0, 15.9]))
  );
  var r3 = alphabet.charAt(
    Math.floor(convertRange(Math.random(), [0, 1], [0, 15.9]))
  );
  var r4 = alphabet.charAt(
    Math.floor(convertRange(Math.random(), [0, 1], [0, 15.9]))
  );
  var r5 = alphabet.charAt(
    Math.floor(convertRange(Math.random(), [0, 1], [0, 15.9]))
  );
  var r6 = alphabet.charAt(
    Math.floor(convertRange(Math.random(), [0, 1], [0, 15.9]))
  );
  rules.push({
    a: l,
    b: `${l}${l}[+${r1}-${r2}-${r3}][-${r4}+${r5}+${r6}]`, // FF[+F-F-F][-F+F+F]
  });
}

/* var colorsRaw = [
  // braun, grün, gelb
  "19381f",
  "379634",
  "8c903c",
  "806443",
  "564939",
  "1b0d15",
  "6a4611",
  "2d080a",
]; */

/* var colorsRaw = [ // hellbraun, grün, weiß
  "582f0e",
  "7f4f24",
  "936639",
  "a68a64",
  "b6ad90",
  "c2c5aa",
  "a4ac86",
  "656d4a",
  "414833",
  "333d29",
]; */

var colorsRaw = ["5d452f", "9CA846", "768948", "607744", "34623f", "1e2f23"];

var colors = [];
for (var i = 0; i < colorsRaw.length; i++) {
  colors[i] = "#" + colorsRaw[i];
}

/* var angles = [20, 30, 40, 50, -20, -30, -40, -50];
 */
var angles = [
  -50, -45, -40, -35, -30, -25, -20, -15, 15, 20, 25, 30, 35, 40, 45, 50,
];

function generate() {
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        var rangeLeft;
        var rangeRight;
        if (windVonLinks && windVonRechts) {
          rangeLeft = [4, 7.9];
          rangeRight = [8, 11.9];
        } else if (windVonLinks) {
          rangeLeft = [4, 7.9];
          rangeRight = [12, 15.9];
        } else if (windVonRechts) {
          rangeLeft = [0, 3.9];
          rangeRight = [8, 11.9];
        } else {
          rangeLeft = [0, 7.9];
          rangeRight = [8, 15.9];
        }
        var codeLeft = Math.floor(
          convertRange(Math.random(), [0, 1], rangeLeft)
        );
        var codeRight = Math.floor(
          convertRange(Math.random(), [0, 1], rangeRight)
        );
        /*         var codeLine = Math.floor(
          convertRange(Math.random(), [0, 1], [0, 15.9])
        ); */
        var randomRuleOutcome = rules[j].b
          .replaceAll("+", codeRight)
          .replaceAll("-", codeLeft);
        //.replaceAll("F", alphabet.charAt(codeLine));
        nextSentence += randomRuleOutcome;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  //createP(sentence).parent("text-container");
  turtle();
}

function turtle() {
  background(255, 255, 255);
  resetMatrix();
  translate(width / 2, height);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current >= "A" && current <= "Z") {
      var index = (current.charCodeAt(0) - "A".charCodeAt(0)) % colors.length;
      var color = colors[index];
      stroke(color);
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == "*") {
      rotate(radians(20));
    } else if (current == "~") {
      rotate(radians(-20));
    } else {
      var nextChar = sentence.charAt(i + 1);
      if (nextChar >= "0" && nextChar <= "9") {
        var angle = angles[parseInt(current + nextChar)];
        i++;
      } else {
        var angle = angles[parseInt(current)];
      }
      rotate(radians(angle));
    }
  }
}

function setup() {
  var c = createCanvas(400, 400);
  c.parent("canvas-container");
  background(51);
  //createP(axiom).parent("text-container");
  turtle();
  /*   var button = createButton("generate");
  button.parent("canvas-container");
  button.mousePressed(generate); */
}

function changeWindVonLinks() {
  if (windVonLinks) {
    windVonLinks = false;
    var element = document.getElementById("button-wind-von-links");
    element.classList.replace("button-wind", "button-kein-wind");
    element.innerHTML = "Kein Wind von links";
  } else {
    windVonLinks = true;
    var element = document.getElementById("button-wind-von-links");
    element.classList.replace("button-kein-wind", "button-wind");
    element.innerHTML = "Wind von links";
  }
}

function changeWindVonRechts() {
  if (windVonRechts) {
    windVonRechts = false;
    var element = document.getElementById("button-wind-von-rechts");
    element.classList.replace("button-wind", "button-kein-wind");
    element.innerHTML = "Kein Wind von rechts";
  } else {
    windVonRechts = true;
    var element = document.getElementById("button-wind-von-rechts");
    element.classList.replace("button-kein-wind", "button-wind");
    element.innerHTML = "Wind von rechts";
  }
}

function search(ele) {
  if (event.key === "Enter") {
    var searchUrl = `https://www.startpage.com/sp/search?query=${ele.value}`;
    window.open(searchUrl, "_self");
  }
}

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

function getRandomAngle() {
  var degree = convertRange(Math.random(), [0, 1], [15, 60]);
  return radians(degree);
}
