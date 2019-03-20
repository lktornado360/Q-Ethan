import { loadBackgrounds, loadSprites, loadStage } from './libs/loaders';
import Timer from './Timer';
import Compositor from './Compositor';
import config from './config';

async function main(canvas) {
  const context = canvas.getContext('2d');

  // Maps
  const tilesMap = await loadSprites('tiles.json');
  const charactersMap = await loadSprites('characters.json');
  const bgMap = await loadBackgrounds('backgrounds.json', tilesMap);

  // Stage
  const stage1 = await loadStage(1, tilesMap, charactersMap);

  // Compositor
  const compositor = new Compositor();
  //compositor.addLayer(bgMap.get('level-cleared'));
  compositor.addLayer(bgMap.get('bg-game-1'));
  compositor.addLayer(stage1.level1);

  // Time based main loop
  const timer = new Timer();

  // Test code... it will be deleted
  let finish = true;
  let qbert = stage1.level1.qbert;
  function jumpTest() {
    if(!finish) return;
    finish = false;
    for(let time = 1; time <= 8; time++) {
      if(time % 2) setTimeout(() => qbert.jump.leftDown(), time * 1000);
      else setTimeout(() => qbert.jump.rightDown(), time * 1000);
    }

    for(let time = 9; time <= 16; time++) {
      if(time % 2) setTimeout(() => qbert.jump.rightUp(), time * 1000);
      else setTimeout(() => { qbert.jump.leftUp(); if(time === 16) finish = true; }, time * 1000);
    }
  }

  // Main loop
  timer.update = deltaTime => {
    jumpTest();
    compositor.update(deltaTime);
    compositor.render(context, deltaTime);
  };
  timer.start();
}

const canvas = document.getElementById('game');
main(canvas);
