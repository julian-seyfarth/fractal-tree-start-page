var axiom = "F";
var sentence = axiom;
var len = 100;

var windVonLinks = false;
var windVonRechts = false;

var rules = [];
rules[0] = {
  a: "F",
  b: "FF[+F-F-F][-F+F+F]",
};

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
        var randomRuleOutcome = rules[j].b
          .replaceAll("+", codeRight)
          .replaceAll("-", codeLeft);
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
  background(21, 34, 56);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
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
