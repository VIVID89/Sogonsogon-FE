import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { __searchUser } from '../redux/module/searchUser';

function SearchHistory({ setIsSearch, setSearchInfo }) {
    useEffect(() => {
        const histories = localStorage.getItem('searchHistory');
        if (histories) {
            setSearchHistory(JSON.parse(histories));
        }
    }, []);

    const dispatch = useDispatch();
    const [searchHistory, setSearchHistory] = useState([]);

    const deleteSearchHistory = (idx) => {
        setSearchHistory(searchHistory.filter((item, index) => idx !== index));
        localStorage.setItem(
            'searchHistory',
            JSON.stringify(searchHistory.filter((item, index) => idx !== index))
        );
    };

    const clearSearchHistory = () => {
        localStorage.removeItem('searchHistory');
        setSearchHistory([]);
    };

    const recentSearchValueHandler = (data) => {
        setIsSearch(true);
        setSearchInfo(data);
        dispatch(__searchUser(data));
    };

    return (
        <>
            <SearchHistoryHeader>최근 검색어</SearchHistoryHeader>
            <SearchHistoryContainer>
                <SearchHistoryBody>
                    <div>
                        {searchHistory.map((data, idx) => {
                            return (
                                <SearchHistoryLayout key={idx}>
                                    <RecentSearchValue
                                        onClick={() => recentSearchValueHandler(data)}
                                    >
                                        {data}
                                    </RecentSearchValue>

                                    <AiOutlineCloseCircle
                                        cursor={'pointer'}
                                        color={'grey'}
                                        size={24}
                                        onClick={() => deleteSearchHistory(idx, data)}
                                    />
                                </SearchHistoryLayout>
                            );
                        })}
                    </div>
                    <button onClick={clearSearchHistory}>검색 기록 삭제</button>
                </SearchHistoryBody>
            </SearchHistoryContainer>{' '}
        </>
    );
}

export default SearchHistory;

const SearchHistoryContainer = styled.div`
    /* background-color: #aeabab52; */
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 20px;
    padding: 20px 25px 0px 25px;
    z-index: -1;
    /* border: 1px solid black; */
`;

const SearchHistoryHeader = styled.div`
    /* background-color: #aeabab52; */
    width: 100%;
    min-height: 50px;
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    padding-left: 32px;
    margin-top: 10px;
    font-size: 20px;
    color: #000;
    font-weight: bold;
`;

const SearchHistoryLayout = styled.div`
    padding: 0px 20px 0px 20px;
    width: 100%;
    min-height: 40px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
    /* border: 1px solid black; */
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    align-items: center;

    justify-content: space-between;
`;

const RecentSearchValue = styled.div`
    width: fit-content;
    height: fit-content;
    font-size: 17px;
    cursor: pointer;
`;

const SearchHistoryBody = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid black; */
`;
