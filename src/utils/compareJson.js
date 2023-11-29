const jsondiffpatch = require('jsondiffpatch').create();


const example1 = {
  outer: {
    val: 'test',
    valAgain: 'test',
    nested: {
      first: 1,
      second: 2
    }
  }
}

const example2 = {
  outer: {
    val: 'test2',
    nested: {
      first: 1,
      second: 2,
      other: 5
    },
    third: 3,
    fourth: [3,4,5,6]
  }
}

const delta = jsondiffpatch.diff(example1, example2);
console.log(delta);