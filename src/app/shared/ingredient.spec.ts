import { Ingredient } from './ingredient';

describe('Ingredient', () => {
  it('should create an instance', () => {
    expect(new Ingredient('A', 1)).toBeTruthy();
  });
});
