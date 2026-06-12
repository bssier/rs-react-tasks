import type {Country} from '../../types';
import {CountryCard} from '../country-card/country-card';
import {getPopulationForYear, createYearDataMap} from '../../utils/data-transformers';
import { FixedSizeList } from 'react-window';

import styles from './country-list.module.css';
import {memo, useMemo} from "react";
import * as React from "react";

type CountryListProps = {
    countries: Country[];
    searchQuery: string;
    selectedColumns: string[];
    selectedRegion: string;
    selectedYear: number;
    sortField: 'name' | 'population';
    sortOrder: 'asc' | 'desc';
    onYearChange: (year: number) => void;
};

interface RowProps {
    index: number;
    style: React.CSSProperties;
}

const CountryListComponent = ({
                                  countries,
                                  searchQuery,
                                  selectedColumns,
                                  selectedRegion,
                                  selectedYear,
                                  sortField,
                                  sortOrder,
                              }: CountryListProps) => {
    const filteredCountries = useMemo(() => {
        const filtered = countries.filter((c) => {
            const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
            return matchesSearch && matchesRegion;
        });

        if (sortField === 'name') {
            return filtered.sort((a, b) => {
                return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
            });
        }

        const withPopulation = filtered.map((country) => {
            const population = getPopulationForYear(createYearDataMap(country.data), selectedYear) || 0;
            return { country, population };
        });

        withPopulation.sort((a, b) => {
            return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
        });

        return withPopulation.map((item) => item.country);

    }, [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear])

    const Row = ({index, style}: RowProps): React.JSX.Element => {
        const country: Country = filteredCountries[index];

        return (
           <div style={style} className={styles.columnWrapper}>
            <CountryCard
            key={country.id}
            country={country}
            selectedYear={selectedYear}
            selectedColumns={selectedColumns}/>
         </div>
    )
    }

    return (
        <div className={styles.countryList}>
            <FixedSizeList height={600}
                           itemCount={filteredCountries.length}
                           itemSize={300}
                           width="100%">
                {Row}
            </FixedSizeList>
        </div>
    );
};

export const CountryList = memo(CountryListComponent);