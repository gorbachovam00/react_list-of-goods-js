/* eslint-disable no-unused-vars */
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_RESET = 'reset';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReverse, setIsReverse] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setActiveButton(SORT_FIELD_RESET);
    setIsReverse(false);
  };

  const sortByAlphabet = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      setActiveButton(SORT_FIELD_ALPHABET),
      setIsReverse(false),
    );
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      setActiveButton(SORT_FIELD_LENGTH),
      setIsReverse(false),
    );
  };

  const sortByReverse = () => {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReverse(!isReverse);
    setActiveButton(isReverse ? null : SORT_FIELD_REVERSE);
  };

  const isModified =
    JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === SORT_FIELD_REVERSE ? '' : 'is-light'}`}
          onClick={sortByReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className={`button is-danger ${activeButton === SORT_FIELD_RESET ? '' : 'is-light'}`}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
