import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { clearAll } from '../../store/itemSlice.ts';
import './Flyout.css';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems
  );

  if (selectedItems.length === 0) {
    return null;
  }

  const handleDownloadCSV = () => {
    const headers = ['Name', 'HP', 'Attack', 'Defense', 'Speed'];

    const rows = selectedItems.map(
      (item) =>
        `"${item.title}",${item.hp},${item.attack},${item.defense},${item.speed}`
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout-panel" data-testid="flyout">
      <div className="flyout-info">
        {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}{' '}
        selected
      </div>
      <div className="flyout-actions">
        <button
          className="button-unselect"
          onClick={() => dispatch(clearAll())}
        >
          Unselect all
        </button>
        <button className="button-download" onClick={handleDownloadCSV}>
          Download CSV
        </button>
      </div>
    </div>
  );
};
