import "../style/scss/main.scss";

const NUM_STARS = 200;
const STAR_DATA = generateStarData(NUM_STARS);

function createStar({x, y}, index, debug) {
    const starContainer = document.createElementNS("http://www.w3.org/2000/svg", 'g');

    const starTranslate = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    starTranslate.setAttribute('transform', `translate(${x} ${y})`);

    // const radius = (Math.random() + Math.random() + Math.random()) / 3 * 2 + 0.5;
    const radius = randn_bm(0.5, 4, 2.7);
    const delay = index * 100 + 500 * Math.random();
    const duration = 3000 + Math.random() * 4000;
    const brightness = 0.9 + Math.random() * 0.1;


    const star = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    star.setAttribute('r', radius);
    star.classList.add('star');

    star.style.setProperty('--star-animation-delay', `${delay}ms`);
    star.style.setProperty('--star-animation-duration', `${duration}ms`);
    star.style.setProperty('--star-animation-glow-duration', `10000ms`);
    star.style.setProperty('--star-brightness', `${brightness}`);

    starTranslate.appendChild(star);
    starContainer.appendChild(starTranslate);

    return starContainer;
}



function createNightSky({container, debug, starReference}) {
    STAR_DATA.forEach((data, index) => {
        const star = createStar(data, index, debug);
        container.appendChild(star);
    })
}

const starGroup = document.getElementById('starGroup');

createNightSky({container: starGroup, data: STAR_DATA});


// this is here to make the actual code more accessible- will be avaialble at the top through hoisting
function generateStarData(numStars) {
    let skyWidth = window.innerWidth || document.clientWidth || document.body.clientWidth;
    let skyHeight = window.innerHeight|| document.clientHeight|| document.body.clientHeight;
    let stars = [];
    for (let i = 0; i < numStars; i ++){
        stars.push({"x": Math.random()*skyWidth, "y":Math.random()*skyHeight});
    }

    return stars
}

function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}