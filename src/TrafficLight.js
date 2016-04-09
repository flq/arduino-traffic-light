const DELAY = 1500;

function offState(lights) {
  const {r,y,g} = lights;
  r.off(); y.off(); g.off();
  return {
    go: () => {
      g.on();
      return goState(lights);
    },
    stop: () => {
      r.on();
      return stopState(lights);
    }
  }
}

function stopState(lights) {
  const {r,y,g} = lights;
  return {
    stop: () => {
      return stopState(lights);
    },
    go: () => {
      y.on();
      setTimeout(()=> {
        r.off(); y.off(); g.on();
      }, DELAY);
      return goState(lights);
    }
  }
}

function goState(lights) {
  const {r,y,g} = lights;
  return {
    go: () => { return goState(lights); },
    stop: () => {
      y.on(); g.off();
      setTimeout(()=> {
        r.on(); y.off();
      }, DELAY);
      return stopState(lights);
    }
  }
}

export class TrafficLight {
    
  constructor(lights) {
    this.lights = lights;
    this.state = offState(lights);
  }

  go() {
    this.state = this.state.go();
  }
  
  stop() {
    this.state = this.state.stop();
  }

  off() {
    this.state = offState(this.lights);
  }
}