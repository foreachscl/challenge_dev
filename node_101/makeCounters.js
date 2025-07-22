function makeCounters() {
  const counters = [];
  for (let i = 0; i < 3; i++) {
    counters.push(function () {
      return i;
    });
  }
  return counters;
}

export default makeCounters;
