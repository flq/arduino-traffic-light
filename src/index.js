import {Board,Led} from 'johnny-five';
import {TrafficLight} from './TrafficLight';

const board = new Board();

board.on("ready", function() {
  console.log("Board Ready!");
  const [r, y, g] = [new Led(7), new Led(4), new Led(2)];
  
  const t = new TrafficLight({r, y, g });

  this.repl.inject({ t });

  this.on("exit", ()=> {
    console.log("Board exiting!");
    t.off();
  })
});



