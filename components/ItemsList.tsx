/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import { CircularProgress, Stack, Box } from '@mui/material';
import { SearchBar } from './SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListItems } from './ListItems';
import { Media } from '../types/media.types';

interface Props {
  firstQuery: {
    queryName: DocumentNode,
    resultPropertyName: string
  },
  secondQuery: {
    queryName: DocumentNode,
    resultPropertyName: string
  }
}

export default function ItemsList<T extends Media> (
  { firstQuery, secondQuery }: Props
) {
  const [ page, setPage ] = useState(1);
  const [ items, setItems ] = useState<T[]>([]);
  const [ loadingPage, setLoadingPage ] = useState(true);
  const [ searchText, setSearchText ] = useState('');
  const [ readyToQuery, setReadyToQuery ] = useState(false);

  const [ firstQry, { loading, data: firstQueryResult } ] = useLazyQuery(firstQuery.queryName);
  const [ secondQry, { loading: secondQryLoading, data: secondQueryResult } ] = useLazyQuery(secondQuery.queryName);

  useEffect(() => {
    firstQry({ variables: { page: page } });
  }, []);

  useEffect(() => {
    if (firstQueryResult?.[firstQuery.resultPropertyName] && page === firstQueryResult[firstQuery.resultPropertyName].page) {
      setPage(page + 1);
      setItems([...items, ...firstQueryResult[firstQuery.resultPropertyName].results]);
      if (loadingPage) setLoadingPage(false);
    }
  }, [firstQueryResult])

  useEffect(() => {
    if (secondQueryResult?.[secondQuery.resultPropertyName] && page === secondQueryResult[secondQuery.resultPropertyName].page) {
      setPage(page + 1);
      setItems([...items, ...secondQueryResult[secondQuery.resultPropertyName].results]);
      if (loadingPage) setLoadingPage(false);
    }
  }, [secondQueryResult])

  useEffect(() => {
    setPage(1);
    setItems([]);
    setReadyToQuery(true);
  }, [searchText]);

  useEffect(() => {
    if (readyToQuery) {
      if (searchText === '') {      
        firstQry({ variables: { page: page } });
      } else {
        secondQry({ variables: { page: page, query: searchText } });
      }
      setReadyToQuery(false);
    }
  }, [searchText, readyToQuery]);

  const hasMoreCondition = (): boolean => {
    if (searchText !== '') {
      return secondQueryResult?.[secondQuery.resultPropertyName] && page <= secondQueryResult[secondQuery.resultPropertyName].totalPages;
    }

    return firstQueryResult?.[firstQuery.resultPropertyName] && page <= firstQueryResult[firstQuery.resultPropertyName].totalPages;
  }

  return (
    <>
      {loadingPage ? (
        <CircularProgress />
      ) 
      : (
        <Stack direction={'column'}>
          <SearchBar
            placeholder='Search Movies'
            className='mx-auto mb-5'
            setSearchText={setSearchText}
          />
          <InfiniteScroll
            dataLength={items.length}
            next={() => {
              return searchText !== '' ?
                secondQry({ variables: { page: page, query: searchText } }) :
                firstQry({ variables: { page: page } })
            }}
            hasMore={hasMoreCondition()}
            loader={<Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}><CircularProgress /></Box>}
            style={{ overflowY: 'hidden' }}
          >
            <ListItems items={items} />
          </InfiniteScroll>
        </Stack>
      )}
    </>
  )
}
