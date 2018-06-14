const ReactKeyGen = require('./index');

describe('ReactKeyGen', () => {
  it('Creates a new instance of the key generator', () => {
    const keyGen = new ReactKeyGen();
    expect(keyGen).toBeTruthy();
  });

  it('Adds a `_key` prop on an object with `.keyed(item)`', () => {
    const keyGen = new ReactKeyGen();
    const a = keyGen.keyed({ apples: 1, oranges: 'are great', bananas: null });
    expect(a).toHaveProperty('_key');
  });

  it('Adds a `_key` prop on an object with `.keyed(item)` that is unique', () => {
    const keyGen = new ReactKeyGen();
    const items = [];
    for (let i = 0; i < 500; i++) {
      items.push(keyGen.keyed({}));
    }
    
    items.forEach((item, idx) => {
      items.forEach((item2, idx2) => {
        if (idx === idx2) {
          return;
        }

        expect(item._key).not.toEqual(item2._key);
      });
    });
  });

  it('Adds a `_key` prop on an object with `.keyed(item)` that is not enumerable', () => {
    const keyGen = new ReactKeyGen();
    const a = keyGen.keyed({ apples: 1, oranges: 'are great', bananas: null });
    expect(a).toHaveProperty('_key');

    const b = { ...a };
    expect(b).not.toHaveProperty('_key');

    const c = Object.assign({}, a);
    expect(c).not.toHaveProperty('_key');
  });

  it('Shallow copies an item with its key with `.copy(item)`', () => {
    const keyGen = new ReactKeyGen();
    const a = keyGen.keyed({ apples: 1, oranges: 'are great', bananas: null });
    expect(a).toHaveProperty('_key');

    const copy = keyGen.copy(a);
    expect(copy).toHaveProperty('_key');
    expect(copy._key).toEqual(a._key);
    expect(copy).toEqual(a);
    expect(copy).not.toBe(a);
  });
});