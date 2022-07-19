/*
@title: tolls
@author: leo

Use w, a, s, d to move around.

Passing through a door takes one coin.

Try to get to the green block.

Press j to reset the level.
*/

let money = 0;
setText(`You've got: ${money}`)

const player = 'p';
const coin = 'c';
const toll = 't';
const wall = 'w';
const exit = 'e';

setLegend(
  [player, bitmap`
................
................
......000.......
......0.0.......
......000.......
.......0........
......0000......
....0000.00.....
...00..0..000...
.......0....0...
.......0........
......0000......
......0..0......
.....00..00.....
.....0....0.....
.....0....0.....`],
  [coin, bitmap`
................
................
.....333333.....
....36666663....
...3666666663...
..366666666663..
..366663366663..
..36663..36663..
..36663..36663..
..366663366663..
..366666666663..
...3666666663...
....36666663....
.....333333.....
................
................`],
  [toll, bitmap`
................
................
................
...1111111111...
...1........1...
...1........1...
...1........1...
...1........1...
...1........1...
...1........1...
...1..1..1..1...
...1..1..1..1...
...1..1..1..1...
...1..1111..1...
...1........1...
...1........1...`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [exit, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
);

setSolids([ player, wall ])

let level = 0;
const levels = [
  map`
p..
cwt
wwe`,
  map`
p..t.c
c..wcc
wwtwww
...w.e
...t..`
]

setMap(levels[level]);

onInput( "left", () => {
  getFirst(player).x -= 1;
});

onInput("right", () => {
  getFirst(player).x += 1;
});

onInput( "down", () => {
  getFirst(player).y += 1;
});

onInput(   "up", () => {
  getFirst(player).y -= 1;
});

onInput(   "j", () => {
  setMap(levels[level]);
});

afterInput(() => {
  tilesWith(coin, player).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === coin) {
        sprite.remove();
        money++;
        setText(`You've got: ${money}`)
      } 
    })
  });

  tilesWith(toll, player).forEach(tile => {
    if (money) {
      money--;
      setText(`You've got: ${money}`)
    } else {
      const p = getFirst(player);
      p.x -= p.dx;
      p.y -= p.dy;
    }

  });

  if (tilesWith(player, exit).length === 1) {
    if (level < levels.length-1) {
      level++;
      setMap(levels[level]);
    }
  }
  
})

