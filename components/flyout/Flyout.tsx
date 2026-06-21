'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { clearAll } from '../../store/itemSlice';
import './Flyout.css';
import { useTranslations } from 'next-intl';
import { generateCsvString } from '../../app/actions/csv';

export const Flyout = () => {
  const t = useTranslations('Flyout');

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems
  );

  if (selectedItems.length === 0) {
    return null;
  }

  const handleDownloadCSV = async () => {
    try {
      const csvContent = await generateCsvString(selectedItems);

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', `${selectedItems.length}_items.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate CSV on server:', error);
    }
  };

  return (
    <div className="flyout-panel" data-testid="flyout">
      <div className="flyout-info">
        {selectedItems.length} items {t('selected')}
      </div>
      <div className="flyout-actions">
        <button
          className="button-unselect"
          onClick={() => dispatch(clearAll())}
        >
          {t('unselect-all')}
        </button>
        <button className="button-download" onClick={handleDownloadCSV}>
          {t('download-csv')}
        </button>
      </div>
    </div>
  );
};
