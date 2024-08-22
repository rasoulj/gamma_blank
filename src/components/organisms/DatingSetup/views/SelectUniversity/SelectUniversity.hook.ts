import { useState } from "react";
import { useQuery } from "react-query"

const QUERY_NAME = 'universities';
const URL = 'https://gist.githubusercontent.com/hakimelek/147f364c449104ba66da9a3baca9d0c0/raw/7e914fc578d3176f1f752f571f5b3761ea2b22fa/us_institutions.json'

export interface IUniversity {
    institution: string
}

export function useSelectUniversity() {
    const [searchText, setSearchText] = useState('')


    const {
        isLoading,
        isError,
        data: universities,
        error,
    } = useQuery<IUniversity[]>(QUERY_NAME, () =>
        fetch(URL).then(res =>
            res.json()
        ))

    const filterUniversities = (q: string) => {
        const qm = (q ?? "").toLowerCase();
        return qm.length < 2 || isLoading || isError || !universities ? []
            : (universities ?? []).filter(uni => uni.institution.toLowerCase().indexOf(qm) >= 0)
    }

    return {
        searchText, setSearchText,
        data: filterUniversities(searchText).slice(0, 10),
        isLoading,
        isError,
        error,
        clearSearch: () => setSearchText('')
    }
}