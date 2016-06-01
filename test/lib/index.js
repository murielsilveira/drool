var assert = require('assert');
var drool = require('../../lib/');

describe('delta tests', function() {
  var initial = {
    counts: {
      documents: 3,
      jsEventListeners: 48,
      jsHeapSizeUsed: 9381600,
      nodes: 1701
    },
    gc: {
      MinorGC: { count: 11, duration: 14880 },
      MajorGC: { count: 8, duration: 82 },
      'V8.GCScavenger': { count: 0, duration: 0 },
      'V8.GCIncrementalMarking': { count: 0, duration: 0 }
    }
  };
  var after = {
    counts: {
      documents: 3,
      jsEventListeners: 48,
      jsHeapSizeUsed: 7927032,
      nodes: 1701
    },
    gc: {
      MinorGC: { count: 14, duration: 50281 },
      MajorGC: { count: 29, duration: 19412 },
      'V8.GCScavenger': { count: 0, duration: 0 },
      'V8.GCIncrementalMarking': { count: 0, duration: 0 }
    }
  };

  it('equal documents', function() {
    var delta = drool.getDelta(this.initial, this.after)

    assert.equal(0, delta.documents)
  });
});
